import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AverageRatingChart = ({ data }: { data: any[] }) => {
  const ratingByCategory = data.reduce((acc, product) => {
    const { category, rating } = product;
    acc[category] = acc[category]
      ? { total: acc[category].total + rating, count: acc[category].count + 1 }
      : { total: rating, count: 1 };
    return acc;
  }, {});

  const chartData = Object.entries(ratingByCategory).map(([category, { total, count }]: any) => ({
    category,
    avgRating: (total / count).toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Bar dataKey="avgRating" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AverageRatingChart;