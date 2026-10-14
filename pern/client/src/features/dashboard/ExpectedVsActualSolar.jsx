/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ExpectedVsActualSolar({ data }) {
  if (!data || data.length === 0) return null;

  const sortedData = [...data]
    .sort((a, b) => new Date(a.log_date) - new Date(b.log_date))
    .map(d => ({
      ...d,
      solar_kwh: parseFloat(d.solar_kwh || 0),
      expected_kwh: parseFloat(d.expected_kwh || 0)
    }));

  return (
    <div className="chart-container">
      <h3>Expected vs Actual Solar (kWh)</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="log_date" 
              tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
              stroke="#64748b" 
              fontSize={13} tickMargin={10} minTickGap={20} 
            />
            <YAxis stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} />
            <Tooltip 
              cursor={{fill: '#f3f4f6'}}
              labelFormatter={(val) => new Date(val).toLocaleDateString()}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="expected_kwh" name="Expected (kWh)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="solar_kwh" name="Actual (kWh)" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
