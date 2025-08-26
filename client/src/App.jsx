import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import LandlordDashboard from "./pages/LanlordDashboard.jsx";
import TenantSearch from "./pages/TenantSearch.jsx";
import NavBar from "./components/NavBar.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      
      <NavBar />

      <Routes>

        <Route
          path="/"
          element={
            user ? (
              user.role === "landlord" ? (
                <Navigate to="/landlord" replace />
              ) : (
                <Navigate to="/tenant" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
            
        <Route path="/login" element={<Login />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/tenant" element={<TenantSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
