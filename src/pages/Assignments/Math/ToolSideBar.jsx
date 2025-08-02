import React, { useRef, useState, useEffect } from "react";
import "./ToolSidebar.css";
import RulerIcon from "@mui/icons-material/Straighten";
import BrushIcon from "@mui/icons-material/Brush";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Box, Tooltip, IconButton } from "@mui/material";

export default function ToolSidebar() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("marker");
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleMouseDown = (e) => {
    if (tool === "marker") {
      setDrawing(true);
      draw(e);
    } else if (tool === "eraser") {
      erase(e);
    }
  };

  const handleMouseMove = (e) => {
    if (tool === "marker" && drawing) draw(e);
    else if (tool === "eraser") erase(e);
  };

  const handleMouseUp = () => {
    if (tool === "marker") setDrawing(false);
  };

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX || e.touches?.[0]?.clientX) - rect.left,
      y: (e.clientY || e.touches?.[0]?.clientY) - rect.top,
    };
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#2196f3";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const erase = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.clearRect(x - 10, y - 10, 20, 20);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <Box className="tool-container">
      <Box className="tool-sidebar">
        <Tooltip title="Ruler (placeholder)">
          <IconButton onClick={() => setTool("ruler")}>
            <RulerIcon color={tool === "ruler" ? "primary" : "inherit"} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Marker">
          <IconButton onClick={() => setTool("marker")}>
            <BrushIcon color={tool === "marker" ? "primary" : "inherit"} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Eraser">
          <IconButton onClick={() => setTool("eraser")}>
            <CleaningServicesIcon
              color={tool === "eraser" ? "primary" : "inherit"}
            />
          </IconButton>
        </Tooltip>

        <button className="clear-btn" onClick={clearCanvas}>
          Clear
        </button>
      </Box>

      <canvas
        ref={canvasRef}
        className="canvas-area"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
    </Box>
  );
}
