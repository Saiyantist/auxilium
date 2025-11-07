import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Facebook, Chrome, Twitter } from "lucide-react";
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
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(["An unexpected error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>

        {error.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <ul className="list-disc list-inside space-y-1">
              {error.map((err, index) => (
                <li key={index} className="text-red-600 text-sm">
                  {err}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <Input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50"
            required
          />
          <Input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50"
            required
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </Button>
        </form>

        {/* <div className="text-center my-4 text-gray-600">Or Register using</div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="rounded-full p-2">
            <Facebook className="w-5 h-5 text-blue-600" />
          </Button>
          <Button variant="outline" className="rounded-full p-2">
            <Twitter className="w-5 h-5 text-sky-400" />
          </Button>
          <Button variant="outline" className="rounded-full p-2">
            <Chrome className="w-5 h-5 text-red-600" />
          </Button>
        </div> */}

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign in
          </Link>
      <div className="flex gap-4 items-center justify-center mt-6">
         <Button asChild size="lg" className="w-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:opacity-90 transition">
            <Link to="/">Home</Link>
         </Button>
      </div>
        </p>
      </Card>
    </div>
  );
}
