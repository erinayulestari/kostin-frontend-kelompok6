import RegisterHero from "../components/RegisterHero";
import RegisterForm from "../components/RegisterForm";
import "../styles/register.css";

export default function Register() {
  return (
    <div className="page">
      <div className="register-container">

        <RegisterHero />

        <RegisterForm />

      </div>
    </div>
  );
}