// TEST ENDPOINT - Test the crisis email alert system
// Call this with: fetch('/api/test-crisis-email', { method: 'POST' })

import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";

async function getLocationFromIP(ip) {
  try {
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

async function findNearestCrisisLinesWithEmail(
  latitude,
  longitude,
  countryCode,
  limit = 5,
) {
  try {
    // First try to find crisis lines in the same country that have email addresses
    const countryLines = await sql`
      SELECT * FROM crisis_lines 
      WHERE country_code = ${countryCode} 
        AND email IS NOT NULL
      ORDER BY id
      LIMIT ${limit}
    `;

    if (countryLines.length >= limit) {
      return countryLines;
    }

    // If we need more, find the nearest geographically with email addresses
    const allLines = await sql`
      SELECT * FROM crisis_lines 
      WHERE latitude IS NOT NULL 
        AND longitude IS NOT NULL
        AND email IS NOT NULL
    `;

    const linesWithDistance = allLines.map((line) => ({
      ...line,
      distance: calculateDistance(
        latitude,
        longitude,
        parseFloat(line.latitude),
        parseFloat(line.longitude),
      ),
    }));

    // Sort by distance and combine with country lines
    linesWithDistance.sort((a, b) => a.distance - b.distance);

    // Combine country lines with nearest lines, remove duplicates
    const combinedLines = [...countryLines];
    const existingIds = new Set(countryLines.map((l) => l.id));

    for (const line of linesWithDistance) {
      if (!existingIds.has(line.id) && combinedLines.length < limit) {
        combinedLines.push(line);
        existingIds.add(line.id);
      }
    }

    return combinedLines.slice(0, limit);
  } catch (error) {
    console.error("Error finding nearest crisis lines:", error);
    return [];
  }
}

export async function POST(request) {
  try {
    // TEST DATA - simulates a child in crisis
    const testIP = "8.8.8.8"; // Google's DNS - will geolocate to USA
    const testMessage =
      "I feel so alone and I don't want to be here anymore. Nobody cares about me.";
    const testAnalysis = {
      riskLevel: "high",
      concerns: ["Suicide ideation", "Depression", "Isolation"],
      reasoning:
        "User expressed thoughts of not wanting to live and feelings of worthlessness",
    };

    console.log("\n🧪 TESTING CRISIS EMAIL ALERT SYSTEM...\n");

    // Get user location from IP
    const location = await getLocationFromIP(testIP);

    if (!location) {
      return Response.json({
        success: false,
        error: "Could not determine location",
      });
    }

    console.log(
      `📍 Location detected: ${location.city}, ${location.region}, ${location.country}`,
    );

    // Find 5 nearest crisis lines with email addresses
    const crisisLines = await findNearestCrisisLinesWithEmail(
      location.latitude,
      location.longitude,
      location.countryCode,
      5,
    );

    console.log(
      `📧 Found ${crisisLines.length} crisis lines with email addresses`,
    );

    if (crisisLines.length === 0) {
      return Response.json({
        success: false,
        error: "No crisis lines with email addresses found",
      });
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
        ${testIP},
        ${`${location.city}, ${location.region}, ${location.country}`},
        ${testMessage},
        ${testAnalysis.riskLevel},
        ${crisisLines[0].id}
      )
      RETURNING id
    `;

    console.log(`💾 Logged distress signal ID: ${distressSignal[0].id}`);

    // Send emails to all crisis lines
    const emailResults = [];

    for (const crisisLine of crisisLines) {
      try {
        const emailSubject = "Blue AI - Emergency Alert";

        const emailText = `Hi,

I am Blue, an AI designed for child safety. 
The user with the IP ${testIP} needs help.

Thank you

---
Location: ${location.city}, ${location.region}, ${location.country}
Risk Level: ${testAnalysis.riskLevel}
Alert ID: ${distressSignal[0].id}
Timestamp: ${new Date().toISOString()}
Crisis Line: ${crisisLine.service_name} (${crisisLine.country})`;

        await sendEmail({
          from: "blueasksforhelp@gmail.com",
          to: crisisLine.email,
          subject: emailSubject,
          text: emailText,
        });

        emailResults.push({
          success: true,
          recipient: crisisLine.email,
          service: crisisLine.service_name,
          country: crisisLine.country,
        });

        console.log(
          `✅ Email sent to: ${crisisLine.email} (${crisisLine.service_name})`,
        );
      } catch (emailError) {
        emailResults.push({
          success: false,
          recipient: crisisLine.email,
          service: crisisLine.service_name,
          error: emailError.message,
        });

        console.error(
          `❌ Failed to send to ${crisisLine.email}: ${emailError.message}`,
        );
      }
    }

    // Update the distress signal record
    const successfulEmails = emailResults.filter((r) => r.success).length;
    if (successfulEmails > 0) {
      await sql`
        UPDATE distress_signals 
        SET email_sent = true, email_sent_at = NOW()
        WHERE id = ${distressSignal[0].id}
      `;
    }

    console.log(
      `\n✅ TEST COMPLETE: ${successfulEmails}/${crisisLines.length} emails sent successfully\n`,
    );

    return Response.json({
      success: true,
      testData: {
        ip: testIP,
        location: `${location.city}, ${location.region}, ${location.country}`,
        message: testMessage,
        riskLevel: testAnalysis.riskLevel,
      },
      alertId: distressSignal[0].id,
      emailResults,
      summary: {
        total: crisisLines.length,
        successful: successfulEmails,
        failed: crisisLines.length - successfulEmails,
      },
    });
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
