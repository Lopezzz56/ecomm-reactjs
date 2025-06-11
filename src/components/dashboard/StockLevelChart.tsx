import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockLevelChart = ({ data }: { data: any[] }) => {
  const chartData = data.map(product => ({
    name: product.title,
    stock: product.stock,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="stock" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockLevelChart;
