import React from "react";
import { Button, Typography, Grid, Tabs, Tab, Box, Paper } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import "./SimplifiedTexts.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`compare-tabpanel-${index}`}
      aria-labelledby={`compare-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function SimplifiedTexts() {
  const [tab, setTab] = React.useState(0);

  return (
    <div className="simplified-root">
      {/* Features Section */}
      <section className="simplified-features-section">
        <Typography variant="h4" className="simplified-features-title">
          Why Choose Smartzy?
        </Typography>
        <Grid
          container
          spacing={6}
          justifyContent="center"
          className="simplified-features-grid"
        >
          <Grid item xs={12} md={4} className="simplified-feature-item">
            <div className="simplified-feature-icon">
              <ArrowForwardIcon sx={{ fontSize: 64, color: "#E07A5F" }} />
            </div>
            <Typography variant="h6" className="simplified-feature-heading">
              Multiple Reading Levels
            </Typography>
            <Typography className="simplified-feature-desc">
              Each text is available in three expertly-leveled versions, so
              every student can access the same story at the right challenge.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className="simplified-feature-item">
            <div className="simplified-feature-icon">
              <ViewColumnIcon sx={{ fontSize: 64, color: "#E07A5F" }} />
            </div>
            <Typography variant="h6" className="simplified-feature-heading">
              Side-by-Side Comparison
            </Typography>
            <Typography className="simplified-feature-desc">
              Instantly compare original and simplified texts to scaffold
              learning and build confidence.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className="simplified-feature-item">
            <div className="simplified-feature-icon">
              <AutoStoriesIcon sx={{ fontSize: 64, color: "#E07A5F" }} />
            </div>
            <Typography variant="h6" className="simplified-feature-heading">
              Authentic Literature
            </Typography>
            <Typography className="simplified-feature-desc">
              Enjoy classics and modern works—faithfully adapted to preserve
              meaning, voice, and literary quality.
            </Typography>
          </Grid>
        </Grid>
      </section>

      {/* Compare Reading Levels Section */}
      <section className="simplified-compare-section">
        <Typography variant="h4" className="simplified-compare-title">
          Experience the Difference
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 4 }}>
          <Paper elevation={2} sx={{ borderRadius: 3, p: 2 }}>
            <Tabs
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              aria-label="Compare Reading Levels Tabs"
              textColor="inherit"
              TabIndicatorProps={{ style: { background: "#E07A5F" } }}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "& .MuiTab-root": {
                  color: "#E07A5F",
                  fontWeight: 500,
                  fontFamily: "serif",
                  textTransform: "none",
                  fontSize: 16,
                  minWidth: 120,
                },
                "& .Mui-selected": {
                  color: "#E07A5F",
                  fontWeight: 700,
                  borderBottom: "2px solid #E07A5F",
                },
              }}
            >
              <Tab label="Original" />
              <Tab label="Level 1" />
              <Tab label="Level 2" />
            </Tabs>
            <TabPanel value={tab} index={0}>
              <Typography sx={{ fontSize: 16, mb: 2 }}>
                'Inspirited by this wind of promise, my day dreams become more
                fervent and vivid. I try in vain to be persuaded that the pole
                is the seat of frost and desolation; it ever presents itself to
                my imagination as the region of beauty and delight.'
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                <i>Frankenstein</i> by Mary Shelley — 11th-12th grade reading
                level.
              </Typography>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Typography sx={{ fontSize: 16, mb: 2 }}>
                "Filled with hope, my dreams grew stronger and brighter. I could
                not believe the pole was only cold and empty; I always imagined
                it as a place full of beauty and wonder."
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                Level 1: 7th-8th grade reading level.
              </Typography>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Typography sx={{ fontSize: 16, mb: 2 }}>
                "I was excited and hopeful. I thought the North Pole would be a
                wonderful and beautiful place, not just cold and empty."
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                Level 2: 3rd-4th grade reading level.
              </Typography>
            </TabPanel>
          </Paper>
        </Box>
      </section>

      {/* What is a Leveled Text Section */}
      <section className="leveled-text-section">
          <div className="leveled-text-left">
            <Typography variant="h4" className="leveled-text-title">
              What Makes a Leveled Text?
            </Typography>
            <Typography className="leveled-text-desc">
              Leveled texts adapt vocabulary, sentence structure, and
              complexity—so every student can access the same core ideas and
              themes, but at a reading level that matches their skills.
              Smartzy ensures all learners engage deeply with
              authentic literature.
            </Typography>
            <ul className="leveled-text-list">
              <li>
                <ArrowForwardIcon
                  sx={{
                    fontSize: 22,
                    color: "#E07A5F",
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ marginLeft: 8 }}>
                  <b>Accessible Language:</b> Key vocabulary and phrases are
                  simplified without losing meaning.
                </span>
              </li>
              <li>
                <ViewColumnIcon
                  sx={{
                    fontSize: 22,
                    color: "#E07A5F",
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ marginLeft: 8 }}>
                  <b>Clear Structure:</b> Sentences and paragraphs are organized
                  for easier comprehension.
                </span>
              </li>
              <li>
                <AutoStoriesIcon
                  sx={{
                    fontSize: 22,
                    color: "#E07A5F",
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ marginLeft: 8 }}>
                  <b>Preserved Meaning:</b> Every version stays true to the
                  author’s voice and intent.
                </span>
              </li>
              <li>
                <Diversity3Icon
                  sx={{
                    fontSize: 22,
                    color: "#E07A5F",
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ marginLeft: 8 }}>
                  <b>Inclusive Design:</b> Supports diverse learning needs and
                  backgrounds.
                </span>
              </li>
            </ul>
          </div>
      </section>

      {/* Who Benefits Section */}
      <section className="leveled-benefits-section">
        <div className="leveled-benefits-container">
          <div className="leveled-benefits-title">
            <Typography variant="h4" className="leveled-benefits-heading">
              Who Benefits from Smartzy?
            </Typography>
          </div>
          <div className="leveled-benefits-content">
            <div className="leveled-benefits-texts">
              <Typography variant="h5" className="leveled-benefits-subheading">
                For Every Student
              </Typography>
              <Typography className="leveled-benefits-desc">
                <b>Emerging & Reluctant Readers:</b> Build confidence and skills
                with texts tailored to their reading level, ensuring no one is
                left behind.
              </Typography>
              <Typography variant="h5" className="leveled-benefits-subheading">
                Inclusive & Supportive Classrooms
              </Typography>
              <Typography className="leveled-benefits-desc">
                <b>Neurodiverse Learners:</b> Designed for students with
                dyslexia, ADHD, and other learning differences—making complex
                ideas accessible and engaging for all.
              </Typography>
              <Typography variant="h5" className="leveled-benefits-subheading">
                Multilingual Learners
              </Typography>
              <Typography className="leveled-benefits-desc">
                <b>English Language Learners:</b> Access the same rich stories
                as classmates, with language scaffolds and simplified vocabulary
                to support comprehension and growth.
              </Typography>
              <Typography variant="h5" className="leveled-benefits-subheading">
                Advanced & Gifted Readers
              </Typography>
              <Typography className="leveled-benefits-desc">
                <b>Challenge Seekers:</b> Explore original texts and
                higher-level adaptations to deepen literary analysis and
                critical thinking.
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
