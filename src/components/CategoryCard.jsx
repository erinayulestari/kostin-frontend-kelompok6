import {
UserRound,
User,
Users,
Crown,
ArrowRight
} from "lucide-react";


export default function CategoryCard({type,image}){


const data = {


putri:{
title:"Kost Putri",
desc:"Nyaman dan aman untuk putri",
icon:<UserRound size={24}/>
},


putra:{
title:"Kost Putra",
desc:"Tempat tinggal praktis untuk putra",
icon:<User size={24}/>
},


campur:{
title:"Kost Campur",
desc:"Pilihan fleksibel untuk semua",
icon:<Users size={24}/>
},


premium:{
title:"Kost Premium",
desc:"Fasilitas lengkap dan eksklusif",
icon:<Crown size={24}/>
}


}



const category=data[type];



return(

<div className="category-card">



<div className="category-top">


<img

src={image}

className="category-img"

/>



<div className="category-icon">

{category.icon}

</div>



</div>





<div className="category-content">


<h3>
{category.title}
</h3>



<p>
{category.desc}
</p>




<button>

<ArrowRight size={18}/>

</button>


</div>



</div>


)


}