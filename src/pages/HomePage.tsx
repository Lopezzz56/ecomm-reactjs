// src/pages/HomePage.tsx
import CategorySection from '../components/home/CategorySection';
import ProductsSection from '../components/home/ProductsSection';
import Card1 from '../components/ui/Card1';


export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Category Row */}

<CategorySection />

      {/* Product Section */}
<ProductsSection />
    </div>
  );
}
