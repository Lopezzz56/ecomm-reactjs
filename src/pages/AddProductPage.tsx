import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '.././store'; // Adjust if store is in a different path
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../features/products/productSlice';

export default function AddProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.product);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    tags: '',
    thumbnail: '',
    images: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discountPercentage' || name === 'rating' || name === 'stock'
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      images: formData.images.split(',').map(img => img.trim()),
    };

    const result = await dispatch(createProduct(productData));

    if (createProduct.fulfilled.match(result)) {
      navigate('/home'); // Redirect after success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'title', label: 'Title' },
            { name: 'brand', label: 'Brand' },
            { name: 'category', label: 'Category' },
            { name: 'price', label: 'Price', type: 'number' },
            { name: 'discountPercentage', label: 'Discount (%)', type: 'number' },
            { name: 'rating', label: 'Rating', type: 'number' },
            { name: 'stock', label: 'Stock', type: 'number' },
            { name: 'thumbnail', label: 'Thumbnail URL' },
            { name: 'images', label: 'Images (comma-separated URLs)' },
            { name: 'tags', label: 'Tags (comma-separated)' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
          >
            {loading ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
