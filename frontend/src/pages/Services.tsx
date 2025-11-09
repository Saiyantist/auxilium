import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"


export default function Services() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    API.get("/healthz")
      .then(() => setStatus("✅ Connected ✅"))
      .catch(() => setStatus("❌ Unreachable ❌"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Logos */}
      <div className="flex justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Hero */}
      <div className="space-y-5">
        <h1 className="text-center font-semibold">Auxilium</h1>
        <h2 className="text-center text-2xl">A HelpDesk and Ticketing System using</h2>
        <h3 className="text-center text-xl">Vite + React-TS + shadcn/ui + RAILS</h3>
      </div>

      {/* Testing shadcn scroll area */}
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
      </ScrollArea>

      <div className="space-y-5">
        <Card className="p-6 space-y-4">
          {/* API Connection test */}
          <p className="text-center">API Connection Status:</p>
          <h3 className="text-center text-xl italic">{status}</h3>
          <div className="flex justify-center space-x-5">
            <Button asChild variant="outline"><Link to = "/about">Get started</Link></Button>
            <Button variant="outline">Button</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}