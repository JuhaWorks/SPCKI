/* eslint-disable react/prop-types */
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function FaultUptimeTrend({ data }) {
  if (!data || data.length === 0) return null;

  const sortedData = [...data]
    .sort((a, b) => new Date(a.log_date) - new Date(b.log_date))
    .map(d => ({
      ...d,
      fault_count: parseInt(d.fault_count || 0, 10),
      // uptime % approx based on 24 hours, or productive hours if passed. 
      // simple calculation: 100 - (downtime / 24 * 100)
      uptime_pct: Math.round(100 - (parseFloat(d.downtime_hours || 0) / 24) * 100)
    }));

  return (
    <div className="chart-container">
      <h3>Faults & Uptime Trend</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={sortedData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="log_date" 
              tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
              stroke="#64748b" 
              fontSize={13} tickMargin={10} minTickGap={20} 
            />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} />
            <YAxis yAxisId="right" orientation="right" stroke="#2563eb" fontSize={13} tickMargin={10} minTickGap={20} domain={[0, 100]} />
            <Tooltip 
              labelFormatter={(val) => new Date(val).toLocaleDateString()}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar yAxisId="left" dataKey="fault_count" name="Daily Faults" fill="#64748b" barSize={20} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" name="Uptime (%)" dataKey="uptime_pct" stroke="#2563eb" strokeWidth={4} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
