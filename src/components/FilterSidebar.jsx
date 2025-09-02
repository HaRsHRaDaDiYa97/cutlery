import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMinus, FiPlus } from "react-icons/fi";
import { useGetCategoriesQuery } from "../features/categoryApi";

// --- REDESIGNED COLLAPSIBLE SECTION COMPONENT ---
const CollapsibleSection = ({ title, children, defaultOpen = true }) => {


  const [isOpen, setIsOpen] = useState(defaultOpen);


  return (
    <div className="py-6 border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer flex justify-between items-center text-left py-1 group"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 group-hover:text-black">
          {title}
        </h3>
        {isOpen ? (
          <FiMinus className="h-5 w-5 text-gray-500" />
        ) : (
          <FiPlus className="h-5 w-5 text-gray-500" />
        )}
      </button>

      <div
        className={`transition-[grid-template-rows] duration-300 ease-in-out grid ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

// --- REDESIGNED FILTER SIDEBAR COMPONENT ---
const FilterSidebar = ({ filters, setFilters }) => {



  const uniqueId = Math.random().toString(36).substr(2, 5);

  // --- All your existing logic remains unchanged ---
  const { data, isLoading } = useGetCategoriesQuery();

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      price: { ...prev.price, [name]: value === "" ? "" : Number(value) },
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
  // --- End of logic section ---

  // Custom Checkbox component for consistent styling
  const Checkbox = ({ label, value, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <input
        type="checkbox"
        className="sr-only peer"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="h-5 w-5 rounded border border-gray-300 group-hover:border-gray-400 transition-colors flex items-center justify-center peer-checked:bg-black peer-checked:border-black">
        <svg className="h-3 w-3 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{label}</span>
    </label>
  );

  return (
    // The parent Products.js component provides the main container styles.
    // This component now only contains the filter sections.
    <div>
      {/* Availability */}
      <CollapsibleSection title="Availability">
        <div className="space-y-4">
          <Checkbox
            label="In Stock"
            value="in-stock"
            checked={filters.availability.includes("in-stock")}
            onChange={(e) => handleCheckboxChange("availability", e.target.value)}
          />
          <Checkbox
            label="Out of Stock"
            value="out-of-stock"
            checked={filters.availability.includes("out-of-stock")}
            onChange={(e) => handleCheckboxChange("availability", e.target.value)}
          />
        </div>
      </CollapsibleSection>

      {/* Price Filter */}
      {/* Price Filter */}
<CollapsibleSection title="Price">
  <div className="flex items-center gap-3">
    <div className="relative w-1/2">
      <label htmlFor={`min-${uniqueId}`} className="absolute -top-2 left-2 inline-block bg-gray-50 px-1 text-xs font-medium text-gray-900">Min</label>
      <input
        type="number"
        name="min"
        id={`min-${uniqueId}`}
        value={filters.price.min}
        onChange={handlePriceChange}
        placeholder="0"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
      />
    </div>
    <span className="text-gray-400">-</span>
    <div className="relative w-1/2">
      <label htmlFor={`max-${uniqueId}`} className="absolute -top-2 left-2 inline-block bg-gray-50 px-1 text-xs font-medium text-gray-900">Max</label>
      <input
        type="number"
        name="max"
        id={`max-${uniqueId}`}
        value={filters.price.max}
        onChange={handlePriceChange}
        placeholder="100000"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
      />
    </div>
  </div>
</CollapsibleSection>


      {/* Category */}
      <CollapsibleSection title="Category">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : (
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {categories.map((cat) => (
              <Checkbox
                key={cat.id}
                label={cat.name}
                value={cat.slug}
                checked={filters.categories.includes(cat.slug)}
                onChange={(e) => handleCheckboxChange("categories", e.target.value)}
              />
            ))}
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
};

export default FilterSidebar;









