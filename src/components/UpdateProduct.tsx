import { useState, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { updateProduct } from '../features/products/productSlice';
import FortressButton from './ui/Button1';


export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  tags: string[];
  description: string;
}

interface Props {
  product: Product;
  onClose: () => void;
}

export default function UpdateProductModal({ product, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ ...product, images: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Prefill form with product data
useEffect(() => {
  setFormData({
    ...product,
    images: Array.isArray(product.images) ? product.images.join(',') : '',
    tags: Array.isArray(product.tags) ? product.tags.join(',') : '',
  });
}, [product]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updates = {
        ...formData,
        images: formData.images.split(',').map(img => img.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };
          console.log('Attempting to update product with ID:', product.id); // Add this line
    console.log('Updates being sent:', updates); // Add this line

await dispatch(updateProduct({ id: product.id, updates })).unwrap();
      onClose(); // Close the modal
    } catch (err) {
      setError('Failed to update product');
          console.error('Update error:', err); // Log the full error object

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 overflow-y-auto">
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2> 
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
                value={(formData as any)[name]}
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

          <FortressButton
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Product'}
          </FortressButton>
        </form>
      </div>
    </div>
    </div>
  );
}
