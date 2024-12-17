import html2pdf from "html2pdf.js";

export const convertToPdf = (id) => {
  try {
    let element = document.getElementById(id);
    print(element);
    let opt = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  } catch (error) {
    console.log(error);
  }
};
