import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Target, Heart, Users, Layers, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      
      {/* Hero Section */}
      <div className="container mx-auto py-20 px-6">
        <div className="py-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              About Auxilium
            </h1>
            <p className="text-xl text-gray-600">
              Empowering teams to deliver exceptional customer support through modern technology
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
<div className="container mx-auto px-8 py-4">
  <div className="grid md:grid-cols-2 gap-20">
    
    {/* Mission */}
    <Card className="p-8 bg-gradient-to-br from-purple-400 to-purple-600 text-white hover:shadow-2xl transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="rounded-full p-3">
          <Target className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold">Our Mission</h2>
      </div>
      <p className="text-lg leading-relaxed">
        Our goal is simple: make customer support easier.
        Auxilium helps teams handle tickets faster, stay organized,
        and solve problems without confusion or stress.
      </p>
    </Card>

    {/* Vision */}
    <Card className="p-8 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white hover:shadow-2xl transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white/20 rounded-full p-3">
          <Rocket className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold">Our Vision</h2>
      </div>
      <p className="text-lg leading-relaxed">
        We want every business to have a support system that just works.
        A system that is easy to use, looks modern,
        and helps teams give better help to their customers.
      </p>
    </Card>

  </div>
</div>
      </div>

      {/* Core Values */}
<div className="py-8 mb-20">
  <div className="container mx-auto px-16">
    <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
      Our Core Values
    </h2>
    <p className="text-center text-gray-600 mb-12">
      These values guide how we build and improve Auxilium every day
    </p>
    
    <div className="grid md:grid-cols-3 gap-10">
      
      {/* Value 1 */}
      <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-purple-500">
        <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-10 h-10 text-purple-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">
          Customer First
        </h3>
        <p className="text-gray-600">
          We design the system around real users.
          Every feature is built to make support work easier for both customers and teams.
        </p>
      </Card>

      {/* Value 2 */}
      <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-fuchsia-500">
        <div className="bg-fuchsia-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Zap className="w-10 h-10 text-fuchsia-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">
          Simple Innovation
        </h3>
        <p className="text-gray-600">
          We improve how help desks work by keeping things modern,
          but always simple and easy to understand.
        </p>
      </Card>

      {/* Value 3 */}
      <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-indigo-500">
        <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Users className="w-10 h-10 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">
          Teamwork
        </h3>
        <p className="text-gray-600">
          Auxilium supports teamwork by helping clients, agents,
          and admins communicate clearly and work together smoothly.
        </p>
      </Card>

    </div>
  </div>
</div>


      {/* System Capabilities */}
<div className="px-8 bg-gradient-to-r from-purple-400 to-indigo-600 py-20 text-white">
  <div className="container mx-auto mt-14 mb-16">
    <div className="flex items-center justify-center gap-4 mb-8">
      <Layers className="w-12 h-12 text-purple-300" />
      <h2 className="text-4xl font-bold text-center">
        Built for Everyday Support
      </h2>
    </div>

    <p className="text-center text-gray-200 mb-12 text-lg max-w-3xl mx-auto">
      Auxilium provides all the essential tools a modern help desk needs — 
      designed to be simple for users, efficient for agents, and powerful for administrators.
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      
      {/* Client Features */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <h3 className="text-2xl font-semibold mb-4 text-violet-300">
          For Clients
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <span>Submit support requests through a clean and simple form</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <span>Track ticket status and updates in real time</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <span>Communicate directly with support agents</span>
          </li>
        </ul>
      </Card>

      {/* Agent Features */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <h3 className="text-2xl font-semibold mb-4 text-rose-300">
          For Agents
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
            <span>View, manage, and respond to assigned tickets</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
            <span>Update ticket status and resolution details</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
            <span>Collaborate internally to resolve issues faster</span>
          </li>
        </ul>
      </Card>

      {/* Admin Features */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-300">
          For Administrators
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
            <span>Manage users, roles, and system access</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
            <span>Configure workflows and ticket behavior</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
            <span>Monitor system activity and overall performance</span>
          </li>
        </ul>
      </Card>

    </div>
  </div>
</div>


      {/* Our Story */}
      <div className="container mx-auto mt-6 py-20">
        <div>
          <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">Our Story</h2>
          <Card className="p-8 max-w-6xl mx-auto mt-20 text-gray-800 hover:shadow-2xl transition-all">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Auxilium was born from a simple observation: customer support teams were struggling 
              with outdated, complicated helpdesk systems that slowed them down instead of helping them.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We set out to build something different—a modern, intuitive platform that combines 
              the power of cutting-edge web technologies with the simplicity that support teams 
              actually need. Using React, TypeScript, and Ruby on Rails, we created a system that's 
              both powerful for developers and delightful for users.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, Auxilium helps teams around the world deliver faster, more efficient support 
              to their customers. And we're just getting started.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Auxilium?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our growing community and transform the way you handle customer support.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}