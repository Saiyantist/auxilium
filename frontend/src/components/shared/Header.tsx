import { NavLink } from "react-router-dom";

export default function Header() {

  return (
    <header
      aria-label="Main navigation"
      className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-purple-400 to-purple-600 text-white drop-shadow-xl px-6 py-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "font-bold border-b border-white px-2" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "font-bold border-b border-white px-2" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${isActive ? "font-bold border-b border-white px-2" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" 
              className={({ isActive }) =>
                `${isActive ? "font-bold border-b border-white px-2" : ""}`
              }>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register"
              className={({ isActive }) =>
                `${isActive ? "font-bold border-b border-white px-2" : ""}`
              }>
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
