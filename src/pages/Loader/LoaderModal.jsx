import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  CircularProgress,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: "none",
  minWidth: 250,
};

const LoaderModal = ({ open, messages = [] }) => {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  useEffect(() => {
    if (!open || messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [open, messages]);

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <CircularProgress />
          {messages.length > 0 && (
            <Typography mt={2}>
              {messages[currentMsgIndex]}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoaderModal;
