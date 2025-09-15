import { execSync } from "child_process";

const environments = {
  dev: {
    baseURL: "http://127.0.0.1:8000",
    tokenScript: "python3 -m bookstore.generate_token",
  },
  qa: {
    baseURL: "https://qa-api.example.com",
    tokenScript: "python3 -m bookstore.generate_token",
  },
  prod: {
    baseURL: "https://api.example.com",
    tokenScript: "python3 -m bookstore.generate_token",
  },
};

const env = process.env.ENV || "dev";
const config = environments[env as keyof typeof environments];

export const generateToken = (): string => {
  try {
    const output = execSync(config.tokenScript, { encoding: "utf-8" }).trim();
    console.log(`Generated Token for ${env} environment:`, output);
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

export const getBaseURL = () => config.baseURL;