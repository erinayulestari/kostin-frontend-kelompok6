import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Import Halaman User
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

// Import Halaman Owner
import OwnerDashboard from "./pages/owner/Dashboard";
import MyKosts from "./pages/owner/MyKosts";
import Bookings from "./pages/owner/Bookings";
import Finance from "./pages/owner/Finance";
import Reports from "./pages/owner/Reports";
import Settings from "./pages/owner/Settings";
import VerifikasiPemilik from "./pages/owner/VerifikasiPemilik";
import TambahKost from "./pages/owner/TambahKost";

// Import Halaman Super Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVerifikasiPemilik from "./pages/admin/VerifikasiPemilik";
import DetailVerifikasiPemilik from "./pages/admin/DetailVerifikasiPemilik";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ======================
              USER MODULE
        ======================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/carikost"
          element={<CariKost />}
        />

        <Route
          path="/detail-kost"
          element={<DetailKost />}
        />

        <Route
          path="/detail-booking"
          element={<DetailBooking />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/favorit"
          element={<Favorit />}
        />

        <Route
          path="/tentang-kami"
          element={<TentangKami />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/booking"
          element={<BookingSaya />}
        />

        {/* ======================
              OWNER KOST MODULE
        ======================= */}

        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        />

        <Route
          path="/owner/kost-saya"
          element={<MyKosts />}
        />

        <Route 
          path="/owner/booking" 
          element={<Bookings />} 
        />

        <Route 
          path="/owner/keuangan" 
          element={<Finance />} 
        />

        <Route 
          path="/owner/laporan" 
          element={<Reports />} 
        />

        <Route 
          path="/owner/pengaturan" 
          element={<Settings />} 
        />

        <Route 
          path="/owner/verifikasi" 
          element={<VerifikasiPemilik />} 
        />

        <Route 
          path="/owner/tambah-kost" 
          element={<TambahKost />} 
        />

        {/* ======================
              SUPER ADMIN MODULE
        ======================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/verifikasi"
          element={<AdminVerifikasiPemilik />}
        />


      </Routes>

    </BrowserRouter>
  );
}

export default App;