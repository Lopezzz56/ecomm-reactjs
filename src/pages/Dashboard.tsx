import React, { useEffect, useState } from 'react';
import AverageRatingChart from '../components/dashboard/AverageRatingChart';
import CategoryDistributionChart from '../components/dashboard/CategoryDistributionChart';
import StockLevelChart from '../components/dashboard/StockLevelChart';
import UserRoleChart from '../components/dashboard/UserRoleChart';
import UserGenderChart from '../components/dashboard/UserGenderChart';


const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch('https://dummyjson.com/products?limit=100');
        const userRes = await fetch('https://dummyjson.com/users?limit=100');
        const productData = await productRes.json();
        const userData = await userRes.json();

        setProducts(productData.products);
        setUsers(userData.users);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-10 text-lg">Loading charts...</div>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-md">
<h2 className="text-xl font-semibold mb-2 text-white">Average Rating by Category</h2>
          <AverageRatingChart data={products} />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-white">Category Distribution</h2>
          <CategoryDistributionChart data={products} />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-md col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-white">Stock Levels per Product</h2>
          <StockLevelChart data={products} />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-white">User Role Breakdown</h2>
          <UserRoleChart data={users} />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-white">Gender Distribution</h2>
          <UserGenderChart data={users} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
