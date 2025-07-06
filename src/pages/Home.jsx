import { Button, Typography, Grid } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import SpeedIcon from "@mui/icons-material/Speed";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Home.css";
import homePageImg from "../assets/home.png";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <TranslateIcon sx={{ fontSize: 48, color: "#1B6CA8" }} />,
    title: "Instant Translations",
    desc: "Switch between 30+ languages with a single click. Every reader, every language.",
    link: "Try a Translation",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 48, color: "#1B6CA8" }} />,
    title: "Level Up Reading",
    desc: "Personalized text levels for every learner. From emerging to advanced, everyone grows.",
    link: "See How It Works",
  },
  {
    icon: <HeadphonesIcon sx={{ fontSize: 48, color: "#1B6CA8" }} />,
    title: "Immersive Audio",
    desc: "Natural, expressive audio in multiple languages. Listen, learn, and enjoy.",
    link: "Listen to a Story",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 48, color: "#1B6CA8" }} />,
    title: "Custom Print Books",
    desc: "Order personalized books in your language and level. Delivered to your door.",
    link: "Order Your Book",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="main-content home-bg">
      {/* Hero Section */}
      <section className="hero-section-new">
        <div className="hero-content-new">
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Montserrat, serif",
              fontWeight: 800,
              color: "#1B263B",
              mb: 2,
              fontSize: { xs: 32, md: 54 },
              lineHeight: 1.1,
              letterSpacing: "-2px",
              textAlign: "left",
            }}
          >
            Every Reader
            <br />
            Deserves Access
          </Typography>
          <Typography
            sx={{
              color: "#415A77",
              fontSize: 22,
              mb: 4,
              maxWidth: 500,
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            Smartzy brings stories to life for every learner—any
            language, any level, any device.
          </Typography>
          <div className="hero-buttons-new">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#1B6CA8",
                color: "#fff",
                px: 5,
                py: 1.7,
                fontWeight: 700,
                borderRadius: 3,
                fontSize: 18,
                boxShadow: "0 4px 24px 0 rgba(27,108,168,0.10)",
                "&:hover": { bgcolor: "#17497A" },
              }}
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/gallery")}
            >
              Start Reading Free
            </Button>
            <Button
              variant="text"
              sx={{
                color: "#1B6CA8",
                px: 3,
                py: 1.7,
                fontWeight: 700,
                borderRadius: 3,
                fontSize: 18,
                ml: 2,
                "&:hover": { textDecoration: "underline", bgcolor: "#f5faff" },
              }}
              onClick={() => navigate("/resources/library")}
            >
              Explore Library
            </Button>
          </div>
        </div>
        <div className="hero-image-new">
          {/* Replace with your own SVG/illustration or use a royalty-free image */}
          <img
            src={homePageImg}
            alt="Readers illustration"
            style={{
              width: "100%",
              borderRadius: 24,
              boxShadow: "0 6px 32px 0 rgba(27,108,168,0.08)",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-new">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Montserrat, serif",
            fontWeight: 700,
            color: "#1B263B",
            mb: 4,
            textAlign: "center",
            fontSize: { xs: 26, md: 36 },
            letterSpacing: "-1px",
          }}
        >
          Why Smartzy?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <div className="feature-item-new">
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    mb: 1,
                    fontFamily: "Montserrat, serif",
                    fontWeight: 700,
                    color: "#1B263B",
                    fontSize: 20,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#415A77",
                    fontSize: 15,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  {feature.desc}
                </Typography>
                <Typography
                  sx={{
                    color: "#1B6CA8",
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {feature.link}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section-new">
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Montserrat, serif",
            fontWeight: 700,
            color: "#fff",
            mb: 2,
            textAlign: "center",
            fontSize: { xs: 20, md: 28 },
          }}
        >
          Ready to empower every reader?
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1B6CA8",
            color: "#fff",
            px: 5,
            py: 1.5,
            fontWeight: 700,
            borderRadius: 3,
            fontSize: 18,
            boxShadow: "0 4px 24px 0 rgba(27,108,168,0.10)",
            "&:hover": { bgcolor: "#17497A" },
          }}
        >
          Get Started Now
        </Button>
      </section>
    </div>
  );
}
