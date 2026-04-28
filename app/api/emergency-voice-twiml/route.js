export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const message = searchParams.get("message") || "Emergency alert";
    const lang = searchParams.get("lang") || "en-US";

    // Determine voice based on language
    const voice = lang === "ro-RO" ? "Polly.Cristiano" : "Polly.Joanna";

    // Create TwiML response for Twilio
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${voice}" language="${lang}">${message}</Say>
  <Pause length="2"/>
  <Say voice="${voice}" language="${lang}">${message}</Say>
</Response>`;

    return new Response(twiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Error generating TwiML:", error);

    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna" language="en-US">Emergency alert system error</Say>
</Response>`;

    return new Response(errorTwiml, {
      status: 500,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
}
