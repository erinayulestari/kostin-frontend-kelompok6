import {
  MapPin,
  BedDouble,
  Eye,
  Pencil,
} from "lucide-react";

export default function PropertyCard({ property }) {

  return (

    <div className="property-card">

      <div className="property-image">

        <img
          src={property.image}
          alt={property.name}
        />

        <span
          className={
            property.status === "Aktif"
              ? "property-badge active"
              : "property-badge full"
          }
        >
          {property.status}
        </span>

      </div>

      <div className="property-body">

        <h3>{property.name}</h3>

        <p className="property-location">

          <MapPin size={16} />

          {property.location}

        </p>

        <div className="property-price">

          {property.price}

          <span>/bulan</span>

        </div>

        <div className="property-info">

          <span>

            <BedDouble size={16} />

            {property.room}

          </span>

          <span>{property.available}</span>

        </div>

        <div className="property-action">

          <button className="detail">

            <Eye size={16} />

            Detail

          </button>

          <button className="edit">

            <Pencil size={16} />

            Edit

          </button>

        </div>

      </div>

    </div>

  );

}