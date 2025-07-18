import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const PdfReader = ({ title, storagePath, onBack }) => {
  const [pdfPages, setPdfPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch extracted text from backend API
  useEffect(() => {
    const fetchExtractedPdf = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl = `http://localhost:5000/pdf/extract?storagePath=${encodeURIComponent(
          storagePath
        )}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.success) {
          setError(data.message || "Failed to extract PDF content.");
          return;
        }

        setPdfPages(data.pages || []);
        setOriginalText(data.pages[0] || "No content found.");
        setModifiedText(data.pages[0] || "No content found.");
      } catch (err) {
        console.error("Error fetching PDF content:", err);
        setError("Unable to load PDF content.");
      } finally {
        setLoading(false);
      }
    };

    fetchExtractedPdf();
  }, [storagePath]);

  // ✅ Navigate between pages
  const goToPage = (direction) => {
    const newPage = pageNumber + direction;
    if (newPage < 1 || newPage > pdfPages.length) return;
    setPageNumber(newPage);
    setOriginalText(pdfPages[newPage - 1]);
    setModifiedText(pdfPages[newPage - 1]);
  };

  // ✅ Modify content
  const handleTranslate = (lang) => {
    setModifiedText(`[${lang.toUpperCase()} VERSION]\n${originalText}`);
  };

  const handleLevelChange = (level) => {
    setModifiedText(`[SIMPLIFIED LEVEL ${level}]\n${originalText}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>← Back</button>
      <h2>{title}</h2>

      {loading && <p>Loading PDF content...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ flex: 1, border: "1px solid #ccc", padding: "1rem", minHeight: "300px", overflowY: "auto" }}>
              <h3>ENGLISH (Original)</h3>
              <p style={{ whiteSpace: "pre-line" }}>{originalText}</p>
            </div>
            <div style={{ flex: 1, border: "1px solid #ccc", padding: "1rem", minHeight: "300px", overflowY: "auto" }}>
              <h3>Modified</h3>
              <p style={{ whiteSpace: "pre-line" }}>{modifiedText}</p>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button onClick={() => goToPage(-1)} disabled={pageNumber <= 1}>
              Previous
            </button>
            <span style={{ margin: "0 1rem" }}>
              Page {pageNumber} of {pdfPages.length}
            </span>
            <button onClick={() => goToPage(1)} disabled={pageNumber >= pdfPages.length}>
              Next
            </button>
          </div>

          {/* Controls */}
          <div style={{ marginTop: "2rem" }}>
            <h4>🔤 Change Language:</h4>
            <button onClick={() => handleTranslate("English")}>English</button>
            <button onClick={() => handleTranslate("Spanish")}>Spanish</button>
            <button onClick={() => handleTranslate("Hindi")}>Hindi</button>

            <h4 style={{ marginTop: "1rem" }}>📘 Change Reading Level:</h4>
            <button onClick={() => handleLevelChange("A")}>A</button>
            <button onClick={() => handleLevelChange("B")}>B</button>
            <button onClick={() => handleLevelChange("C")}>C</button>
          </div>
        </>
      )}
    </div>
  );
};

PdfReader.propTypes = {
  title: PropTypes.string.isRequired,
  storagePath: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PdfReader;
