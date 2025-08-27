import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import LandlordDashboard from "./pages/LanlordDashboard.jsx";
import TenantSearch from "./pages/TenantSearch.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import NavBar from "./components/NavBar.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";
import EditProperty from "./pages/EditProperty.jsx";
import MainPage from "./pages/MainPage.jsx";

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
              <Navigate to="/main" replace />
            )
          }
        />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/tenant" element={<TenantSearch />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/properties/edit/:id" element={<EditProperty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
