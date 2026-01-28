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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<string[]>([]); // Changed to array for multiple errors
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const newUser = await register(email, password, firstName, lastName);
      navigate(getDashboardRoute(newUser.role));
    } catch (err: any) {
      console.error(err.errors);
      setErrors([...new Set(err.errors as string[])]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full sm:max-w-2xl lg:max-w-4xl min-h-[80vh] flex flex-col overflow-hidden shadow-2xl border-0">
        <div className="flex flex-1 flex-col md:flex-row md:items-stretch">

          {/* LEFT PANEL */}
          <div className="hidden md:flex md:w-2/5 flex-col justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10">
            <h2 className="text-3xl font-bold mb-4">
              Create your Auxilium account
            </h2>
            <p className="text-white/90 leading-relaxed">
              Start submitting tickets, tracking progress, and communicating clearly with support teams.
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative w-full md:w-3/5 px-10 py-6 bg-white flex flex-col justify-evenly">
            <Link
              to="/"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronLeft size={20} />
            </Link>

            <CardHeader className="px-0 pt-10 space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Register
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create an account to get started
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="h-11 rounded-lg"
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="h-11 rounded-lg"
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />

                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />

                {errors.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600 space-y-2">
                    {/* <p className="font-medium">Errors ({errors.length})</p> */}
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

            <CardFooter className="justify-center p-0">
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