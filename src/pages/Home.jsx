import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";
import CategoryCard from "../components/CategoryCard";
import KostCard from "../components/KostCard";


import kost from "../assets/premium.jpeg";
import kost1 from "../assets/melati.jpeg";
import kost2 from "../assets/kost1.jpg";
import kost3 from "../assets/harmoni.jpeg";


import "../styles/home.css";




export default function Home(){


return(


<div>


<Navbar/>


<Hero/>


<SearchBox/>




<section className="category-section">


<h2>
Temukan Kost Sesuai Kebutuhanmu
</h2>




<div className="category-grid">



<CategoryCard

type="putri"

image={kost}

/>



<CategoryCard

type="putra"

image={kost}

/>



<CategoryCard

type="campur"

image={kost}

/>



<CategoryCard

type="premium"

image={kost}

/>



</div>


</section>








<section className="kost-section">


<h2>
Rekomendasi Kost Untukmu
</h2>





<div className="kost-list">





<KostCard


data={{

image:kost1,

name:"Kost Melati",

location:"Makassar",

price:"Rp800.000",

rating:"4.7"

}}



/>








<KostCard


data={{


image:kost2,

name:"Kost Sakura",

location:"Bandung",

price:"Rp1.200.000",

rating:"4.8"


}}



/>








<KostCard


data={{


image:kost3,

name:"Kost Harmoni",

location:"Jakarta",

price:"Rp1.500.000",

rating:"4.7"


}}



/>




</div>



</section>






<FeatureSection/>


<Footer/>



</div>


)


}