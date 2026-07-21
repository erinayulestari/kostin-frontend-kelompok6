import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiClock,
  FiUser,
  FiHome,
  FiFileText,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
  FiArrowLeft
} from "react-icons/fi";

import { InfoCard, DataRow } from "../../components/admin/InfoCard";
import DokumenCard from "../../components/admin/DokumenCard";
import MapLokasiCard from "../../components/admin/MapLokasiCard";

import "../../styles/admin/detail-verifikasi.css";

export default function DetailVerifikasiPemilik() {
  const navigate = useNavigate();
  const [catatan, setCatatan] = useState("");

  const handleApprove = () => {
    alert("Pemilik kost berhasil disetujui!");
    navigate("/admin/verifikasi-pemilik");
  };

  const handleReject = () => {
    if (!catatan.trim()) {
      alert("Harap berikan catatan atau alasan penolakan terlebih dahulu.");
      return;
    }
    alert("Pengajuan verifikasi berhasil ditolak.");
    navigate("/admin/verifikasi-pemilik");
  };

  return (
    <div className="detail-verifikasi-container">
      <div className="breadcrumb">
        Verifikasi Pemilik &gt; <span>Detail Verifikasi</span>
      </div>

      <div className="page-header-row">
        <div className="header-title-group">
          <h1>Verifikasi Pemilik Kost</h1>
          <p>Tinjau data dan dokumen pemilik kost sebelum memberikan persetujuan.</p>
        </div>
        <div className="header-status-badge pending">
          <FiClock size={15} />
          Menunggu Verifikasi
        </div>
      </div>

      <div className="detail-grid-row">
        <InfoCard icon={FiUser} title="1. Informasi Pemilik">
          <div className="pemilik-info-wrapper">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              alt="Siti Aisyah"
              className="pemilik-avatar-lg"
            />
            <div className="data-list">
              <DataRow label="Nama Lengkap" value="Siti Aisyah" />
              <DataRow label="Email" value="siti.aisyah@email.com" />
              <DataRow label="Nomor Telepon" value="0813 9876 5432" />
              <DataRow label="NIK" value="3271 6801 9203 0001" />
              <DataRow
                label="Alamat"
                value="Jl. Melati No.20, Depok Jaya, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16432"
              />
              <DataRow label="Tanggal Pengajuan" value="14 Mei 2024, 10:30 WIB" />
            </div>
          </div>
        </InfoCard>

        <InfoCard icon={FiHome} title="2. Informasi Kost">
          <div className="data-list">
            <DataRow label="Nama Kost" value="Kost Putri Alifia" />
            <DataRow
              label="Jenis Kost"
              customRender={<span className="badge-tag-type">Putri</span>}
            />
            <DataRow
              label="Alamat Lengkap"
              value="Jl. Melati No.20, Depok Jaya, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16432"
            />
            <DataRow label="Provinsi" value="Jawa Barat" />
            <DataRow label="Kota" value="Depok" />
            <DataRow label="Jumlah Kamar" value="12 Kamar" />
            <DataRow label="Harga Mulai" value="Rp 1.200.000 / bulan" />
            <DataRow
              label="Deskripsi Singkat"
              value="Kost putri nyaman, bersih, dan aman. Dekat dengan kampus dan pusat perbelanjaan. Fasilitas lengkap dengan harga terjangkau."
            />
          </div>
        </InfoCard>
      </div>

      <div className="detail-grid-row">
        <InfoCard icon={FiFileText} title="3. Dokumen Verifikasi">
          <div className="dokumen-grid">
            <DokumenCard
              title="Foto KTP"
              fileName="KTP_SitiAisyah.jpg"
              fileSize="1.2 MB"
              imgSrc="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200"
            />
            <DokumenCard
              title="Foto Depan Kost"
              fileName="Depan_Kost.jpg"
              fileSize="2.4 MB"
              imgSrc="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200"
            />
            <DokumenCard
              title="Foto Lingkungan Kost"
              fileName="Lingkungan_Kost.jpg"
              fileSize="1.8 MB"
              imgSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200"
            />
            <DokumenCard
              title="Surat Kepemilikan"
              fileName="Sertifikat.jpg"
              fileSize="1.8 MB"
              imgSrc="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200"
            />
          </div>

          <div className="dokumen-info-note">
            <FiInfo size={14} color="#0066ff" />
            <span>Klik gambar untuk melihat ukuran penuh</span>
          </div>
        </InfoCard>

        <MapLokasiCard lat="-6.2088" lng="106.8456" />
      </div>

      <InfoCard icon={FiFileText} title="Catatan Admin">
        <textarea
          className="catatan-textarea"
          placeholder="Tulis catatan atau alasan jika pengajuan ditolak (opsional)"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        ></textarea>
        <p className="catatan-hint">Catatan ini tidak akan ditampilkan ke pemilik kost.</p>
      </InfoCard>

      <div className="bottom-action-bar">
        <Link to="/admin/verifikasi-pemilik" className="btn-back-outline">
          <FiArrowLeft size={16} /> Kembali
        </Link>

        <div className="action-buttons-group">
          <button type="button" className="btn-reject-outline" onClick={handleReject}>
            <FiXCircle size={16} /> Tolak Verifikasi
          </button>
          <button type="button" className="btn-approve-solid" onClick={handleApprove}>
            <FiCheckCircle size={16} /> Setujui Verifikasi
          </button>
        </div>
      </div>
    </div>
  );
}