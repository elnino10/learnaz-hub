// Generate JWT Token
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const generateToken = (id, role) => {
  const payload = { id, role };
  return jwt.sign(payload, secretKey, {
    expiresIn: "30d",
  });
};
