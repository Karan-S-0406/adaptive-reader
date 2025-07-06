import React, { useState } from "react";
import { Button, Typography, Box, Grid, Fade } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import "./Pricing.css";

const testimonials = [
  {
    quote:
      "Smartzy is the end all be all of inclusivity [...] The different levels of text meet students where they are at, but still tell the same story.",
    author: "MORGAN B, IEP SPECIALIST",
  },
  {
    quote:
      "The literacy specialist in our district said this is the right resource for our ELLs.",
    author: "HELEN B, ELL TEACHER",
  },
  {
    quote:
      "Smartzy is a game-changer. Instead of losing students in challenging texts from the start, it acts as a bridge.",
    author: "J. SMITH, EDUCATOR",
  },
];

function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pricing-testimonials-section">
      <Typography variant="h4" className="pricing-testimonials-title">
        <StarIcon className="pricing-star-icon" /> What Educators Say
      </Typography>
      <Typography className="pricing-testimonials-subtitle">
        Real stories from real classrooms.
      </Typography>
      <div className="pricing-testimonials-slider">
        <Fade in timeout={700} key={index}>
          <div className="pricing-testimonials-quote creative-quote-bg">
            <Typography className="pricing-testimonials-quote-text">
              “{testimonials[index].quote}”
            </Typography>
            <Typography className="pricing-testimonials-author">
              {testimonials[index].author}
            </Typography>
          </div>
        </Fade>
        <div className="pricing-testimonials-dots">
          {testimonials.map((_, i) => (
            <FiberManualRecordIcon
              key={i}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "pricing-testimonials-dot active"
                  : "pricing-testimonials-dot"
              }
              fontSize="small"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const schoolFeatures = [
  "750+ Novels & Plays",
  "1 Reading Level",
  "5 Languages",
  "English Audio",
  "Bilingual Reader",
];

const schoolPremiumFeatures = [
  "3 Reading Levels",
  "30+ Languages",
  "Multilingual Audio",
  "User Uploaded Content",
  "Decode Mode",
];

const individualFeatures = [
  "750+ Novels & Plays",
  "1 Reading Level",
  "5 Languages",
  "English Audio",
  "Bilingual Reader",
];

const individualPremiumFeatures = [
  "3 Reading Levels",
  "30+ Languages",
  "Multilingual Audio",
  "Decode Mode",
];

function FeatureList({ features }) {
  return (
    <ul className="pricing-list">
      {features.map((feature) => (
        <li key={feature}>
          <CheckIcon className="pricing-check" /> {feature}
          {(feature === "750+ Novels & Plays" ||
            feature === "3 Reading Levels" ||
            feature === "30+ Languages" ||
            feature === "User Uploaded Content" ||
            feature === "Decode Mode") && (
            <InfoOutlinedIcon className="pricing-info" fontSize="inherit" />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState("schools");

  return (
    <div className="pricing-root creative-bg">
      <Typography variant="h2" className="pricing-title creative-title">
        Unlock Reading for Every Learner
      </Typography>
      <Typography className="pricing-subtitle creative-subtitle">
        Adaptive, inclusive, and affordable literacy for all.
      </Typography>
      <div className="pricing-tabs">
        <Button
          variant={tab === "schools" ? "contained" : "outlined"}
          className={tab === "schools" ? "pricing-tab-active" : "pricing-tab"}
          onClick={() => setTab("schools")}
        >
          Schools & Teachers
        </Button>
        <Button
          variant={tab === "individual" ? "contained" : "outlined"}
          className={
            tab === "individual" ? "pricing-tab-active" : "pricing-tab"
          }
          onClick={() => setTab("individual")}
        >
          Individual
        </Button>
      </div>
      {tab === "schools" && (
        <Grid container className="pricing-cards" spacing={0}>
          <Grid item xs={12} md={6}>
            <Box className="pricing-card pricing-card-left creative-card">
              <Typography variant="subtitle1" className="pricing-card-title">
                FREE
              </Typography>
              <Typography className="pricing-card-desc">
                Always Free For Educators
              </Typography>
              <Button
                variant="contained"
                className="pricing-card-btn pricing-card-btn-free"
              >
                GET STARTED
              </Button>
              <Typography className="pricing-card-note">
                No credit card required
              </Typography>
              <FeatureList features={schoolFeatures} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="pricing-card pricing-card-right creative-card-premium">
              <Typography variant="subtitle1" className="pricing-card-title">
                School License
              </Typography>
              <Typography className="pricing-card-desc">
                Instantly Adapt Any Text for Every Student
              </Typography>
              <Button
                variant="contained"
                className="pricing-card-btn pricing-card-btn-quote"
              >
                GET QUOTE
              </Button>
              <Typography className="pricing-card-note">
                Everything in our free version plus:
              </Typography>
              <FeatureList features={schoolPremiumFeatures} comingSoon />
            </Box>
          </Grid>
        </Grid>
      )}

      {tab === "individual" && (
        <Grid container className="pricing-cards" spacing={0}>
          <Grid item xs={12} md={6}>
            <Box className="pricing-card pricing-card-left creative-card">
              <Typography variant="subtitle1" className="pricing-card-title">
                FREE
              </Typography>
              <Typography className="pricing-card-desc">
                Free Access for Individual Readers
              </Typography>
              <Button
                variant="contained"
                className="pricing-card-btn pricing-card-btn-free"
              >
                FREE ACCOUNT
              </Button>
              <Typography className="pricing-card-note">
                No credit card required
              </Typography>
              <FeatureList features={individualFeatures} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="pricing-card pricing-card-right creative-card-premium">
              <Typography variant="subtitle1" className="pricing-card-title">
                Premium
              </Typography>
              <Typography className="pricing-card-desc">
                Boost Reading Skills Across 30+ Languages
                <br />
                and 3 Levels
              </Typography>
              <Button
                variant="contained"
                className="pricing-card-btn pricing-card-btn-quote"
                sx={{ background: "#20403C", color: "#fff" }}
              >
                $99 / YEAR
              </Button>
              <Typography className="pricing-card-note">Paid Annually</Typography>
              <FeatureList features={individualPremiumFeatures} comingSoon />
            </Box>
          </Grid>
        </Grid>
      )}

      <TestimonialsSlider />
    </div>
  );
}
