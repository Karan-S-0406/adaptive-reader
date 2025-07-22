import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { uploadAssignment } from "../../../store/action/teachers.action";
import { useDispatch, useSelector } from "react-redux";

const GRADES = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

const ASSIGNMENT_TYPES = [
  { value: "reading", label: "Reading" },
  { value: "math", label: "Math" },
];

export default function UploadAssignmentSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeData.userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    gradeTargeted: "",
    dueInDays: "",
    type: "", // ✅ Assignment type
    uploadedBy: user?.email || "Unknown Teacher",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      // ✅ Validate file type based on assignment type
      if (formData.type === "reading" && file.type !== "application/pdf") {
        setError("For Reading assignments, please upload a PDF file.");
        return;
      }

      if (
        formData.type === "math" &&
        !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ) {
        setError(
          "For Math assignments, please upload an image file (JPEG/PNG)."
        );
        return;
      }

      setError(""); // Clear error
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpload = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.file ||
      !formData.gradeTargeted ||
      !formData.dueInDays ||
      !formData.type
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.file.size > 1 * 1024 * 1024) {
      setError("File must be less than 1 MB.");
      return;
    }

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      setLoading(true);
      const res = await dispatch(uploadAssignment(payload));
      const data = await res.payload;
      setLoading(false);

      if (data.success) {
        setFormData({
          title: "",
          description: "",
          file: null,
          gradeTargeted: "",
          dueInDays: "",
          type: "",
          uploadedBy: user?.email || "Unknown Teacher",
        });
        Swal.fire("Uploaded!", "Assignment uploaded successfully", "success");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err) {
      setLoading(false);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Upload Assignment
      </Typography>

      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="dense"
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        margin="dense"
        value={formData.description}
        onChange={handleChange}
      />

      {/* ✅ Assignment Type Dropdown */}
      <FormControl fullWidth margin="dense">
        <InputLabel>Assignment Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Assignment Type"
        >
          {ASSIGNMENT_TYPES.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ✅ Grade Dropdown */}
      <FormControl fullWidth margin="dense">
        <InputLabel>Grade</InputLabel>
        <Select
          name="gradeTargeted"
          value={formData.gradeTargeted}
          onChange={handleChange}
          label="Grade"
        >
          {GRADES.map((g) => (
            <MenuItem key={g.value} value={g.value}>
              {g.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Due in (days)"
        name="dueInDays"
        type="number"
        fullWidth
        margin="dense"
        value={formData.dueInDays}
        onChange={handleChange}
      />

      {/* File Upload */}
      <Button component="label" variant="outlined" sx={{ mt: 2 }}>
        {formData.type === "math" ? "Upload Image" : "Upload PDF"}
        <input
          type="file"
          hidden
          accept={
            formData.type === "math"
              ? "image/jpeg,image/png"
              : "application/pdf"
          }
          name="file"
          onChange={handleChange}
          disabled={!formData.type} // ✅ Disable until type is selected
        />
      </Button>
      {/* ✅ Show filename if uploaded */}
      {formData.file && (
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "#555", fontStyle: "italic" }}
        >
          Selected File: {formData.file.name}
        </Typography>
      )}

      {error && <FormHelperText error>{error}</FormHelperText>}

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Box>
    </Box>
  );
}
