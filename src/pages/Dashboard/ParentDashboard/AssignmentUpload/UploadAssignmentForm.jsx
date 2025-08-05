import React, { useState, useEffect } from "react";
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
  Switch,
  FormControlLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import { uploadAssignment } from "../../../store/action/teachers.action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import logo from "../../../../assets/logo.png";
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
  const [isChildAvailable, setIsChildAvailable] = useState(true);
  const user = useSelector((state) => state.storeData.userData);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const [useUploadBook, setUseUploadBook] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

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

  const extractSimpleTitle = (fullTitle) => {
    const parts = fullTitle.split("/");
    return parts[parts.length - 1] || fullTitle;
  };

  const fetchThumbnails = async (books) => {
    return await Promise.all(
      books.map(async (book) => {
        let thumbnail = null;
        const simpleTitle = extractSimpleTitle(book.title); // ← Use it here

        try {
          const res = await axios.get(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(
              simpleTitle
            )}`
          );
          const doc = res.data.docs?.[0];
          if (doc?.cover_i) {
            thumbnail = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
          }
        } catch (err) {
          console.warn("Failed to fetch cover for:", book.title);
        }

        return {
          ...book,
          thumbnail,
        };
      })
    );
  };

  const fetchInitialBooks = async (query) => {
    setSearchLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }students/searchBooks/:${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (data.success) {
        const enriched = await fetchThumbnails(data.results);
        setSearchResults(enriched);
      }
    } catch (error) {
      console.error("Initial fetch error:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.children || user.children.length === 0) {
      setIsChildAvailable(false);
      Swal.fire(
        "Child Profile Missing",
        "No child profile found. Please add a child before uploading an assignment.",
        "warning"
      );
      return;
    }

    const firstGrade = user.children[0]?.grade;
    if (firstGrade) {
      const defaultQuery = `Grade ${firstGrade}`;
      setSearchQuery(defaultQuery);
      fetchInitialBooks(defaultQuery);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (
        formData.type === "math" &&
        !["image/jpeg", "image/png"].includes(file.type)
      ) {
        setError("For Math assignments, upload an image (JPEG/PNG).");
        return;
      }

      if (
        formData.type === "reading" &&
        useUploadBook &&
        file.type !== "application/pdf"
      ) {
        setError("For reading assignments, only PDF files are allowed.");
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
      !formData.gradeTargeted ||
      !formData.dueInDays ||
      !formData.type ||
      (formData.type === "math" && !formData.file) ||
      (formData.type === "reading" && useUploadBook && !formData.file) ||
      (formData.type === "reading" && !useUploadBook && !formData.selectedBook)
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.type === "math" && formData.file.size > 1 * 1024 * 1024) {
      setError("Math image must be less than 1 MB.");
      return;
    }

    let payload;
    if (
      formData.type === "math" ||
      (formData.type === "reading" && useUploadBook)
    ) {
      payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }
    } else {
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
          type: "reading",
          uploadedBy: user?.email || "Unknown Teacher",
          selectedBook: null,
        });
        setSearchQuery("");
        setSearchResults([]);
        setUseUploadBook(false);
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
    setSearchInitiated(true); // Mark search as initiated

    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }students/searchBooks/:${encodeURIComponent(searchQuery)}`
      );

      if (data.success && Array.isArray(data.results)) {
        const resultsWithImages = await fetchThumbnails(data.results);
        setSearchResults(resultsWithImages);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    const bookData = {
      title: book.title,
      pageId: book.pageId || null,
    };
    setFormData((prev) => ({
      ...prev,
      selectedBook: bookData,
      title: book.title,
    }));
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        boxSizing: "border-box",
        mx: "auto",
        overflowX: "hidden",
      }}
    >
      <Typography variant="h6" color="black" gutterBottom>
        Assignments
      </Typography>

      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="dense"
        value={formData.title}
        disabled={!isChildAvailable}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        margin="dense"
        value={formData.description}
        disabled={!isChildAvailable}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="dense">
        <InputLabel>Assignment Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={(e) => {
            handleChange(e);
            setUseUploadBook(false);
            setSearchResults([]);
            setSearchQuery("");
          }}
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

      {formData.type === "reading" && (
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={useUploadBook}
                onChange={() => setUseUploadBook((prev) => !prev)}
              />
            }
            label={
              <Typography sx={{ color: "black", fontWeight: 500 }}>
                Upload Book
              </Typography>
            }
          />

          {useUploadBook ? (
            <>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload PDF Book
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  name="file"
                  onChange={handleChange}
                />
              </Button>
              {formData.file && (
                <Typography sx={{ mt: 1, color: "green" }}>
                  PDF Uploaded: {formData.file.name}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <TextField
                  placeholder="Enter book name..."
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    if (!value.trim()) {
                      setSearchResults([]);
                      setSearchInitiated(false); // Reset search initiation
                    }
                  }}
                  fullWidth
                />
                <Button variant="outlined" onClick={handleSearchBooks}>
                  Search Library
                </Button>
              </Box>

              {searchLoading ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              ) : (
                searchQuery.trim() && (
                  <>
                    {searchResults.length > 0 ? (
                      <Box
                        sx={{
                          mt: 2,
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(150px, 1fr))",
                          gap: 2,
                          overflowY: "auto",
                          paddingRight: 1,
                        }}
                      >
                        {searchResults.map((book, idx) => (
                          <Box
                            key={idx}
                            onClick={() => handleSelectBook(book)}
                            sx={{
                              cursor: "pointer",
                              p: 1,
                              border: "1px solid #ddd",
                              borderRadius: 2,
                              textAlign: "center",
                              backgroundColor: "#fafafa",
                              "&:hover": {
                                backgroundColor: "#f0f0f0",
                              },
                            }}
                          >
                            {book.thumbnail ? (
                              <img
                                src={book.thumbnail}
                                alt={book.title}
                                style={{
                                  width: "100%",
                                  height: "120px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              <img
                                src={logo}
                                alt="No Cover"
                                style={{
                                  width: "100%",
                                  height: "120px",
                                  objectFit: "contain",
                                  borderRadius: "4px",
                                  opacity: 0.6,
                                }}
                              />
                            )}
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                fontWeight: 500,
                                fontSize: "0.8rem",
                                color: "black",
                              }}
                            >
                              {book.title}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      searchInitiated && (
                        <Typography
                          sx={{ mt: 2, color: "gray", fontStyle: "italic" }}
                        >
                          No results found.
                        </Typography>
                      )
                    )}
                  </>
                )
              )}
              {formData.selectedBook && (
                <Typography sx={{ mt: 1, color: "green" }}>
                  Selected Book: {formData.selectedBook.title}
                </Typography>
              )}
            </>
          )}
        </Box>
      )}

      {formData.type === "math" && (
        <>
          <Button component="label" variant="outlined" sx={{ mt: 2 }}>
            Upload Math Image
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png"
              name="file"
              onChange={handleChange}
            />
          </Button>
          {formData.file && (
            <Typography sx={{ mt: 1, color: "green" }}>
              Selected File: {formData.file.name}
            </Typography>
          )}
        </>
      )}

      {error && <FormHelperText error>{error}</FormHelperText>}

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading || !isChildAvailable}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Box>
    </Box>
  );
}
