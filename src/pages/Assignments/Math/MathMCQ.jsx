import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Fade,
  Paper,
  Tooltip,
  Divider,
  Modal,
} from "@mui/material";
import confetti from "canvas-confetti";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  generateMathMCQ,
  getMCQExplanation, // Keep this import as it's now a fallback
} from "../../store/action/students.action";
import ReactMarkdown from "react-markdown";
import "./MathMCQ.css";
import { useDispatch, useSelector } from "react-redux";

export default function MathMCQ({ storagePath }) {
  const dispatch = useDispatch();
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [displayExplanation, setDisplayExplanation] = useState("");
  const [feedbackEmoji, setFeedbackEmoji] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const grade = useSelector((state) => state.storeData.userData?.grade);

  const correctEmojis = ["🎉", "🥳", "🌟", "👏", "🎯", "🏆", "💯"];
  const wrongEmojis = ["😓", "❌", "😢", "🙁", "🫤"];

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00C853", "#2962FF", "#FFD600"],
    });
  };

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setIsCorrect(null);
    setSelectedOption(null);
    setShowExplanation(false);
    setDisplayExplanation("");
    setFeedbackEmoji("");
    setQuestionData(null);
    setWrongAttempts(0);
    setShowHelpModal(false);

    let actualStoragePath = storagePath;
    if (
      typeof storagePath === "object" &&
      storagePath !== null &&
      storagePath.storagePath
    ) {
      actualStoragePath = storagePath.storagePath;
    }

    if (!actualStoragePath || typeof actualStoragePath !== "string") {
      console.error(
        "Invalid storagePath provided. Cannot fetch MCQ from image."
      );
      setLoading(false);
      setFeedbackEmoji(
        "Error: Image path is invalid. Please provide a valid assignment."
      );
      return;
    }

    try {
      const res = await dispatch(
        generateMathMCQ({ grade: grade, storagePath: actualStoragePath })
      );
      console.log("Fetched question data:", res);
      if (res?.payload?.success && res.payload.mcq) {
        setQuestionData(res.payload.mcq);
      } else {
        setFeedbackEmoji(
          res?.payload?.message ||
            "Could not generate math question. Please try again."
        );
        console.error("Failed to load MCQ:", res);
      }
    } catch (err) {
      console.error("Failed to fetch MCQ:", err);
      setFeedbackEmoji("Error fetching question. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, grade, storagePath]);

  const checkAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption === questionData.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setFeedbackEmoji(
        correctEmojis[Math.floor(Math.random() * correctEmojis.length)]
      );
      launchConfetti();
      setWrongAttempts(0); // reset on correct answer
    } else {
      setFeedbackEmoji(
        wrongEmojis[Math.floor(Math.random() * wrongEmojis.length)]
      );
      setWrongAttempts((prev) => {
        const updated = prev + 1;
        if (updated >= 2) {
          setShowHelpModal(true);
        }
        return updated;
      });
    }
  };

  const handleHelpModalClose = () => {
    setShowHelpModal(false);
  };

  const fetchExplanation = async () => {
    if (!questionData) {
      console.warn("No question data available to fetch/show explanation.");
      return;
    }

    // 1. Check if explanation is already in questionData
    if (questionData.explanation) {
      setDisplayExplanation(questionData.explanation);
      setShowExplanation(true);
      setWrongAttempts(0); // Reset attempts since help was given
      return; // Exit as explanation is now displayed
    }

    // 2. If not pre-loaded, fetch it via API
    try {
      setExplanationLoading(true);
      const res = await dispatch(
        getMCQExplanation({
          question: questionData.question,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
        })
      );
      console.log("Explanation response:", res);
      if (res?.payload?.success) {
        setDisplayExplanation(res.payload.explanation);
        setShowExplanation(true);
        setWrongAttempts(0); // Reset attempts after fetching and showing explanation
      } else {
        setDisplayExplanation("Failed to load explanation.");
        setShowExplanation(true);
        console.error("Failed to get explanation via API:", res);
      }
    } catch (err) {
      console.error("Error fetching explanation via API:", err);
      setDisplayExplanation("Error loading explanation.");
      setShowExplanation(true);
    } finally {
      setExplanationLoading(false);
    }
  };

  const handleHelpModalConfirm = () => {
    setShowHelpModal(false); // Close modal
    fetchExplanation(); // This will now intelligently show/fetch the explanation
  };

  useEffect(() => {
    if (storagePath && grade !== undefined) {
      fetchQuestion();
    }
  }, [fetchQuestion, storagePath, grade]);

  if (loading || grade === undefined) {
    return (
      <Box className="math-quiz-container">
        <Paper className="math-quiz-box" elevation={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {grade === undefined
                ? "Loading student data..."
                : "Fetching your Math Assignment..."}
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (!questionData) {
    return (
      <Box className="error-state" sx={{ margin: "20px" }}>
        <Typography color="error">
          {feedbackEmoji || "Could not load math question."}
        </Typography>
        <Button variant="contained" onClick={fetchQuestion} sx={{ mt: 2 }}>
          Retry Question
        </Button>
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box className="math-quiz-container">
        <Paper className="math-quiz-box" elevation={4}>
          <Box className="quiz-header">
            <Typography variant="h6">
              Grade {grade} - Math Assignment
            </Typography>
            <Tooltip title="Get explanation for this question">
              <IconButton
                onClick={fetchExplanation} // <--- This now calls the intelligent function
                disabled={
                  explanationLoading || showExplanation || !questionData
                } // Disable if loading or already showing
              >
                {explanationLoading ? (
                  <CircularProgress size={24} />
                ) : showExplanation ? (
                  <HelpOutlineIcon color="success" /> // Indicate explanation is visible
                ) : (
                  <HelpOutlineIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Divider sx={{ marginBottom: "10px" }} />

          <Typography variant="h5" className="question-text">
            {questionData?.question}
          </Typography>

          <Box className="options-grid">
            {Object.entries(questionData.options).map(([key, value]) => (
              <Button
                key={key}
                className={`option-btn ${
                  selectedOption === key ? "selected" : ""
                } ${
                  isCorrect !== null && key === questionData.correctAnswer
                    ? "correct-answer-highlight"
                    : ""
                }
                ${
                  isCorrect !== null &&
                  selectedOption === key &&
                  selectedOption !== questionData.correctAnswer
                    ? "wrong-answer-highlight"
                    : ""
                }
                `}
                onClick={() => {
                  setSelectedOption(key);
                  setIsCorrect(null);
                  setFeedbackEmoji("");
                  setShowExplanation(false); // Hide explanation on new option selection
                  setDisplayExplanation(""); // Clear explanation text
                }}
              >
                <strong>{key}.</strong> {value}
              </Button>
            ))}
          </Box>

          <Box className="button-group">
            <Button variant="contained" color="primary" onClick={checkAnswer}>
              Check Answer
            </Button>
          </Box>

          {isCorrect !== null && (
            <Typography
              className={`result-text ${isCorrect ? "correct" : "wrong"}`}
            >
              {feedbackEmoji} {isCorrect ? "Correct!" : "Oops! Try again."}
            </Typography>
          )}

          {explanationLoading && (
            <Box mt={2} display="flex" justifyContent="center">
              <CircularProgress size={24} />
            </Box>
          )}

          {showExplanation && ( // No need for explanationLoading check here directly
            <Fade in={showExplanation}>
              <Paper className="explanation-box">
                <Typography variant="subtitle1" fontWeight={600}>
                  Why this is the right answer:
                </Typography>
                <ReactMarkdown>{displayExplanation}</ReactMarkdown>
              </Paper>
            </Fade>
          )}
        </Paper>
        <Modal
          open={showHelpModal}
          onClose={handleHelpModalClose}
          closeAfterTransition
          BackdropProps={{ timeout: 400 }}
        >
          <Fade in={showHelpModal}>
            <Box className="help-modal">
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "black" }}
              >
                Need help? Want to go step-by-step?
              </Typography>
              <Box display="flex" gap={2} justifyContent="center">
                <Button variant="outlined" onClick={handleHelpModalClose}>
                  No, I'll try again
                </Button>
                <Button variant="contained" onClick={handleHelpModalConfirm}>
                  Yes, show explanation
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Fade>
  );
}
