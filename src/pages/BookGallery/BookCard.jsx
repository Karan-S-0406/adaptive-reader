import { Box, Typography, Paper } from "@mui/material";
import "./BookGallery.css";
import { Link } from "react-router-dom";

// Dynamically import all images in the /src/images folder
const images = import.meta.glob("../../assets/*.png", {
  eager: true,
  import: "default",
});

const BookCard = ({ book }) => {
  const imageKey = `../../assets/${book.image}`;
  const imageSrc = images[imageKey] || images["../images/placeholder.png"];

  return (
    <Link
      to={`/book/${encodeURIComponent(book.title)}`}
      style={{ textDecoration: "none" }}
    >
      <Paper className="book-card" elevation={3}>
        <Box className="card-image">
          <img
            src={imageSrc}
            alt={book.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box className="card-content">
          <Typography variant="subtitle1" className="card-title">
            {book.title}
          </Typography>
          <Typography variant="caption" className="card-author">
            {book.author}
          </Typography>
          <div className="genre-chip">{book.genre}</div>
        </Box>
      </Paper>
    </Link>
  );
};

export default BookCard;
