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

export default function SatisfactionTrend({ data }) {
  if (!data || data.length === 0) return null;

  // Group by survey_month
  const monthlyData = data.reduce((acc, curr) => {
    const month = curr.survey_month;
    if (!acc[month]) {
      acc[month] = { month, count: 0, total_overall: 0, total_safety: 0 };
    }
    acc[month].count += 1;
    acc[month].total_overall += parseInt(curr.overall_rating || 0, 10);
    acc[month].total_safety += parseInt(curr.safety_rating || 0, 10);
    return acc;
  }, {});

  const chartData = Object.values(monthlyData)
    .map(d => ({
      month: d.month,
      avg_overall: parseFloat((d.total_overall / d.count).toFixed(1)),
      avg_safety: parseFloat((d.total_safety / d.count).toFixed(1))
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="chart-container">
      <h3>Average Satisfaction Trend</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} 
              stroke="#64748b" 
              fontSize={13} tickMargin={10} minTickGap={20} 
            />
            <YAxis stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} domain={[1, 5]} ticks={[1,2,3,4,5]} />
            <Tooltip 
              labelFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" name="Overall Rating" dataKey="avg_overall" stroke="#10b981" strokeWidth={4} activeDot={{ r: 6 }} />
            <Line type="monotone" name="Safety Rating" dataKey="avg_safety" stroke="#2563eb" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
