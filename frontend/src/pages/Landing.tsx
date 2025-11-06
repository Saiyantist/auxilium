import { Button } from "@/components/ui/button"; // Assuming shadcn/ui is set up with Button component

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome To Auxilium</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          A HelpDesk and Ticketing System using
        </h2>
        <h3 className="text-xl text-gray-600">
          Vite + React-TS + shadcn/ui + RAILS
        </h3>
        <p className="text-base text-gray-500 mt-4">
          Streamline your support operations with our intuitive ticketing solution.
        </p>
        <div className="mt-6">
          <Button variant="default" size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}