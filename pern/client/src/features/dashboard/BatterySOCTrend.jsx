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

export default function BatterySOCTrend({ data }) {
  if (!data || data.length === 0) return null;

  const sortedData = [...data]
    .sort((a, b) => new Date(a.log_date) - new Date(b.log_date))
    .map(d => ({
      ...d,
      morning_soc: parseInt(d.morning_soc || 0, 10),
      evening_soc: parseInt(d.evening_soc || 0, 10)
    }));

  return (
    <div className="chart-container">
      <h3>Battery SOC Trend (%)</h3>
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
            <YAxis stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} domain={[0, 100]} />
            <Tooltip 
              labelFormatter={(val) => new Date(val).toLocaleDateString()}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" name="Morning SOC" dataKey="morning_soc" stroke="#0ea5e9" strokeWidth={4} />
            <Line type="monotone" name="Evening SOC" dataKey="evening_soc" stroke="#1e3a8a" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
