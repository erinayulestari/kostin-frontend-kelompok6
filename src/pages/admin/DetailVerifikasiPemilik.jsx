import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Clock as FiClock,
  User as FiUser,
  Home as FiHome,
  FileText as FiFileText,
  Info as FiInfo,
  CheckCircle2 as FiCheckCircle,
  XCircle as FiXCircle,
  ArrowLeft as FiArrowLeft
} from "lucide-react";

import { InfoCard, DataRow } from "../../components/admin/InfoCard";
import DokumenCard from "../../components/admin/DokumenCard";
import MapLokasiCard from "../../components/admin/MapLokasiCard";
import api from "../../api/api";
import defaultAvatar from "../../assets/avatar.jpg";
import defaultKostImg from "../../assets/harmoni.jpeg";

import "../../styles/admin/detail-verifikasi.css";

export default function DetailVerifikasiPemilik() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [catatan, setCatatan] = useState("");
  const [kosDetail, setKosDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await api.get('/admin/kos');
        if (res.data && Array.isArray(res.data)) {
          const found = res.data.find((k) => String(k.id) === String(id));
          if (found) {
            setKosDetail(found);
          } else if (res.data.length > 0) {
            setKosDetail(res.data[0]);
          }
        }
      } catch (err) {
        console.error("Gagal memuat detail verifikasi kos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  const handleApprove = async () => {
    const targetId = kosDetail?.id || id;
    if (!targetId) return;

    try {
      await api.put(`/admin/kos/${targetId}/status`, { status: "aktif" });
      alert("Pemilik kost & data kos berhasil disetujui!");
      navigate("/admin/verifikasi-pemilik");
    } catch (err) {
      console.error("Gagal menyetujui kos:", err);
      alert(err.message || "Gagal menyetujui verifikasi kos.");
    }
  };

  const handleReject = async () => {
    const targetId = kosDetail?.id || id;
    if (!targetId) return;

    try {
      await api.put(`/admin/kos/${targetId}/status`, { status: "ditolak" });
      alert("Pengajuan verifikasi kos berhasil ditolak.");
      navigate("/admin/verifikasi-pemilik");
    } catch (err) {
      console.error("Gagal menolak kos:", err);
      alert(err.message || "Gagal menolak verifikasi kos.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Memuat detail verifikasi...</p>
      </div>
    );
  }

  const pemilik = kosDetail?.pemilik || {};
  const statusStr = kosDetail?.status || "pending";

  const fotoKtp = pemilik.foto_ktp_url || null;
  const fotoUtama = kosDetail?.foto_utama_url || kosDetail?.foto_utama || defaultKostImg;

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
        <div className={`header-status-badge ${statusStr === 'aktif' ? 'approved' : statusStr === 'pending' ? 'pending' : 'rejected'}`}>
          <FiClock size={15} />
          {statusStr === 'aktif' ? 'Disetujui' : statusStr === 'pending' ? 'Menunggu Verifikasi' : 'Ditolak'}
        </div>
      </div>

      <div className="detail-grid-row">
        <InfoCard icon={FiUser} title="1. Informasi Pemilik">
          <div className="pemilik-info-wrapper">
            <img
              src={pemilik.foto_profil_url || defaultAvatar}
              alt={pemilik.nama || "Pemilik Kost"}
              className="pemilik-avatar-lg"
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
            <div className="data-list">
              <DataRow label="Nama Lengkap" value={pemilik.nama || pemilik.name || "Pemilik Kost"} />
              <DataRow label="Email" value={pemilik.email || "-"} />
              <DataRow label="Nomor Telepon" value={pemilik.no_hp || "-"} />
              <DataRow label="Role" value={(pemilik.role || "pemilik").toUpperCase()} />
              <DataRow label="NIK" value={pemilik.nik || "-"} />
              <DataRow
                label="Alamat"
                value={pemilik.alamat || kosDetail?.alamat || "Indonesia"}
              />
              <DataRow label="Tanggal Pengajuan" value={kosDetail?.created_at ? new Date(kosDetail.created_at).toLocaleDateString("id-ID") : "Baru"} />
            </div>
          </div>
        </InfoCard>

        <InfoCard icon={FiHome} title="2. Informasi Kost">
          <div className="data-list">
            <DataRow label="Nama Kost" value={kosDetail?.nama_kos || "Kost"} />
            <DataRow
              label="Jenis Kost"
              customRender={<span className="badge-tag-type">{kosDetail?.tipe ? kosDetail.tipe.toUpperCase() : "KOST"}</span>}
            />
            <DataRow
              label="Alamat Lengkap"
              value={kosDetail?.alamat || "-"}
            />
            <DataRow label="Kota" value={kosDetail?.kota || "-"} />
            <DataRow label="Jumlah Kamar" value={`${kosDetail?.jumlah_kamar || 0} Kamar`} />
            <DataRow label="Harga Mulai" value={`Rp ${Number(kosDetail?.harga_per_bulan || 0).toLocaleString("id-ID")} / bulan`} />
            <DataRow
              label="Deskripsi Singkat"
              value={kosDetail?.deskripsi || "Tidak ada deskripsi."}
            />
          </div>
        </InfoCard>
      </div>

      <div className="detail-grid-row">
        <InfoCard icon={FiFileText} title="3. Dokumen Verifikasi">
          <div className="dokumen-grid">
            <DokumenCard
              title="Foto KTP"
              fileName={fotoKtp ? "Dokumen KTP Pemilik" : "Belum diunggah"}
              fileSize="-"
              imgSrc={fotoKtp || defaultAvatar}
            />
            <DokumenCard
              title="Foto Utama Kost"
              fileName="Bangunan_Utama.jpg"
              fileSize="-"
              imgSrc={fotoUtama}
            />
          </div>

          <div className="dokumen-info-note">
            <FiInfo size={14} color="#0066ff" />
            <span>Dokumen diunggah secara resmi oleh pemilik kos.</span>
          </div>
        </InfoCard>

        <MapLokasiCard lat={kosDetail?.lat || kosDetail?.latitude || "-6.2088"} lng={kosDetail?.lng || kosDetail?.longitude || "106.8456"} />
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

        {statusStr !== "aktif" && (
          <div className="action-buttons-group">
            {statusStr !== "ditolak" && (
              <button type="button" className="btn-reject-outline" onClick={handleReject}>
                <FiXCircle size={16} /> Tolak Verifikasi
              </button>
            )}
            <button type="button" className="btn-approve-solid" onClick={handleApprove}>
              <FiCheckCircle size={16} /> Setujui Verifikasi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}