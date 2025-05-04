import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/authorize";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};
