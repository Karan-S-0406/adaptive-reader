import { useState } from "react";
import { TextField, MenuItem, Typography } from "@mui/material";
import BookCard from "./BookCard";
import "./BookGallery.css";

const books = [
  {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    genre: "Drama",
    image: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "2 B R 0 2 B",
    author: "Kurt Vonnegut",
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1616627981704-7596c7a6c431?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Novel",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "30 Strange Stories",
    author: "H. G. Wells",
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    genre: "Novel",
    image: "https://images.unsplash.com/photo-1590608897129-79da98d159d8?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Hamlet",
    author: "William Shakespeare",
    genre: "Drama",
    image: "https://images.unsplash.com/photo-1590602847864-6fc29b12f0f4?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "All Quiet on the Western Front",
    author: "Erich Maria Remarque",
    genre: "Novel",
    image: "https://images.unsplash.com/photo-1545972152-705b58a07832?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    genre: "Novel",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    image: "https://images.unsplash.com/photo-1608139740599-3984dba40aa0?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9356?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Romance",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    image: "https://images.unsplash.com/photo-1600488995371-9bc1856abf6b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    genre: "Gothic",
    image: "https://images.unsplash.com/photo-1602411132548-5f8d7f3d1104?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Philosophical",
    image: "https://images.unsplash.com/photo-1622495898253-006cf0b3563c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Romance",
    image: "https://images.unsplash.com/photo-1606836591137-735ebf1f2cbb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "The Call of the Wild",
    author: "Jack London",
    genre: "Adventure",
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    genre: "Classic",
    image: "https://images.unsplash.com/photo-1512427691650-8ae5f4c646f7?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    genre: "Historical",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    genre: "Historical",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80",
  }
];

const genres = ["All Titles", "Drama", "Sci-Fi", "Novel"];

const BookGallery = () => {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All Titles");

  const filteredBooks = books.filter((book) => {
    const matchesGenre =
      genreFilter === "All Titles" || book.genre === genreFilter;
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

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
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <TextField
          select
          size="small"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
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
        {filteredBooks.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGallery;