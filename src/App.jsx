import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CariKost from "./pages/CariKost";
import DetailKost from "./pages/DetailKost";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;