import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import api from '../../api/api';

import { 
  Calendar, 
  Download, 
  TrendingUp, 
  PieChart, 
  Clock, 
  Wallet, 
  CalendarCheck,
  CheckCircle2,
  Clock3,
  XCircle,
  UserCheck,
  ChevronDown
} from 'lucide-react';

import '../../styles/owner/dashboard.css';
import '../../styles/owner/reports.css';

import defaultKostImg from '../../assets/harmoni.jpeg';

const Reports = () => {
  const [periodFilter, setPeriodFilter] = useState('Bulan Ini');
  const [ownerKosts, setOwnerKosts] = useState([]);
  const [rawBookings, setRawBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReportsData() {
      setLoading(true);
      try {
        const [resKosts, resBookings] = await Promise.allSettled([
          api.get('/owner/kos'),
          api.get('/bookings')
        ]);
        if (resKosts.status === 'fulfilled' && resKosts.value.data) {
          setOwnerKosts(resKosts.value.data);
        }
        if (resBookings.status === 'fulfilled' && resBookings.value.data) {
          setRawBookings(resBookings.value.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data laporan:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReportsData();
  }, []);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  const totalBooking = rawBookings.length;
  const getNetRevenue = (b) => {
    const gross = parseFloat(b.total_harga) || 0;
    return b.jatah_pemilik !== undefined 
      ? parseFloat(b.jatah_pemilik) 
      : (b.pembagian_dana?.jatah_pemilik !== undefined 
        ? parseFloat(b.pembagian_dana.jatah_pemilik) 
        : gross * 0.97);
  };

  const totalPendapatan = rawBookings.reduce((sum, b) => {
    const s = (b.status || '').toLowerCase();
    if (s === 'selesai' || s === 'aktif' || s === 'active' || s === 'lunas' || s === 'confirmed') {
      return sum + getNetRevenue(b);
    }
    return sum;
  }, 0);

  const totalKamar = ownerKosts.reduce((sum, k) => sum + (parseInt(k.jumlah_kamar) || 0), 0);
  const kamarTerisi = ownerKosts.reduce((sum, k) => sum + (parseInt(k.kamar_terisi) || 0), 0);
  const occupancyRate = totalKamar > 0 ? Math.round((kamarTerisi / totalKamar) * 100) : 0;

  const totalDurasi = rawBookings.reduce((sum, b) => sum + (parseInt(b.durasi_bulan) || 1), 0);
  const avgDurasi = rawBookings.length > 0 ? Math.round(totalDurasi / rawBookings.length) : 0;

  // === Hitung data bulanan RIIL dari rawBookings ===
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-indexed

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // Hitung pendapatan & booking per bulan dari data riil
  const monthlyRevenue = {};
  const monthlyBookingCount = {};
  
  for (let i = 0; i <= currentMonth; i++) {
    monthlyRevenue[i] = 0;
    monthlyBookingCount[i] = 0;
  }

  rawBookings.forEach(b => {
    if (!b.created_at) return;
    const d = new Date(b.created_at);
    if (d.getFullYear() !== currentYear) return;
    const m = d.getMonth();
    
    // Hitung booking count
    if (monthlyBookingCount[m] !== undefined) {
      monthlyBookingCount[m] = (monthlyBookingCount[m] || 0) + 1;
    }

    // Hitung revenue (hanya booking berhasil)
    const s = (b.status || '').toLowerCase();
    if (s === 'selesai' || s === 'aktif' || s === 'active' || s === 'lunas' || s === 'confirmed') {
      if (monthlyRevenue[m] !== undefined) {
        monthlyRevenue[m] = (monthlyRevenue[m] || 0) + getNetRevenue(b);
      }
    }
  });

  // Buat array bulan yang ditampilkan (dari Jan sampai bulan sekarang)
  const displayMonths = [];
  for (let i = 0; i <= currentMonth; i++) {
    displayMonths.push({
      label: monthNames[i],
      revenue: monthlyRevenue[i] || 0,
      bookings: monthlyBookingCount[i] || 0
    });
  }

  // === Generate SVG Line Chart points dari data riil ===
  const maxRevenue = Math.max(...displayMonths.map(m => m.revenue), 1);
  const chartWidth = 500;
  const chartHeight = 160;
  const chartPadding = 20;
  const usableWidth = chartWidth - chartPadding * 2;
  const usableHeight = chartHeight - 20;
  
  const linePoints = displayMonths.map((m, i) => {
    const x = chartPadding + (displayMonths.length > 1 ? (i / (displayMonths.length - 1)) * usableWidth : usableWidth / 2);
    const y = chartHeight - chartPadding - ((m.revenue / maxRevenue) * usableHeight);
    return { x: Math.round(x), y: Math.round(Math.max(10, y)) };
  });

  const polylineStr = linePoints.map(p => `${p.x},${p.y}`).join(' ');
  const polygonStr = polylineStr + ` ${linePoints[linePoints.length - 1].x},${chartHeight} ${linePoints[0].x},${chartHeight}`;

  // === Generate Bar Chart heights dari data riil ===
  const maxBookings = Math.max(...displayMonths.map(m => m.bookings), 1);

  // Performa Per Kos
  const performaList = ownerKosts.map(k => {
    const kosBookings = rawBookings.filter(b => (b.kos_id === k.id || b.kos?.id === k.id));
    const revenue = kosBookings.reduce((sum, b) => {
      const s = (b.status || '').toLowerCase();
      if (s === 'selesai' || s === 'aktif' || s === 'active' || s === 'lunas' || s === 'confirmed') {
        return sum + getNetRevenue(b);
      }
      return sum;
    }, 0);
    const totalR = parseInt(k.jumlah_kamar) || 1;
    const filledR = parseInt(k.kamar_terisi) || 0;
    const occ = Math.round((filledR / totalR) * 100);

    return {
      id: k.id,
      name: k.nama_kos,
      address: `${k.alamat || ''}, ${k.kota || ''}`,
      image: k.foto_utama_url || k.foto_utama || defaultKostImg,
      bookingCount: kosBookings.length,
      revenue,
      occupancy: occ
    };
  });

  // Kos Terlaris (Top 3)
  const terlarisList = [...performaList].sort((a, b) => b.bookingCount - a.bookingCount).slice(0, 3);

  // Header Actions (Dropdown Periode & Tombol Export PDF)
  const HeaderActions = (
    <div className="reports-header-actions">
      <div className="r-select-wrapper">
        <Calendar size={15} color="#64748b" />
        <select value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)}>
          <option value="Bulan Ini">Bulan Ini</option>
          <option value="Bulan Lalu">Bulan Lalu</option>
          <option value="Tahun Ini">Tahun Ini</option>
        </select>
        <ChevronDown size={14} className="arrow" />
      </div>

      <button className="btn-export-pdf" onClick={() => window.print()}>
        <Download size={15} />
        <span>Export PDF</span>
      </button>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Laporan" 
          subtitle="Lihat performa bisnis kost berdasarkan data riil properti Anda."
          actionButton={HeaderActions}
          showProfile={true}
        />

        {/* 1. Metric Cards Row */}
        <div className="reports-metric-grid">
          <div className="metric-card">
            <div className="m-icon-bg blue">
              <CalendarCheck size={20} color="#0066ff" />
            </div>
            <div className="m-info">
              <span className="m-title">Total Booking</span>
              <h3 className="m-value">{totalBooking} Booking</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>Real Data</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="m-icon-bg green">
              <Wallet size={20} color="#10b981" />
            </div>
            <div className="m-info">
              <span className="m-title">Pendapatan</span>
              <h3 className="m-value">{formatRupiah(totalPendapatan)}</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>Real Data</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="m-icon-bg purple">
              <PieChart size={20} color="#8b5cf6" />
            </div>
            <div className="m-info">
              <span className="m-title">Tingkat Okupansi</span>
              <h3 className="m-value">{occupancyRate}%</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>Real Data</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="m-icon-bg orange">
              <Clock size={20} color="#f59e0b" />
            </div>
            <div className="m-info">
              <span className="m-title">Rata-rata Durasi Sewa</span>
              <h3 className="m-value">{avgDurasi} Bulan</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>Real Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Charts Section Row */}
        <div className="charts-grid-container">
          {/* Perkembangan Pendapatan (Line Chart - Data Riil) */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Perkembangan Pendapatan</h3>
            </div>
            <div className="line-chart-placeholder">
              <svg viewBox="0 0 500 180" className="svg-chart">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0066ff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0066ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeDasharray="3 3" />

                {linePoints.length > 1 && (
                  <>
                    <polygon points={polygonStr} fill="url(#chartGrad)" />
                    <polyline 
                      fill="none" 
                      stroke="#0066ff" 
                      strokeWidth="3" 
                      points={polylineStr} 
                    />
                  </>
                )}

                {linePoints.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={4} fill="#0066ff" />
                ))}
              </svg>
              <div className="chart-months">
                {displayMonths.map((m, i) => (
                  <span key={i}>{m.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking per Bulan (Bar Chart - Data Riil) */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Booking per Bulan</h3>
            </div>
            <div className="bar-chart-placeholder">
              <div className="bar-group">
                {displayMonths.map((m, i) => {
                  const heightPct = maxBookings > 0 
                    ? Math.max(m.bookings > 0 ? 8 : 2, (m.bookings / maxBookings) * 90) 
                    : 2;
                  return (
                    <div className="bar-column" key={i}>
                      <div className="bar-fill" style={{ height: `${heightPct}%` }}>
                        <span className="bar-tooltip">{m.bookings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="chart-months">
                {displayMonths.map((m, i) => (
                  <span key={i}>{m.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Detail Grid */}
        <div className="reports-bottom-grid">
          {/* Performa Setiap Kost */}
          <div className="bottom-card performa-card">
            <div className="b-card-header">
              <h3>Performa Setiap Kost</h3>
            </div>
            <div className="performa-list">
              {loading ? (
                <p>Memuat data performa kos...</p>
              ) : performaList.length === 0 ? (
                <p style={{ color: "#64748b" }}>Belum ada kos terdaftar.</p>
              ) : (
                performaList.map(item => (
                  <div className="performa-item" key={item.id}>
                    <img src={item.image} alt={item.name} onError={(e) => { e.target.src = defaultKostImg; }} />
                    <div className="p-details">
                      <h4 className="p-name">{item.name}</h4>
                      <p className="p-address">{item.address}</p>
                    </div>
                    <div className="p-stats">
                      <div className="p-stat-col">
                        <span className="p-label">Booking</span>
                        <span className="p-val">{item.bookingCount}</span>
                      </div>
                      <div className="p-stat-col">
                        <span className="p-label">Pendapatan</span>
                        <span className="p-val bold">{formatRupiah(item.revenue)}</span>
                      </div>
                      <div className="p-stat-col">
                        <span className="p-label">Okupansi</span>
                        <span className="p-val green">{item.occupancy}%</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Kost Terlaris */}
          <div className="bottom-card terlaris-card">
            <div className="b-card-header">
              <h3>Kost Terlaris</h3>
            </div>
            <div className="terlaris-list">
              {loading ? (
                <p>Memuat data kos terlaris...</p>
              ) : terlarisList.length === 0 ? (
                <p style={{ color: "#64748b" }}>Belum ada kos terdaftar.</p>
              ) : (
                terlarisList.map((item, idx) => (
                  <div className="terlaris-item" key={item.id}>
                    <span className={`rank-badge rank-${idx + 1}`}>{idx + 1}</span>
                    <img src={item.image} alt={item.name} onError={(e) => { e.target.src = defaultKostImg; }} />
                    <div className="t-info">
                      <h4>{item.name}</h4>
                      <div className="t-sub">
                        <span>{item.bookingCount} Booking</span>
                        <span className="t-price">{formatRupiah(item.revenue)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="bottom-card aktivitas-card">
            <div className="b-card-header">
              <h3>Aktivitas Terbaru</h3>
            </div>
            <div className="aktivitas-list">
              {loading ? (
                <p>Memuat aktivitas...</p>
              ) : rawBookings.length === 0 ? (
                <p style={{ color: "#64748b" }}>Belum ada aktivitas booking.</p>
              ) : (
                rawBookings.slice(0, 5).map(b => {
                  const userObj = b.user || {};
                  const kosObj = b.kos || {};
                  const statusStr = (b.status || '').toLowerCase();
                  
                  let icon = <CalendarCheck size={16} color="#10b981" />;
                  let iconClass = 'green';
                  let text = 'Booking masuk';

                  if (statusStr === 'selesai' || statusStr === 'lunas') {
                    icon = <CheckCircle2 size={16} color="#0066ff" />;
                    iconClass = 'blue';
                    text = 'Booking selesai / lunas';
                  } else if (statusStr === 'dibatalkan') {
                    icon = <XCircle size={16} color="#ef4444" />;
                    iconClass = 'red';
                    text = 'Booking dibatalkan';
                  }

                  return (
                    <div className="aktivitas-item" key={b.id}>
                      <div className={`act-icon ${iconClass}`}>
                        {icon}
                      </div>
                      <div className="act-info">
                        <h4>{text}</h4>
                        <p>{kosObj.nama_kos || 'Kost'} – {userObj.nama || 'Penyewa'}</p>
                      </div>
                      <span className="act-time">
                        {b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID') : '-'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;