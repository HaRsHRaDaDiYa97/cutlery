import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../features/productApi";
import { useGetCategoriesQuery } from "../features/categoryApi";
import { toast } from "react-toastify";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category_id: "",
    price: "",
    sale_price: "",
    currency: "INR",
    stock: "",
    description: "",
  });

console.log(product);


  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(0); // Absolute index among both old + new images

  // Populate form when product loads
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        category_id: product.category_id || "",
        price: product.price || "",
        sale_price: product.sale_price || "",
        currency: product.currency || "INR",
        stock: product.stock || "",
        description: product.description || "",
      });

      setExistingImages(product.images || []);
      if (product.images?.length > 0) {
        const primaryIdx = product.images.findIndex(
          (img) => img.is_primary === "1" || img.is_primary === 1
        );
        setPrimaryIndex(primaryIdx >= 0 ? primaryIdx : 0);
      }
    }
  }, [product]);

const handleChange = (e) => {
  let value = e.target.value;
  if (["price","sale_price","stock"].includes(e.target.name)) {
    value = Number(value);
  } else if (e.target.name === "category_id") {
    value = Number(value);
  }
  setForm({ ...form, [e.target.name]: value });
};



  const handleNewImagesChange = (e) => {
    if (e.target.files.length > 0) setNewImages(Array.from(e.target.files));
  };

  const handleRemoveExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
    if (primaryIndex === idx) setPrimaryIndex(0);
    else if (primaryIndex > idx) setPrimaryIndex((prev) => prev - 1);
  };

  const handleRemoveNewImage = (idx) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    if (primaryIndex >= existingImages.length + idx) {
      setPrimaryIndex(existingImages.length);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
        toast.error("Product ID is required");
        return;
    }

    const formData = new FormData();

    // Add all form fields
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    // Append product ID for backend
    formData.append("id", id);

    // Append primary index
    formData.append("primary_index", primaryIndex);

    // Append new images
    newImages.forEach((img) => formData.append("images[]", img));

    // Append existing images
    existingImages.forEach((img) => formData.append("existing_images[]", img.image_url));

    try {
        // Send directly FormData
        const res = await updateProduct(formData).unwrap();
        if (res.success) {
            toast.success(res.message || "Product updated successfully!");
            navigate("/admin/products");
        } else {
            toast.error(res.error || "Failed to update product");
        }
    } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
    }
};


  if (isLoading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load product</p>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="Slug"
                  className="w-full p-3 border rounded-md"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-3 border rounded-md"
                  placeholder="Description"
                />
              </div>

              {/* Images */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Existing Images</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img.image_url}
                        alt={`Existing ${i}`}
                        className="h-28 w-full object-cover rounded-md"
                      />
                      <input
                        type="radio"
                        name="primary"
                        checked={primaryIndex === i}
                        onChange={() => setPrimaryIndex(i)}
                        className="absolute top-1 left-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium text-gray-700 mb-2">Upload New Images</p>
                <input type="file" multiple onChange={handleNewImagesChange} />
                {newImages.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {newImages.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`New ${i}`}
                          className="h-28 w-full object-cover rounded-md"
                        />
                        <input
                          type="radio"
                          name="primary"
                          checked={primaryIndex === existingImages.length + i}
                          onChange={() => setPrimaryIndex(existingImages.length + i)}
                          className="absolute top-1 left-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="number"
                  name="sale_price"
                  value={form.sale_price}
                  onChange={handleChange}
                  placeholder="Sale Price"
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="w-full p-3 border rounded-md"
                />

                <label className="block text-sm font-medium mt-4">Category</label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2.5 border rounded-md"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-md">
              {isUpdating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
