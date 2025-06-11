// components/charts/UserGenderChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const UserGenderChart = ({ data }: { data: any[] }) => {
  const genderCounts = data.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(genderCounts).map(([gender, count]) => ({
    gender,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#FFBB28" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserGenderChart;
