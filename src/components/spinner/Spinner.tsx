import "./Spinner.css";

type SpinnerProps = {
  size?: number;
  color?: string;
};

const color = "#260f0f";

export function Spinner({ size = 40 }: SpinnerProps) {
  return (
    <svg className="spinner" width={size} height={size} viewBox="0 0 50 50">
      <circle
        className="spinner-arc"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
