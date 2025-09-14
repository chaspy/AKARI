type SparkProps = {
  data: number[];
  width?: number;
  height?: number;
};

export function Sparkline({ data, width = 240, height = 56 }: SparkProps) {
  if (data.length < 2) return null;

  const pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const xs = data.map((_, i) => pad + (i * (width - 2 * pad)) / (data.length - 1));
  const ys = data.map(v => pad + (height - 2 * pad) * (1 - (v - min) / range));
  const d = xs.map((x, i) => `${i ? 'L' : 'M'}${x},${ys[i]}`).join(' ');
  const trendDown = data[0] > data[data.length - 1];

  return (
    <svg width={width} height={height} className="mx-auto">
      <path
        d={d}
        fill="none"
        stroke={trendDown ? 'var(--primary)' : 'oklch(0.62 0.22 18)'}
        strokeWidth="2"
      />
      {xs.map((x, i) =>
        i === xs.length - 1 && (
          <circle
            key={i}
            cx={x}
            cy={ys[i]}
            r="3"
            fill={trendDown ? 'var(--primary)' : 'oklch(0.62 0.22 18)'}
          />
        )
      )}
    </svg>
  );
}
