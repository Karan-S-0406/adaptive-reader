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
import SelectBookPopup from "./SelectBookPopup"; // ✅ Import the popup

const GRADES = Array.from({ length: 12 }, (_, i) => ({
  value: `${i + 1}`,
  label: `${i + 1}`,
}));

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
    type: "reading",
    uploadedBy: user?.email || "Unknown Teacher",
    selectedBook: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (
        formData.type === "math" &&
        !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ) {
        setError(
          "For Math assignments, please upload an image file (JPEG/PNG)."
        );
        return;
      }

      setError("");
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpload = async () => {
    if (
      !formData.title ||
      !formData.description ||
      (!formData.file && formData.type === "math") || // ✅ File is required only for math
      !formData.gradeTargeted ||
      !formData.dueInDays ||
      !formData.type
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.type === "math" && formData.file.size > 1 * 1024 * 1024) {
      setError("File must be less than 1 MB.");
      return;
    }

    let payload;

    if (formData.type === "math") {
      // ✅ Math: Use FormData as before
      payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }
    } else if (formData.type === "reading") {
      // ✅ Reading: Send JSON payload with title, author, workKey, coverId
      payload = {
        title: formData.title,
        description: formData.description,
        gradeTargeted: formData.gradeTargeted,
        dueInDays: formData.dueInDays,
        type: formData.type,
        uploadedBy: formData.uploadedBy,
        author: formData.selectedBook?.authors,
        pageId: formData.selectedBook?.pageId,
      };
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
          selectedBook: null,
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

  const handleSearchBooks = async () => {
    if (!searchQuery.trim()) {
      Swal.fire("Enter a query!", "Search query cannot be empty", "warning");
      return;
    }
    setSearchLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }students/searchBooks/:${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    console.log("Selected book:", book);
    const bookData = {
      title: book.title,
      // authors: book.author,
      pageId: book.pageId || null,
    };

    setFormData((prev) => ({
      ...prev,
      selectedBook: bookData,
      title: book.title,
    }));
    setSearchQuery("");
    setSearchResults([]);
    setOpenModal(false);
  };

  function handleCloseModal() {
    setOpenModal(false);
    setSearchQuery(""); // Clear search query when closing modal
    setSearchResults([]); // Clear search results when closing modal
    setSearchLoading(false); // Reset loading state when closing modal
  }

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

      {formData.type === "math" ? (
        <>
          <Button component="label" variant="outlined" sx={{ mt: 2 }}>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png"
              name="file"
              onChange={handleChange}
            />
          </Button>
          {formData.file && (
            <Typography sx={{ mt: 1, fontStyle: "italic", color: "green" }}>
              Selected File: {formData.file.name}
            </Typography>
          )}
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setOpenModal(true)}
          >
            Search Book
          </Button>
          {formData.selectedBook && (
            <Typography sx={{ mt: 1, color: "green" }}>
              Selected Book: {formData.selectedBook.title} by{" "}
              {formData.selectedBook.authors}
            </Typography>
          )}
        </>
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

      {/* ✅ Popup Component */}
      <SelectBookPopup
        open={openModal}
        onClose={handleCloseModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        searchLoading={searchLoading}
        handleSearchBooks={handleSearchBooks}
        handleSelectBook={handleSelectBook}
      />
    </Box>
  );
}
