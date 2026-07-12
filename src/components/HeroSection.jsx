import kost from "../assets/kost.jpg";
import { Home } from "lucide-react";

export default function HeroSection(){

return(
<div className="hero">
<div className="brand">
  <div className="logo">
    <Home 
    size={26}
    strokeWidth={2.5}
    />
    
    <span>
      KostIn
    </span>
  </div>
  <h1>
    Cari kost
    <br/>
    jadi <span>lebih mudah</span>
  </h1>

<p>
  Temukan berbagai pilihan kost terbaik
<br/>
  di seluruh Indonesia sesuai kebutuhanmu
</p>
</div>
<img
src={kost}
className="hero-image"
alt="kost"

/>
</div>
)
}