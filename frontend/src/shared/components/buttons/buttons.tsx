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
          className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:opacity-90 focus:outline-none"
          style={{
            background: "linear-gradient(to right, #8385F9, #2B2EFF)",
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
