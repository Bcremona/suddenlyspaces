import prisma from "../db/prisma.js";

export const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: { landlord: true },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
      include: { landlord: true },
    });
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { title, location, rentAmount, leaseType, landlordId } = req.body;
    const newProperty = await prisma.property.create({
      data: { title, location, rentAmount: parseFloat(rentAmount), leaseType, landlordId },
    });
    res.json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertiesByLandlord = async (req, res) => {
  try {
    const { landlordId } = req.params;
    const properties = await prisma.property.findMany({
      where: { landlordId: parseInt(landlordId) },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, rentAmount, leaseType } = req.body;
    await prisma.property.update({
      where: { id: parseInt(id) },
      data: { title, location, rentAmount: parseFloat(rentAmount), leaseType },
    });
    res.json({ message: "Property updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.property.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};