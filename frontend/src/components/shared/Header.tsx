import { NavLink, Outlet } from "react-router-dom";

export default function Header() {
  return (
  <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white drop-shadow-xl px-6 py-7">
    <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
    <ul>
      <li>
        <NavLink to="/" className="mr-4">
          Home
        </NavLink>
        <NavLink to="/about" className="mr-4">
          About
        </NavLink>
        <NavLink to="/landing_test" className="mr-4">
          Landing
        </NavLink>
      </li>
    </ul>
  </header>
  )
}
