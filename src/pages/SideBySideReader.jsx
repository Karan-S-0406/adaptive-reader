import React, { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Paper,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import "./SideBySideReader.css";
import {
  fetchPdfContent,
  transformContent,
  updatePageReadStatus,
} from "./store/action/students.action";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "./Loader/LoaderModal";
import ReactMarkdown from "react-markdown";

const LANGUAGES = [
  { value: "en", label: "ENGLISH" },
  { value: "es", label: "SPANISH" },
];

const LEVELS = [
  { value: "A", label: "A", color: "#4CAF50" }, // Green
  { value: "B", label: "B", color: "#66BB6A" },
  { value: "C", label: "C", color: "#81C784" },
  { value: "D", label: "D", color: "#A5D6A7" },
  { value: "E", label: "E", color: "#C8E6C9" },
  { value: "F", label: "F", color: "#42A5F5" }, // Blue
  { value: "G", label: "G", color: "#64B5F6" },
  { value: "H", label: "H", color: "#90CAF9" },
  { value: "I", label: "I", color: "#BBDEFB" },
  { value: "J", label: "J", color: "#E3F2FD" },
  { value: "K", label: "K", color: "#FFA726" }, // Orange
  { value: "L", label: "L", color: "#FFB74D" },
  { value: "M", label: "M", color: "#FFCC80" },
  { value: "N", label: "N", color: "#FFE0B2" },
  { value: "O", label: "O", color: "#FFF3E0" },
  { value: "P", label: "P", color: "#FF7043" }, // Deep Orange
  { value: "Q", label: "Q", color: "#F06292" }, // Pink
  { value: "R", label: "R", color: "#EC407A" },
  { value: "S", label: "S", color: "#AB47BC" }, // Purple
  { value: "T", label: "T", color: "#8E24AA" },
  { value: "U", label: "U", color: "#7B1FA2" },
  { value: "V", label: "V", color: "#6A1B9A" },
  { value: "W", label: "W", color: "#4A148C" },
  { value: "X", label: "X", color: "#311B92" },
  { value: "Y", label: "Y", color: "#1A237E" },
  { value: "Z", label: "Z", color: "#0D47A1" },
  { value: "Z+", label: "Z+", color: "#B71C1C" }, // Deep Red
];

function speak(text, lang) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang === "es" ? "es-ES" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function ReaderPanel({ title, content, side }) {
  return (
    <Box className={`dual-panel dual-panel-${side}`}>
      <Box className="dual-panel-content">
        <Typography
          sx={{ fontSize: 16, color: "#222", whiteSpace: "pre-line" }}
        >
          {content || "No content available."}
        </Typography>
      </Box>
    </Box>
  );
}

export default function SideBySideReader({
  selectedAssignment,
  storagePath,
  title,
  onBack,
}) {
  const dispatch = useDispatch();
  const [pdfPages, setPdfPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [loaderMessages, setLoaderMessages] = useState([]);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [showLeftPanel, setShowLeftPanel] = useState(true); // ✅ Toggle state
  const user = useSelector((state) => state.storeData.userData);

  // Right Panel Controls
  const [rightLang, setRightLang] = useState("en");
  const [rightLevel, setRightLevel] = useState("A");
  const [rightContent, setRightContent] = useState("");

  // To track reading progress
  const [readPages, setReadPages] = useState(new Set());
  const [pagesCompleted, setPagesCompleted] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0); // seconds on current page
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  // Detect scroll to end
  useEffect(() => {
    setScrolledToEnd(false);
    const container = document.querySelector(".dual-panel-content");
    const handleScroll = () => {
      if (container) {
        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollHeight = container.scrollHeight;
        if (scrollPosition >= scrollHeight * 0.9) {
          setScrolledToEnd(true);
        }
      }
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [pageNumber]);

  // Track time spent
  useEffect(() => {
    setTimeSpent(0);
    const interval = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [pageNumber]);

  useEffect(() => {
    const fetchExtractedPdf = async () => {
      try {
        setLoading(true);
        setLoaderMessages(["Fetching Assignment...", "Finalizing reader..."]);
        // Remove the base URL part
        const normalizedPath = storagePath.replace(
          "https://storage.googleapis.com/personalized-reader.firebasestorage.app/",
          ""
        );
        const response = await dispatch(fetchPdfContent(normalizedPath));
        const data = response.payload;

        if (!data.success) {
          setError(data.message || "Failed to load PDF content.");
          return;
        }

        setPdfPages(data.pages || []);
        setRightContent(data.pages[0] || "");
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError("Error fetching PDF data.");
        console.error(err);
      } finally {
        setLoading(false);
        setLoaderMessages([]);
      }
    };

    fetchExtractedPdf();
  }, [storagePath]);

  const goToPage = (direction) => {
    const newPage = pageNumber + direction;
    if (newPage < 1 || newPage > pdfPages.length) return;

    // ✅ Before changing the page, check if current page qualifies as "read"
    if (
      timeSpent >= 30 &&
      scrolledToEnd &&
      !readPages.has(pageNumber) &&
      pagesCompleted === pageNumber - 1 // ✅ Ensure sequential reading
    ) {
      setReadPages((prev) => new Set(prev.add(pageNumber)));

      setPagesCompleted((prev) => {
        const newCount = prev + 1 > totalPages ? totalPages : prev + 1;

        // ✅ API call to update progress only if sequential
        const reqBody = {
          assignmentId: selectedAssignment?.assignmentId,
          studentId: user?.userId,
          pagesCompleted: newCount,
          totalPages,
          isCompleted: newCount === totalPages,
        };
        dispatch(updatePageReadStatus(reqBody));

        return newCount;
      });
    }

    // ✅ Now change the page
    setPageNumber(newPage);
    setRightContent(pdfPages[newPage - 1]);
    setScrolledToEnd(false); // Reset scroll status for new page
    setTimeSpent(0); // Reset timer
  };

  const handleTranslate = async (lang, level) => {
    // ✅ If language is English and level is A → show original content
    if (lang === "en" && level === "A") {
      setRightContent(pdfPages[pageNumber - 1]); // Original text
      return;
    }

    // setLoaderMessages([
    //   `Transforming content to ${
    //     lang === "en" ? "English" : "Spanish"
    //   } and level ${level}...`,
    // ]);
    setContentLoading(true);
    const reqBody = {
      originalText: pdfPages[pageNumber - 1],
      language: lang === "en" ? "English" : "Spanish",
      level: level, // Pass proper level name
    };

    const response = await dispatch(transformContent(reqBody));
    const data = response.payload;
    setContentLoading(false);
    if (data.success) {
      setRightContent(data?.content);
    } else {
      alert("Failed to transform content");
    }
  };

  const handleLanguageChange = (lang) => {
    setRightLang(lang);
    handleTranslate(lang, rightLevel);
  };

  const handleLevelChange = (level) => {
    setRightLevel(level);
    handleTranslate(rightLang, level);
  };

  return (
    <div className="dual-reader-root">
      <Paper elevation={3} className="dual-reader-card">
        {/* Header */}
        <Box className="dual-reader-header">
          <Typography className="dual-chapter" variant="subtitle1">
            <span role="img" aria-label="book">
              📖
            </span>{" "}
            {title}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={!showLeftPanel}
                onChange={() => setShowLeftPanel(!showLeftPanel)}
              />
            }
            label="Hide Left Panel"
          />
        </Box>

        {loading ? (
          <LoaderModal open={loading} messages={loaderMessages} />
        ) : error ? (
          <p style={{ padding: "1rem", color: "red" }}>{error}</p>
        ) : (
          <>
            <Box className="dual-reader-body">
              {/* Left Panel - Original */}
              {showLeftPanel && (
                <ReaderPanel content={pdfPages[pageNumber - 1]} side="left" />
              )}

              <Divider
                orientation="vertical"
                flexItem
                className="dual-divider"
              />

              {/* Right Panel */}
              <Box
                className="dual-panel dual-panel-right"
                // sx={{
                //   flex: showLeftPanel ? "0 0 50%" : "0 0 100%", // ✅ Full width when left panel hidden
                //   width: showLeftPanel ? "40vw" : "100%", // ✅ Override width
                //   maxWidth: showLeftPanel ? "520px" : "100%", // ✅ Remove restriction
                //   transition: "all 0.3s ease",
                // }}
              >
                <Box className="dual-panel-controls">
                  {/* Language */}
                  <Select
                    value={rightLang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    variant="standard"
                    disabled={contentLoading} // ✅ Disable when loading
                    className="dual-select"
                  >
                    {LANGUAGES.map((l) => (
                      <MenuItem key={l.value} value={l.value}>
                        {l.label}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Level */}
                  <Select
                    value={rightLevel}
                    onChange={(e) => handleLevelChange(e.target.value)}
                    variant="standard"
                    className="dual-select"
                    disabled={contentLoading} // ✅ Disable when loading
                    sx={{
                      ml: 2,
                      fontWeight: 600,
                      color: LEVELS.find((l) => l.value === rightLevel)?.color,
                    }}
                  >
                    {LEVELS.map((l) => (
                      <MenuItem key={l.value} value={l.value}>
                        <span
                          style={{
                            display: "inline-block",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: l.color,
                            marginRight: 8,
                            verticalAlign: "middle",
                          }}
                        />
                        {l.label}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Audio Controls */}
                  <Tooltip title="Listen">
                    <IconButton
                      sx={{ ml: 2 }}
                      onClick={() => speak(rightContent, rightLang)}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={() => window.speechSynthesis.pause()}>
                    <PauseIcon />
                  </IconButton>
                  <IconButton onClick={() => window.speechSynthesis.resume()}>
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton onClick={() => window.speechSynthesis.cancel()}>
                    <StopIcon />
                  </IconButton>
                </Box>

                <Box className="dual-panel-content">
                  {contentLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%", // Full height of the content area
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <ReactMarkdown>{rightContent}</ReactMarkdown>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Navigation */}
            <Box className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => goToPage(-1)}
                disabled={pageNumber <= 1}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pageNumber} of {totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() => goToPage(1)}
                disabled={pageNumber >= pdfPages.length}
              >
                Next
              </button>
            </Box>
          </>
        )}
      </Paper>
    </div>
  );
}
