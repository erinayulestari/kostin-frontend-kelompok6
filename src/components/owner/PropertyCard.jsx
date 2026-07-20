import {
  MapPin,
  BedDouble,
  MoreVertical,
} from "lucide-react";

export default function PropertyCard({ property }) {

  return (

    <div className="property-card">

      <img
        src={property.image}
        alt={property.name}
      />

      <div className="property-body">

        <div className="property-top">

          <h3>{property.name}</h3>

          <MoreVertical size={18} />

        </div>

        <p className="property-location">

          <MapPin size={15} />

          {property.location}

        </p>

        <h2>{property.price}</h2>

        <div className="property-info">

          <span>

            <BedDouble size={15} />

            {property.room}

          </span>

          <span>

            {property.empty}

          </span>

        </div>

        <div className="property-footer">

          <span
            className={
              property.status === "Aktif"
                ? "badge active"
                : "badge full"
            }
          >
            {property.status}
          </span>


        </div>

      </div>

    </div>

  );

}