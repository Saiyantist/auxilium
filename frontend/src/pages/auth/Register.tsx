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
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Facebook, Chrome, Twitter } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { ChevronLeft } from 'lucide-react';
import { getDashboardRoute } from '@/utils/routing';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);
    setLoading(true);

    try {
      const newUser = await register(email, password);
      navigate(getDashboardRoute(newUser.role));
    } catch (err: any) {
      console.error(err.errors);
      setError([...new Set(err.errors as string[])]);
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
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Register
            </h2>
          </CardTitle>
          <CardDescription className="text-center">
            Complete the form to sign up as a client
          </CardDescription>
        </CardHeader>

        <CardContent className="p-2 flex-1">
          <form onSubmit={handleRegister} className="space-y-6">
            {error.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-2">
                <ScrollArea>
                  <ul className="list-disc list-inside space-y-1 max-h-20">
                    <p className="text-red-600 text-sm">
                      <b>{error.length == 1 ? 'Error' : 'Errors'}</b>:{' '}
                      {error.length > 1 && error.length}
                    </p>
                    {error.map((err, index) => (
                      <li key={index} className="text-red-600 text-xs">
                        {err}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )}
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'SIGN UP'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="p-2 flex-col gap-2">
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
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>

          <div className="flex items-center justify-center">
            {/* <Button asChild size="lg" className="w-50 text-primary text-white bg-gradient-to-r from-blue-500 to-purple-500 font-semibold rounded-full hover:opacity-90 transition">
              <Link to="/">Home</Link>
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
