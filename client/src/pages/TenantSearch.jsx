import { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

export default function TenantSearch() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  const filtered = properties.filter((p) =>
    filter ? p.location.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tenant Search</h1>

      <input
        type="text"
        placeholder="Filter by city..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {filtered.length === 0 && (<p>Loading properties for you...</p>)}
      {filtered.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
