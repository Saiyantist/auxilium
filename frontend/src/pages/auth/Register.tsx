import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigator (redirects)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** API Authentication */
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);
    setLoading(true);

    try {
      await register(email, password);
      console.log("Registered:", localStorage.getItem("user"));
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      // Extract error messages from the error object
      let errors: string[] = [];

      if (err.errors && Array.isArray(err.errors)) {
        errors = err.errors;
      } else if (
        err.response?.data?.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        errors = err.response.data.errors;
      } else if (err.message) {
        errors = [err.message];
      } else {
        errors = ["An unexpected error occurred. Please try again."];
      }

      // Remove duplicate errors
      setError([...new Set(errors)]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <ul className="list-disc list-inside space-y-1">
            {error.map((err, index) => (
              <li key={index} className="text-red-600 text-sm">
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );
}
