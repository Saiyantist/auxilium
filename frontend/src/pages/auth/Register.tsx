import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { ChevronLeft } from 'lucide-react';
import { getDashboardRoute } from '@/utils/routing';

export default function Register() {
  const { register } = useAuth(); // Assuming you have a register function in useAuth
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]); // Changed to array for multiple errors
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      // Add your validation logic here, e.g., check password length, uppercase, etc.
      // For demo: simulate errors or call register
      const newUser = await register(email, password); // Placeholder
      navigate(getDashboardRoute(newUser.role));
    } catch (err: any) {
      console.error(err);
      // Set multiple errors based on validation; example:
      setErrors([
        'Password is too short (minimum is 8 characters)',
        'Password must contain at least one uppercase letter',
        // Add more as needed
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl overflow-hidden shadow-2xl border-0">
        <div className="grid md:grid-cols-2">

          {/* LEFT PANEL */}
          <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10">
            <h2 className="text-3xl font-bold mb-4">
              Create your Auxilium account
            </h2>
            <p className="text-white/90 leading-relaxed">
              Start submitting tickets, tracking progress, and communicating clearly with support teams.
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative p-10 bg-white">
            <Link
              to="/"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronLeft size={20} />
            </Link>

            <CardHeader className="px-0 pt-6 pb-8 space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Register
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create an account to get started
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleRegister} className="space-y-5">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />

                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />

                {errors.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600 space-y-2">
                    <p className="font-medium">Errors ({errors.length})</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="px-0 pt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}