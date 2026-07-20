import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;