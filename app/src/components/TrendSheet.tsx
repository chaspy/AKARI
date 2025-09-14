import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type TrendSheetProps = {
  data: { date: string; weight: number }[];
  weeklyChange: number;
};

export function TrendSheet({ data, weeklyChange }: TrendSheetProps) {
  const isPositive = weeklyChange < 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-full text-sm text-center text-[rgb(99,102,106)] underline-offset-2 hover:underline">
          先週比{' '}
          <span className={isPositive ? 'text-[rgb(98,183,156)]' : 'text-[rgb(216,110,154)]'}>
            {weeklyChange > 0 ? '+' : ''}{weeklyChange}kg
          </span>
          （グラフを見る）
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="text-[rgb(25,25,25)]">体重の推移</SheetTitle>
        </SheetHeader>
        <div className="mt-6 h-[60vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="rgb(98,183,156)"
                strokeWidth={2}
                dot={{ fill: 'rgb(98,183,156)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SheetContent>
    </Sheet>
  );
}