import { FC } from "react";

import { Button } from "../shared/components/buttons/buttons";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = true;

  const navigate = useNavigate();

  const handleRedirectToAuthorization = () => {
    navigate("/authorize");
  };

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="my-10">
          <h3>You should authorize to see this page</h3>
          <Button
            handler={handleRedirectToAuthorization}
            type="submit"
            children="Authorization"
            btnStyle="secondary"
          />
        </div>
      )}
    </>
  );
};
