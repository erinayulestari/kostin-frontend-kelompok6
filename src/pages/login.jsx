import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login(){
    const navigate = useNavigate();
return(
<div className="page">
<div className="login-container">

<HeroSection/>
<LoginForm/>

</div>
</div>

)

}