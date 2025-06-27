import { useParams, Link, useNavigate } from "react-router-dom";
import booksExtras from "./data/booksDetails.json";
import { Typography, Chip, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import books from "./data/books.json";
import "./BookDetails.css";

// Dynamically import all .png images in the images folder
const images = import.meta.glob("../../assets/*.png", {
  eager: true,
  import: "default",
});

const BookDetails = () => {
  const navigate = useNavigate();
  const { title } = useParams();

  const decodedTitle = decodeURIComponent(title);
  const book = books.find((b) => b.title === decodedTitle);
  const extras = booksExtras[decodedTitle];

  if (!book) {
    return <Typography variant="h6">Book not found.</Typography>;
  }

  // Resolve the image path
  const imageKey = `../../assets/${book.image}`;
  const imageSrc = images[imageKey] || images["../../assets/placeholder.png"];

  return (
    <div className="book-details-container">
      <div className="book-details-header">
        <Link to="/gallery">
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              mb: { xs: 2, sm: 0 },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Back to Gallery
          </Button>
        </Link>

        <div className="book-header-content">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#555", mb: 1 }}>
            by {book.author}
          </Typography>
          <div className="book-header-meta">
            <Chip label={book.genre} color="primary" />
            <Button
              sx={{
                textTransform: "none",
                borderRadius: 2,
                mb: { xs: 2, sm: 0 },
              }}
              variant="outlined"
              size="small"
              onClick={() => {
                navigate("/live-demo");
              }}
            >
              Read Online
            </Button>
          </div>
        </div>
      </div>

      <div className="book-details-img-row">
        <img src={imageSrc} alt={book.title} className="book-details-cover" />

        <div style={{ flex: 1 }}>
          {extras ? (
            <div className="book-details-extras">
              <Typography variant="h6" gutterBottom>
                Themes
              </Typography>
              <Typography>{extras.themes}</Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Summary
              </Typography>
              <Typography>{extras.summary}</Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Ideal Audience
              </Typography>
              <Typography>{extras.audience}</Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Background
              </Typography>
              <Typography>{extras.background}</Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Insight
              </Typography>
              <Typography>{extras.insight}</Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Fun Fact
              </Typography>
              <Typography>{extras.funFact}</Typography>
            </div>
          ) : (
            <Typography sx={{ mt: 4 }}>
              No extra information available.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
