import { Box, Typography, Paper } from "@mui/material";
import "./BookGallery.css";

const BookCard = ({ book }) => {
  return (
    <Paper className="book-card" elevation={3}>
      <Box
        className="card-image"
        sx={{
          backgroundImage: `url(${book.image || "https://via.placeholder.com/300x400?text=No+Cover"})`,
        }}
      />
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
  );
};

export default BookCard;