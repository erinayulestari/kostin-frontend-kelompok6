import {Home, Search, Heart} from "lucide-react";
import {useNavigate} from "react-router-dom";


export default function Navbar(){


const navigate = useNavigate();


return(


<nav className="navbar">



<div className="logo-home">

<Home size={25}/>

<span>
KostIn
</span>

</div>




<div className="menu">

<a>Home</a>
<a>Cari Kost</a>
<a>Favorit</a>
<a>Tentang Kami</a>


</div>





<div className="nav-btn">


<button

onClick={()=>navigate("/login")}

>

Masuk

</button>




<button

className="register"

onClick={()=>navigate("/login")}

>

Daftar

</button>



</div>



</nav>


)


}