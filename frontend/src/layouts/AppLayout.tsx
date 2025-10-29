import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="shadow-sm px-6 py-4">
        <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}