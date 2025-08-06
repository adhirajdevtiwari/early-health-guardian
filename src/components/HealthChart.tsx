import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HealthData {
  date: string;
  heartRate: number;
  bp: string;
  sugar: number;
}

interface HealthChartProps {
  data: HealthData[];
}

export const HealthChart = ({ data }: HealthChartProps) => {
  // Transform data for chart
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    heartRate: item.heartRate,
    bloodSugar: item.sugar,
    systolic: parseInt(item.bp.split('/')[0]),
    diastolic: parseInt(item.bp.split('/')[1])
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-muted-foreground"
            fontSize={12}
          />
          <YAxis 
            className="text-muted-foreground"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="heartRate" 
            stroke="hsl(var(--success))" 
            strokeWidth={2}
            name="Heart Rate (bpm)"
          />
          <Line 
            type="monotone" 
            dataKey="systolic" 
            stroke="hsl(var(--info))" 
            strokeWidth={2}
            name="Systolic BP"
          />
          <Line 
            type="monotone" 
            dataKey="bloodSugar" 
            stroke="hsl(var(--warning))" 
            strokeWidth={2}
            name="Blood Sugar (mg/dL)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};