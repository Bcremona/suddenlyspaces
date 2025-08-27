import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import { getPropertyById, updateProperty } from "../services/propertyService.js";

export default function EditProperty() {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
    title: "",
    location: "",
    rentAmount: "",
    leaseType: "",
    landlordId: 1, 
    });

    useEffect(() => {
        const fetchProperty = async () => {
            const data = await getPropertyById(id);
            setForm({
                title: data.title,
                location: data.location,
                rentAmount: data.rentAmount,
                leaseType: data.leaseType,
                landlordId: user.id.landlordId
            });
        };
        fetchProperty();
    }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProperty(id, form);
    setForm({ title: "", location: "", rentAmount: "", leaseType: "", landlordId: 1 });
    window.history.back();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mt-12 mb-4">Editing:</h1>
        <BackButton />

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="border p-2 w-full"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 w-full"
          required
        />
        <input
          name="rentAmount"
          value={form.rentAmount}
          onChange={handleChange}
          placeholder="Rent Amount"
          className="border p-2 w-full"
          required
        />
        <input
          name="leaseType"
          value={form.leaseType}
          onChange={handleChange}
          placeholder="Lease Type"
          className="border p-2 w-full"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:scale-105 transition-transform">
          Edit Property
        </button>
      </form>
    </div>
    );
}