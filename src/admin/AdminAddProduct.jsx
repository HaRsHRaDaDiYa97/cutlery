// import React, { useState, useEffect } from "react";
// import { API_BASE } from "../api";


// export default function AdminAddProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     category_id: "",   // ✅ use category_id now
//     price: "",
//     sale_price: "",
//     currency: "INR",
//     stock: "",
//     description: "",
//   });

//   const [images, setImages] = useState([]);
//   const [primaryIndex, setPrimaryIndex] = useState(-1);
//   const [categories, setCategories] = useState([]); // ✅ store fetched categories

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/get_categories.php`);
//         const data = await res.json();
//         if (data.success) {
//           setCategories(data.categories);
//         }
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files.length > 0) {
//       setImages([...e.target.files]);
//       setPrimaryIndex(0);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (images.length > 0 && primaryIndex === -1) {
//       alert("Please select a primary image.");
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       formData.append(key, form[key]);
//     });

//     images.forEach((img) => {
//       formData.append("images[]", img);
//     });

//     formData.append("primary_index", primaryIndex);

//     try {
//       const res = await fetch(`${API_BASE}/add_product.php`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       alert(data.message);
//       if (data.success) {
//         setForm({
//           name: "",
//           slug: "",
//           category_id: "",
//           price: "",
//           sale_price: "",
//           currency: "INR",
//           stock: "",
//           description: "",
//         });
//         setImages([]);
//         setPrimaryIndex(-1);
//         document.getElementById("file-upload").value = "";
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen font-sans">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
//           <p className="mt-1 text-sm text-gray-600">
//             Create a new product listing for your store.
//           </p>
//         </header>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//             {/* Main column */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Product Info */}
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Product Information
//                   </h3>
//                 </div>
//                 <div className="p-6 space-y-6">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       id="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="slug"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Slug
//                     </label>
//                     <input
//                       type="text"
//                       name="slug"
//                       id="slug"
//                       value={form.slug}
//                       onChange={handleChange}

//                       className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="description"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Description
//                     </label>
//                     <textarea
//                       name="description"
//                       id="description"
//                       value={form.description}
//                       onChange={handleChange}
//                       rows={6}
//                       className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>

//               {/* Media */}
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-800">Media</h3>
//                 </div>
//                 <div className="p-6">
//                   <input
//                     id="file-upload"
//                     type="file"
//                     className="hidden"
//                     multiple
//                     onChange={handleImageChange}
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition"
//                   >
//                     <p className="text-sm text-gray-500">
//                       Click to upload or drag and drop
//                     </p>
//                   </label>

//                   {images.length > 0 && (
//                     <div className="mt-6">
//                       <p className="font-medium text-sm text-gray-800 mb-3">
//                         Image Previews (Select one as primary)
//                       </p>
//                       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
//                         {images.map((img, i) => (
//                           <div key={i} className="relative group">
//                             <label
//                               className={`cursor-pointer block rounded-lg overflow-hidden ring-2 ${
//                                 primaryIndex === i
//                                   ? "ring-blue-600"
//                                   : "ring-transparent"
//                               }`}
//                             >
//                               <input
//                                 type="radio"
//                                 name="primary"
//                                 value={i}
//                                 checked={primaryIndex === i}
//                                 onChange={() => setPrimaryIndex(i)}
//                                 className="sr-only"
//                               />
//                               <img
//                                 src={URL.createObjectURL(img)}
//                                 alt={`Preview ${i + 1}`}
//                                 className="h-28 w-full object-cover"
//                               />
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Side column */}
//             <div className="lg:col-span-1 space-y-8">
//               {/* Pricing */}
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Pricing & Inventory
//                   </h3>
//                 </div>
//                 <div className="p-6 space-y-6">
//                   <input
//                     type="number"
//                     name="price"
//                     placeholder="Price"
//                     value={form.price}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border rounded-md"
//                   />
//                   <input
//                     type="number"
//                     name="sale_price"
//                     placeholder="Sale Price"
//                     value={form.sale_price}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-md"
//                   />
//                   <input
//                     type="number"
//                     name="stock"
//                     placeholder="Stock"
//                     value={form.stock}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-md"
//                   />
//                 </div>
//               </div>

//               {/* Category */}
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Organization
//                   </h3>
//                 </div>
//                 <div className="p-6">
//                   <label
//                     htmlFor="category_id"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Category
//                   </label>
//                   <select
//                     name="category_id"
//                     id="category_id"
//                     value={form.category_id}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
//                   >
//                     <option value="">-- Select Category --</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="mt-8 pt-6 border-t flex justify-end gap-4">
//             <button
//               type="button"
//               className="px-6 py-2.5 bg-white border rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2.5 bg-blue-600 text-white rounded-md"
//             >
//               Save Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect } from "react";
import { useAddProductMutation } from "../features/productApi";
import { useGetCategoriesQuery } from "../features/categoryApi";


export default function AdminAddProduct() {
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
  const [primaryIndex, setPrimaryIndex] = useState(-1);

  // RTK Query hook to fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  // RTK Mutation for adding product
  const [addProduct, { isLoading: adding }] = useAddProductMutation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages([...e.target.files]);
      setPrimaryIndex(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 0 && primaryIndex === -1) {
      alert("Please select a primary image.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    images.forEach((img) => formData.append("images[]", img));
    formData.append("primary_index", primaryIndex);

    try {
      const res = await addProduct(formData).unwrap(); // RTK Query mutation
      alert(res.message);

      if (res.success) {
        // Reset form
        setForm({
          name: "",
          slug: "",
          category_id: "",
          price: "",
          sale_price: "",
          currency: "INR",
          stock: "",
          description: "",
        });
        setImages([]);
        setPrimaryIndex(-1);
        document.getElementById("file-upload").value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create a new product listing for your store.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Info */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Product Information
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      value={form.slug}
                      onChange={handleChange}

                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Media</h3>
                </div>
                <div className="p-6">
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition"
                  >
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                  </label>

                  {images.length > 0 && (
                    <div className="mt-6">
                      <p className="font-medium text-sm text-gray-800 mb-3">
                        Image Previews (Select one as primary)
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {images.map((img, i) => (
                          <div key={i} className="relative group">
                            <label
                              className={`cursor-pointer block rounded-lg overflow-hidden ring-2 ${primaryIndex === i
                                  ? "ring-blue-600"
                                  : "ring-transparent"
                                }`}
                            >
                              <input
                                type="radio"
                                name="primary"
                                value={i}
                                checked={primaryIndex === i}
                                onChange={() => setPrimaryIndex(i)}
                                className="sr-only"
                              />
                              <img
                                src={URL.createObjectURL(img)}
                                alt={`Preview ${i + 1}`}
                                className="h-28 w-full object-cover"
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Side column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Pricing */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Pricing & Inventory
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="sale_price"
                    placeholder="Sale Price"
                    value={form.sale_price}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Organization
                  </h3>
                </div>
                <div className="p-6">
                  <label
                    htmlFor="category_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    name="category_id"
                    id="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md"
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
          </div>

          {/* Buttons */}
          <div className="mt-8 pt-6 border-t flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2.5 bg-white border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
