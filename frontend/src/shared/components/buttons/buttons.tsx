import { FC, MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  readonly key?: number;
  readonly value?: string;
  readonly btnStyle?: string;
  readonly type: "submit" | "reset" | "button";
  readonly children: ReactNode;
  readonly handler?: MouseEventHandler<HTMLButtonElement>;
  readonly className?: string;
};

export const Button: FC<ButtonProps> = ({
  key,
  value,
  btnStyle,
  type,
  children,
  handler,
  className,
}) => {
  return (
    <>
      {btnStyle === "primary" && (
        <button
          key={key}
          value={value}
          className="mt-5 w-full bg-transparent text-white-700 font-semibold py-2 px-4 border border-blue-500 hover:bg-blue-500"
          type={type}
          onClick={handler}
        >
          {children}
        </button>
      )}
      {btnStyle === "secondary" && (
        <button
          key={key}
          value={value}
          className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          style={{
            background:
              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
          }}
          type={type}
          onClick={handler}
        >
          {children}
        </button>
      )}
    </>
  );
};
