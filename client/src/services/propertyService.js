import api from "./api";

// Gets all properties
export const getProperties = async () => {
  const res = await api.get("/properties");
  console.log(res.data);
  return res.data;
};

// Gets a property by ID
export const getPropertyById = async (propertyId) => {
  const res = await api.get(`/properties/${propertyId}`);
  return res.data;
};

// Updates a property
export const updateProperty = async (propertyId, property) => {
  const res = await api.put(`/properties/${propertyId}`, property);
  return res.data;
};

// Creates a new property
export const createProperty = async (property) => {
  const res = await api.post("/properties", property);
  return res.data;
};

// Gets properties by landlord ID
export const getPropertiesByLandlord = async (landlordId) => {
  const res = await api.get(`/properties/landlord/${landlordId}`);
  return res.data;
};

// Deletes a property
export const deleteProperty = async (propertyId) => {
  const res = await api.delete(`/properties/${propertyId}`);
  console.log(res.data);
  return res.data;
};