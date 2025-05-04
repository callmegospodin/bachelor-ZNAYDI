import { FC } from "react";

interface AuthBodyContainerProps {
  children: React.ReactNode;
}

export const UserFormBodyContainer: FC<AuthBodyContainerProps> = ({
  children,
}) => {
  return (
    <section className="bg-[url('/background.avif')] bg-cover bg-center bg-no-repeat w-full h-screen">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="w-96 md:mx-6 md:p-2">{children}</div>
        </div>
      </div>
    </section>
  );
};
