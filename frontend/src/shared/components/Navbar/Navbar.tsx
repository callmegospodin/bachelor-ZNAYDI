import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  getInfoFromLocalStorage,
  removeInfoFromLocalStorage,
} from "../../../helpers/localstorage.helper";

const Navbar: FC = () => {
  const [language, setLanguage] = useState("ua");
  const isAuth = getInfoFromLocalStorage("token");
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleLogout = () => {
    removeInfoFromLocalStorage("token");
  };

  return (
    <nav className="flex items-center justify-between bg-white bg-opacity-90 backdrop-blur-md px-6 py-4 shadow-md">
      <div className="flex items-center gap-2">
        <img src="/lotus.jpg" alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
          Znaidy
        </span>
      </div>

      {/* Styled Navigation Links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        {[
          { path: "/", label: "Home" },
          { path: "/events", label: "Events" },
          { path: "/about", label: "About" },
          { path: "/analytics", label: "Analytics" },
          { path: "/calendar", label: "Calendar" },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="hover:text-orange-500 transition duration-200 hover:underline underline-offset-4"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-gray-700 focus:outline-none">
            {language.toUpperCase()} <ChevronDown size={16} />
          </button>
          <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md overflow-hidden z-10">
            <button
              onClick={() => handleLanguageChange("en")}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("ua")}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              UA
            </button>
          </div>
        </div>

        {/* Auth Buttons */}
        {isAuth ? (
          <div className="flex items-center gap-3">
            <img
              src="/default_user_photo.jpg"
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover border-2 border-orange-400"
            />
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-red-400 text-red-500 hover:bg-red-100 transition"
            >
              Вихід
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/authorize"
              className="px-4 py-2 rounded-md border border-orange-400 text-orange-500 hover:bg-orange-100 transition"
            >
              Log In
            </Link>
            <Link
              to="/authorize"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
