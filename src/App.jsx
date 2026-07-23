import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Protected Route & Pencari Route Components
import ProtectedRoute from "./components/ProtectedRoute";
import PencariRoute from "./components/PencariRoute";

// ======================
// Import Halaman User
// ======================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CariKost from "./pages/CariKost";
import DetailKost from "./pages/DetailKost";
import DetailBooking from "./pages/DetailBooking";
import Checkout from "./pages/Checkout";
import Favorit from "./pages/Favorit";
import TentangKami from "./pages/TentangKami";
import Profile from "./pages/Profile";
import BookingSaya from "./pages/BookingSaya";

// ======================
// Import Halaman Owner
// ======================
import OwnerDashboard from "./pages/owner/Dashboard";
import MyKosts from "./pages/owner/MyKosts";
import Bookings from "./pages/owner/Bookings";
import Finance from "./pages/owner/Finance";
import Reports from "./pages/owner/Reports";
import Settings from "./pages/owner/Settings";
import VerifikasiPemilik from "./pages/owner/VerifikasiPemilik";
import TambahKost from "./pages/owner/TambahKost";

// ======================
// ======================
// Import Halaman Super Admin
// ======================
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminVerifikasiPemilik from "./pages/admin/VerifikasiPemilik";
import DetailVerifikasiPemilik from "./pages/admin/DetailVerifikasiPemilik";
import DataPengguna from "./pages/admin/DataPengguna";
import Pengaturan from "./pages/admin/Pengaturan";
import ModerasiUlasan from "./pages/admin/ModerasiUlasan";
import PencairanDana from "./pages/admin/PencairanDana";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================
              PUBLIC & USER MODULE
        ======================= */}

        <Route path="/" element={<PencariRoute><Home /></PencariRoute>} />
        <Route path="/login" element={<PencariRoute><Login /></PencariRoute>} />
        <Route path="/register" element={<PencariRoute><Register /></PencariRoute>} />
        <Route path="/carikost" element={<PencariRoute><CariKost /></PencariRoute>} />
        <Route path="/kost/:id" element={<DetailKost />} />
        <Route path="/detail-kost" element={<DetailKost />} />
        <Route path="/detail-booking/:id" element={<ProtectedRoute allowedRoles={['pencari', 'pemilik', 'admin']}><DetailBooking /></ProtectedRoute>} />
        <Route path="/detail-booking" element={<ProtectedRoute allowedRoles={['pencari', 'pemilik', 'admin']}><DetailBooking /></ProtectedRoute>} />
        <Route path="/checkout" element={<PencariRoute><ProtectedRoute allowedRoles={['pencari']}><Checkout /></ProtectedRoute></PencariRoute>} />
        <Route path="/favorit" element={<PencariRoute><ProtectedRoute allowedRoles={['pencari']}><Favorit /></ProtectedRoute></PencariRoute>} />
        <Route path="/tentang-kami" element={<PencariRoute><TentangKami /></PencariRoute>} />
        <Route path="/profile" element={<PencariRoute><ProtectedRoute allowedRoles={['pencari']}><Profile /></ProtectedRoute></PencariRoute>} />
        <Route path="/booking" element={<PencariRoute><ProtectedRoute allowedRoles={['pencari']}><BookingSaya /></ProtectedRoute></PencariRoute>} />

        {/* ======================
              OWNER MODULE
        ======================= */}

        <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={['pemilik']}><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/owner/kost-saya" element={<ProtectedRoute allowedRoles={['pemilik']}><MyKosts /></ProtectedRoute>} />
        <Route path="/owner/booking" element={<ProtectedRoute allowedRoles={['pemilik']}><Bookings /></ProtectedRoute>} />
        <Route path="/owner/keuangan" element={<ProtectedRoute allowedRoles={['pemilik']}><Finance /></ProtectedRoute>} />
        <Route path="/owner/laporan" element={<ProtectedRoute allowedRoles={['pemilik']}><Reports /></ProtectedRoute>} />
        <Route path="/owner/pengaturan" element={<ProtectedRoute allowedRoles={['pemilik']}><Settings /></ProtectedRoute>} />
        <Route path="/owner/verifikasi" element={<ProtectedRoute allowedRoles={['pemilik']}><VerifikasiPemilik /></ProtectedRoute>} />
        <Route path="/owner/tambah-kost" element={<ProtectedRoute allowedRoles={['pemilik']}><TambahKost /></ProtectedRoute>} />

        {/* ======================
              SUPER ADMIN MODULE
        ======================= */}

        {/* Dedicated Hidden Admin Login Route */}
        <Route path="/superadmin/login" element={<AdminLogin />} />

        {/* Protected Super Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><DataPengguna /></ProtectedRoute>} />
        <Route path="/admin/data-pengguna" element={<ProtectedRoute allowedRoles={['admin']}><DataPengguna /></ProtectedRoute>} />
        <Route path="/admin/verifikasi-pemilik" element={<ProtectedRoute allowedRoles={['admin']}><AdminVerifikasiPemilik /></ProtectedRoute>} />
        <Route path="/admin/detail-verifikasi-pemilik/:id" element={<ProtectedRoute allowedRoles={['admin']}><DetailVerifikasiPemilik /></ProtectedRoute>} />
        <Route path="/admin/detail-verifikasi-pemilik" element={<ProtectedRoute allowedRoles={['admin']}><DetailVerifikasiPemilik /></ProtectedRoute>} />
        <Route path="/admin/moderasi-ulasan" element={<ProtectedRoute allowedRoles={['admin']}><ModerasiUlasan /></ProtectedRoute>} />
        <Route path="/admin/pencairan-dana" element={<ProtectedRoute allowedRoles={['admin']}><PencairanDana /></ProtectedRoute>} />
        <Route path="/admin/profil" element={<ProtectedRoute allowedRoles={['admin']}><Pengaturan /></ProtectedRoute>} />
        <Route path="/admin/pengaturan" element={<ProtectedRoute allowedRoles={['admin']}><Pengaturan /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;