type RingProps = {
  size?: number;
  thickness?: number;
  value: number;
};

export function GradientRing({
  size = 200,
  thickness = 14,
  value,
}: RingProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const id = 'ring-grad';

  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(239 217 190)" />
          <stop offset="100%" stopColor="rgb(98 183 156)" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#F3F4F6"
        strokeWidth={thickness}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={`url(#${id})`}
        strokeWidth={thickness}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}