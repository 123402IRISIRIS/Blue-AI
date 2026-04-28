import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";

async function getLocationFromIP(ip) {
  try {
    // Use ipapi.co for geolocation (free tier available)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      throw new Error("Geolocation failed");
    }
    const data = await response.json();
    return {
      country: data.country_name,
      countryCode: data.country_code,
      city: data.city,
      region: data.region,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error("Error getting location from IP:", error);
    return null;
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function findNearestCrisisLine(latitude, longitude, countryCode) {
  try {
    // First try to find crisis lines in the same country
    const countryLines = await sql`
      SELECT * FROM crisis_lines 
      WHERE country_code = ${countryCode}
      ORDER BY id
      LIMIT 5
    `;

    if (countryLines.length > 0) {
      return countryLines[0];
    }

    // If no country-specific line, find the nearest geographically
    const allLines = await sql`
      SELECT * FROM crisis_lines 
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
    `;

    let nearest = null;
    let minDistance = Infinity;

    for (const line of allLines) {
      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(line.latitude),
        parseFloat(line.longitude),
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = line;
      }
    }

    return nearest;
  } catch (error) {
    console.error("Error finding nearest crisis line:", error);
    // Return a default international crisis line
    return {
      country: "International",
      phone_number: "988 (US) or local emergency services",
      service_name: "Crisis Support",
      hours: "24/7",
    };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, userIp, analysis } = body;

    // Get user location from IP
    const location = await getLocationFromIP(userIp || "8.8.8.8");

    if (!location) {
      console.error("Could not determine user location");
      return Response.json({
        success: false,
        error: "Could not determine location",
      });
    }

    // Find nearest crisis line
    const crisisLine = await findNearestCrisisLine(
      location.latitude,
      location.longitude,
      location.countryCode,
    );

    // Find multiple nearby crisis lines for email distribution
    const nearbyCrisisLines = await sql`
      SELECT * FROM crisis_lines 
      WHERE email IS NOT NULL 
      AND email != ''
      AND (
        country_code = ${location.countryCode}
        OR latitude IS NOT NULL
      )
      ORDER BY 
        CASE WHEN country_code = ${location.countryCode} THEN 0 ELSE 1 END,
        id
      LIMIT 10
    `;

    // Filter and sort by proximity if we have coordinates
    let emailRecipients = [];
    if (location.latitude && location.longitude) {
      const linesWithDistance = nearbyCrisisLines
        .filter((line) => line.latitude && line.longitude)
        .map((line) => ({
          ...line,
          distance: calculateDistance(
            location.latitude,
            location.longitude,
            parseFloat(line.latitude),
            parseFloat(line.longitude),
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Send to 5 nearest crisis lines

      emailRecipients = linesWithDistance.map((line) => line.email);
    }

    // If no lines with coordinates, use all crisis lines from same country
    if (emailRecipients.length === 0) {
      emailRecipients = nearbyCrisisLines
        .filter((line) => line.country_code === location.countryCode)
        .slice(0, 5)
        .map((line) => line.email);
    }

    // Ensure we have at least one recipient
    if (emailRecipients.length === 0) {
      emailRecipients = nearbyCrisisLines
        .filter((line) => line.email)
        .slice(0, 3)
        .map((line) => line.email);
    }

    // Log the distress signal in database
    const distressSignal = await sql`
      INSERT INTO distress_signals (
        user_ip, 
        user_location, 
        message_content, 
        risk_level,
        crisis_line_id
      ) VALUES (
        ${userIp},
        ${`${location.city}, ${location.region}, ${location.country}`},
        ${message},
        ${analysis.riskLevel},
        ${crisisLine.id || null}
      )
      RETURNING id
    `;

    // Simple email format as requested
    const emailSubject = `Blue AI - Emergency Alert`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Hi,
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          I am Blue, an AI designed for child safety. The user with the IP <strong style="color: #dc2626;">${userIp}</strong> needs help.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Thank you
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <div style="font-size: 12px; color: #666;">
          <p><strong>Location:</strong> ${location.city}, ${location.region}, ${location.country}</p>
          <p><strong>Risk Level:</strong> ${analysis.riskLevel}</p>
          <p><strong>Alert ID:</strong> ${distressSignal[0].id}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
      </div>
    `;

    const emailText = `
Hi,

I am Blue, an AI designed for child safety. The user with the IP ${userIp} needs help.

Thank you

---
Location: ${location.city}, ${location.region}, ${location.country}
Risk Level: ${analysis.riskLevel}
Alert ID: ${distressSignal[0].id}
Timestamp: ${new Date().toISOString()}
    `;

    // Send email to nearby crisis lines
    let emailSent = false;
    let emailsSentCount = 0;
    try {
      if (emailRecipients.length > 0) {
        // Send to all recipients
        await sendEmail({
          from: "blueasksforhelp@gmail.com",
          to: emailRecipients,
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        });

        emailSent = true;
        emailsSentCount = emailRecipients.length;

        // Update the distress signal record
        await sql`
          UPDATE distress_signals 
          SET email_sent = true, email_sent_at = NOW()
          WHERE id = ${distressSignal[0].id}
        `;

        console.log(
          `Crisis alert sent to ${emailsSentCount} crisis lines for user at ${location.city}, ${location.country}`,
          emailRecipients,
        );
      } else {
        console.log("No crisis line emails found for location");
      }
    } catch (emailError) {
      console.error("Failed to send crisis alert email:", emailError);
      console.log("⚠️ EMAIL ALERT FAILED - Crisis logged to database.");
    }

    return Response.json({
      success: true,
      alertId: distressSignal[0].id,
      emailSent,
      emailsSentCount,
      recipients: emailRecipients,
      crisisLine: {
        service: crisisLine.service_name,
        phone: crisisLine.phone_number,
        country: crisisLine.country,
        email: crisisLine.email || "Not on file",
      },
      location: `${location.city}, ${location.country}`,
      userIp: userIp,
      message: emailSent
        ? `Alert sent to ${emailsSentCount} nearby crisis lines`
        : "Alert logged, but no emails sent",
    });
  } catch (error) {
    console.error("Error sending crisis alert:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
