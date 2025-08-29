import React, { useState } from 'react';
import ProductCard from '../components/ProductCard'; // Assuming ProductCard is in components/
import { FiGrid, FiList } from 'react-icons/fi'; // Just an example for layout icons

const ProductGrid = ({ products }) => {
  const [layout, setLayout] = useState('grid-cols-2 md:grid-cols-3'); // Default layout

  return (
    <div>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <select className="border rounded-md px-3 py-1.5">
          <option>Best selling</option>
          <option>Price, low to high</option>
          <option>Price, high to low</option>
        </select>
        
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => setLayout('grid-cols-2 md:grid-cols-2')} className={`p-2 rounded ${layout.includes('2') ? 'bg-gray-200' : ''}`}><FiGrid/></button>
          <button onClick={() => setLayout('grid-cols-2 md:grid-cols-3')} className={`p-2 rounded ${layout.includes('3') ? 'bg-gray-200' : ''}`}><FiGrid/></button>
          <button onClick={() => setLayout('grid-cols-3 md:grid-cols-4')} className={`p-2 rounded ${layout.includes('4') ? 'bg-gray-200' : ''}`}><FiGrid/></button>
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className={`grid ${layout} gap-x-6 gap-y-10`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.image}
              title={product.name}
              salePrice={product.price.toFixed(2)}
              originalPrice={product.original_price?.toFixed(2)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found matching your criteria.</p>
      )}
    </div>
  );
};

export default ProductGrid;