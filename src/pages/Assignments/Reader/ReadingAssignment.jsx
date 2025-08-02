import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  FormControlLabel,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Divider,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReactMarkdown from "react-markdown";
import LoaderModal from "../../Loader/LoaderModal";
import {
  adaptForUSStudents,
  fetchBookContent,
  transformContent,
  updatePageReadStatus,
} from "../../store/action/students.action";
import { useDispatch, useSelector } from "react-redux";
import "../SideBySideReader.css"; // ✅ Import CSS
import { updateReadingProgress } from "../../store/slice/students.slice";

const LANGUAGES = [
  { value: "en", label: "ENGLISH" },
  { value: "es", label: "SPANISH" },
];

const LEVELS = [
  { value: "A", label: "A", color: "#4CAF50" },
  { value: "B", label: "B", color: "#66BB6A" },
  { value: "C", label: "C", color: "#81C784" },
  { value: "D", label: "D", color: "#A5D6A7" },
  { value: "E", label: "E", color: "#C8E6C9" },
  { value: "F", label: "F", color: "#42A5F5" },
  { value: "G", label: "G", color: "#64B5F6" },
  { value: "H", label: "H", color: "#90CAF9" },
  { value: "I", label: "I", color: "#BBDEFB" },
  { value: "J", label: "J", color: "#E3F2FD" },
  { value: "K", label: "K", color: "#FFA726" },
  { value: "L", label: "L", color: "#FFB74D" },
  { value: "M", label: "M", color: "#FFCC80" },
  { value: "N", label: "N", color: "#FFE0B2" },
  { value: "O", label: "O", color: "#FFF3E0" },
  { value: "P", label: "P", color: "#FF7043" },
  { value: "Q", label: "Q", color: "#F06292" },
  { value: "R", label: "R", color: "#EC407A" },
  { value: "S", label: "S", color: "#AB47BC" },
  { value: "T", label: "T", color: "#8E24AA" },
  { value: "U", label: "U", color: "#7B1FA2" },
  { value: "V", label: "V", color: "#6A1B9A" },
  { value: "W", label: "W", color: "#4A148C" },
  { value: "X", label: "X", color: "#311B92" },
  { value: "Y", label: "Y", color: "#1A237E" },
  { value: "Z", label: "Z", color: "#0D47A1" },
  { value: "Z+", label: "Z+", color: "#B71C1C" }, // Extra simplified
];

const GRADES = Array.from({ length: 12 }, (_, i) => ({
  value: `${i + 1}`,
  label: `Grade ${i + 1}`,
}));

function speak(text, lang) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang === "es" ? "es-ES" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

export default function ReadingAssignment({ selectedAssignment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeData.userData);
  const [pdfPages, setPdfPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [loaderMessages, setLoaderMessages] = useState([]);
  const [error, setError] = useState("");
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [mode, setMode] = useState("level");
  const [rightLang, setRightLang] = useState("en");
  const [rightLevel, setRightLevel] = useState("A");
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [rightContent, setRightContent] = useState("");

  // ✅ Progress Tracking
  const [readPages, setReadPages] = useState(new Set());
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const assignments = useSelector(
    (state) => state.storeData.studentsData.assignments
  );
  console.log("Assignments from Redux:", assignments);

  const currentAssignment = assignments.find(
    (a) => a.assignmentId === selectedAssignment?.assignmentId
  );

  const [pagesCompleted, setPagesCompleted] = useState(
    currentAssignment?.readingProgress?.pagesCompleted || 0
  );
  const [totalPages, setTotalPages] = useState(
    currentAssignment?.readingProgress?.totalPages || 0
  );

  useEffect(() => {
    if (currentAssignment?.readingProgress) {
      const { pagesCompleted, totalPages } = currentAssignment.readingProgress;
      setPagesCompleted(pagesCompleted || 0);
      setTotalPages(totalPages || 0);

      const preReadPages = new Set();
      for (let i = 1; i <= pagesCompleted; i++) preReadPages.add(i);
      setReadPages(preReadPages);
    }
  }, [currentAssignment]);

  useEffect(() => {
    if (selectedAssignment?.readingProgress) {
      const { pagesCompleted } = selectedAssignment.readingProgress;
      setPagesCompleted(pagesCompleted || 0);
      const preReadPages = new Set();
      for (let i = 1; i <= pagesCompleted; i++) preReadPages.add(i);
      setReadPages(preReadPages);
    }
  }, [selectedAssignment]);

  useEffect(() => {
    setScrolledToEnd(false);
    const container = document.querySelector(".dual-panel-content");
    const handleScroll = () => {
      if (container) {
        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollHeight = container.scrollHeight;
        if (scrollPosition >= scrollHeight * 0.6) {
          setScrolledToEnd(true);
        }
      }
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [pageNumber]);

  useEffect(() => {
    if (totalPages === 0) return; // ✅ Avoid running when data not loaded

    let timer;
    setTimeSpent(0);

    timer = setInterval(() => {
      setTimeSpent((prev) => {
        const newTime = prev + 1;

        if (
          newTime >= 30 && // ✅ 30 sec threshold
          !readPages.has(pageNumber) && // ✅ Not already read
          pagesCompleted === pageNumber - 1 // ✅ Sequential
        ) {
          markPageAsRead();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pageNumber, pagesCompleted, readPages, totalPages]); // ✅ reset when page changes

  const markPageAsRead = () => {
    if (readPages.has(pageNumber) || totalPages === 0) return;

    const newCount = Math.min(pagesCompleted + 1, totalPages);

    const reqBody = {
      assignmentId: selectedAssignment?.assignmentId,
      studentId: user?.userId,
      pagesCompleted: newCount,
      totalPages: totalPages,
      isCompleted: newCount === totalPages,
    };

    dispatch(updatePageReadStatus(reqBody));
    dispatch(
      updateReadingProgress({
        assignmentId: selectedAssignment?.assignmentId,
        pagesCompleted: newCount,
        totalPages: totalPages,
        isCompleted: newCount === totalPages,
      })
    );
    // ✅ Update local states
    setPagesCompleted(newCount);
    setReadPages((prev) => new Set(prev.add(pageNumber)));
    setTimeSpent(0); // ✅ Reset timer after successful update
  };

  useEffect(() => {
    const extractBookContent = async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          fetchBookContent(selectedAssignment?.pageId)
        );
        const data = response.payload;

        if (!data.success) {
          setError(data.message || "Failed to load PDF content.");
          return;
        }
        console.log("PDF Content Response:", data);

        setPdfPages(data.pages || []);
        setRightContent(data.pages[0] || "");
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError("Error fetching PDF data.");
      } finally {
        setLoading(false);
      }
    };

    extractBookContent();
  }, [selectedAssignment]);

  const handleTranslate = async (lang, overrideValue) => {
    const reqBody = {
      originalText: pdfPages[pageNumber - 1],
      language: lang === "en" ? "English" : "Spanish",
      ...(mode === "level"
        ? { level: overrideValue || rightLevel }
        : { grade: overrideValue || selectedGrade }),
    };
    setLoaderMessages(["Analyzing content...", "Generating translation..."]);
    setContentLoading(true);

    // Step 1: First API call
    const response1 = await dispatch(transformContent(reqBody));
    const data1 = response1.payload;
    console.log("Response from transformContent:", data1);
    if (data1.success) {
      // Step 2: Second API call for US adaptation
      const reqBody2 = {
        adaptedText: data1.content,
        ...(mode === "level"
          ? { level: overrideValue || rightLevel }
          : { grade: overrideValue || selectedGrade }),
      };
      setLoaderMessages(["Adapting content for US students..."]);
      const response2 = await dispatch(adaptForUSStudents(reqBody2));
      const data2 = response2.payload;
      console.log("Response from adaptForUSStudents:", data2);
      setRightContent(data2.content);
    } else {
      setRightContent("Failed to generate content.");
    }
    setContentLoading(false);
  };

  const handleLanguageChange = (lang) => {
    setRightLang(lang);
    handleTranslate(lang);
  };

  const handleLevelChange = (level) => {
    setRightLevel(level);
    if (mode === "level") handleTranslate(rightLang, level);
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    if (mode === "grade") handleTranslate(rightLang, grade);
  };

  const handleToggleMode = (_, newMode) => {
    if (newMode) setMode(newMode);
  };

  const goToPage = (direction) => {
    const newPage = pageNumber + direction;
    if (newPage < 1 || newPage > pdfPages.length) return;

    setPageNumber(newPage);
    setRightContent(pdfPages[newPage - 1]);
    setScrolledToEnd(false);
    setTimeSpent(0);
  };

  return (
    <div className="dual-reader-root">
      <div className="dual-reader-card">
        <div className="dual-reader-header">
          <Typography className="dual-chapter">
            {selectedAssignment.title}
          </Typography>
          <Typography className="dual-page">
            Progress: {pagesCompleted}/{totalPages}
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
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleToggleMode}
            size="small"
          >
            <ToggleButton value="level">Level</ToggleButton>
            <ToggleButton value="grade">Grade</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {loading ? (
          <LoaderModal open={loading} messages={["Fetching Assignment..."]} />
        ) : (
          <div className="dual-reader-body">
            {showLeftPanel && (
              <div className="dual-panel dual-panel-left">
                <div className="dual-panel-content">
                  <div
                    className="book-html-content"
                    dangerouslySetInnerHTML={{
                      __html: pdfPages[pageNumber - 1],
                    }}
                  />
                </div>
              </div>
            )}
            <Divider orientation="vertical" flexItem className="dual-divider" />
            <div
              className={`dual-panel dual-panel-right ${
                !showLeftPanel ? "dual-panel-full" : ""
              }`}
            >
              <div className="dual-panel-controls">
                <Select
                  value={rightLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  variant="standard"
                >
                  {LANGUAGES.map((l) => (
                    <MenuItem key={l.value} value={l.value}>
                      {l.label}
                    </MenuItem>
                  ))}
                </Select>

                {mode === "level" ? (
                  <Select
                    value={rightLevel}
                    onChange={(e) => handleLevelChange(e.target.value)}
                    variant="standard"
                    sx={{ ml: 2 }}
                  >
                    {LEVELS.map((l) => (
                      <MenuItem key={l.value} value={l.value}>
                        {l.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Select
                    value={selectedGrade}
                    onChange={(e) => handleGradeChange(e.target.value)}
                    variant="standard"
                    sx={{ ml: 2 }}
                  >
                    {GRADES.map((g) => (
                      <MenuItem key={g.value} value={g.value}>
                        {g.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                <Tooltip title="Listen">
                  <IconButton onClick={() => speak(rightContent, rightLang)}>
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
              </div>

              <div className="dual-panel-content">
                <div
                  className="book-html-content"
                  dangerouslySetInnerHTML={{ __html: rightContent }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="pagination-container">
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
        </div>
      </div>
      <LoaderModal open={contentLoading} messages={loaderMessages} />
    </div>
  );
}
