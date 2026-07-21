import React, { useState } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';

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

// Import Gambar Local
import harmoniImg from '../../assets/harmoni.jpeg';
import melatiImg from '../../assets/melati.jpeg';
import melati1Img from '../../assets/melati1.jpeg';
import melati2Img from '../../assets/melati2.jpeg';

const Reports = () => {
  const [periodFilter, setPeriodFilter] = useState('Bulan Ini');

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

      <button className="btn-export-pdf">
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
          subtitle="Lihat performa bisnis kost berdasarkan periode tertentu."
          actionButton={HeaderActions}
          showProfile={false}
        />

        {/* 1. Metric Cards Row */}
        <div className="reports-metric-grid">
          <div className="metric-card">
            <div className="m-icon-bg blue">
              <CalendarCheck size={20} color="#0066ff" />
            </div>
            <div className="m-info">
              <span className="m-title">Total Booking</span>
              <h3 className="m-value">126 Booking</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>12.5%</span> <span className="m-sub">dari bulan lalu</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="m-icon-bg green">
              <Wallet size={20} color="#10b981" />
            </div>
            <div className="m-info">
              <span className="m-title">Pendapatan</span>
              <h3 className="m-value">Rp45.800.000</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>18.7%</span> <span className="m-sub">dari bulan lalu</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="m-icon-bg purple">
              <PieChart size={20} color="#8b5cf6" />
            </div>
            <div className="m-info">
              <span className="m-title">Tingkat Okupansi</span>
              <h3 className="m-value">86%</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>8.4%</span> <span className="m-sub">dari bulan lalu</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="m-icon-bg orange">
              <Clock size={20} color="#f59e0b" />
            </div>
            <div className="m-info">
              <span className="m-title">Rata-rata Durasi Sewa</span>
              <h3 className="m-value">8 Bulan</h3>
              <div className="m-trend positive">
                <TrendingUp size={12} />
                <span>0.5 bulan</span> <span className="m-sub">dari bulan lalu</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Charts Section Row */}
        <div className="charts-grid-container">
          {/* Perkembangan Pendapatan (Line Chart) */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Perkembangan Pendapatan</h3>
              <div className="mini-select">
                <select defaultValue="Bulan Ini">
                  <option value="Bulan Ini">Bulan Ini</option>
                  <option value="Tahun Ini">Tahun Ini</option>
                </select>
                <ChevronDown size={12} />
              </div>
            </div>
            <div className="line-chart-placeholder">
              {/* SVG Graphic Line Chart Simulation */}
              <svg viewBox="0 0 500 180" className="svg-chart">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0066ff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0066ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeDasharray="3 3" />

                {/* Area Under Line */}
                <polygon points="20,130 90,105 160,95 230,60 300,85 370,45 450,55 450,160 20,160" fill="url(#chartGrad)" />
                
                {/* Main Line */}
                <polyline 
                  fill="none" 
                  stroke="#0066ff" 
                  strokeWidth="3" 
                  points="20,130 90,105 160,95 230,60 300,85 370,45 450,55" 
                />

                {/* Points */}
                <circle cx="20" cy="130" r="4" fill="#0066ff" />
                <circle cx="90" cy="105" r="4" fill="#0066ff" />
                <circle cx="160" cy="95" r="4" fill="#0066ff" />
                <circle cx="230" cy="60" r="5" fill="#0066ff" stroke="#fff" strokeWidth="2" />
                <circle cx="300" cy="85" r="4" fill="#0066ff" />
                <circle cx="370" cy="45" r="4" fill="#0066ff" />
                <circle cx="450" cy="55" r="4" fill="#0066ff" />

                {/* Tooltip Simulation on April */}
                <g transform="translate(185, 20)">
                  <rect width="90" height="34" rx="6" fill="#ffffff" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.08))" />
                  <text x="12" y="14" fontSize="9" fill="#64748b" fontWeight="500">Apr</text>
                  <text x="12" y="26" fontSize="10" fill="#0f172a" fontWeight="700">Rp45.200.000</text>
                </g>
              </svg>
              <div className="chart-months">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          {/* Booking per Bulan (Bar Chart) */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3>Booking per Bulan</h3>
              <div className="mini-select">
                <select defaultValue="Bulan Ini">
                  <option value="Bulan Ini">Bulan Ini</option>
                  <option value="Tahun Ini">Tahun Ini</option>
                </select>
                <ChevronDown size={12} />
              </div>
            </div>
            <div className="bar-chart-placeholder">
              <div className="bar-group">
                <div className="bar-column"><div className="bar-fill" style={{ height: '42%' }}><span className="bar-tooltip">42</span></div></div>
                <div className="bar-column"><div className="bar-fill" style={{ height: '56%' }}><span className="bar-tooltip">56</span></div></div>
                <div className="bar-column"><div className="bar-fill" style={{ height: '68%' }}><span className="bar-tooltip">68</span></div></div>
                <div className="bar-column"><div className="bar-fill" style={{ height: '82%' }}><span className="bar-tooltip">82</span></div></div>
                <div className="bar-column"><div className="bar-fill" style={{ height: '74%' }}><span className="bar-tooltip">74</span></div></div>
                <div className="bar-column"><div className="bar-fill" style={{ height: '90%' }}><span className="bar-tooltip">90</span></div></div>
                <div className="bar-column"><div className="bar-fill" style={{ height: '76%' }}><span className="bar-tooltip">76</span></div></div>
              </div>
              <div className="chart-months">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span><span>Jul</span>
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
              <button className="btn-link">Lihat Semua</button>
            </div>
            <div className="performa-list">
              <div className="performa-item">
                <img src={harmoniImg} alt="Kost Harmoni" />
                <div className="p-details">
                  <h4 className="p-name">Kost Harmoni Residence</h4>
                  <p className="p-address">Jl. Kaliurang Km 5, Sleman</p>
                </div>
                <div className="p-stats">
                  <div className="p-stat-col">
                    <span className="p-label">Booking</span>
                    <span className="p-val">48</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Pendapatan</span>
                    <span className="p-val bold">Rp18.600.000</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Okupansi</span>
                    <span className="p-val green">92%</span>
                  </div>
                </div>
              </div>

              <div className="performa-item">
                <img src={melati1Img} alt="Kost Putri Alifia" />
                <div className="p-details">
                  <h4 className="p-name">Kost Putri Alifia</h4>
                  <p className="p-address">Jl. Seturan Raya No. 12, Depok</p>
                </div>
                <div className="p-stats">
                  <div className="p-stat-col">
                    <span className="p-label">Booking</span>
                    <span className="p-val">36</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Pendapatan</span>
                    <span className="p-val bold">Rp12.400.000</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Okupansi</span>
                    <span className="p-val green">88%</span>
                  </div>
                </div>
              </div>

              <div className="performa-item">
                <img src={melati2Img} alt="Kost Green House" />
                <div className="p-details">
                  <h4 className="p-name">Kost Green House</h4>
                  <p className="p-address">Jl. Gejayan No. 45, Sleman</p>
                </div>
                <div className="p-stats">
                  <div className="p-stat-col">
                    <span className="p-label">Booking</span>
                    <span className="p-val">28</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Pendapatan</span>
                    <span className="p-val bold">Rp8.900.000</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Okupansi</span>
                    <span className="p-val orange">78%</span>
                  </div>
                </div>
              </div>

              <div className="performa-item">
                <img src={melatiImg} alt="Kost Melati" />
                <div className="p-details">
                  <h4 className="p-name">Kost Melati</h4>
                  <p className="p-address">Jl. Palagan Tentara Pelajar No. 88, Sleman</p>
                </div>
                <div className="p-stats">
                  <div className="p-stat-col">
                    <span className="p-label">Booking</span>
                    <span className="p-val">14</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Pendapatan</span>
                    <span className="p-val bold">Rp5.900.000</span>
                  </div>
                  <div className="p-stat-col">
                    <span className="p-label">Okupansi</span>
                    <span className="p-val orange">64%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kost Terlaris */}
          <div className="bottom-card terlaris-card">
            <div className="b-card-header">
              <h3>Kost Terlaris</h3>
              <button className="btn-link">Lihat Semua</button>
            </div>
            <div className="terlaris-list">
              <div className="terlaris-item">
                <span className="rank-badge rank-1">1</span>
                <img src={harmoniImg} alt="Kost Harmoni" />
                <div className="t-info">
                  <h4>Kost Harmoni Residence</h4>
                  <div className="t-sub">
                    <span>48 Booking</span>
                    <span className="t-price">Rp18.600.000</span>
                  </div>
                </div>
              </div>

              <div className="terlaris-item">
                <span className="rank-badge rank-2">2</span>
                <img src={melati1Img} alt="Kost Putri Alifia" />
                <div className="t-info">
                  <h4>Kost Putri Alifia</h4>
                  <div className="t-sub">
                    <span>36 Booking</span>
                    <span className="t-price">Rp12.400.000</span>
                  </div>
                </div>
              </div>

              <div className="terlaris-item">
                <span className="rank-badge rank-3">3</span>
                <img src={melati2Img} alt="Kost Green House" />
                <div className="t-info">
                  <h4>Kost Green House</h4>
                  <div className="t-sub">
                    <span>28 Booking</span>
                    <span className="t-price">Rp8.900.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="bottom-card aktivitas-card">
            <div className="b-card-header">
              <h3>Aktivitas Terbaru</h3>
              <button className="btn-link">Lihat Semua</button>
            </div>
            <div className="aktivitas-list">
              <div className="aktivitas-item">
                <div className="act-icon green">
                  <CalendarCheck size={16} color="#10b981" />
                </div>
                <div className="act-info">
                  <h4>Booking baru diterima</h4>
                  <p>Kost Melati – Nadia Putri</p>
                </div>
                <span className="act-time">10 menit yang lalu</span>
              </div>

              <div className="aktivitas-item">
                <div className="act-icon blue">
                  <CheckCircle2 size={16} color="#0066ff" />
                </div>
                <div className="act-info">
                  <h4>Pembayaran berhasil</h4>
                  <p>Kost Harmoni Residence – Rizky Pratama</p>
                </div>
                <span className="act-time">2 jam yang lalu</span>
              </div>

              <div className="aktivitas-item">
                <div className="act-icon orange">
                  <Clock3 size={16} color="#f59e0b" />
                </div>
                <div className="act-info">
                  <h4>Booking diperpanjang</h4>
                  <p>Kost Putri Alifia – Siti Aisyah</p>
                </div>
                <span className="act-time">5 jam yang lalu</span>
              </div>

              <div className="aktivitas-item">
                <div className="act-icon gray">
                  <UserCheck size={16} color="#64748b" />
                </div>
                <div className="act-info">
                  <h4>Penyewa check-out</h4>
                  <p>Kost Green House – Andi Wijaya</p>
                </div>
                <span className="act-time">Kemarin, 11:30</span>
              </div>

              <div className="aktivitas-item">
                <div className="act-icon red">
                  <XCircle size={16} color="#ef4444" />
                </div>
                <div className="act-info">
                  <h4>Booking dibatalkan</h4>
                  <p>Kost Melati – Dimas Saputra</p>
                </div>
                <span className="act-time">Kemarin, 09:15</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;