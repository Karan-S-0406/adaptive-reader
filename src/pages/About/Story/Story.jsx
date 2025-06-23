import React from "react";
import { Typography, Paper } from "@mui/material";
import "./Story.css";

const Story = () => (
  <Paper className="story-container" elevation={3} style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
    <Typography variant="h1" align="center" gutterBottom>
      Our Story: The Journey of Personalized Reader
    </Typography>
    
    <Typography variant="h5" gutterBottom>The Inspiration Behind Personalized Reader</Typography>
    <Typography paragraph>
      Personalized Reader was born from a simple but powerful idea: every learner deserves access to knowledge, regardless of their reading ability or language background. Our founders, educators and technologists, witnessed firsthand how traditional reading materials often left students behind—especially those with dyslexia, language differences, or other learning challenges. They saw bright, curious minds struggle not because of a lack of intelligence, but because the content wasn’t accessible in a way that worked for them.
    </Typography>

    <Typography variant="h5" gutterBottom>Our Mission</Typography>
    <Typography paragraph>
      At Personalized Reader, our mission is to unlock the world of reading for everyone. We believe that reading should be a bridge, not a barrier. Our platform adapts text to each learner’s needs—whether that means adjusting reading levels, translating content, or providing audio narration—so that every student can engage, understand, and thrive.
    </Typography>

    <Typography variant="h5" gutterBottom>The Personalized Reader Approach</Typography>
    <Typography paragraph>
      We combine advanced technology with educational expertise to create a truly adaptive reading experience. Personalized Reader supports multiple languages, offers real-time text adjustments, and integrates seamlessly with classroom and home learning. Our AI-driven platform ensures that students receive content tailored to their unique strengths and challenges, empowering them to learn at their own pace.
    </Typography>

    <Typography variant="h5" gutterBottom>Empowering Every Learner</Typography>
    <Typography paragraph>
      We believe in student agency. Personalized Reader gives learners control over how they access information—whether they prefer to read, listen, or translate content. Teachers and parents can easily monitor progress and provide support, while students gain the confidence to participate fully in academic and social discussions.
    </Typography>

    <Typography variant="h5" gutterBottom>Privacy and Trust</Typography>
    <Typography paragraph>
      We are committed to protecting student privacy. Personalized Reader never collects unnecessary data, and all information is kept secure. Our goal is to provide a safe, supportive environment where every learner can succeed.
    </Typography>

    <Typography variant="h5" gutterBottom>Looking Forward</Typography>
    <Typography paragraph>
      Our journey is just beginning. We are constantly innovating, partnering with educators, schools, and families to expand our library and enhance our adaptive technology. As we look to the future, we remain dedicated to breaking down barriers and making reading accessible for all.
    </Typography>

    <Typography variant="h5" gutterBottom>Join Us</Typography>
    <Typography paragraph>
      Together, we can create a world where every learner has the tools they need to read, understand, and achieve their dreams. Join us on our mission to make reading truly personalized—for everyone.
    </Typography>
  </Paper>
);

export default Story;