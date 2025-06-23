import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import "./Mission.css";

const Mission = () => (
  <Paper className="mission-container" elevation={3}>
    <Typography variant="h2" align="center" gutterBottom>
      Our Mission
    </Typography>

    <Typography variant="h5" gutterBottom>
      Empowering Every Learner, Everywhere
    </Typography>
    <Typography paragraph>
      At Personalized Reader, our mission is to make reading accessible, engaging, and meaningful for every student. We believe that every learner deserves the opportunity to understand and enjoy content, regardless of their reading level, language, or background. Our commitment is to create adaptive tools that open doors to knowledge and empower students to reach their full potential.
    </Typography>

    <Typography variant="h6" gutterBottom>
      What Drives Us
    </Typography>
    <Box component="ul" className="mission-list">
      <li>
        <strong>Access for All:</strong> We strive to remove barriers to reading by providing personalized support, translations, and audio options so every student can participate fully in learning.
      </li>
      <li>
        <strong>Student Choice:</strong> We believe students should have the freedom to choose how they read and interact with content—whether that’s listening, reading in their preferred language, or adjusting the reading level.
      </li>
      <li>
        <strong>Equity and Inclusion:</strong> Our platform is designed to celebrate diversity and ensure that no learner is left behind, regardless of their starting point.
      </li>
      <li>
        <strong>Privacy and Trust:</strong> We protect student data and privacy, ensuring a safe and secure learning environment for all users.
      </li>
    </Box>

    <Typography variant="h6" gutterBottom>
      How We Bring Our Mission to Life
    </Typography>
    <Box component="ul" className="mission-list">
      <li>
        <strong>Innovative Technology:</strong> We use AI and adaptive algorithms to tailor reading experiences to each learner’s needs, making content accessible and engaging.
      </li>
      <li>
        <strong>Collaboration with Educators:</strong> We partner with teachers, schools, and families to ensure our solutions fit real classroom needs and support effective teaching.
      </li>
      <li>
        <strong>Continuous Improvement:</strong> We listen to our users and evolve our platform based on feedback, research, and the changing needs of students and educators.
      </li>
      <li>
        <strong>Community Focus:</strong> We foster a supportive community where learners, educators, and families can share insights and celebrate progress together.
      </li>
    </Box>

    <Typography variant="h6" gutterBottom>
      Join Us in Transforming Reading
    </Typography>
    <Typography paragraph>
      Personalized Reader is dedicated to building a future where every learner can access, enjoy, and succeed with reading. Together, we can create a world where literacy is truly for everyone.
    </Typography>
  </Paper>
);

export default Mission;