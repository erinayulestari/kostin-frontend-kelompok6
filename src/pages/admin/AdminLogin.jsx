import HeroSection from "../../components/HeroSection";
import LoginForm from "../../components/LoginForm";
import "../../styles/login.css";

export default function AdminLogin() {
  return (
    <div className="page">
      <div className="login-container">
        {/* Sisi kiri Hero Section */}
        <HeroSection isAdminLogin={true} />

        {/* Sisi kanan Form Login Super Admin */}
        <LoginForm isAdminLogin={true} />
      </div>
    </div>
  );
}
