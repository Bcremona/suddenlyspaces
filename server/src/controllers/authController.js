import prisma from "../db/prisma.js";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "email, password, and role are required" });
    }

    // pick table according to role
    const model = role === "landlord" ? prisma.landlord : prisma.tenant;

    // find by email and password
    const user = await model.findFirst({
      where: {
        email,
        password: password, // for simplicity, using plain text for now
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // return user without password
    const { password: _, ...safeUser } = user;
    res.json({ user: { ...safeUser, role } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
