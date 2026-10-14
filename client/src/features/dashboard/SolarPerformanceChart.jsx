/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

 
export default function SolarPerformanceChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No solar data available.</div>;
  }

  const sortedData = [...data]
    .sort((a, b) => new Date(a.log_date) - new Date(b.log_date))
    .map(d => ({
      ...d,
      solar_kwh: parseFloat(d.solar_kwh || 0),
      consumed_kwh: parseFloat(d.consumed_kwh || 0)
    }));

  return (
    <div className="chart-container">
      <h3>Solar Generation vs Consumption (kWh)</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="log_date" 
              tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
              stroke="#64748b" 
              fontSize={13} tickMargin={10} minTickGap={20} 
            />
            <YAxis stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} />
            <Tooltip 
              labelFormatter={(val) => new Date(val).toLocaleDateString()}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line 
              type="monotone" 
              name="Generated (kWh)" 
              dataKey="solar_kwh" 
              stroke="#2563eb" 
              strokeWidth={4}
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              name="Consumed (kWh)" 
              dataKey="consumed_kwh" 
              stroke="#64748b" 
              strokeWidth={4} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
