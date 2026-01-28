import API from "./api";
import type { User } from "@/types"; 

export async function getMe(): Promise<User> {
  const response = await API.get("/me");
  return response.data as User;
}

export async function register(
  email: string,
  password: string,
  first_name: string,
  last_name: string
) {
  try {
    const response = await API.post("/users", {
      user: { email, password, first_name, last_name },
    });
    // Registration sets auth cookie; /me is the source of truth.
    if (response.status >= 200 && response.status < 300) return await getMe();
    return response.data as User;
  } catch (err: any) {
    // Extract validation errors from the API response
    if (err.response?.data?.errors) {
      const error = new Error("Validation failed");
      (error as any).errors = err.response.data.errors;
      throw error;
    }
    throw err;
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await API.post("/login", {
      user: { email, password },
    });
    // Login sets auth cookie; /me is the source of truth.
    if (response.status >= 200 && response.status < 300) return await getMe();
    return response.data as User;
  } catch (err: any) {
    // Extract validation errors from the API response
    if (err.response?.data?.errors) {
      const error = new Error("Authentication failed");
      (error as any).errors = err.response.data.errors;
      throw error;
    }
    throw err;
  }
}

export async function logout() {
  await API.delete("/logout");
}
