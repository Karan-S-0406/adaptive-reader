import { Button, Typography, Grid } from "@mui/material";
import "./Home.css";
import homePageImg from "../assets/homeBg.jpg";
import gamified from "../assets/gamified.png";
import smartMath from "../assets/smartMath.png";
import adaptiveReader from "../assets/adaptiveReader.png";
import { useNavigate } from "react-router-dom";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useAuthModal } from "../pages/LoginModal";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const familyFeatures = [
  {
    icon: <UploadIcon sx={{ color: "#1B6CA8", fontSize: 28 }} />,
    title: "Easy Assignment Upload",
    desc: "Parents can quickly upload and organize assignments with due dates and instructions.",
  },
  {
    icon: <CheckCircleIcon sx={{ color: "#28B463", fontSize: 28 }} />,
    title: "Progress Tracking",
    desc: "Monitor completion status and track learning progress with detailed analytics.",
  },
  {
    icon: <BarChartIcon sx={{ color: "#F5B041", fontSize: 28 }} />,
    title: "Performance Analytics",
    desc: "Visual dashboards showing improvement trends and achievement milestones.",
  },
  {
    icon: <PeopleAltIcon sx={{ color: "#A569BD", fontSize: 28 }} />,
    title: "Family Collaboration",
    desc: "Strengthen parent-child relationships through shared educational goals.",
  },
  {
    icon: <EventNoteIcon sx={{ color: "#2980B9", fontSize: 28 }} />,
    title: "Smart Scheduling",
    desc: "Automatic reminders and deadline management to keep everyone on track.",
  },
  {
    icon: <StarBorderIcon sx={{ color: "#F1C40F", fontSize: 28 }} />,
    title: "Achievement Rewards",
    desc: "Celebrate milestones with badges and achievements to motivate learning.",
  },
];

const featureData = [
  {
    iconImage: adaptiveReader,
    title: "Adaptive Reading Engine",
    description:
      "AI-powered space assessment that observes students read aloud, evaluating fluency and adjusting content to their exact reading level (A-Z+).",
    features: [
      "Voice-powered AI",
      "Real-time assessment",
      "Dynamic difficulty",
      "Lexile/ATOS scaling",
    ],
    cardColor: "linear-gradient(135deg, #4CAF50, #8BC34A)", // Example gradient
  },
  {
    iconImage: smartMath,
    title: "Smart Math Builder",
    description:
      "Math problems that adapt based on student responses. Struggling with fractions? Get extra practice! Flying through a pre-calc? Unlock advanced challenges!",
    features: [
      "Adaptive problems",
      "Intelligent hints",
      "Progress tracking",
      "Skill mastery",
    ],
    cardColor: "linear-gradient(135deg, #2196F3, #64B5F6)", // Example gradient
  },
  {
    iconImage: gamified,
    title: "Gamified Rewards",
    description:
      "Earn stars, badges, and points for completing challenges. Build reading streaks and unlock real-life rewards to keep your motivation high and electric.",
    features: [
      "Stars & badges",
      "Daily streaks",
      "Real rewards",
      "Achievement system",
    ],
    cardColor: "linear-gradient(135deg, #FFC107, #FFEB3B)", // Example gradient
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { openModal } = useAuthModal();

  return (
    <div className="main-content home-bg">
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          backgroundImage: `url(${homePageImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 5vw",
        }}
      >
        <div className="hero-overlay-container">
          <div className="hero-badge">🚀 Built for the Future of Learning</div>

          <Typography className="hero-title">
            Learning That <br />
            <span className="highlight-text">Adapts to You</span>
          </Typography>

          <Typography variant="h6" className="hero-subtext">
            Smartzy adapts every story and math problem to match your child’s
            level — never too hard, never too boring.
          </Typography>

          <Typography variant="body2" className="hero-quote">
            <em>
              Because learning should fit the child — not the other way around.
            </em>
          </Typography>

          <Typography variant="h5" className="cta-text">
            Read. Solve. Win.
          </Typography>

          <div className="hero-buttons-row">
            <Button
              variant="contained"
              className="cta-btn primary"
              onClick={() => {
                const storedUser = localStorage.getItem("userData");
                if (storedUser) {
                  try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser.role === "student") {
                      navigate("/dashboard/student");
                    } else if (parsedUser.role === "parent") {
                      navigate("/dashboard/parent");
                    } else {
                      openModal("student");
                    }
                  } catch (error) {
                    console.error("Invalid userData in localStorage:", error);
                    openModal("student");
                  }
                } else {
                  openModal("student");
                }
              }}
            >
              ⚡ Start Learning Now
            </Button>
          </div>
        </div>
      </section>
      {/* Feature Cards Section */}
      <div className="app-main-container">
        <header className="app-header">
          <div className="next-gen-ai-badge-v2">
            <span className="left-icons">
              🧠 <span className="flash-icon">🪄</span>
            </span>
            <span className="badge-label">Next-Gen AI Learning Engine</span>
            <span className="sliding-icon">⚙️</span>
          </div>

          <h1>
            Neural Intelligence That <br /> Evolves With You
          </h1>
        </header>

        <p className="app-description-text">
          Powered by quantum-inspired algorithms and neural networks, our AI
          doesn't just adapt — it predicts, learns, and evolves to create the
          perfect learning experience for every student.
        </p>

        <div className="feature-cards-wrapper">
          {featureData.map((card, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ background: card.cardGradient }}
            >
              <div className="card-header-content">
                <div
                  className="card-icon-circle"
                  style={{ backgroundColor: card.iconBgColor }}
                >
                  <img
                    src={card.iconImage}
                    alt={`${card.title} icon`}
                    className="card-actual-icon"
                  />
                </div>
                <h3>{card.title}</h3>
              </div>
              <p className="card-description-text">{card.description}</p>
              <ul className="card-features-list">
                {card.features.map((feature, i) => (
                  <li key={i}>
                    <span className="check-mark">✔</span>
                    <span className="feature-text">{feature}</span>
                    <ElectricBoltIcon className="bolt-inline-icon" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Family Features Section */}{" "}
      <section className="family-section">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 26, md: 36 },
            textAlign: "center",
            mb: 2,
            color: "#1B263B",
            fontFamily: "Montserrat, serif",
          }}
        >
          Everything You Need for{" "}
          <span style={{ color: "#f9c350" }}>Family Learning</span>
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "#5c6e80",
            fontSize: 18,
            maxWidth: 800,
            margin: "0 auto 40px auto",
          }}
        >
          Powerful tools designed to make education a collaborative and
          enjoyable experience for the whole family.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {familyFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div className="family-card">
                <div className="family-icon">{feature.icon}</div>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: "#5c6e80", fontSize: 15 }}>
                  {feature.desc}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </section>
      {/* Future Section */}
      <section className="future-banner">
        <div className="future-banner-content">
          <h2>
            ⚡ <strong>Ready to Experience the Future?</strong> 🌱
          </h2>
          <p>
            Join the neural revolution. Experience AI-powered learning that
            adapts, evolves, and transforms education for the next generation.
          </p>
          <div className="future-banner-buttons">
            <button
              className="btn primary-btn"
              onClick={() => openModal("student")}
            >
              🧠 Start Neural Learning
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
