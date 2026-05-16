import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const resumeData = await req.json();

    const resumeText = `
Name: ${resumeData.personalInfo?.fullName || ""}
Summary: ${resumeData.personalInfo?.summary || ""}
Skills: ${[...(resumeData.skills?.technical || []), ...(resumeData.skills?.soft || [])].join(", ") || "None"}
    `;

    const prompt = `Analyze this resume and return ONLY this JSON, nothing else:
{
  "summary": "one suggestion here",
  "experience": "one suggestion here",
  "education": "one suggestion here",
  "skills": "one suggestion here",
  "projects": "one suggestion here",
  "overall": "ATS score and tip here"
}

Resume: ${resumeText}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    
    
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    const suggestions = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ success: true, suggestions });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}