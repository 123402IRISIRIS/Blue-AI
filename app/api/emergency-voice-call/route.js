import sql from "@/app/api/utils/sql";

export async function POST(req) {
  try {
    const { userIp, country, phoneNumber, riskLevel, messageContent } =
      await req.json();

    if (!userIp || !country || !phoneNumber) {
      return Response.json(
        {
          error: "Missing required parameters",
        },
        { status: 400 },
      );
    }

    // Determine the language based on country
    const isRomania = country.toLowerCase() === "romania" || country === "RO";

    // Create the voice message
    const voiceMessage = isRomania
      ? `Bună, sunt Blue, un AI pentru copii și vreau să semnalizez o situație de urgență pentru utilizatorul cu IP-ul următor: ${userIp.replace(/\./g, " punct ")}`
      : `Hello, I am Blue, an AI for children, and I want to report an emergency situation for a user with the following IP address: ${userIp.replace(/\./g, " dot ")}`;

    // Twilio configuration
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error("Twilio credentials not configured");
      return Response.json(
        {
          error: "Voice call service not configured",
          message:
            "Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER environment variables",
        },
        { status: 500 },
      );
    }

    // Create TwiML for the voice message
    const twimlUrl = `${process.env.APP_URL}/api/emergency-voice-twiml?message=${encodeURIComponent(voiceMessage)}&lang=${isRomania ? "ro-RO" : "en-US"}`;

    // Make the call using Twilio API
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`;

    const formData = new URLSearchParams();
    formData.append("To", phoneNumber);
    formData.append("From", twilioPhoneNumber);
    formData.append("Url", twimlUrl);

    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Twilio API error:", errorData);
      return Response.json(
        {
          error: "Failed to initiate call",
          details: errorData,
        },
        { status: response.status },
      );
    }

    const callData = await response.json();

    // Log the emergency call in the database
    await sql`
      INSERT INTO emergency_calls (
        user_ip, 
        country, 
        phone_number, 
        call_sid, 
        voice_message, 
        risk_level,
        message_content,
        call_status,
        created_at
      ) VALUES (
        ${userIp},
        ${country},
        ${phoneNumber},
        ${callData.sid},
        ${voiceMessage},
        ${riskLevel || "critical"},
        ${messageContent || null},
        'initiated',
        NOW()
      )
    `;

    return Response.json({
      success: true,
      callSid: callData.sid,
      message: "Emergency voice call initiated",
      voiceMessage,
    });
  } catch (error) {
    console.error("Error initiating emergency call:", error);
    return Response.json(
      {
        error: "Failed to initiate emergency call",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
