import {
  Building2,
  CircleCheckBig,
  BedDouble,
  Ban,
} from "lucide-react";

export default function PropertyStats() {
  const stats = [
    {
      title: "Total Kost",
      value: "12",
      icon: <Building2 size={24} />,
      color: "#2563EB",
    },
    {
      title: "Aktif",
      value: "8",
      icon: <CircleCheckBig size={24} />,
      color: "#22C55E",
    },
    {
      title: "Penuh",
      value: "3",
      icon: <BedDouble size={24} />,
      color: "#F59E0B",
    },
    {
      title: "Nonaktif",
      value: "1",
      icon: <Ban size={24} />,
      color: "#EF4444",
    },
  ];

  return (
    <section className="property-stats">

      {stats.map((item, index) => (

        <div
          key={index}
          className="property-stat-card"
        >

          <div
            className="property-stat-icon"
            style={{
              background: item.color + "15",
              color: item.color,
            }}
          >
            {item.icon}
          </div>

          <div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

          </div>

        </div>

      ))}

    </section>
  );
}