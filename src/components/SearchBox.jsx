export default function SearchBox(){

return(

<div className="search-box">


<div className="search-item">

<strong>
Lokasi / Kota
</strong>

<p>
Jakarta, Bandung
</p>

</div>




<div className="search-item">


<strong>
Tipe Kost
</strong>


<select>

<option>
Semua Tipe
</option>

<option>
Kost Putri
</option>

<option>
Kost Putra
</option>

<option>
Kost Campur
</option>


</select>


</div>






<div className="search-item">


<strong>
Fasilitas
</strong>


<select>


<option>
Semua Fasilitas
</option>


<option>
WiFi
</option>


<option>
AC
</option>


<option>
Parkir
</option>


</select>


</div>






<button>

Cari

</button>



</div>


)

}