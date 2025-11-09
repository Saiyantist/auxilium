import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Target, Heart, Users, Code, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      
      {/* Hero Section */}
      <div className="container mx-auto py-20">
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
                <div className="bg-white/20 rounded-full p-3">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To revolutionize customer support by providing an intuitive, powerful, and 
                efficient helpdesk system that enables teams to resolve issues faster and 
                deliver outstanding service experiences.
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
                To become the leading helpdesk solution that empowers businesses of all sizes 
                to build stronger relationships with their customers through seamless, 
                technology-driven support.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Our Core Values
          </h2>
          <p className="text-center text-gray-600 mb-12">
            The principles that guide everything we do at Auxilium
          </p>
          
          <div className="grid md:grid-cols-3 gap-16">
            
            {/* Value 1 */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Customer First</h3>
              <p className="text-gray-600">
                We put our customers at the heart of everything we build. Their success is our success.
              </p>
            </Card>

            {/* Value 2 */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-fuchsia-500">
              <div className="bg-fuchsia-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-fuchsia-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries with cutting-edge technology to solve real problems.
              </p>
            </Card>

            {/* Value 3 */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-indigo-500">
              <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Collaboration</h3>
              <p className="text-gray-600">
                We believe great solutions come from teamwork, transparency, and open communication.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="px-7 bg-gradient-to-r from-purple-400 to-indigo-600 py-20 text-white">
        <div className="container mx-auto ">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Code className="w-12 h-12 text-purple-400" />
            <h2 className="text-4xl font-bold text-center">Built With Modern Tech</h2>
          </div>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Auxilium is powered by the latest web technologies to ensure speed, 
            reliability, and an exceptional user experience.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Frontend */}
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-violet-400">Frontend</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>Vite</strong> - Lightning-fast build tool</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>React</strong> - Component-based UI library</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>TypeScript</strong> - Type-safe development</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>shadcn/ui</strong> - Beautiful components</span>
                </li>
              </ul>
            </Card>

            {/* Backend */}
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-rose-400">Backend</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>Ruby on Rails</strong> - Robust API framework</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>RESTful API</strong> - Scalable architecture</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>PostgreSQL</strong> - Reliable database</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300"><strong>Authentication</strong> - Secure user management</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto py-20">
        <div>
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Story</h2>
          <Card className="p-8 md:p-12 bg-gradient-to-br from-fuchsia-200 to-fuchsia-400 hover:bg-gradient-to-r border-none text-white">
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