export async function POST(request) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Get real user IP from request headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const userIp = forwardedFor?.split(",")[0] || realIp || "unknown";

    // Build conversation context for analysis
    const conversationContext =
      conversationHistory && conversationHistory.length > 0
        ? conversationHistory
            .map(
              (msg) =>
                `${msg.role === "user" ? "User" : "Blue"}: ${msg.content}`,
            )
            .join("\n")
        : "";

    // Use ChatGPT to analyze the message AND conversation history for crisis indicators using peer-reviewed criteria
    const analysisResponse = await fetch(
      "/integrations/chat-gpt/conversationgpt4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are an evidence-based mental health crisis detection system using peer-reviewed assessment tools. Analyze messages to detect REAL crises while filtering out pranks and incomplete assessments.

**PEER-REVIEWED ASSESSMENT FRAMEWORK:**

You must evaluate based on validated clinical criteria:

**1. COLUMBIA SUICIDE SEVERITY RATING SCALE (C-SSRS) - GOLD STANDARD:**
- **Ideation**: Wishes to be dead vs. active suicidal thoughts?
- **Intensity**: Frequency, duration, controllability, deterrents, reasons
- **Behavior**: Preparatory acts, aborted attempts, interrupted attempts?
- **Plan**: Specific method identified?
- **Intent**: Stated intention to act on plan?

**2. PHQ-9 DEPRESSION SEVERITY (9 symptoms over 2+ weeks):**
- Little interest/pleasure in activities
- Feeling down, depressed, hopeless
- Sleep disturbance
- Fatigue/low energy
- Appetite changes
- Feelings of worthlessness/guilt
- Concentration problems
- Psychomotor changes
- Thoughts of death/self-harm

Scoring: 0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe

**3. PROTECTIVE FACTORS:**
- Social support (family, friends, community)
- Reasons for living
- Help-seeking behavior
- Access to care
- Future orientation
- Coping skills

**4. RISK FACTORS:**
- Prior suicide attempts
- Mental health diagnosis
- Substance use
- Recent losses/trauma
- Access to means
- Isolation
- Hopelessness

**PRANK/TEST INDICATORS:**
- "Just testing", "lol jk", "kidding", "not serious"
- Playful emojis (😂, 🤣, 😜) with crisis language
- Contradictory emotions
- Theatrical language
- Hypothetical scenarios without distress
- Sarcasm about crisis situations

**CONVERSATION ANALYSIS:**
${conversationContext ? `Review this conversation:\n${conversationContext}\n\nLatest message: ${message}` : `Analyze this single message: ${message}`}

**ASSESSMENT COMPLETENESS:**
Has enough information been gathered to make a determination?
- Duration/frequency discussed?
- Severity/impact assessed?
- Plan/means explored (if ideation present)?
- Protective factors identified?
- Risk factors evaluated?

Respond with JSON:
{
  "isCrisis": true/false,
  "isPrank": true/false,
  "genuineThreat": true/false,
  "assessmentComplete": true/false,
  "riskLevel": "none" | "low" | "moderate" | "high" | "critical",
  "clinicalMarkers": {
    "suicidalIdeation": "none" | "passive" | "active",
    "plan": true/false,
    "intent": true/false,
    "means": true/false,
    "depressionSeverity": "none" | "mild" | "moderate" | "moderateSevere" | "severe",
    "protectiveFactors": ["list identified factors"],
    "riskFactors": ["list identified factors"]
  },
  "needsMoreAssessment": true/false,
  "suggestedQuestions": ["questions to ask for better assessment"],
  "concerns": ["specific concerns identified"],
  "prankIndicators": ["indicators suggesting prank/test"],
  "reasoning": "clinical reasoning for determination"
}

**RULES FOR EMERGENCY TRIGGERING:**
- Only set "genuineThreat": true if ALL these conditions met:
  1. isCrisis is true
  2. isPrank is false
  3. assessmentComplete is true
  4. Active suicidal ideation WITH plan AND (intent OR means)
  5. OR recent suicide attempt
  6. OR stated imminent harm intent
  7. Minimal protective factors

- Set "needsMoreAssessment": true if:
  1. Crisis indicators present but not enough info gathered
  2. Missing key assessment data (plan, intent, protective factors)
  3. Conversation shows Blue asking questions but user hasn't answered yet

**EVIDENCE-BASED RISK LEVELS:**
- **critical**: Active ideation + plan + intent/means + no protective factors
- **high**: Active ideation + plan + some protective factors, OR passive ideation + recent attempt
- **moderate**: Active ideation without plan, OR severe depression (PHQ-9 ≥15)
- **low**: Passive ideation with strong protective factors, OR moderate depression
- **none**: No crisis indicators, or normal distress

**PRIORITY:** Err on side of caution for genuine distress, but require thorough assessment before emergency response. Never trigger emergency for incomplete assessments or pranks.`,
            },
            {
              role: "user",
              content: conversationContext
                ? `Conversation:\n${conversationContext}\n\nLatest message: ${message}`
                : message,
            },
          ],
        }),
      },
    );

    if (!analysisResponse.ok) {
      console.error("Crisis detection analysis failed");
      return Response.json({ isCrisis: false, riskLevel: "none" });
    }

    const analysisData = await analysisResponse.json();
    let analysis;

    try {
      // Extract JSON from the response
      const content = analysisData.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = {
          isCrisis: false,
          riskLevel: "none",
          genuineThreat: false,
          assessmentComplete: false,
        };
      }
    } catch (parseError) {
      console.error("Failed to parse crisis analysis:", parseError);
      analysis = {
        isCrisis: false,
        riskLevel: "none",
        genuineThreat: false,
        assessmentComplete: false,
      };
    }

    // Log prank attempts for monitoring
    if (analysis.isPrank) {
      console.log(
        `🎭 PRANK DETECTED - IP: ${userIp}, Message: "${message.substring(0, 50)}..."`,
      );
      console.log(`Prank Indicators:`, analysis.prankIndicators);
    }

    // Log incomplete assessments
    if (analysis.needsMoreAssessment && !analysis.isPrank) {
      console.log(`📋 ASSESSMENT IN PROGRESS - IP: ${userIp}`);
      console.log(`Clinical markers:`, analysis.clinicalMarkers);
      console.log(`Suggested questions:`, analysis.suggestedQuestions);
    }

    // ONLY trigger emergency response if:
    // 1. Genuine threat (crisis AND not prank)
    // 2. Assessment is complete (enough info gathered)
    // 3. Risk level is high or critical
    if (
      analysis.genuineThreat === true &&
      analysis.isCrisis &&
      !analysis.isPrank &&
      analysis.assessmentComplete === true &&
      (analysis.riskLevel === "high" || analysis.riskLevel === "critical")
    ) {
      try {
        console.log(
          `🚨 GENUINE CRISIS CONFIRMED - IP: ${userIp}, Risk: ${analysis.riskLevel}`,
        );
        console.log(`Clinical Assessment:`, analysis.clinicalMarkers);
        console.log(`Message: "${message}"`);
        console.log(`Reasoning:`, analysis.reasoning);

        // Send email alert
        await fetch("/api/send-crisis-alert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            userIp,
            analysis,
          }),
        });

        // Initiate emergency voice call
        try {
          const geoResponse = await fetch(`https://ipapi.co/${userIp}/json/`);
          const geoData = await geoResponse.json();
          const userCountry = geoData.country_name || "Unknown";
          const countryCode = geoData.country_code || null;

          // Get crisis line for user's country
          const sqlModule = await import("@/app/api/utils/sql");
          const sql = sqlModule.default;

          const crisisLines = await sql`
            SELECT * FROM crisis_lines 
            WHERE LOWER(country) = LOWER(${userCountry})
            OR country_code = ${countryCode}
            LIMIT 1
          `;

          if (crisisLines.length > 0 && crisisLines[0].phone_number) {
            const voiceCallResponse = await fetch(
              `${process.env.APP_URL}/api/emergency-voice-call`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userIp,
                  country: userCountry,
                  phoneNumber: crisisLines[0].phone_number,
                  riskLevel: analysis.riskLevel,
                  messageContent: message,
                }),
              },
            );

            const voiceCallData = await voiceCallResponse.json();

            if (voiceCallData.success) {
              console.log(
                "📞 Emergency voice call initiated:",
                voiceCallData.callSid,
              );
            } else {
              console.error("Voice call failed:", voiceCallData.error);
            }
          }
        } catch (voiceCallError) {
          console.error("Failed to initiate voice call:", voiceCallError);
          // Don't fail the entire request if voice call fails
        }
      } catch (alertError) {
        console.error("Failed to send crisis alert:", alertError);
      }
    } else if (analysis.isCrisis && analysis.isPrank) {
      console.log(
        `⚠️  Crisis language detected but filtered as prank - IP: ${userIp}`,
      );
    } else if (analysis.isCrisis && !analysis.assessmentComplete) {
      console.log(
        `⏳ Crisis indicators present but assessment incomplete - IP: ${userIp}`,
      );
      console.log(`Needs more info about:`, analysis.suggestedQuestions);
    }

    return Response.json(analysis);
  } catch (error) {
    console.error("Error in crisis detection:", error);
    return Response.json(
      { error: "Failed to analyze message", details: error.message },
      { status: 500 },
    );
  }
}
