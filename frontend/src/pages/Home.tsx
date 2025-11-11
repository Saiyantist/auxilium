import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Ticket, Users, Settings, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className=" bg-gradient-to-br from-purple-500 via-pink-300 to-indigo-500">
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="px-7 space-y-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              IT'S TIME FOR BETTER SUPPORT!
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Streamline your customer support with our powerful helpdesk and ticketing system. 
              Manage tickets efficiently, track progress, and deliver exceptional service.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="px-6 relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600" 
                alt="Happy customer support representative"
                className="rounded-2xl w-full h-auto"
              />
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 bg-yellow-400 rounded-full p-4 shadow-lg">
                <Ticket className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-purple-600 rounded-full p-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Auxilium?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            {/* Feature 1 */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Smart Ticketing</h3>
              <p className="text-gray-600">
                Organize and prioritize support tickets with ease. Never miss an important customer request.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-pink-500">
              <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Team Collaboration</h3>
              <p className="text-gray-600">
                Work together seamlessly with your support team. Assign, share, and resolve tickets faster.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Customizable</h3>
              <p className="text-gray-600">
                Tailor the system to your workflow. Built with React, TypeScript, and shadcn/ui.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Support?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Auxilium to deliver exceptional customer support.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link to="/register">Get Started!</Link>
          </Button>
        </div>
      </div>

      {/* Tech Stack Footer */}
      {/* <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">Built with modern technologies</p>
          <div className="flex justify-center items-center gap-8 text-gray-500">
            <span className="text-lg">Vite</span>
            <span>•</span>
            <span className="text-lg">React + TypeScript</span>
            <span>•</span>
            <span className="text-lg">shadcn/ui</span>
            <span>•</span>
            <span className="text-lg">Rails API</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}