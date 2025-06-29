import React from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import translationImg from "../../../assets/translation.png";
import "./Translations.css";

export default function Translations() {
  return (
    <div
      className="translations-root"
      style={{ background: "#F9F7F3", minHeight: "100vh" }}
    >
      {/* Hero Section */}
      <section
        className="translations-hero"
        style={{ padding: "48px 0", background: "#e3f0fa" }}
      >
        <Box sx={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{ color: "#3D405B", fontWeight: 700, mb: 2 }}
          >
            Bridge Language Gaps. Unlock Every Story.
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#3D405B", opacity: 0.85, mb: 4 }}
          >
            Personalized Reader’s translation engine brings every book to life in
            your language—instantly, naturally, and with a human touch.
          </Typography>
          <img
            src={translationImg}
            alt="Translation Illustration"
            style={{ maxWidth: 340, width: "100%", margin: "0 auto" }}
          />
        </Box>
      </section>

      {/* How It Works */}
      <section style={{ padding: "56px 0 32px 0" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#3D405B", fontWeight: 600, mb: 4 }}
        >
          How Personalized Translations Work
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                background: "#e3f0fa",
                borderRadius: 3,
                width: 320, // static width for uniformity
                margin: "0 auto",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <LanguageIcon sx={{ fontSize: 56, color: "#E07A5F", mb: 1 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#3D405B", fontWeight: 600 }}
                >
                  Real-Time Language Switching
                </Typography>
                <Typography sx={{ color: "#3D405B", opacity: 0.8 }}>
                  Instantly toggle between English and your preferred
                  language—no page reloads, no awkward phrasing.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                background: "#e3f0fa",
                borderRadius: 3,
                width: 320, // static width for uniformity
                margin: "0 auto",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <RecordVoiceOverIcon
                  sx={{ fontSize: 56, color: "#E07A5F", mb: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#3D405B", fontWeight: 600 }}
                >
                  Natural Multilingual Audio
                </Typography>
                <Typography sx={{ color: "#3D405B", opacity: 0.8 }}>
                  Listen to stories in your language with expressive, lifelike
                  narration—perfect for reading along or learning pronunciation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                background: "#e3f0fa",
                borderRadius: 3,
                width: 320, // static width for uniformity
                margin: "0 auto",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <AutoStoriesIcon
                  sx={{ fontSize: 56, color: "#E07A5F", mb: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#3D405B", fontWeight: 600 }}
                >
                  Culturally Relevant Content
                </Typography>
                <Typography sx={{ color: "#3D405B", opacity: 0.8 }}>
                  Our translations respect cultural context, ensuring stories
                  feel authentic and relatable for every reader.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: "center", padding: "32px 0 64px 0" }}>
        <Typography
          variant="h5"
          sx={{ color: "#3D405B", fontWeight: 500, mb: 2 }}
        >
          Ready to experience stories in your language?
        </Typography>
        <a href="/resources/library" style={{ textDecoration: "none" }}>
          <Box
            component="span"
            sx={{
              background: "#1B6CA8",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.15rem",
              boxShadow: "0 4px 24px 0 rgba(27,108,168,0.10)",
              "&:hover": { bgcolor: "#17497A" },
              transition: "background 0.2s",
              cursor: "pointer",
            }}
          >
            Explore Our Library
          </Box>
        </a>
      </section>
    </div>
  );
}
