import React, { useState } from "react";
import "./RequestContent.css";
import { Button, TextField, Typography, Box } from "@mui/material";

export default function RequestContent() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    email: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your suggestion!");
    setForm({ title: "", author: "", email: "", notes: "" });
  };

  return (
    <div className="request-content-bg">
      <Typography variant="h3" className="request-content-title" gutterBottom>
        Suggest a Book
      </Typography>
      <div className="request-content-container">
        <div className="request-content-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
            alt="Books"
            className="request-content-img"
          />
        </div>
        <section className="request-content-section">
          <Typography variant="h5" color="primary" gutterBottom>
            Help Us Grow Our Library
          </Typography>
          <Typography paragraph>
            Our digital library is always expanding! If you have a book in mind
            that you’d love to see here, let us know. We prioritize requests from
            educators and schools, but everyone’s input is valued.
          </Typography>
          <Typography paragraph>
            Please ensure your suggestion is in the{" "}
            <a
              href="https://www.gutenberg.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              public domain
            </a>{" "}
            or available for open use.
          </Typography>
          <Typography paragraph>
            Questions? Email us at{" "}
            <a href="mailto:hello@personalized-reader.com">
              hello@personalized-reader.com
            </a>
          </Typography>
        </section>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="request-content-form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Book Title"
            variant="outlined"
            id="title"
            name="title"
            placeholder="e.g. Little Women"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            variant="outlined"
            id="author"
            name="author"
            placeholder="e.g. Louisa May Alcott"
            value={form.author}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Your Email"
            variant="outlined"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            fullWidth
          />
          <TextField
            label="Notes (optional)"
            variant="outlined"
            id="notes"
            name="notes"
            placeholder="Why is this book important to you or your students?"
            value={form.notes}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="request-content-btn"
            sx={{ mt: 1, fontWeight: 600 }}
          >
            Submit Suggestion
          </Button>
        </Box>
      </div>
    </div>
  );
}