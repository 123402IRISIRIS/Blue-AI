export async function POST(request) {
  try {
    // Build markdown representation of the system diagram
    const markdown = `# Blue System Architecture
## Multi-Layer Safety System for Teen Mental Health

**Created by**: Iris (Age 11)  
**Project**: Blue - Safe AI Companion for Teen Mental Health  
**Competition**: Technovation Girls 2025/2026

---

## 🛡️ Multi-Layer Safety Architecture

### User Message (START)
👤 **User Input**: "I've been feeling really down lately..."

↓

### LAYER 1: 💬 Conversation Analysis

**Natural Language Processing**
- Understands slang, typos, and emotional nuances
- Analyzes full conversation history for context
- Detects tone and emotional patterns

**Technology**: ChatGPT GPT-4 API + Conversation History Context

---

### LAYER 2: 🏥 Clinical Assessment

Blue uses four evidence-based clinical tools:

1. **C-SSRS (Columbia Suicide Severity Rating Scale)**
   - FDA-approved suicide risk screening
   - Gold standard in mental health assessment
   - Source: Columbia University

2. **PHQ-9 (Patient Health Questionnaire-9)**
   - Depression severity assessment
   - Validated by 6,000+ research studies
   - Source: Pfizer Inc.

3. **GAD-7 (Generalized Anxiety Disorder-7)**
   - Anxiety disorder screening
   - Validated globally across populations
   - Source: Multiple clinical validations

4. **Protective Factors Assessment**
   - Social support networks
   - Coping mechanisms
   - Hope and future orientation
   - Source: AAS/AFSP research

---

### LAYER 3: ✅ Verification

**Multi-Point Safety Checks**:

1. **Prank Filter**
   - Detects "lol jk", playful emojis (😂 🤣)
   - Identifies contradictory language
   - Filters theatrical/hypothetical scenarios

2. **Assessment Completeness**
   - Ensures sufficient information gathered
   - Validates response quality
   - Confirms engagement level

3. **Genuine Threat Assessment**
   - Distinguishes crisis from venting
   - Evaluates emotional consistency
   - Checks for detailed descriptions

4. **Risk Level Determination**
   - None → Low → Moderate → High → Critical
   - Based on clinical assessment scores
   - Contextual analysis

**Safety Rule**: Emergency response ONLY if:
- ✅ Genuine threat detected
- ✅ Assessment complete
- ✅ NOT a prank
- ✅ High or Critical risk level

---

### LAYER 4: 🎯 Graduated Response System

**NONE (Safe)**
- Continue supportive conversation
- Provide general wellness tips

**LOW**
- Share coping resources
- Mindfulness techniques
- Self-care strategies

**MODERATE**
- Therapy suggestions
- Professional help recommendations
- Mental health resources

**HIGH**
- Crisis line information
- Email alert to designated responders
- Local emergency resources

**CRITICAL**
- All of the above
- Automated voice call to crisis services
- Immediate intervention protocols

---

### LAYER 5: 🚨 Emergency Response & Follow-Up

**Three-Pronged Approach**:

1. **📧 Email Alert System**
   - Designated responders immediately notified
   - Full clinical assessment included
   - Conversation context provided
   - Actionable information for human review

2. **🌍 Local Crisis Resources (190+ Countries)**
   - User location detected via IP address
   - Country-specific crisis lines provided
   - Local phone numbers, hours, websites
   - Culturally appropriate resources
   
   **Examples**:
   - United States: 988 Suicide & Crisis Lifeline
   - United Kingdom: Samaritans (116 123)
   - Australia: Lifeline (13 11 14)
   - Canada: 988 Suicide Crisis Helpline

3. **📞 Automated Voice Call (Critical Cases Only)**
   - Direct connection to local crisis line
   - Synthesized voice message with assessment
   - Provides context for human responders
   - Technology: Twilio Voice API

---

## 🌍 Location Detection System

**4-Step Process**:

1. **Get User IP Address**
   - Retrieved from request headers (x-forwarded-for)
   - Anonymous, no personal data stored

2. **IP → Location Conversion**
   - ipapi.co API converts IP to country/city
   - Accurate to country level

3. **Database Lookup**
   - Search crisis_lines table for user's country
   - Retrieve phone, hours, website, email

4. **Share Local Resources**
   - Present country-specific crisis line
   - Include all contact methods
   - Provide hours of operation

---

## 🎭 Prank Detection Logic

### FALSE ALARM Indicators:
- "lol jk", "kidding", "just testing"
- Playful emojis: 😂 🤣 😜
- Contradictions: "I wanna die lol"
- Theatrical language without genuine distress
- Hypothetical: "what if someone..."

### GENUINE CRISIS Indicators:
- Consistent emotional tone throughout
- Detailed description of feelings
- Serious engagement with assessment
- Duration patterns (weeks/months)
- No contradictory signals

**Purpose**: Prevents false alarms while ensuring real emergencies get immediate help.

---

## ⚙️ Technical Stack

### Frontend
- **React.js**: User interface
- **TailwindCSS**: Responsive styling
- **Server-Sent Events**: Real-time message streaming

### Backend
- **Node.js**: Server runtime
- **Next.js API Routes**: RESTful endpoints
- **PostgreSQL**: Relational database (conversations, crisis_lines, distress_signals)

### External APIs
- **OpenAI GPT-4**: Natural language processing & clinical assessment
- **ipapi.co**: IP geolocation
- **Twilio Voice**: Emergency voice calls
- **Resend**: Email notifications

### Database Schema
- **conversations**: Chat history with session tracking
- **messages**: Individual chat messages
- **crisis_lines**: 190+ country crisis resources
- **distress_signals**: Emergency event logging
- **emergency_calls**: Voice call tracking

---

## 🛡️ Core Safety Principles

### ✅ Evidence-Based
Uses peer-reviewed clinical tools validated by thousands of studies (C-SSRS, PHQ-9, GAD-7)

### ✅ Context-Aware
Analyzes full conversation history, not isolated messages. Understands emotional patterns over time.

### ✅ Prank-Resistant
Multi-layer verification filters false alarms to protect crisis responder resources

### ✅ Assessment-Complete
Won't trigger emergency response on incomplete or insufficient information

### ✅ Locally-Appropriate
Connects users to crisis resources in their specific country with local phone numbers

### ✅ Graduated Response
Matches intervention level to assessed risk - not all issues require emergency response

### ✅ Human Oversight
Mental health professionals notified for review and follow-up on all high-risk cases

### ✅ Privacy-Conscious
Anonymous conversations, minimal data collection, secure session management

---

## 🎯 Why This Architecture Works

**Multi-Layer Defense**: No single point of failure. Each layer provides redundancy and verification.

**Clinical Foundation**: Built on FDA-approved and peer-reviewed assessment tools, not arbitrary algorithms.

**False Positive Protection**: Prank detection and verification layers prevent resource waste.

**Global Accessibility**: Works in 190+ countries with locally appropriate resources.

**Human-in-the-Loop**: AI assists, humans decide. All critical cases reviewed by professionals.

**Speed + Accuracy**: Real-time analysis with evidence-based decision making.

---

## 📊 System Flow Summary

1. **User Message** → Natural language input
2. **AI Analysis** → GPT-4 processes context & tone
3. **Clinical Assessment** → C-SSRS, PHQ-9, GAD-7 applied
4. **Verification** → Prank filter + completeness check
5. **Risk Classification** → None to Critical scale
6. **Graduated Response** → Matched intervention
7. **Emergency Action** → If high/critical: email + resources + call
8. **Human Follow-Up** → Professional review & care coordination

---

**Built with**: Research, compassion, and code.

**Mission**: Make mental health support accessible, evidence-based, and safe for teens worldwide.

---

*For complete technical documentation with code examples and clinical sources, see BLUE_TECHNICAL_DOCUMENTATION.md*`;

    const styles = `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.7;
        color: #1f2937;
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      h1 {
        color: #1e40af;
        font-size: 36px;
        margin-top: 40px;
        margin-bottom: 12px;
        border-bottom: 4px solid #3b82f6;
        padding-bottom: 12px;
        page-break-after: avoid;
      }
      h2 {
        color: #2563eb;
        font-size: 28px;
        margin-top: 35px;
        margin-bottom: 15px;
        border-bottom: 3px solid #93c5fd;
        padding-bottom: 10px;
        page-break-after: avoid;
      }
      h3 {
        color: #1e40af;
        font-size: 22px;
        margin-top: 28px;
        margin-bottom: 12px;
        page-break-after: avoid;
      }
      h4 {
        color: #1e3a8a;
        font-size: 18px;
        margin-top: 22px;
        margin-bottom: 10px;
      }
      p {
        margin: 14px 0;
      }
      ul, ol {
        margin: 16px 0;
        padding-left: 35px;
      }
      li {
        margin: 10px 0;
        line-height: 1.8;
      }
      strong {
        color: #1e40af;
        font-weight: 700;
      }
      em {
        color: #4b5563;
        font-style: italic;
      }
      hr {
        border: none;
        border-top: 3px solid #e5e7eb;
        margin: 45px 0;
      }
      code {
        background-color: #f3f4f6;
        padding: 3px 8px;
        border-radius: 4px;
        font-family: 'Courier New', Consolas, monospace;
        font-size: 0.9em;
        color: #dc2626;
      }
      blockquote {
        border-left: 5px solid #3b82f6;
        padding-left: 20px;
        margin: 25px 0;
        color: #4b5563;
        font-style: italic;
        background-color: #f8fafc;
        padding: 18px 22px;
      }
      @media print {
        body {
          max-width: 100%;
        }
        h1, h2, h3, h4 {
          page-break-after: avoid;
        }
      }
    `;

    // Get the origin from the request URL
    const origin = new URL(request.url).origin;
    const integrationUrl = `${origin}/integrations/pdf-generation/markdown-to-pdf`;

    const pdfResponse = await fetch(integrationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        markdown: markdown,
        styles: styles,
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error("PDF generation failed:", pdfResponse.status, errorText);
      throw new Error(
        `PDF generation failed: ${pdfResponse.status} - ${errorText}`,
      );
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Blue_System_Architecture.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return Response.json(
      { error: "Failed to generate PDF", details: error.message },
      { status: 500 },
    );
  }
}
