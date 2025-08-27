import { useState, useEffect, useContext } from "react";
import { createProperty, getPropertiesByLandlord } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import { AuthContext } from "../context/authContext.jsx";

export default function LandlordDashboard() {

  const { user } = useContext(AuthContext);

  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    rentAmount: "",
    leaseType: "",
    landlordId: 1, // placeholder ID for now -- replace later
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await getPropertiesByLandlord(user.id); // placeholder ID for now -- if Auth is added, replace with real ID value
    setProperties(data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await createProperty(form);
    setForm({ title: "", location: "", rentAmount: "", leaseType: "", landlordId: 1 });
    loadProperties();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Landlord Dashboard</h1>
      <h1 className="text-xl font-bold mb-4">Add New Property</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="rentAmount"
          value={form.rentAmount}
          onChange={handleChange}
          placeholder="Rent Amount"
          className="border p-2 w-full rounded"
          required
        />
        <select
          placeholder="Lease Type"
          value={form.leaseType}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="residential">Residential</option>
          <option value="short-term">Short Term</option>
          <option value="coworking">Coworking</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Property
        </button>
      </form>

      <h1 className="text-xl font-bold mb-4">Your Properties:</h1>

      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
