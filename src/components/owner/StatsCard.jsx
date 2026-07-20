import {
  Home,
  CalendarCheck,
  BedDouble,
  Wallet,
  TrendingUp,
} from "lucide-react";

export default function StatsCard() {

  const stats = [
    {
      title: "Total Kost",
      value: "12",
      icon: <Home size={24} />,
      color: "#2563EB",
      change: "+2 Bulan Ini",
    },
    {
      title: "Booking Aktif",
      value: "28",
      icon: <CalendarCheck size={24} />,
      color: "#22C55E",
      change: "+8%",
    },
    {
      title: "Kamar Kosong",
      value: "8",
      icon: <BedDouble size={24} />,
      color: "#F59E0B",
      change: "Perlu Dipromosi",
    },
    {
      title: "Pendapatan",
      value: "Rp12,5 Jt",
      icon: <Wallet size={24} />,
      color: "#8B5CF6",
      change: "+15%",
    },
  ];

  return (

    <section className="stats-section">

      <div className="stats-grid">

        {stats.map((item, index) => (

          <div
            key={index}
            className="stat-card"
          >

            <div className="stat-top">

              <div
                className="stat-icon"
                style={{
                  background: `${item.color}20`,
                  color: item.color,
                }}
              >

                {item.icon}

              </div>

              <div className="stat-growth">

                <TrendingUp size={16} />

                <span>{item.change}</span>

              </div>

            </div>

            <h2>{item.value}</h2>

            <h4>{item.title}</h4>

          </div>

        ))}

      </div>

    </section>

  );

}