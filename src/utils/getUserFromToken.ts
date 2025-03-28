import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token: string | null) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<{
      id: string;
      username: string;
      email: string;
      roles: string[];
    }>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
