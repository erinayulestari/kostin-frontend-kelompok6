import {
Heart,
MapPin,
Star
} from "lucide-react";



export default function KostCard({data}){


return(


<div className="kost-card">



<div className="kost-image">


<img

src={data.image}

alt={data.name}

/>



<button className="favorite">


<Heart size={20}/>


</button>



</div>





<div className="kost-content">



<h3>

{data.name}

</h3>





<p className="location">


<MapPin size={15}/>


{data.location}


</p>







<div className="price-rating">



<h4>

{data.price}/bulan

</h4>






<div className="rating">


<Star

size={17}

fill="#FACC15"

color="#FACC15"

/>



<span>

{data.rating}

</span>



</div>



</div>






<div className="facility">


<span>
WiFi
</span>


<span>
AC
</span>


<span>
Parkir
</span>



</div>



</div>




</div>



)


}