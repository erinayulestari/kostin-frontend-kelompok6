import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CariKost from "./pages/CariKost";
import DetailKost from "./pages/DetailKost";
import Favorit from "./pages/Favorit";
import TentangKami from "./pages/TentangKami";
import Profile from "./pages/Profile";
import BookingSaya from "./pages/BookingSaya";
import DetailBooking from "./pages/DetailBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;