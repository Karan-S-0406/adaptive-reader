import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PropTypes from 'prop-types';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from "../../../../../../firebase"; // Adjust this path if needed

// Setup worker correctly for Vite or any ES module-based bundler
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const PdfReader = ({ title, storagePath, onBack }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Fetch signed download URL from Firebase Storage
  useEffect(() => {
    const fetchPdfUrl = async () => {
      setLoading(true);
      try {
        console.log('Fetching PDF URL for:', storagePath);
        const fileRef = ref(storage, storagePath);
        const url = await getDownloadURL(fileRef);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF URL:', error);
        setLoadError('Access denied or file not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfUrl();
  }, [storagePath]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <button onClick={onBack} style={{ marginBottom: '1rem' }}>← Back</button>
      <h2>{title}</h2>

      {loading && <p>Fetching PDF...</p>}
      {loadError && <p style={{ color: 'red' }}>{loadError}</p>}

      {!loading && pdfUrl && (
        <>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p>Loading PDF document...</p>}
            error={<p style={{ color: 'red' }}>Failed to load PDF file.</p>}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Previous</button>
            <span style={{ margin: '0 1rem' }}>
              Page {pageNumber} of {numPages}
            </span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

PdfReader.propTypes = {
  title: PropTypes.string.isRequired,
  storagePath: PropTypes.string.isRequired, // e.g., "assignments/file.pdf"
  onBack: PropTypes.func.isRequired,
};

export default PdfReader;
