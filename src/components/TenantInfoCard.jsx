import {
  UserRound,
  CalendarDays,
  Clock3,
  SquarePen,
} from "lucide-react";

export default function TenantInfoCard({ tenant }) {
  return (
    <section className="checkout-card">

      {/* Header */}

      <div className="checkout-card-title">

        <div className="checkout-card-icon">
          <UserRound size={22} />
        </div>

        <h3>1. Informasi Penyewa</h3>

      </div>

      {/* Content */}

      <div className="tenant-grid">

        {/* Left */}

        <div className="tenant-column">

          <div className="tenant-item">

            <span>Nama Lengkap</span>

            <h4>{tenant.name}</h4>

          </div>

          <div className="tenant-item">

            <span>Email</span>

            <h4>{tenant.email}</h4>

          </div>

          <div className="tenant-item">

            <span>Nomor Telepon</span>

            <h4>{tenant.phone}</h4>

          </div>

        </div>

        {/* Right */}

        <div className="tenant-column">

          <div className="tenant-row">

            <div className="tenant-row-icon">
              <CalendarDays size={20} />
            </div>

            <div>

              <span>Tanggal Masuk</span>

              <h4>01 Juni 2024</h4>

            </div>

          </div>

          <div className="tenant-row">

            <div className="tenant-row-icon">
              <Clock3 size={20} />
            </div>

            <div>

              <span>Durasi Sewa</span>

              <h4>6 Bulan</h4>

            </div>

          </div>

        </div>

      </div>

      {/* Button */}

      <div className="tenant-action">

        <button className="outline-btn">

          <SquarePen size={18} />

          Ubah Informasi

        </button>

      </div>

    </section>
  );
}