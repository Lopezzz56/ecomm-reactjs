import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card1 from './ui/Card1';
import FortressButton from './ui/Button1';
import { deleteProduct } from '../features/products/productSlice';
import type { Product } from './UpdateProduct';
import { useAppDispatch } from '../redux/hooks';


const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-6">{categoryName?.replace(/-/g, ' ')}</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
    <Card1 key={product.id} className="flex flex-col w-full h-[400px] overflow-hidden rounded-lg">
      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="flex-1 p-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
          <p className="text-sm text-gray-600 mb-1">{product.category}</p>
          <p className="text-primary font-bold mb-4">${product.price}</p>
        </div>


      </div>


    </Card1>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
