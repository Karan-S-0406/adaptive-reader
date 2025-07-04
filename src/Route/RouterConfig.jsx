import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import Translations from "../pages/Features/Translations/Translations";
import SimplifiedTexts from "../pages/Features/Reading-Level/SimplifiedTexts";
import AudioBooks from "../pages/Features/Audio-Books/AudioBooks";
import Pricing from "../pages/Pricing";
import Footer from "../components/Footer";
import SideBySideReader from "../pages/SideBySideReader";
import FreeDownloads from "../pages/Resources/FreeDownloads/FreeDownloads";
import RequestContent from "../pages/Resources/RequestContent/RequestContent";
import Library from "../pages/Resources/Library/Library";
import Story from "../pages/About/Story/Story";
import Mission from "../pages/About/Mission/Mission";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import BookGallery from "../pages/BookGallery/BookGallery";
import BookDetails from "../pages/BookGallery/BookDetails";

export default function RouterConfig() {
  return (
    <>
      <Header />
      <div style={{ marginTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Features */}
          <Route path="/features/translations" element={<Translations />} />
          <Route
            path="/features/reading-levels"
            element={<SimplifiedTexts />}
          />
          <Route path="/features/audio-books" element={<AudioBooks />} />

          {/* Resources */}
          <Route path="/resources/library" element={<Library />} />
          <Route
            path="/resources/request-content"
            element={<RequestContent />}
          />
          <Route path="/resources/free-downloads" element={<FreeDownloads />} />

          {/* About */}
          <Route path="/about/story" element={<Story />} />
          <Route path="/about/mission" element={<Mission />} />

          {/* Other */}
          <Route path="/gallery" element={<BookGallery />} />
          <Route path="/live-demo" element={<SideBySideReader />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book/:title" element={<BookDetails />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
