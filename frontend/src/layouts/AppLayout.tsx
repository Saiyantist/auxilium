import React from "react";
import { NavLink } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="shadow-sm px-6 py-4 bg-neutral-700">
        <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
        <ul>
          <li>
            <NavLink to="/" className="mr-4">Home</NavLink>
            <NavLink to="/about" className="mr-4">About</NavLink>
          </li>
        </ul>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}