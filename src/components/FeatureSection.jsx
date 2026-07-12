import {
MapPin,
Wallet,
House,
Map
} from "lucide-react";


export default function FeatureSection(){

const data=[

{
icon:<MapPin/>,
title:"Lokasi Terpercaya",
desc:"Cari kost dengan lokasi jelas"
},

{
icon:<Wallet/>,
title:"Harga Transparan",
desc:"Bandingkan harga kost"
},


{
icon:<House/>,
title:"Banyak Pilihan",
desc:"Ribuan kost tersedia"
},


{
icon:<Map/>,
title:"Maps Terintegrasi",
desc:"Lihat lokasi kost"
}


]


return(

<section className="feature">


<h2>
Kenapa Memilih Kostin?
</h2>


<div className="feature-grid">


{
data.map((item,index)=>(

<div className="feature-card" key={index}>


{item.icon}


<h3>
{item.title}
</h3>


<p>
{item.desc}
</p>


</div>

))
}


</div>


</section>

)

}