import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import "./Library.css";
import libraryImg from "../../../assets/library.png";

const adaptationLevels = [
  { label: "Original (Most Difficult)", value: "original" },
  { label: "Gold (Moderate)", value: "gold" },
  { label: "Silver (Easiest)", value: "silver" },
];

const languages = [
  "Arabic", "Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English",
  "Estonian", "Finnish", "French", "German", "Greek", "Hindi", "Hungarian",
  "Italian", "Japanese", "Korean", "Latvian", "Lithuanian", "Norwegian",
  "Polish", "Portuguese", "Romanian", "Russian", "Slovak", "Spanish", "Swedish", "Turkish",
];

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "$15.95",
    store: "My Store",
    adaptation: "original",
    language: "English",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Frankenstein",
    author: "Mary Shelley",
    price: "$15.95",
    store: "Adaptive Reader",
    adaptation: "gold",
    language: "English",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Little Women",
    author: "Louisa May Alcott",
    price: "$15.95",
    store: "My Store",
    adaptation: "silver",
    language: "English",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "White Fang",
    author: "Jack London",
    price: "$13.95",
    store: "Classic Reads",
    adaptation: "gold",
    language: "English",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "The Wizard of Oz",
    author: "L. Frank Baum",
    price: "$12.95",
    store: "Classic Reads",
    adaptation: "silver",
    language: "English",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    price: "$14.95",
    store: "My Store",
    adaptation: "original",
    language: "English",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    title: "White Fang",
    author: "Jack London",
    price: "$13.95",
    store: "Classic Reads",
    adaptation: "gold",
    language: "English",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    title: "The Wizard of Oz",
    author: "L. Frank Baum",
    price: "$12.95",
    store: "Classic Reads",
    adaptation: "silver",
    language: "English",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    price: "$14.95",
    store: "My Store",
    adaptation: "original",
    language: "English",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

export default function Library() {
  const [search, setSearch] = useState("");
  const [selectedAdaptations, setSelectedAdaptations] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showMoreLangs, setShowMoreLangs] = useState(false);
  const [sort, setSort] = useState("best");
  const [showCount, setShowCount] = useState(12);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesAdaptation =
      selectedAdaptations.length === 0 ||
      selectedAdaptations.includes(book.adaptation);
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(book.language);
    return matchesSearch && matchesAdaptation && matchesLanguage;
  });

  const handleAdaptationChange = (value) => {
    setSelectedAdaptations((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleLanguageChange = (value) => {
    setSelectedLanguages((prev) =>
      prev.includes(value) ? prev.filter((l) => l !== value) : [...prev, value]
    );
  };

  return (
    <Box className="library-bg">
      {/* Top Hero Section */}
      <Box className="library-hero-section">
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Personalized Reader Library
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700 }}>
            Browse our curated collection of classic and modern books, available
            in multiple adaptation levels and languages. Use the filters on the
            left to find books that match your reading preferences. Click "View
            Details" to learn more about each book or "Add to Library" to save
            your favorites.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 2,
            minWidth: 120,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={libraryImg} alt="Library" className="library-image" />
        </Box>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Box className="library-sidebar">
            <Typography variant="subtitle1" className="library-filter-title">
              Adaptation Level
            </Typography>
            <FormGroup>
              {adaptationLevels.map((level) => (
                <FormControlLabel
                  key={level.value}
                  control={
                    <Checkbox
                      checked={selectedAdaptations.includes(level.value)}
                      onChange={() => handleAdaptationChange(level.value)}
                    />
                  }
                  label={level.label}
                />
              ))}
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" className="library-filter-title">
              Language
            </Typography>
            <TextField
              size="small"
              placeholder="Search language"
              variant="outlined"
              sx={{ mb: 1 }}
              onChange={(e) => {
                // Optional: add search filtering
              }}
            />
            <FormGroup>
              {(showMoreLangs ? languages : languages.slice(0, 10)).map(
                (lang) => (
                  <FormControlLabel
                    key={lang}
                    control={
                      <Checkbox
                        checked={selectedLanguages.includes(lang)}
                        onChange={() => handleLanguageChange(lang)}
                      />
                    }
                    label={lang}
                  />
                )
              )}
            </FormGroup>
            <Button
              size="small"
              onClick={() => setShowMoreLangs((s) => !s)}
              sx={{ mt: 1, textTransform: "none" }}
            >
              {showMoreLangs ? "Show Less" : "Show More"}
            </Button>
          </Box>
        </Grid>

        {/* Book Display Section */}
        <Grid item xs={12} md={9}>
          <Box className="library-main">
            <Box className="library-toolbar">
              <Typography variant="subtitle2" sx={{ mr: 2 }}>
                {filteredBooks.length} Products
              </Typography>
              <TextField
                size="small"
                placeholder="Search products"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ minWidth: 220, mr: 2 }}
              />
              <InputLabel id="show-label" sx={{ ml: 2, mr: 1, mt: 1 }}>
                Show
              </InputLabel>
              <Select
                size="small"
                value={showCount}
                onChange={(e) => setShowCount(e.target.value)}
                sx={{ width: 70, mr: 2 }}
              >
                {[6, 12, 24, 48].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="sort-label" sx={{ ml: 2, mr: 1, mt: 1 }}>
                Sort
              </InputLabel>
              <Select
                size="small"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{ width: 130 }}
              >
                <MenuItem value="best">Best Selling</MenuItem>
                <MenuItem value="az">A-Z</MenuItem>
                <MenuItem value="za">Z-A</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
              </Select>
            </Box>

            <Grid container spacing={3}>
              {filteredBooks.slice(0, showCount).map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <Card className="library-book-card" elevation={2}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={book.img}
                      alt={book.title}
                      className="library-book-img"
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        {book.store}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="library-book-title"
                      >
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {book.author}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        {book.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                      <Button variant="contained" size="small">
                        Add to Library
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
