import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import "../styles/login.css";

export default function Login(){
return(
<div className="page">
<div className="login-container">

<HeroSection/>
<LoginForm/>

</div>
</div>

)

}