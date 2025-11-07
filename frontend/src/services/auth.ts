import API from "./api";

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export async function register(email: string, password: string) {
  try {
    const response = await API.post("/users", { user: { email, password } });
    const token = response.headers.authorization?.split(" ")[1];
    if (token) localStorage.setItem("token", token);
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
    const response = await API.post("/users/sign_in", {
      user: { email, password },
    });
    const token = response.headers.authorization?.split(" ")[1];
    if (token) localStorage.setItem("token", token);
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
  await API.delete("/users/sign_out");
  localStorage.removeItem("token");
}
