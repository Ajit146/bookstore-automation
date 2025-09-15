// tests/api/helper.ts
import { execSync } from "child_process";

// Base URL and token command directly in helper
const baseURL = "http://127.0.0.1:8000";
const tokenScript = "python3 -m bookstore.generate_token";

export const generateToken = (): string => {
  try {
    const output = execSync(tokenScript, { encoding: "utf-8" }).trim();
    console.log("Generated Token:", output);
    return output;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

export const getHeaders = () => {
  const token = generateToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getBaseURL = () => baseURL;