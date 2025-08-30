// src/components/FilterSidebar.js
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { API_BASE } from "../api";
import { useGetCategoriesQuery } from "../features/categoryApi";

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

      {/* Animated Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
};


const FilterSidebar = ({ filters, setFilters }) => {
 const { data, isLoading, isError } = useGetCategoriesQuery();

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [name]: value === "" ? "" : Number(value),
      },
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

  const categories = data?.categories || [];

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

     {/* Price Filter */}
<CollapsibleSection title="Price">
  <div className="flex flex-col gap-3">
    <div className="grid grid-cols-2 gap-4">
      {/* Min Price */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Min Price
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            name="min"
            value={filters.price.min}
            onChange={handlePriceChange}
            placeholder="0"
            className="w-full pl-7 pr-2 py-2 border rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Max Price */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Max Price
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            name="max"
            value={filters.price.max}
            onChange={handlePriceChange}
            placeholder="10000"
            className="w-full pl-7 pr-2 py-2 border rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
        </div>
      </div>
    </div>

  </div>
</CollapsibleSection>


      {/* Category */}
      <CollapsibleSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label className="flex items-center" key={cat.id}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                value={cat.slug} // ✅ use slug as filter value
                onChange={(e) =>
                  handleCheckboxChange("categories", e.target.value)
                }
                checked={filters.categories.includes(cat.slug)}
              />
              <span className="ml-2 text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>
    </aside>
  );
};

export default FilterSidebar;








