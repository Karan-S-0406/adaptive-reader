// components/UploadAssignmentDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { uploadAssignment } from "../../../store/action/teachers,action";
import { useDispatch, useSelector } from "react-redux";

export default function UploadAssignmentDialog({ open, onClose, grades }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.storeData.userData);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    gradeTargeted: "",
    dueInDays: "",
    uploadedBy: user?.email || "Unknown Teacher",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpload = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.file ||
      !formData.gradeTargeted ||
      !formData.dueInDays
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
      setLoading(true); // 🟢 Start loading
      const res = await dispatch(uploadAssignment(payload));
      const data = await res.payload;
      console.log("Upload response:", data);
      setLoading(false); // 🔴 End loading

      if (data.success) {
        setFormData({
          title: "",
          description: "",
          file: null,
          gradeTargeted: "",
          dueInDays: "",
          uploadedBy: user?.email || "Unknown Teacher",
        });
        Swal.fire("Uploaded!", "Assignment uploaded successfully", "success");
        onClose();
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err) {
      setLoading(false);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Upload Assignment</DialogTitle>
      <DialogContent dividers>
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Grade</InputLabel>
          <Select
            name="gradeTargeted"
            value={formData.gradeTargeted}
            onChange={handleChange}
            label="Grade"
          >
            {grades.map((g) => (
              <MenuItem key={g} value={g}>
                Grade {g}
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
        <Button component="label" variant="outlined" sx={{ mt: 2 }}>
          Upload PDF
          <input
            type="file"
            hidden
            accept="application/pdf"
            name="file"
            onChange={handleChange}
          />
        </Button>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
