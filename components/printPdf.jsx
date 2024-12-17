"use client";

import { convertToPdf } from "../utils/pdfConverter";

const PrintPdf = ({ id }) => {
  return (
    <button className="btn btn-primary" onClick={(e) => convertToPdf(id)}>
      Download
    </button>
  );
};

export default PrintPdf;
