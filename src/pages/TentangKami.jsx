import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import VisionMission from "../components/VisionMission";
import AboutCTA from "../components/AboutCTA";

import "../styles/tentangkami.css";

export default function TentangKami() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        <AboutHero />

        <AboutStory />

        <VisionMission />

        <AboutCTA />

      </main>

      <Footer />
    </>
  );
}