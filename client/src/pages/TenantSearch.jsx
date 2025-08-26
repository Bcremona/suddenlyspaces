import { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

export default function TenantSearch() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: 0,
    maxPrice: 10000,
    leaseType: ""
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  const filtered = properties.filter((p) =>
    p.location.toLowerCase().includes(filters.city.toLowerCase())
    && (filters.leaseType ? p.leaseType === filters.leaseType : true)
    && p.rentAmount >= filters.minPrice 
    && p.rentAmount <= filters.maxPrice
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tenant Search</h1>

      <div className="flex flex-row flex-wrap space-x-4 mb-4">
      <label className="font-semibold self-center mb-4">City:</label>
      <input
        type="text"
        placeholder="Filter by city..."
        value={filters.city}
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        className="border p-2 mb-4"
      />
      <label className="font-semibold self-center mb-4">Price Range:</label>
      <input 
        type="number" 
        placeholder="0" 
        value={filters.minPrice} 
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        className="border p-2 mb-4"
      />
      <label className="font-semibold self-center mb-4">To:</label>
      <input 
        type="number" 
        placeholder="10000" 
        value={filters.maxPrice} 
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        className="border p-2 mb-4"
      />
      <label className="font-semibold self-center mb-4">Lease Type:</label>
      <select
        placeholder="Lease Type"
        value={filters.leaseType}
        onChange={(e) => setFilters({ ...filters, leaseType: e.target.value })}
        className="border p-2 mb-4"
        >
          <option value="residential">Residential</option>
          <option value="short-term">Short Term</option>
          <option value="coworking">Coworking</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (<p>Loading properties for you...</p>)}
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
