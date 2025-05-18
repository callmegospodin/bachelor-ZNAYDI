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
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/favorites")}
              className="text-gray-700 hover:text-red-500 transition"
              title="Улюблені"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="inline-flex items-center justify-center text-gray-700 hover:text-blue-600 transition h-10 w-10"
              title="Корзина"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 right-[1px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 00.293 1.414L7 17h10a1 1 0 00.707-1.707L17 13M7 13V6m10 7v-5m-6 14a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
            </button>

            <img
              src="/user_photo.jpg"
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-400 cursor-pointer"
              onClick={handleNavigateToProfile}
            />
            <button
              onClick={handleLogout}
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
              Авторизуватися
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
