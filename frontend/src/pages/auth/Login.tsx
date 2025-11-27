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
// import { Facebook, Chrome, Twitter } from "lucide-react";
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
    <div className="h-full">
      <Card className="h-full w-full p-5 shadow-2xl flex flex-col overflow-hidden">
        <CardHeader className="p-2">
          <div className="absolute cursor-pointer rounded-full hover:bg-accent p-1">
            <Link to="/">
              <ChevronLeft size={32} />
            </Link>
          </div>
          <CardTitle>
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Login</h2>
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-2 flex-1">
          <form onSubmit={handleLogin} className="space-y-6">
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

            {/* <div className="text-right">
              <Link
              to="/forgot-password"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div> */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'LOGIN'}
            </Button>

            {error && (
              <p className="bg-red-50 border border-red-200 rounded-md p-2 text-red-500 text-sm mb-4 text-center">
                {error}
              </p>
            )}
          </form>
        </CardContent>

        <CardFooter className="p-2 flex-col gap-2">
          {/* <div className="text-center my-4 text-gray-600">Or Sign in using</div>
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

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-purple-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
