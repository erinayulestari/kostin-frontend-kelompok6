import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";

import "../styles/profile.css";

export default function Profile() {
  return (
    <>
      <Navbar />

      <main className="profile-page">

        <div className="profile-header">

          <h1>Profil Saya</h1>

          <p>
            Kelola informasi akun dan data pribadi Anda.
          </p>

        </div>

        <ProfileCard />

      </main>

      <Footer />
    </>
  );
}