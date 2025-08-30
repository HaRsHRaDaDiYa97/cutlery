import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/get_categories.php`);
        const data = await res.json();
        if (data.success) setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/get_product.php?id=${id}`);
        const data = await res.json();
        setForm({
          name: data.name || "",
          slug: data.slug || "",
          category_id: data.category_id || "",
          price: data.price || "",
          sale_price: data.sale_price || "",
          currency: data.currency || "INR",
          stock: data.stock || "",
          description: data.description || "",
        });
        setExistingImages(data.images || []);
        if (data.images?.length > 0) {
          const primaryIdx = data.images.findIndex(
            (img) => img.is_primary === "1" || img.is_primary === 1
          );
          setPrimaryIndex(primaryIdx >= 0 ? primaryIdx : 0);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("id", id);
    formData.append("primary_index", primaryIndex);

    images.forEach((img) => formData.append("images[]", img));
    existingImages.forEach((img) => formData.append("existing_images[]", img.image_url));

    try {
      const res = await fetch(`${API_BASE}/update_product.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Product updated successfully!");
        navigate("/admin/products");
      } else {
        alert("❌ Failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-1 text-sm text-gray-600">Update product details, images, and inventory.</p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Product Information</h3>
                </div>
                <div className="p-6 space-y-6">
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full p-3 border rounded-md" />
                  <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="w-full p-3 border rounded-md" />
                  <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="w-full p-3 border rounded-md" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
  <div className="p-6 border-b border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800">Media</h3>
  </div>
  <div className="p-6">
    {/* Existing Images */}
    {existingImages.length > 0 && (
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Current Images</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {existingImages.map((img, i) => (
            <div key={i} className="relative group">
              <label
                className={`cursor-pointer block rounded-lg overflow-hidden ring-2 ${
                  primaryIndex === i ? "ring-blue-600" : "ring-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="primary"
                  checked={primaryIndex === i}
                  onChange={() => setPrimaryIndex(i)}
                  className="sr-only"
                />
                <img
                  src={img.image_url}
                  alt={`Product ${i}`}
                  className="h-28 w-full object-cover"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Upload New Images */}
    <input
      id="file-upload"
      type="file"
      multiple
      onChange={handleImageChange}
    />
    {images.length > 0 && (
      <div className="mt-4">
        <p className="font-medium text-sm text-gray-800 mb-3">New Uploads</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={URL.createObjectURL(img)}
                alt={`Preview ${i}`}
                className="h-28 w-full object-cover rounded-md"
              />
              {/* Cancel Button */}
              <button
                type="button"
                onClick={() =>
                  setImages((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Pricing & Inventory</h3>
                </div>
                <div className="p-6 space-y-6">
                  <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-3 border rounded-md" />
                  <input type="number" name="sale_price" value={form.sale_price} onChange={handleChange} placeholder="Sale Price" className="w-full p-3 border rounded-md" />
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="w-full p-3 border rounded-md" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Organization</h3>
                </div>
                <div className="p-6">
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full p-3 border rounded-md">
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex justify-end gap-4">
            <button type="button" className="px-6 py-2.5 cursor-pointer bg-white border rounded-md" onClick={() => navigate("/admin/products")}>Cancel</button>
            <button type="submit" className="px-6 py-2.5 cursor-pointer bg-blue-600 text-white rounded-md">Update Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
