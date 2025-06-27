import { useState } from "react";
import { TextField, MenuItem, Typography, Button } from "@mui/material";
import BookCard from "./BookCard";
import "./BookGallery.css";
import books from "./data/books.json";

const booksPerPage = 12;

const genres = [
  "All Titles",
  "Fable",
  "Non-Fiction",
  "Science Fiction",
  "Horror",
  "Memoir",
  "Young Adult",
  "Literary Fiction",
  "Autobiography",
  "Psychological Thriller",
  "Mythological Fiction",
  "Self-Help",
  "Philosophical Fiction",
  "Historical Romance",
  "Sci-Fi Adventure",
  "Self-Development",
  "Cultural Fiction",
  "Mystery",
  "Contemporary",
  "War Fiction",
  "Fantasy"
];


const BookGallery = () => {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All Titles");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesGenre =
      genreFilter === "All Titles" || book.genre === genreFilter;
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIdx = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIdx, startIdx + booksPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="page-container">
      <Typography variant="h5" className="page-title">
        Our Novels
      </Typography>

      <div className="search-row">
        <TextField
          size="small"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        <TextField
          select
          size="small"
          value={genreFilter}
          onChange={(e) => {
            setGenreFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="genre-select"
        >
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="card-container">
        {currentBooks.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>

      {filteredBooks.length > booksPerPage && (
        <div className="pagination-controls">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            variant="outlined"
            className="pagination-button"
          >
            Previous
          </Button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            variant="outlined"
            className="pagination-button"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookGallery;
