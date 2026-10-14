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

 
export default function SlotUtilisationChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No utilisation data available.</div>;
  }

  const sortedData = [...data]
    .sort((a, b) => new Date(a.slot_date) - new Date(b.slot_date))
    .map(d => ({
      ...d,
      scheduled: parseInt(d.scheduled || 0, 10),
      attended: parseInt(d.attended || 0, 10),
      missed: parseInt(d.missed || 0, 10),
      cancelled: parseInt(d.cancelled || 0, 10)
    }));

  return (
    <div className="chart-container">
      <h3>Daily Slot Utilisation</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="slot_date" 
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
            <Bar dataKey="scheduled" name="Scheduled" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
            <Bar dataKey="attended" name="Attended" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="missed" name="Missed" fill="#64748b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cancelled" name="Cancelled" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
