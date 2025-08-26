import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { Link } from "react-router-dom";
import { deleteProperty } from "../services/propertyService.js";

export default function PropertyCard({ property }) {

  const { user } = useContext(AuthContext);

  return (
    <Link to={`/properties/${property.id}`} >
    <div className="border rounded-lg p-4 shadow-md m-2 flex flex-row">
      <div className="w-1/3 mr-4">
        <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover mb-4 rounded-md" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{property.title}</h2>
        <p className="text-lg text-gray-600">{property.location}</p>
        <p className="text-lg text-blue-600 font-semibold">
          ${property.rentAmount} <span className="text-gray-600">/ month</span>
        </p>
        <p className="text-md text-gray-500">{property.leaseType}</p>
        {user.role === "landlord" && user.id === property.landlordId && (
          <>
          <Link to={`/properties/edit/${property.id}`} > {/* create enpoint to edit property */}
            <button className="text-white bg-sky-700 hover:bg-sky-600 hover:scale-110 transition-all px-3 py-1 rounded-md mr-2 inline-block mt-2">Edit Property</button>
          </Link>
            <button onClick={() => deleteProperty(property.id)} className="text-white bg-red-700 hover:bg-red-600 hover:scale-110 transition-all px-3 py-1 rounded-md mr-2 inline-block mt-2">Delete Property</button>
          </>
        )}
      </div>
    </div>
    </Link>
  );
}
