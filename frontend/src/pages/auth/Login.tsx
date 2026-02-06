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

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      navigate(getDashboardRoute(loggedInUser.role));
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full sm:max-w-2xl lg:max-w-4xl overflow-hidden shadow-2xl border-0">
        <div className="flex flex-col md:flex-row">

          {/* LEFT PANEL */}
          <div className="hidden md:flex md:w-2/5 flex-col justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Auxilium
            </h2>
            <p className="text-white/90 leading-relaxed">
              Manage tickets, track progress, and resolve issues faster with
              all in one clean dashboard.
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative w-full md:w-3/5 p-10 bg-white">
            <Link
              to="/"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronLeft size={20} />
            </Link>

            <CardHeader className="px-0 pt-6 pb-8 space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Sign In
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleLogin} className="space-y-5">
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

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="justify-center px-0">
              <p className="text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
