/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ApplianceUtilisationChart({ data }) {
  if (!data || data.length === 0) return null;

  const applianceCounts = data.reduce((acc, session) => {
    const app = session.appliance || 'Unknown';
    acc[app] = (acc[app] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(applianceCounts).map(key => ({
    name: key,
    value: applianceCounts[key]
  }));

  return (
    <div className="chart-container">
      <h3>Appliance Utilisation</h3>
      <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#3b82f6"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
