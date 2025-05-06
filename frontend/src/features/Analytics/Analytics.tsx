import { FC } from "react";

export const Analytics: FC = () => {
  return (
    <div className="flex items-center justify-center pt-10 bg-gradient-to-b from-blue-50 to-white">
      <div
        className="w-[400px] h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/workinprogress.jpg')`,
        }}
      ></div>
    </div>
  );
};
