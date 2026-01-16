import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Ticket, Users, Settings, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    /* dashboard layout: main viewport & scrolling */
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-300 to-indigo-500 overflow-hidden">
      {/* <div className="h-screen overflow-y-auto"> */}

        {/* ================= HERO SECTION ================= */}
        <section className="pt-20 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="space-y-6 text-white">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  IT'S TIME FOR BETTER SUPPORT
                </h1>

                <p className="text-lg md:text-xl opacity-90 max-w-xl">
                  Manage customer concerns with a simple, reliable helpdesk.
                  Track tickets, respond faster, and keep everyone informed.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-purple-700 hover:bg-purple-800 text-white"
                  >
                    <Link to="/dashboard">Get Started</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white text-purple-700 hover:bg-gray-100"
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative bg-white rounded-3xl shadow-2xl p-6">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900"
                    alt="Support team working together"
                    className="w-full rounded-2xl aspect-[4/3] object-cover"
                  />

                  {/* Decorative icons */}
                  <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 bg-yellow-400 rounded-full p-4 shadow-lg">
                    <Ticket className="w-8 h-8 text-white" />
                  </div>

                  <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 bg-purple-600 rounded-full p-4 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-center mb-24 text-gray-800">
              Why Choose Auxilium?
            </h2>

            <div className="grid md:grid-cols-3 gap-16">

              {/* Feature 1 */}
              <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-purple-500">
                <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  Smart Ticketing
                </h3>
                <p className="text-gray-600">
                  Easily create, track, and manage support tickets so no request is ever missed.
                </p>
              </Card>

              {/* Feature 2 */}
              <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-pink-500">
                <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  Role-Based Support
                </h3>
                <p className="text-gray-600">
                  Clear roles for clients, agents, and admins ensure smooth communication
                  and faster resolutions.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-indigo-500">
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  Easy Customization
                </h3>
                <p className="text-gray-600">
                  Adjust ticket flows and system settings to match how your team works.
                </p>
              </Card>

            </div>
          </div>
        </section>

        {/* ================= HOW AUXILIUM WORKS ================= */}
<section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 pb-32 pt-28">
  <div className="max-w-6xl mx-auto px-6 text-white">

    <h2 className="text-4xl font-bold text-center mb-16">
      How Auxilium Works
    </h2>

    <div className="grid md:grid-cols-3 gap-12 text-center">

      {/* Step 1 */}
      <div className="bg-white/10 rounded-2xl p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white text-purple-600
                        flex items-center justify-center text-2xl font-bold">
          1
        </div>
        <h3 className="text-2xl font-semibold mb-3">
          Create a Ticket
        </h3>
        <p className="text-white/90">
          Clients submit their problem using a simple form.
          No confusing steps, just explain the issue and send.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white/10 rounded-2xl p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white text-pink-600
                        flex items-center justify-center text-2xl font-bold">
          2
        </div>
        <h3 className="text-2xl font-semibold mb-3">
          Track the Status
        </h3>
        <p className="text-white/90">
          Clients can see updates, while agents work on the ticket.
          Everything is tracked in one dashboard.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white/10 rounded-2xl p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white text-indigo-600
                        flex items-center justify-center text-2xl font-bold">
          3
        </div>
        <h3 className="text-2xl font-semibold mb-3">
          Get It Resolved
        </h3>
        <p className="text-white/90">
          Agents respond, resolve the issue, and close the ticket.
          All communication stays recorded for reference.
        </p>
      </div>

    </div>
  </div>
</section>

{/* ================= WHO IT IS FOR ================= */}
<section className="bg-white py-20 pb-10">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
      What You Gain With Auxilium
    </h2>

    <div className="grid md:grid-cols-3 gap-12">

      {/* Client */}
      <div className="border rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
        <h3 className="text-2xl font-semibold mb-4 text-purple-600">
          For Clients
        </h3>
        <ul className="space-y-3 text-gray-600 text-left">
          <li>✓ Easy ticket submission</li>
          <li>✓ Clear status updates</li>
          <li>✓ No need to follow up repeatedly</li>
          <li>✓ All issues in one place</li>
        </ul>
      </div>

      {/* Agent */}
      <div className="border rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
        <h3 className="text-2xl font-semibold mb-4 text-pink-600">
          For Agents
        </h3>
        <ul className="space-y-3 text-gray-600 text-left">
          <li>✓ Organized list of assigned tickets</li>
          <li>✓ Clear priorities and statuses</li>
          <li>✓ Easy communication with clients</li>
          <li>✓ Faster issue resolution</li>
        </ul>
      </div>

      {/* Admin */}
      <div className="border rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
          For Admins
        </h3>
        <ul className="space-y-3 text-gray-600 text-left">
          <li>✓ Full control over users and roles</li>
          <li>✓ Monitor ticket activity and performance</li>
          <li>✓ Manage workflows and system settings</li>
          <li>✓ Keep everything structured and secure</li>
        </ul>
      </div>

    </div>

    <div className="text-center mt-16">
      <Button
        asChild
        size="lg"
        className="bg-purple-600 text-white hover:bg-purple-700"
      >
        <Link to="/register">Try Auxilium Now</Link>
      </Button>
    </div>

  </div>
</section>

      {/* </div> */}
    </div>
  );
}
