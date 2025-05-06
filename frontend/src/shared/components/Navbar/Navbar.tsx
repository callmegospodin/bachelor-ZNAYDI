import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getInfoFromLocalStorage,
  removeInfoFromLocalStorage,
} from "../../../helpers/localstorage.helper";

const Navbar: FC = () => {
  const [isAuth, setIsAuth] = useState<string>(
    getInfoFromLocalStorage("token") || ""
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    removeInfoFromLocalStorage("token");
    setIsAuth("");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile/123");
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {}, [isAuth]);

  return (
    <nav className="flex items-center justify-between bg-blue-50 bg-opacity-80 backdrop-blur-md px-4 shadow-md">
      <div
        className="flex items-center gap-2"
        onClick={() => handleNavigateToHome()}
      >
        <img src="/logo.png" alt="Logo" className="h-15 w-30 object-contain" />
      </div>

      <div className="flex gap-6 text-gray-700 font-medium">
        {[
          { path: "/", label: "Головна сторінка" },
          { path: "/events", label: "Івенти" },
          { path: "/about", label: "Про нас" },
          { path: "/analytics", label: "Аналітика" },
          { path: "/calendar", label: "Календар" },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="hover:text-[#2B2EFF] transition duration-200"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isAuth ? (
          <div className="flex items-center gap-3">
            <img
              src="/user_photo.jpg"
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
              onClick={() => handleNavigateToProfile()}
            />
            <button
              onClick={() => handleLogout()}
              className="px-4 py-2 rounded-md border border-[#8385F9] text-[#8385F9] hover:bg-[#8385F9]/10 transition"
            >
              Вихід
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/authorize"
              className="px-4 py-2 rounded-md border border-[#8385F9] text-[#8385F9] hover:bg-[#8385F9]/10 transition"
            >
              Log In
            </Link>
            <Link
              to="/authorize"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#8385F9] to-[#2B2EFF] text-white hover:opacity-90 transition"
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
