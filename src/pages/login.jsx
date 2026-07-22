import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import "../styles/login.css";

export default function Login({ isAdminLogin = false }) {
  return (
    <div className="page">
      <div className="login-container">
        <HeroSection isAdminLogin={isAdminLogin} />
        <LoginForm isAdminLogin={isAdminLogin} />
      </div>
    </div>
  );
}