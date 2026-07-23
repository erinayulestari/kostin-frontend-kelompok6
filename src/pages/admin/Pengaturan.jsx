import React from "react";
import Sidebar from "../../components/admin/SidebarAdmin";
import ProfileCard from "../../components/ProfileCard";
import "../../styles/profile.css";

export default function Pengaturan() {
  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Admin */}
      <Sidebar />

      {/* Main Content Container */}
      <div
        className="pengaturan-container"
        style={{ flex: 1, minWidth: 0, marginLeft: "250px", padding: "30px" }}
      >
        {/* Header Page */}
        <div className="page-header-row" style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
            Pengaturan Profil Admin
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Kelola informasi akun dan data pribadi administrator Anda.
          </p>
        </div>

        {/* Dynamic Profile Card (Samakan tampilan dengan Pemilik & Pencari) */}
        <div style={{ maxWidth: "100%" }}>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}