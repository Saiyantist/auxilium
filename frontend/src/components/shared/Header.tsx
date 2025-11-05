import { NavLink, Outlet } from "react-router-dom";

export default function Header() {
  return (
  <header className="shadow-sm px-6 py-4">
    <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
    <ul>
      <li>
        <NavLink to="/" className="mr-4">
          Home
        </NavLink>
        <NavLink to="/about" className="mr-4">
          About
        </NavLink>
      </li>
    </ul>
  </header>
  )
}
