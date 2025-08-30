import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddCategoryMutation } from "../features/categoryApi";

const AdminAddCategory = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    const [addCategory, { isLoading }, refetch] = useAddCategoryMutation();

   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);

    try {
        const res = await addCategory(formData).unwrap();

        // Show success toast
        toast.success(res.message || "Category added successfully!");

        // Reset form
        setName("");
        setSlug("");

        // Redirect after 1.5s
        setTimeout(() => {
            navigate("/admin/categories");
        }, 1500);

    } catch (error) {
        console.error(error);
        // Check if error has data.message from API
        if (error?.data?.message) {
            toast.error(error.data.message);
        } else {
            toast.error("Failed to add category.");
        }
    }
};


    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-10">

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">

                {/* Page Header */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    Add Category
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Category Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter category name"
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Slug */}
                    <div className="flex flex-col">
                        <label htmlFor="slug" className="mb-2 font-semibold text-gray-700">
                            Slug (Optional)
                        </label>
                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="Enter slug or leave blank"
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Add Category
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminAddCategory;
