import { LoadScript } from "@react-google-maps/api";
import { FC, ReactNode } from "react";

interface GoogleMapsProviderProps {
  children: ReactNode;
}

const GOOGLE_MAP_API_KEY = process.env.SERVER_URL || "";

export const GoogleMapsProvider: FC<GoogleMapsProviderProps> = ({
  children,
}) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>{children}</LoadScript>
  );
};
