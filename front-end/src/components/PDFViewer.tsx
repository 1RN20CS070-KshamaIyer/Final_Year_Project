import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PdfViewer = ({ s3Url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={s3Url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            pageNumber={index + 1}
            key={`page_${index + 1}`}
            // Optional: Set additional options like scale, width, height
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
