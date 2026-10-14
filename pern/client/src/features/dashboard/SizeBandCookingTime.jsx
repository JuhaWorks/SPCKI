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

export default function SizeBandCookingTime({ data }) {
  if (!data || data.length === 0) return null;

  // Group by size_band and calculate avg duration
  const grouped = data.reduce((acc, session) => {
    const band = session.size_band || 'Unknown';
    if (!acc[band]) acc[band] = { count: 0, total_duration: 0 };
    acc[band].count += 1;
    acc[band].total_duration += parseFloat(session.duration_min || 0);
    return acc;
  }, {});

  const chartData = Object.keys(grouped).map(band => ({
    name: band,
    avg_duration: Math.round(grouped[band].total_duration / grouped[band].count)
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="chart-container">
      <h3>Avg Cooking Time by Family Size</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} />
            <YAxis stroke="#64748b" fontSize={13} tickMargin={10} minTickGap={20} />
            <Tooltip 
              cursor={{fill: '#f3f4f6'}}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
              formatter={(value) => [`${value} min`, 'Avg Duration']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="avg_duration" name="Avg Duration (min)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
