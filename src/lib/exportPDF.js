export async function exportToPDF(elementId, filename = "resume") {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[exportPDF] Element #${elementId} not found`);
    return;
  }

  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    // Clone the element and apply only inline styles
    const clone = element.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "794px";
    clone.style.backgroundColor = "#ffffff";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
      onclone: (doc) => {
        // Remove all stylesheets to avoid lab() color parsing
        const styles = doc.querySelectorAll(
          'link[rel="stylesheet"], style'
        );
        styles.forEach((s) => s.remove());
      },
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margin = 10;
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", margin, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename.replace(/\s+/g, "_")}.pdf`);
  } catch (err) {
    console.error("[exportPDF] Export failed:", err);
  }
}