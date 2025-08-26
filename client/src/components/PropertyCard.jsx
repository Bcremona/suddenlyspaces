import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { Link } from "react-router-dom";
import { deleteProperty } from "../services/propertyService.js";

export default function PropertyCard({ property }) {

  const { user } = useContext(AuthContext);

  return (
    <div className="border rounded-lg p-4 shadow-md mb-3">
      <h2 className="text-lg font-bold">{property.title}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-blue-600 font-semibold">
        ${property.rentAmount} / month
      </p>
      <p className="text-sm text-gray-500">{property.leaseType}</p>
      {user.role === "landlord" && user.id === property.landlordId && (
        <>
        <Link to={`/properties/edit/${property.id}`} > {/* create enpoint to edit property */}
          <button className="text-white bg-sky-700 hover:bg-sky-600 hover:scale-110 transition-all px-3 py-1 rounded-md mr-2 inline-block mt-2">Edit Property</button>
        </Link>
          <button onClick={() => deleteProperty(property.id)} className="text-white bg-red-700 hover:bg-red-600 hover:scale-110 transition-all px-3 py-1 rounded-md mr-2 inline-block mt-2">Delete Property</button>
        </>
      )}
    </div>
  );
}
