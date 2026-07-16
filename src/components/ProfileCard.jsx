import {
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";

import avatar from "../assets/avatar.jpg";

export default function ProfileCard() {
  return (
    <section className="profile-card">

      {/* ================= Header ================= */}

      <div className="profile-top">

        <div className="profile-avatar">

          <img
            src={avatar}
            alt="Profile"
          />

          <button className="camera-btn">
            <Camera size={18} />
          </button>

        </div>

        <div className="profile-info">

          <h2>Erin Ayu Lestari</h2>

          <span className="profile-role">
            Pencari Kost
          </span>

          <button className="photo-btn">
            <Camera size={18} />
            Ubah Foto
          </button>

        </div>

      </div>

      <hr />

      {/* ================= Content ================= */}

      <div className="profile-content">

        {/* LEFT */}

        <div className="profile-column">

          <div className="profile-item">

            <div className="profile-icon">
              <User size={20} />
            </div>

            <div>
              <span>Nama Lengkap</span>
              <h4>Erin Ayu Lestari</h4>
            </div>

          </div>

          <div className="profile-item">

            <div className="profile-icon">
              <Mail size={20} />
            </div>

            <div>
              <span>Email</span>
              <h4>erin.ayu@email.com</h4>
            </div>

          </div>

          <div className="profile-item">

            <div className="profile-icon">
              <Phone size={20} />
            </div>

            <div>
              <span>Nomor Telepon</span>
              <h4>0812 3456 7890</h4>
            </div>

          </div>

          <div className="profile-item">

            <div className="profile-icon">
              <User size={20} />
            </div>

            <div>
              <span>Jenis Kelamin</span>
              <h4>Perempuan</h4>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="profile-column">

          <div className="profile-item">

            <div className="profile-icon">
              <Calendar size={20} />
            </div>

            <div>
              <span>Tanggal Lahir</span>
              <h4>15 April 2002</h4>
            </div>

          </div>

          <div className="profile-item">

            <div className="profile-icon">
              <MapPin size={20} />
            </div>

            <div>
              <span>Alamat</span>

              <h4>
                Jl. Pendidikan No.12,
                Tamalanrea,
                Kota Makassar,
                Sulawesi Selatan
              </h4>

            </div>

          </div>

        </div>

      </div>

      <hr />

      {/* ================= Footer ================= */}

      <div className="profile-footer">

        <button className="cancel-btn">
          Batal
        </button>

        <button className="edit-btn">
          Edit Profil
        </button>

      </div>

    </section>
  );
}