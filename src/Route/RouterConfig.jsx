import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import Translations from "../pages/Features/Translations/Translations";
import SimplifiedTexts from "../pages/Features/Reading-Level/SimplifiedTexts";
import AudioBooks from "../pages/Features/Audio-Books/AudioBooks";
import Pricing from "../pages/Pricing";
import Footer from "../components/Footer";
import SideBySideReader from "../pages/SideBySideReader";

// Placeholder components for each route
const Features = () => <div>Features Page</div>;
const PrintOnDemand = () => <div>Print On Demand</div>;

const Resources = () => <div>Resources Page</div>;
const VideoTutorials = () => <div>Video Tutorials</div>;
const TeacherGuide = () => <div>Teacher Guide</div>;
const FreeDownloads = () => <div>Free Downloads</div>;

const About = () => <div>About Page</div>;
const Story = () => <div>Story</div>;
const Mission = () => <div>Mission</div>;
const Careers = () => <div>Careers</div>;

const Library = () => <div>Library Page</div>;
const Login = () => <div>Login Page</div>;
const SignUp = () => <div>Sign Up Page</div>;

export default function RouterConfig() {
  return (
    <>
      <Header />
      <div style={{marginTop: "64px"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Features */}
          <Route path="/features" element={<Features />} />
          <Route path="/features/translations" element={<Translations />} />
          <Route
            path="/features/reading-levels"
            element={<SimplifiedTexts />}
          />
          <Route path="/features/audio-books" element={<AudioBooks />} />
          <Route path="/features/print-on-demand" element={<PrintOnDemand />} />
          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/resources/video-tutorials"
            element={<VideoTutorials />}
          />
          <Route path="/resources/teacher-guide" element={<TeacherGuide />} />
          <Route path="/resources/free-downloads" element={<FreeDownloads />} />
          {/* About */}
          <Route path="/about" element={<About />} />
          <Route path="/about/story" element={<Story />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/careers" element={<Careers />} />
          {/* Other */}
          <Route path="/live-demo" element={<SideBySideReader />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
