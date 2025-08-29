// src/components/FilterSidebar.js
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters, allProducts }) => {
  const [categories, setCategories] = useState([]);

  // Extract unique categories from all products
  useEffect(() => {
    if (Array.isArray(allProducts)) {
      const uniqueCats = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
      setCategories(uniqueCats);
    }
  }, [allProducts]);

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: { ...prev.price, [e.target.name]: Number(e.target.value) },
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      let updated = [...prev[filterType]];
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated.push(value);
      }
      return { ...prev, [filterType]: updated };
    });
  };

  return (
    <aside className="w-full lg:w-1/4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Availability */}
      <CollapsibleSection title="Availability">
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              value="in-stock"
              onChange={(e) =>
                handleCheckboxChange("availability", e.target.value)
              }
              checked={filters.availability.includes("in-stock")}
            />
            <span className="ml-2 text-gray-700">In stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              value="out-of-stock"
              onChange={(e) =>
                handleCheckboxChange("availability", e.target.value)
              }
              checked={filters.availability.includes("out-of-stock")}
            />
            <span className="ml-2 text-gray-700">Out of stock</span>
          </label>
        </div>
      </CollapsibleSection>

      {/* Price */}
      <CollapsibleSection title="Price">
        <div className="flex items-center justify-between gap-4">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              name="min"
              value={filters.price.min}
              onChange={handlePriceChange}
              className="w-full pl-6 pr-2 py-1 border rounded"
            />
          </div>
          <span>To</span>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              name="max"
              value={filters.price.max}
              onChange={handlePriceChange}
              className="w-full pl-6 pr-2 py-1 border rounded"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Category */}
      <CollapsibleSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label className="flex items-center" key={cat}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                value={cat}
                onChange={(e) =>
                  handleCheckboxChange("categories", e.target.value)
                }
                checked={filters.categories.includes(cat)}
              />
              <span className="ml-2 text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>
    </aside>
  );
};

export default FilterSidebar;
