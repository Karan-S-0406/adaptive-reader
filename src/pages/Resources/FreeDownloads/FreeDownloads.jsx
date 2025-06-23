import React from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import "./FreeDownloads.css";

// Example images (replace with your own assets)
import romeo from "../../../assets/romeo.png";
import odyssey from "../../../assets/odyssey.png";
import castle from "../../../assets/castle.png";
// import midsummerImg from "../assets/midsummer.png";

export default function FreeDownloads() {
  return (
    <div className="free-downloads-root">
      <section className="free-downloads-hero-section">
        <div className="free-downloads-hero-center">
          <Typography variant="h2" className="free-downloads-hero-title">
            INCLUSIVE READING
          </Typography>
          <Typography variant="h4" className="free-downloads-hero-subtitle">
            Personalized Learning.
          </Typography>
          <Typography className="free-downloads-hero-desc">
            Enjoy timeless novels in three reading levels and different formats.
          </Typography>
        </div>
        <div className="free-downloads-hero-right">
          <Typography className="free-downloads-hero-listen-title">
            Listen while you read.
          </Typography>
          <Typography className="free-downloads-hero-listen-desc">
            Students with learning differences benefit greatly from Audio
            Companions by allowing them to listen to the text, making it easier
            to follow along and process information.
          </Typography>
        </div>
      </section>

      {/* FEATURED BOOKS SECTION */}
      <section className="free-downloads-featured-books-section">
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={4}>
            <div className="free-downloads-featured-book">
              <img
                src={odyssey}
                alt="The Odyssey"
                className="free-downloads-featured-book-img"
              />
              <Typography className="free-downloads-featured-book-author">
                Homer’s
              </Typography>
              <Typography className="free-downloads-featured-book-title">
                The Odyssey
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="free-downloads-featured-book">
              <img
                src={castle}
                alt="Frankenstein"
                className="free-downloads-featured-book-img"
              />
              <Typography className="free-downloads-featured-book-author">
                Mary Shelly’s
              </Typography>
              <Typography className="free-downloads-featured-book-title">
                Frankenstein
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="free-downloads-featured-book">
              <img
                src={romeo}
                alt="A Midsummer Night's Dream"
                className="free-downloads-featured-book-img"
              />
              <Typography className="free-downloads-featured-book-author">
                William Shakespeare’s
              </Typography>
              <Typography className="free-downloads-featured-book-title">
                Romeo and Juliet
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Button
          className="free-downloads-featured-download-btn"
          variant="contained"
        >
          DOWNLOAD EBOOKS
        </Button>
      </section>

      <Box
        sx={{
          width: "100%",
          background: "#f5f7fa",
          py: 3,
          px: { xs: 2, md: 6 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
        >
          Free Downloads for Every Reader
        </Typography>
        <Typography sx={{ maxWidth: 700, color: "#555", textAlign: "center" }}>
          Discover a curated collection of classic literature, adapted for
          diverse learning needs. Download accessible eBooks and audio
          companions to support every student’s journey.
        </Typography>
      </Box>
    </div>
  );
}
