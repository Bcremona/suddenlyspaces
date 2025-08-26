import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import { getPropertyById } from "../services/propertyService.js";

export default function PropertyDetail() {

    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const data = await getPropertyById(id);
            setProperty(data);
        };
        fetchProperty();
    }, [id]);
  

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full min-h-screen">
        <BackButton />
        {property === null && <p>Loading...</p>}
        {property && (
        <div>
            <img src={property.imageUrl} alt={property.title} className="w-full shadow-lg" />
            <h1 className="text-4xl font-bold mt-4">{property.title}</h1>
            <h3 className="text-black/70 text-2xl font-semibold mt-1">{property.location}</h3>
            <p className="text-lg mt-2">$<span className="text-sky-700 text-lg font-semibold">{property.rentAmount}</span> / month</p>
            <p className="mt-2">Lease Type: <span className="text-cyan-800 text-lg font-semibold">{property.leaseType}</span></p>
            <button className="text-white bg-sky-700 hover:bg-sky-600 hover:scale-110 transition-all px-3 py-1 rounded-md mr-2 inline-block mt-2" onClick={() => alert("Feature coming soon!")}>Lease property</button>
        </div>)}
    </div>
  );
}