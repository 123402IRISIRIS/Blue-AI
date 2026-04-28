import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { materialType } = await request.json();

    // Read the markdown files from the /apps directory
    const rootDir = path.join(process.cwd(), "..");

    let markdown = "";
    let filename = "Blue_Presentation_Materials.pdf";

    // Build content based on material type
    if (materialType === "script") {
      const scriptPath = path.join(
        rootDir,
        "TECHNOVATION_PRESENTATION_SCRIPT.md",
      );
      markdown = fs.readFileSync(scriptPath, "utf-8");
      filename = "Blue_Presentation_Script.pdf";
    } else if (materialType === "qa") {
      const qaPath = path.join(rootDir, "JUDGE_QA_PREP.md");
      markdown = fs.readFileSync(qaPath, "utf-8");
      filename = "Blue_Judge_QA_Prep.pdf";
    } else if (materialType === "checklist") {
      const checklistPath = path.join(rootDir, "PRESENTATION_DAY_CHECKLIST.md");
      markdown = fs.readFileSync(checklistPath, "utf-8");
      filename = "Blue_Presentation_Checklist.pdf";
    } else if (materialType === "all") {
      // Combine all materials
      const scriptPath = path.join(
        rootDir,
        "TECHNOVATION_PRESENTATION_SCRIPT.md",
      );
      const qaPath = path.join(rootDir, "JUDGE_QA_PREP.md");
      const checklistPath = path.join(rootDir, "PRESENTATION_DAY_CHECKLIST.md");

      const script = fs.readFileSync(scriptPath, "utf-8");
      const qa = fs.readFileSync(qaPath, "utf-8");
      const checklist = fs.readFileSync(checklistPath, "utf-8");

      markdown = `# BLUE PRESENTATION PACKAGE
## Complete Technovation Competition Materials

**Created by**: Iris (Age 11)  
**Project**: Blue - Safe AI Companion for Teen Mental Health  
**Competition**: Technovation Girls 2025/2026

---

${script}

---

# JUDGE Q&A PREPARATION

---

${qa}

---

# PRESENTATION DAY CHECKLIST

---

${checklist}`;
      filename = "Blue_Complete_Presentation_Package.pdf";
    } else {
      return Response.json({ error: "Invalid material type" }, { status: 400 });
    }

    // Custom CSS for beautiful PDFs
    const styles = `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #1f2937;
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      h1 {
        color: #1e40af;
        font-size: 32px;
        margin-top: 40px;
        margin-bottom: 20px;
        border-bottom: 4px solid #3b82f6;
        padding-bottom: 12px;
        page-break-after: avoid;
      }
      h2 {
        color: #2563eb;
        font-size: 24px;
        margin-top: 30px;
        margin-bottom: 15px;
        border-bottom: 2px solid #93c5fd;
        padding-bottom: 10px;
        page-break-after: avoid;
      }
      h3 {
        color: #1e40af;
        font-size: 20px;
        margin-top: 25px;
        margin-bottom: 12px;
        page-break-after: avoid;
      }
      h4 {
        color: #1e3a8a;
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      p {
        margin: 12px 0;
      }
      ul, ol {
        margin: 15px 0;
        padding-left: 35px;
      }
      li {
        margin: 8px 0;
        line-height: 1.8;
      }
      code {
        background-color: #f3f4f6;
        padding: 3px 8px;
        border-radius: 4px;
        font-family: 'Courier New', Consolas, monospace;
        font-size: 0.9em;
        color: #dc2626;
      }
      pre {
        background-color: #1e293b;
        color: #e2e8f0;
        padding: 20px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 20px 0;
      }
      pre code {
        background-color: transparent;
        color: inherit;
        padding: 0;
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
        margin: 40px 0;
      }
      a {
        color: #2563eb;
        text-decoration: none;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
      }
      th, td {
        border: 1px solid #d1d5db;
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #f3f4f6;
        font-weight: 700;
        color: #1e40af;
      }
      blockquote {
        border-left: 5px solid #3b82f6;
        padding-left: 20px;
        margin: 20px 0;
        color: #4b5563;
        font-style: italic;
        background-color: #f8fafc;
        padding: 15px 20px;
      }
      @media print {
        body {
          max-width: 100%;
        }
        h1, h2, h3 {
          page-break-after: avoid;
        }
      }
    `;

    // Get the origin from the request URL for absolute URL construction
    const origin = new URL(request.url).origin;
    const integrationUrl = `${origin}/integrations/pdf-generation/markdown-to-pdf`;

    // Generate PDF using the markdown-to-pdf integration
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
        "Content-Disposition": `attachment; filename="${filename}"`,
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
