function fmt(dateStr) {
  if (!dateStr) return "";
  const [y, m] = dateStr.split("-");
  return new Date(y, m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ClassicTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#111827", fontSize: "13px", fontFamily: "'Times New Roman', Times, serif", padding: "40px" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: "2px solid #111827", paddingBottom: "16px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "8px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", fontSize: "12px", color: "#4b5563" }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>
            Objective
          </h2>
          <p style={{ color: "#374151" }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "1px solid #9ca3af", paddingBottom: "4px", marginBottom: "10px" }}>
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span>{exp.company}</span>
                <span style={{ fontSize: "12px", fontWeight: "normal", color: "#6b7280" }}>
                  {fmt(exp.startDate)} – {exp.current ? "Present" : fmt(exp.endDate)}
                </span>
              </div>
              <div style={{ fontStyle: "italic", color: "#4b5563", fontSize: "12px", marginBottom: "4px" }}>
                {exp.role}
              </div>
              {exp.description && (
                <p style={{ color: "#374151", fontSize: "12px", whiteSpace: "pre-line" }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "1px solid #9ca3af", paddingBottom: "4px", marginBottom: "10px" }}>
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <p style={{ fontWeight: "bold" }}>{edu.institution}</p>
                <p style={{ fontStyle: "italic", color: "#4b5563", fontSize: "12px" }}>
                  {edu.degree}{edu.field && `, ${edu.field}`}
                </p>
                {edu.gpa && <p style={{ color: "#6b7280", fontSize: "12px" }}>GPA: {edu.gpa}</p>}
              </div>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>
                {fmt(edu.startDate)} – {fmt(edu.endDate)}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "1px solid #9ca3af", paddingBottom: "4px", marginBottom: "10px" }}>
            Skills
          </h2>
          {skills.technical.length > 0 && (
            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Technical:</strong> {skills.technical.join(", ")}
            </p>
          )}
          {skills.soft.length > 0 && (
            <p style={{ fontSize: "12px" }}>
              <strong>Soft Skills:</strong> {skills.soft.join(", ")}
            </p>
          )}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "1px solid #9ca3af", paddingBottom: "4px", marginBottom: "10px" }}>
            Projects
          </h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p style={{ fontWeight: "bold" }}>
                {p.title}{" "}
                {p.techStack && (
                  <span style={{ fontWeight: "normal", fontStyle: "italic", color: "#6b7280", fontSize: "12px" }}>
                    ({p.techStack})
                  </span>
                )}
              </p>
              {p.description && (
                <p style={{ fontSize: "12px", color: "#374151" }}>{p.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "1px solid #9ca3af", paddingBottom: "4px", marginBottom: "10px" }}>
            Certifications
          </h2>
          {certifications.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <div>
                <span style={{ fontWeight: "600" }}>{c.name}</span>
                {c.issuer && (
                  <span style={{ color: "#6b7280", fontSize: "12px", marginLeft: "8px" }}>— {c.issuer}</span>
                )}
              </div>
              {c.date && <span style={{ color: "#9ca3af", fontSize: "12px" }}>{fmt(c.date)}</span>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}