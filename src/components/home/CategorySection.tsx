import { Link } from "react-router-dom";
import Card1 from "../ui/Card1"
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // use any icon


const  CategogySection = () => {
      const scrollRef = useRef<HTMLDivElement>(null);

    const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
];
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth"
      });
    }
  };

return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 px-4 sm:px-10 hide-scrollbar scroll-smooth"    
          >
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            <Card1 size="sm" 
            className="bg-lightAccent min-w-[10rem] flex-shrink-0 text-center cursor-pointer">
              <span className="capitalize font-semibold">{cat.replace(/-/g, " ")}</span>
            </Card1>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default CategogySection;