import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import confetti from "canvas-confetti";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  generateMathMCQ,
  getMCQExplanation,
} from "../store/action/students.action";
import ReactMarkdown from "react-markdown";
import "./MathAssignment.css";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function MathAssignment(storagePath) {
  const dispatch = useDispatch();
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState("");
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

  const fetchQuestion = async () => {
    setLoading(true);
    setIsCorrect(null);
    setSelectedOption(null);
    setShowExplanation(false);
    setExplanation("");
    setFeedbackEmoji("");
    try {
      let actualStoragePath = storagePath;

      // Check if storagePath is an object and has a 'storagePath' property
      if (
        typeof storagePath === "object" &&
        storagePath !== null &&
        storagePath.storagePath
      ) {
        actualStoragePath = storagePath.storagePath;
      }
      const res = await dispatch(
        generateMathMCQ({ grade: grade, storagePath: actualStoragePath })
      );
      console.log("Fetched question data:", res);
      setQuestionData(res?.payload?.mcq);
    } catch (err) {
      console.error("Failed to fetch MCQ:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const fetchExplanation = async () => {
    if (!questionData) return;
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
      setExplanation(res?.payload?.explanation);
      setWrongAttempts(0); // reset wrong attempts after fetching explanation
      setShowExplanation(true);
    } catch (err) {
      console.error("Error fetching explanation:", err);
    } finally {
      setExplanationLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [grade]);

  if (loading) {
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
          </Box>
        </Paper>
      </Box>
    );
  }
  // Handle case where questionData is null after loading (e.g., API error)
  if (!questionData) {
    return (
      <Box className="error-state">
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
            <Typography variant="h6">Grade {grade} Math Challenge</Typography>
            <Tooltip title="Get explanation for this question">
              <IconButton onClick={fetchExplanation}>
                <HelpOutlineIcon />
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
                }`}
                onClick={() => setSelectedOption(key)}
              >
                <strong>{key}.</strong> {value}
              </Button>
            ))}
          </Box>

          <Box className="button-group">
            <Button
              variant="contained"
              color="primary"
              onClick={checkAnswer}
              disabled={!selectedOption}
            >
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

          {showExplanation && !explanationLoading && (
            <Fade in={showExplanation}>
              <Paper className="explanation-box">
                <Typography variant="subtitle1" fontWeight={600}>
                  Why this is the right answer:
                </Typography>
                <ReactMarkdown>{explanation}</ReactMarkdown>
              </Paper>
            </Fade>
          )}
          <Modal
            open={showHelpModal}
            onClose={() => setShowHelpModal(false)}
            closeAfterTransition
            BackdropProps={{ timeout: 400 }}
          >
            <Fade in={showHelpModal}>
              <Box className="help-modal">
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "black" }}>
                  Need help? Want to go step-by-step?
                </Typography>
                <Box display="flex" gap={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    onClick={() => setShowHelpModal(false)}
                  >
                    No, I'll try again
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      fetchExplanation();
                      setShowHelpModal(false);
                    }}
                  >
                    Yes, show explanation
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Paper>
      </Box>
    </Fade>
  );
}
