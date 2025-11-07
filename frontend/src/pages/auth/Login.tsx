import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigator (redirects)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** API Authentication */
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      console.log("Logged in:", localStorage.getItem("user"));
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      // Extract error messages from the error object
      if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
        setError(err.errors[0]); // Show first error for login
      } else if (
        err.response?.data?.errors &&
        Array.isArray(err.response.data.errors) &&
        err.response.data.errors.length > 0
      ) {
        setError(err.response.data.errors[0]);
      } else if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="bg-red-50 border border-red-200 rounded-md p-3 text-red-500 text-sm">{error}</p>
      }
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
