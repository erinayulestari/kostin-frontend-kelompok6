import { UserRound, User, Users, Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ type, image }) {
  const navigate = useNavigate();

  const data = {
    putri: {
      title: "Kost Putri",
      desc: "Nyaman dan aman untuk putri",
      icon: <UserRound size={24} />,
    },
    putra: {
      title: "Kost Putra",
      desc: "Tempat tinggal praktis untuk putra",
      icon: <User size={24} />,
    },
    campur: {
      title: "Kost Campur",
      desc: "Pilihan fleksibel untuk semua",
      icon: <Users size={24} />,
    },
    premium: {
      title: "Kost Premium",
      desc: "Fasilitas lengkap dan eksklusif",
      icon: <Crown size={24} />,
    },
  };

  const category = data[type] || data.putri;

  const handleClick = () => {
    navigate(`/carikost?tipe=${type}`);
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="category-top">
        <img src={image} alt={category.title} className="category-img" />
        <div className="category-icon">{category.icon}</div>
      </div>

      <div className="category-content">
        <h3>{category.title}</h3>
        <p>{category.desc}</p>
        <button type="button" onClick={handleClick}>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}