import { PropsWithChildren } from "react";
import "./Button.css";

type ButtonProps = PropsWithChildren &
  Pick<React.DOMAttributes<HTMLButtonElement>, "onClick"> &
  Pick<React.HTMLAttributes<HTMLButtonElement>, "style">;

export default function Button({ children, onClick, style }: ButtonProps) {
  return (
    <button
      style={style}
      onClick={(e) => {
        onClick?.(e);
        e.currentTarget.classList.add("flash");
      }}
      onAnimationEnd={(e) => e.currentTarget.classList.remove("flash")}
    >
      {children}
    </button>
  );
}
