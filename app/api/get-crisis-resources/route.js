import sql from "@/app/api/utils/sql";

async function getLocationFromIP(ip) {
  // Skip localhost/private IPs
  if (
    ip === "127.0.0.1" ||
    ip.startsWith("192.168.") ||
    ip === "8.8.8.8" ||
    ip === "unknown" ||
    !ip
  ) {
    return null;
  }

  // Try ipapi.co first
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (response.ok) {
      const data = await response.json();
      if (data.country_name && data.country_code) {
        console.log(
          `✅ ipapi.co detected: ${data.city}, ${data.country_name} (${data.country_code})`,
        );
        return {
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city,
          region: data.region,
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
    }
  } catch (error) {
    console.error("ipapi.co failed:", error);
  }

  // Fallback to ip-api.com
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === "success") {
        console.log(
          `✅ ip-api.com detected: ${data.city}, ${data.country} (${data.countryCode})`,
        );
        return {
          country: data.country,
          countryCode: data.countryCode,
          city: data.city,
          region: data.regionName,
          latitude: data.lat,
          longitude: data.lon,
        };
      }
    }
  } catch (error) {
    console.error("ip-api.com failed:", error);
  }

  return null;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
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
    // First, try exact country code match
    const countryLines = await sql`
      SELECT * FROM crisis_lines 
      WHERE UPPER(country_code) = UPPER(${countryCode})
      AND phone_number IS NOT NULL
      ORDER BY id
      LIMIT 1
    `;

    if (countryLines.length > 0) {
      console.log(`✅ Found crisis line for country code: ${countryCode}`);
      return countryLines[0];
    }

    // If no exact match, try geographic proximity
    if (latitude && longitude) {
      const allLines = await sql`
        SELECT * FROM crisis_lines 
        WHERE latitude IS NOT NULL 
        AND longitude IS NOT NULL
        AND phone_number IS NOT NULL
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

      if (nearest) {
        console.log(
          `✅ Found nearest crisis line: ${nearest.country} (${minDistance.toFixed(0)}km away)`,
        );
        return nearest;
      }
    }

    // No crisis line found
    console.log(`⚠️ No crisis line found for ${countryCode}`);
    return null;
  } catch (error) {
    console.error("Error finding crisis line:", error);
    return null;
  }
}

export async function POST(request) {
  try {
    // Get client IP from headers (this would be populated by your hosting provider)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0] || realIp || "unknown";

    console.log(`🌍 Detecting location for IP: ${clientIp}`);

    const location = await getLocationFromIP(clientIp);

    if (!location) {
      console.log(`⚠️ Could not detect location for IP: ${clientIp}`);
      // Return response indicating location detection failed
      return Response.json({
        locationDetected: false,
        crisisLine: {
          service: "International Association for Suicide Prevention",
          phone: "Visit findahelpline.com for your local crisis line",
          country: "International",
          hours: "24/7",
          website: "https://findahelpline.com",
        },
        message:
          "We couldn't detect your location automatically. Please let us know what country you're in so we can provide local resources.",
      });
    }

    console.log(
      `✅ Location detected: ${location.city}, ${location.country} (${location.countryCode})`,
    );

    const crisisLine = await findNearestCrisisLine(
      location.latitude,
      location.longitude,
      location.countryCode,
    );

    if (!crisisLine) {
      // No crisis line found for this country
      return Response.json({
        locationDetected: true,
        location: `${location.city}, ${location.country}`,
        crisisLine: {
          service: "International Association for Suicide Prevention",
          phone: "Visit findahelpline.com",
          country: location.country,
          hours: "24/7",
          website: "https://findahelpline.com",
        },
        message: `We detected you're in ${location.country}, but we don't have a local crisis line in our database yet. Please visit findahelpline.com or let us know your local crisis resources.`,
      });
    }

    return Response.json({
      locationDetected: true,
      crisisLine: {
        service: crisisLine.service_name,
        phone: crisisLine.phone_number,
        country: crisisLine.country,
        hours: crisisLine.hours || "24/7",
        website: crisisLine.website || null,
      },
      location: `${location.city}, ${location.country}`,
    });
  } catch (error) {
    console.error("Error getting crisis resources:", error);
    return Response.json({
      locationDetected: false,
      crisisLine: {
        service: "International Crisis Support",
        phone: "Visit findahelpline.com",
        country: "International",
        hours: "24/7",
        website: "https://findahelpline.com",
      },
      message:
        "We encountered an error detecting your location. Please let us know what country you're in.",
    });
  }
}
