import { FC, useState } from "react";

import { Button } from "../shared/components/buttons/buttons";
import { useNavigate } from "react-router-dom";
import { getInfoFromLocalStorage } from "../helpers/localstorage.helper";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<string>(
    getInfoFromLocalStorage("token") || ""
  );

  const navigate = useNavigate();

  const handleRedirectToAuthorization = () => {
    navigate("/authorize");
  };

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
          <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Потрібна автентифікація
            </h2>
            <p className="text-gray-600 mb-6">
              Щоб переглянути цю сторінку, потрібно увійти в систему. Будь
              ласка, авторизуйтеся.
            </p>
            <button
              onClick={handleRedirectToAuthorization}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Авторизуватися
            </button>
          </div>
        </div>
      )}
    </>
  );
};
