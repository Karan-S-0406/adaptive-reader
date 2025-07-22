import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Divider,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import {
  getMathExplanation,
  getSignedImageUrl,
} from "../store/action/students.action";
import "./SideBySideReader.css"; // ✅ Import CSS

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

export default function MathAssignment(storagePath) {
  console.log("Selected Assignment in Math:", storagePath);

  const dispatch = useDispatch();
  const [mathExplanation, setMathExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("level"); // level or grade
  const [rightLang, setRightLang] = useState("en");
  const [rightLevel, setRightLevel] = useState("A");
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [imageUrl, setImageUrl] = useState("");

  // ✅ Convert pdfUrl (storage path) to downloadable link
  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        const response = await dispatch(getSignedImageUrl(storagePath));
        console.log("Response from storagePath:", response);
        setImageUrl(response?.payload?.signedUrl || "");
      } catch (error) {
        console.error("Error fetching download URL:", error);
      }
    };

    if (storagePath) {
      getSignedUrl();
    }
  }, [storagePath]);

  // ✅ Fetch explanation when page loads or dropdowns change
  const fetchExplanation = async (lang, overrideValue) => {
    console.log("Fetching explanation for:", storagePath);
    if (!storagePath) return; // Ensure storagePath is available
    try {
      setLoading(true);
      const reqBody = {
        storagePath:
          typeof storagePath === "object"
            ? storagePath.storagePath
            : storagePath,
        language: lang === "en" ? "English" : "Spanish",
        ...(mode === "level"
          ? { level: overrideValue || rightLevel }
          : { grade: overrideValue || selectedGrade }),
      };

      const response = await dispatch(getMathExplanation(reqBody));
      const data = response.payload;
      setLoading(false);
      if (data.success) {
        setMathExplanation(data.explanation);
      } else {
        setMathExplanation("Failed to generate explanation.");
      }
    } catch (err) {
      setLoading(false);
      setMathExplanation("Error generating explanation.");
    }
  };

  useEffect(() => {
    fetchExplanation(rightLang);
  }, [storagePath]);

  const handleLanguageChange = (lang) => {
    setRightLang(lang);
    fetchExplanation(lang);
  };

  const handleLevelChange = (level) => {
    setRightLevel(level);
    if (mode === "level") fetchExplanation(rightLang, level);
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    if (mode === "grade") fetchExplanation(rightLang, grade);
  };

  const handleToggleMode = (_, newMode) => {
    if (newMode) setMode(newMode);
  };

  return (
    <Box>
      {/* Header Controls */}
      <Box className="math-header">
        <Typography className="title">Explanation & Solution</Typography>

        <Box className="math-header-controls">
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
            >
              {GRADES.map((g) => (
                <MenuItem key={g.value} value={g.value}>
                  {g.label}
                </MenuItem>
              ))}
            </Select>
          )}

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleToggleMode}
            size="small"
          >
            <ToggleButton value="level">Level</ToggleButton>
            <ToggleButton value="grade">Grade</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Main Content */}
      <Box display="flex">
        {/* Left: Image */}
        <Box flex={1} p={2} sx={{ borderRight: "1px solid #ccc" }}>
          <img
            src={imageUrl}
            alt="Math Problem"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>

        {/* Right: Explanation */}
        <Box flex={1} p={2}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <ReactMarkdown>{mathExplanation}</ReactMarkdown>
          )}
        </Box>
      </Box>
    </Box>
  );
}
