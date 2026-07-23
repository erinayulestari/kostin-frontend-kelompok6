import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Pagination from "../../components/admin/Pagination";
import api from "../../api/api";
import CustomSelect from "../../components/admin/CustomSelect";
import { Clock, CheckCircle2, AlertCircle, RefreshCw, CreditCard, Building, Calendar, DollarSign } from "lucide-react";
import "../../styles/admin/admin-dashboard.css";

export default function PencairanDana() {
  const [disbursements, setDisbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchDisbursements = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/disbursements");
      if (res.data) {
        setDisbursements(res.data);
      }
    } catch (err) {
      console.error("Gagal memuat data pencairan dana:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisbursements();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/admin/disbursements/${id}/status`, { status: newStatus });
      setDisbursements((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status_disbursement: newStatus } : item))
      );
      alert(`Status pencairan berhasil diubah menjadi: ${newStatus}`);
    } catch (err) {
      console.error("Gagal memperbarui status pencairan:", err);
      alert(err.message || "Gagal memperbarui status pencairan.");
    }
  };

  const formatRupiah = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(val) || 0);
  };

  const formatPaymentType = (type) => {
    if (!type) return "Transfer Bank";
    const str = String(type).toUpperCase().replace(/_/g, " ");
    return str;
  };

  const totalPages = Math.ceil(disbursements.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisbursements = disbursements.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin
          title="Pencairan Dana (Disbursements)"
          subtitle="Pelacakan pencairan dana transaksi Midtrans ke pemilik kost."
        />

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat transaksi & pencairan dana...</p>
        ) : disbursements.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              color: "#64748b",
            }}
          >
            <AlertCircle size={40} style={{ marginBottom: "12px", color: "#94a3b8" }} />
            <h3>Belum ada transaksi Midtrans yang berhasil dicatat.</h3>
          </div>
        ) : (
          <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
              <h3 style={{ margin: 0, fontSize: "15px", color: "#1e293b", fontWeight: "600" }}>
                Riwayat Transaksi Midtrans & Bagi Hasil Pemilik
              </h3>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #cbd5e1", color: "#475569" }}>
                  <th style={{ padding: "12px 16px" }}>Order ID Midtrans</th>
                  <th style={{ padding: "12px 16px" }}>Item / Kos & Pemilik</th>
                  <th style={{ padding: "12px 16px" }}>Metode Bayar</th>
                  <th style={{ padding: "12px 16px" }}>Total Transaksi</th>
                  <th style={{ padding: "12px 16px" }}>Biaya Platform (3%)</th>
                  <th style={{ padding: "12px 16px" }}>Net Pencairan Pemilik</th>
                  <th style={{ padding: "12px 16px" }}>Status Pencairan</th>
                  <th style={{ padding: "12px 16px" }}>Aksi Status</th>
                </tr>
              </thead>
              <tbody>
                {currentDisbursements.map((item) => {
                  const status = item.status_disbursement || item.status || "pending";
                  const midtransOrderId = item.booking?.midtrans_order_id || `BOOK-${item.booking_id}`;
                  const kosName = item.booking?.kos?.nama_kos || "Kost";
                  const ownerName = item.pemilik?.nama || item.pemilik?.name || "Pemilik Kost";
                  const ownerEmail = item.pemilik?.email || "-";
                  const metodeBayar = item.booking?.metode_pembayaran || item.booking?.payment_type || "transfer_bank";
                  const tglBayar = item.booking?.tanggal_bayar || item.created_at;

                  return (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0066ff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <CreditCard size={14} color="#0066ff" />
                          <span>{midtransOrderId}</span>
                        </div>
                        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                          {tglBayar ? new Date(tglBayar).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : 'Baru'}
                        </div>
                      </td>

                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: "600", color: "#1e293b", display: "flex", alignItems: "center", gap: "5px" }}>
                          <Building size={14} color="#64748b" />
                          {kosName}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                          Pemilik: <strong>{ownerName}</strong> ({ownerEmail})
                        </div>
                      </td>

                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "600",
                            backgroundColor: "#e0f2fe",
                            color: "#0369a1",
                          }}
                        >
                          {formatPaymentType(metodeBayar)}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", color: "#1e293b", fontWeight: "500" }}>
                        {formatRupiah(item.total_transaksi)}
                      </td>

                      <td style={{ padding: "14px 16px", color: "#ef4444", fontWeight: "500" }}>
                        - {formatRupiah(item.biaya_platform)}
                      </td>

                      <td style={{ padding: "14px 16px", fontWeight: "700", color: "#16a34a", fontSize: "14px" }}>
                        {formatRupiah(item.jatah_pemilik)}
                      </td>

                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            backgroundColor:
                              status === "selesai"
                                ? "#dcfce7"
                                : status === "diproses"
                                ? "#e0f2fe"
                                : "#fef3c7",
                            color:
                              status === "selesai"
                                ? "#15803d"
                                : status === "diproses"
                                ? "#0369a1"
                                : "#b45309",
                          }}
                        >
                          {status === "selesai" ? (
                            <CheckCircle2 size={13} />
                          ) : status === "diproses" ? (
                            <RefreshCw size={13} />
                          ) : (
                            <Clock size={13} />
                          )}
                          {status.toUpperCase()}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px" }}>
                        <CustomSelect
                          value={status}
                          onChange={(val) => handleUpdateStatus(item.id, val)}
                          options={[
                            { value: "pending", label: "Pending" },
                            { value: "diproses", label: "Diproses" },
                            { value: "selesai", label: "Selesai" },
                          ]}
                          width="130px"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
