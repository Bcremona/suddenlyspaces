import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { loginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "tenant" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginRequest(form);
      login(data.user);
      navigate(form.role === "landlord" ? "/landlord" : "/tenant");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">Login error: contact support.</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
