import bcrypt from "bcryptjs";

/**
 * hashPassword - hashes a password using bcrypt
 * @password: password string 
 * Return: hashed password 
 */
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password: ", error);
    throw error;
  }
}

/**
 * comparePassword - compares a password with a hashed password
 * @password: password string
 * @hashedPassword: hashed password string
 * Return: boolean
 */
export async function comparePassword(password, hashedPassword) {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error("Error comparing passwords: ", error);
    throw error;
  }
}
