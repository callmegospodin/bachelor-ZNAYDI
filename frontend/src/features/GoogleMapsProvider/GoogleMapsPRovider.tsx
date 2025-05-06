import { LoadScript } from "@react-google-maps/api";
import { FC, ReactNode } from "react";

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export const GoogleMapsProvider: FC<GoogleMapsProviderProps> = ({
  children,
}) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDsd9Q4iBKbQDYzgjApoo8c5YnZO8fUf38">
      {children}
    </LoadScript>
  );
};
