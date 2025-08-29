import React, { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';

// --- Mock API Data ---
// In a real app, you would fetch this from your backend.
const allProducts = [
  { id: 1, name: 'Fairy Angel Name Pendant', price: 299.00, original_price: 599.00, image: 'https://images.unsplash.com/photo-1610495228647-1c44bf37d883?w=500', inStock: true, brand: 'Diva Jeweller' },
  { id: 2, name: 'Cursive Curved Name Necklace', price: 299.00, original_price: 599.00, image: 'https://images.unsplash.com/photo-1599643477877-53a81a442767?w=500', inStock: true, brand: 'Diva Jeweller' },
  { id: 3, name: 'Special Style Name Necklace', price: 349.00, original_price: 699.00, image: 'https://images.unsplash.com/photo-1606813233139-9b768825d19a?w=500', inStock: true, brand: 'Diva Jeweller' },
  { id: 4, name: 'Butterfly Name Necklace', price: 299.00, original_price: 599.00, image: 'https://images.unsplash.com/photo-1611652033959-8a3d445be40c?w=500', inStock: true, brand: 'Diva Jeweller' },
  { id: 5, name: 'Infinity Single Heart Name', price: 399.00, original_price: 799.00, image: 'https://images.unsplash.com/photo-1627293504928-3a87f1b953d3?w=500', inStock: false, brand: 'Diva Jeweller' },
  // ...add more products
];

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 1000 },
    brand: []
  });

  // In a real app, you'd fetch products here.
  // For now, we'll just load the mock data.
  useEffect(() => {
    // Simulating a fetch call
    const filtered = allProducts.filter(p => {
      // Availability filter
      const availabilityMatch = filters.availability.length === 0 || 
                               (filters.availability.includes('in-stock') && p.inStock) || 
                               (filters.availability.includes('out-of-stock') && !p.inStock);

      // Price filter
      const priceMatch = p.price >= filters.price.min && p.price <= filters.price.max;

      // Brand filter
      const brandMatch = filters.brand.length === 0 || filters.brand.includes(p.brand);

      return availabilityMatch && priceMatch && brandMatch;
    });
    setProducts(filtered);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      // For checkboxes (availability, brand)
      if (Array.isArray(prevFilters[filterType])) {
        const newValues = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter(item => item !== value)
          : [...prevFilters[filterType], value];
        return { ...prevFilters, [filterType]: newValues };
      }
      // For other types like price range
      return { ...prevFilters, [filterType]: value };
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <span>Home</span> &gt; <span className="font-medium text-gray-700">Single Name Necklace</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Single Name Necklace</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />

        {/* Right Content */}
        <main className="w-full lg:w-3/4">
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;