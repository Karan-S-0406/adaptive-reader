import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import GroupIcon from "@mui/icons-material/Group";
import TranslateIcon from "@mui/icons-material/Translate";
import audiobooks from "../../../assets/audiobooks.svg";
import "./AudioBooks.css";

export default function AudioBooks() {
  return (
    <div className="audio-root">
      {/* Key Features */}
      <section className="audio-features-section">
        <Typography variant="h4" className="audio-features-title">
          Key Features
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          className="audio-features-grid"
        >
          <Grid item xs={12} md={4} className="audio-feature-item">
            <HeadphonesIcon sx={{ fontSize: 48, color: "#E07A5F" }} />
            <Typography className="audio-feature-heading">
              High Quality Audio
            </Typography>
            <Typography className="audio-feature-desc">
              Both of our audio companions are high-quality AI audio that sounds
              like a real person.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className="audio-feature-item">
            <GroupIcon sx={{ fontSize: 48, color: "#E07A5F" }} />
            <Typography className="audio-feature-heading">
              Companion Reading
            </Typography>
            <Typography className="audio-feature-desc">
              Audio companions are synced with the reader on digital and/or
              paper Personalized Reader products.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className="audio-feature-item">
            <TranslateIcon sx={{ fontSize: 48, color: "#E07A5F" }} />
            <Typography className="audio-feature-heading">
              30 Languages
            </Typography>
            <Typography className="audio-feature-desc">
              Audio is available in 30 languages.
            </Typography>
          </Grid>
        </Grid>
      </section>

      {/* What are Audio Companions */}
      <section className="audio-what-section">
        <div className="audio-what-container">
          <div className="audio-what-left">
            <Typography variant="h5" className="audio-what-title">
              What are Audio Companions?
            </Typography>
            <Typography className="audio-what-desc">
              Audio companions are audio versions of texts that read aloud to
              students in their home language or English. This feature helps
              students improve their listening skills, pronunciation, and
              overall comprehension by hearing the text as they follow along.
            </Typography>
          </div>
          <div className="audio-what-right">
            <img
              src={audiobooks}
              alt="Inclusive Reading"
              className="audio-what-img"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="audio-benefits-section">
        <Typography variant="h4" className="audio-benefits-title">
          Benefits of Audio Companions
        </Typography>
        <div className="audio-benefits-container">
          <div className="audio-benefits-texts">
            <Typography variant="h6" className="audio-benefits-subheading">
              Emerging Bilinguals, also known as English Language Learners
              (ELLs)
            </Typography>
            <Typography className="audio-benefits-desc">
              <b>Personalized Comprehension:</b> Listening to the text in their
              home language helps emerging bilinguals improve word awareness,
              oral fluency, and understanding. English/English learners benefit
              from greater prosody and reinforcement of grade-level language
              proficiency.
            </Typography>
            <Typography variant="h6" className="audio-benefits-subheading">
              Students with Learning Differences
            </Typography>
            <Typography className="audio-benefits-desc">
              <b>Dyslexia, ADHD, and Other Learning Challenges:</b> Audio
              companions support students with reading challenges by allowing
              them to hear and decode text, follow its structure, and process
              information without being hindered by decoding difficulties.
            </Typography>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="audio-how-section">
        <Typography variant="h5" className="audio-how-title">
          How Personalized Reader’s Audio Companions Work ?
        </Typography>
        <div className="audio-how-cards">
          <Box className="audio-how-card">
            <Typography className="audio-how-card-title">
              Multilingual Options
            </Typography>
            <Typography className="audio-how-card-desc">
              Audio companions are available in 30 languages, supporting diverse
              classrooms.
            </Typography>
          </Box>
          <Box className="audio-how-card">
            <Typography className="audio-how-card-title">
              Synchronized Reading
            </Typography>
            <Typography className="audio-how-card-desc">
              Audio is synced with the digital or print text, so students can
              follow along easily.
            </Typography>
          </Box>
          <Box className="audio-how-card">
            <Typography className="audio-how-card-title">
              Narrator Variety
            </Typography>
            <Typography className="audio-how-card-desc">
              Choose from different narrator voices to match student
              preferences.
            </Typography>
          </Box>
          <Box className="audio-how-card">
            <Typography className="audio-how-card-title">
              Focus Access
            </Typography>
            <Typography className="audio-how-card-desc">
              Students can replay, pause, or adjust speed for better
              comprehension.
            </Typography>
          </Box>
        </div>
      </section>
    </div>
  );
}
