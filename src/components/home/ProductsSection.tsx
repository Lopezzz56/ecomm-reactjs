import { useEffect, useState } from 'react';
import { fetchProducts, searchProducts } from '../../features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import FortressButton from '../ui/Button1';
import Card1 from '../ui/Card1';
import { Link } from 'react-router-dom';
import UpdateProductModal, { type Product } from '../UpdateProduct';
import { deleteProduct } from '../../features/products/productSlice';

const ProductsSection = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
    } else {
      dispatch(fetchProducts()); // Fallback to all
    }
  };

  // Handle sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'title-a-z') return a.title.localeCompare(b.title);
    if (sortBy === 'title-z-a') return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="p-4">
      {/* Top Bar */}
<div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full gap-1 sm:max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l"
          />
<FortressButton type="submit" className="rounded-r px-4 py-2 shadow">
  Search
</FortressButton>

        </form>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300"
          >
            <option value="">Sort</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="title-a-z">Title: A-Z</option>
            <option value="title-z-a">Title: Z-A</option>
          </select>

          <Link to="/add-product">
            <FortressButton className="bg-primary text-white px-4 py-2">
              Add New Product
            </FortressButton>
          </Link>
        </div>
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {(sortBy ? sortedProducts : products).map((product) => (
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
              {/* Action Buttons */}
        <div className="flex gap-4 mt-auto">
            <FortressButton
            className="bg-blue-600 text-white flex-1 py-2"
            onClick={() => setEditingProduct(product)}
            >
            Update
            </FortressButton>
<FortressButton
  className="bg-red-600 text-white flex-1 py-2"
  onClick={() => dispatch(deleteProduct(product.id))}
>
  Delete
</FortressButton>
        </div>

    </Card1>
  ))}
</div>

      )}
                  {/* Modal */}
    {editingProduct && (
      <UpdateProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
      />
    )}
    </div>
    
  );
};

export default ProductsSection;
