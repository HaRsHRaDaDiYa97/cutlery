
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddCategoryMutation } from "../features/categoryApi";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";

const AdminAddCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
      toast.error("Please select a valid image file.");
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    document.getElementById("image-upload").value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    if (image) formData.append("image", image);

    try {
      const res = await addCategory(formData).unwrap();
      toast.success(res.message || "Category added successfully!");
      setName("");
      setSlug("");
      setImage(null);
      setPreview(null);
      setTimeout(() => {
        navigate("/admin/categories");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to add category.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/admin/categories"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md border">
          <form onSubmit={handleSubmit}>
            <div className="p-6 sm:p-8 space-y-8">
              {/* Form Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Add a New Category
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Fill in the details below to create a new product category.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g., Rings, Necklaces"
                    className="block w-full rounded-lg border-gray-300 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-black sm:text-sm"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g., rings-for-women"
                    className="block w-full rounded-lg border-gray-300 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-black sm:text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    A URL-friendly version of the name. Lowercase, only letters,
                    numbers, and hyphens.
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Category Image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10 bg-gray-50">
                    <div className="text-center">
                      <FiUploadCloud
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm text-gray-600 items-center justify-center gap-1">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-black px-3 py-2 border border-gray-300 shadow-sm hover:bg-gray-100 transition"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <span className="text-gray-500">or drag & drop</span>
                      </div>
                      <p className="text-xs leading-5 text-gray-500 mt-2">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {preview && (
                    <div className="mt-4 relative w-40 h-40">
                      <img
                        src={preview}
                        alt="Category preview"
                        className="h-full w-full object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 h-7 w-7 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-100 shadow-md transition"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 sm:px-8">
              <Link
                to="/admin/categories"
                className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;
