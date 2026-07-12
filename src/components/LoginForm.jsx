import { useState } from "react";
import { Eye, EyeOff, UserRound, House } from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function LoginForm(){
    const navigate = useNavigate();
const [showPassword,setShowPassword]=useState(false);
const [role,setRole]=useState("pencari");
return(
<div className="form">
<h2>
    Selamat datang kembali! 👋
</h2>
<p>
    Masuk untuk melanjutkan pencarian kost terbaikmu.
</p>
<label>Email</label>
<input 
  type="email"
  placeholder="Masukkan email kamu"
/>
  <label>Password</label>
  <div className="password">
<input
  type={showPassword ? "text" : "password"}
placeholder="Masukkan password kamu"
/>
<button
  type="button"
  className="eye-btn"
  onClick={()=>setShowPassword(!showPassword)}
>
{
  showPassword
  ?
  <EyeOff size={20}/>
  :
  <Eye size={20}/>
}
</button>
</div>
<a
href="#"
className="forgot"
>

    Lupa password?
</a>
<button
onClick={()=>navigate("/")}
>
Masuk
</button>
<div className="role-box">
<div className="role-title">
<h4>
   
    Mau masuk sebagai siapa?
</h4>
<p>
   
    Pilih sesuai kebutuhanmu
</p>
</div>
<div
onClick={()=>setRole("pencari")}
className={
role==="pencari"
?
"role-card active"
:
"role-card"
}
>
<UserRound size={22}/>
<strong>
  
    Pencari Kost
</strong>
</div>
<div
onClick={()=>setRole("pemilik")}
className={
role==="pemilik"
?
"role-card active"
:
"role-card"
}
>

<House size={22}/>
<strong>
    Pemilik Kost

</strong>
</div>
</div>
</div>

)

}