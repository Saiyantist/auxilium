import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Landing() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      
      {/* ================= HERO ================= */}
      <div className="container mx-auto px-6 py-16 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Get in Touch With Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question, need support, or just want to learn more about Auxilium?
          We’re here to help.
        </p>
      </div>

      {/* ================= CONTACT METHODS ================= */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Email */}
          <Card className="p-10 text-center rounded-2xl hover:shadow-2xl transition-all border-t-4 border-purple-500">
            <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Email Support
            </h3>
            <p className="text-gray-600 mb-4">
              Send us your concerns anytime
            </p>
            <p className="font-medium text-purple-700">
              support-auxilium@gmail.com
            </p>
          </Card>

          {/* Phone */}
          <Card className="p-10 text-center rounded-2xl hover:shadow-2xl transition-all border-t-4 border-pink-500">
            <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Call Us
            </h3>
            <p className="text-gray-600 mb-4">
              Available during business hours
            </p>
            <p className="font-medium text-pink-600">
              +63 767 676 7676
            </p>
          </Card>

          {/* Address */}
          <Card className="p-10 text-center rounded-2xl hover:shadow-2xl transition-all border-t-4 border-blue-500">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Visit Our Office
            </h3>
            <p className="text-gray-600 mb-4">
              We’re based in the Philippines
            </p>
            <p className="font-medium text-blue-600 leading-relaxed">
              Brgy. 123 Dimalamang Street<br />
              Sinaktan City, Philippines 14343
            </p>
          </Card>

        </div>
      </div>
    </div>
  );
}
