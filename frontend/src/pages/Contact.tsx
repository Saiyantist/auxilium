import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: In a real app, send via API
    console.log("Form submitted");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto py-20 px-6">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Contact Us
          </h1>
          <h2 className="text-xl text-gray-600">
            We'd love to hear from you!
          </h2>
        </div>
        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-16">

            {/* Email Card */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Email</h3>
              <p className="text-gray-600">
                support-auxilium@gmail.com
              </p>
            </Card>

            {/* Phone Card */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-pink-500">
              <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Phone</h3>
              <p className="text-gray-600">
                +6 (767) 676-7676
              </p>
            </Card>

            {/* Address Card */}
            <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Address</h3>
              <p className="text-gray-600">
                Brgy. 123 Dimalamang Street, Sinaktan City, Philippines 14343
              </p>
            </Card>
          </div>
        </div>
      </div>


      {/* Contact Form Section */}
      <div className="py-16 bg-gradient-to-br from-purple-500 to-indigo-400">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Send Us a Message
        </h2>
        <Card className="p-8 mx-auto max-w-xl hover:shadow-xl transition-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" />
            </div>
            <Button type="submit" variant="outline" className="w-full bg-purple-400 text-white">Send Message</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}