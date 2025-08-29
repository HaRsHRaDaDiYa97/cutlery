// import React, { useState } from "react";

// export const API_BASE = "http://localhost/cutlery-backend/api";

// export default function AdminAddProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     category: "",
//     price: "",
//     sale_price: "",
//     currency: "INR",
//     stock: "",
//     description: "",
//   });

//   const [images, setImages] = useState([]);
//   const [primaryIndex, setPrimaryIndex] = useState(-1);

//   // Handle text input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle multiple file selection
//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

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
//           category: "",
//           price: "",
//           sale_price: "",
//           currency: "INR",
//           stock: "",
//           description: "",
//         });
//         setImages([]);
//         setPrimaryIndex(-1);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">➕ Add New Product</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Product Info */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <input
//           type="text"
//           name="slug"
//           placeholder="Slug"
//           value={form.slug}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={form.category}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={form.price}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg"
//             required
//           />

//           <input
//             type="number"
//             name="sale_price"
//             placeholder="Sale Price"
//             value={form.sale_price}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="currency"
//             placeholder="Currency"
//             value={form.currency}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg"
//           />

//           <input
//             type="number"
//             name="stock"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg"
//           />
//         </div>

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg h-24"
//         />

//         {/* Image Upload */}
//         <div>
//           <label className="block font-semibold mb-2">Upload Product Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={handleImageChange}
//             className="w-full"
//           />

//           {images.length > 0 && (
//             <div className="mt-3">
//               <p className="font-medium mb-2">Select Primary Image:</p>
//               <div className="grid grid-cols-2 gap-3">
//                 {images.map((img, i) => (
//                   <label
//                     key={i}
//                     className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer ${
//                       primaryIndex === i ? "border-green-500 bg-green-50" : ""
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="primary"
//                       value={i}
//                       checked={primaryIndex === i}
//                       onChange={() => setPrimaryIndex(i)}
//                     />
//                     <span className="truncate">{img.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
//         >
//           Save Product
//         </button>
//       </form>
//     </div>
//   );
// }





import React, { useState } from "react";

export const API_BASE = "http://localhost/cutlery-backend/api";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    price: "",
    sale_price: "",
    currency: "INR",
    stock: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(-1);

  // Handle text input (NO CHANGE)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle multiple file selection (NO CHANGE)
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages([...e.target.files]);
      setPrimaryIndex(0); // Default to the first image as primary
    }
  };

  // Submit form (NO CHANGE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 0 && primaryIndex === -1) {
      alert("Please select a primary image.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    images.forEach((img) => {
      formData.append("images[]", img);
    });

    formData.append("primary_index", primaryIndex);

    try {
      const res = await fetch(`${API_BASE}/add_product.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        setForm({
          name: "",
          slug: "",
          category: "",
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
    } catch (error) {
      console.error(error);
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
              {/* Product Information Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Product Information</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                      </div>
                      <input type="text" name="name" id="name" value={form.name} onChange={handleChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                    </div>
                  </div>
                   <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                     <div className="relative">
                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-1.5-1.5a2 2 0 112.828-2.828l1.5 1.5l3-3a2 2 0 010-2.828z" clipRule="evenodd" /><path fillRule="evenodd" d="M7.414 15.414a2 2 0 11-2.828-2.828l3-3a2 2 0 012.828 0l1.5 1.5a2 2 0 11-2.828 2.828l-1.5-1.5-3 3a2 2 0 010 2.828z" clipRule="evenodd" /></svg>
                       </div>
                      <input type="text" name="slug" id="slug" value={form.slug} onChange={handleChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" id="description" value={form.description} onChange={handleChange} rows={6} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
                  </div>
                </div>
              </div>

              {/* Media Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Media</h3>
                </div>
                <div className="p-6">
                  <div className="flex justify-center items-center w-full">
                      <label htmlFor="file-upload" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition">
                          <div className="flex flex-col justify-center items-center pt-5 pb-6">
                              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input id="file-upload" type="file" className="hidden" multiple onChange={handleImageChange} />
                      </label>
                  </div> 
                  {images.length > 0 && (
                    <div className="mt-6">
                      <p className="font-medium text-sm text-gray-800 mb-3">Image Previews (Select one as primary)</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {images.map((img, i) => (
                           <div key={i} className="relative group">
                            <label className={`cursor-pointer block rounded-lg overflow-hidden ring-2 ${primaryIndex === i ? 'ring-blue-600' : 'ring-transparent'}`}>
                              <input type="radio" name="primary" value={i} checked={primaryIndex === i} onChange={() => setPrimaryIndex(i)} className="sr-only"/>
                              <img src={URL.createObjectURL(img)} alt={`Preview ${i + 1}`} className="h-28 w-full object-cover" onLoad={(e) => URL.revokeObjectURL(e.target.src)}/>
                            </label>
                            {primaryIndex === i && <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">Primary</div>}
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
              {/* Pricing & Stock Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                 <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Pricing & Inventory</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                     <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input type="number" name="price" id="price" value={form.price} onChange={handleChange} required className="w-full pl-8 p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                     <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input type="number" name="sale_price" id="sale_price" value={form.sale_price} onChange={handleChange} className="w-full pl-8 p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                     <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                       </div>
                      <input type="number" name="stock" id="stock" value={form.stock} onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Category Card */}
               <div className="bg-white rounded-lg shadow-md overflow-hidden">
                 <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Organization</h3>
                </div>
                <div className="p-6">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                     <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1H5V4zM5 7h10v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" /></svg>
                       </div>
                      <input type="text" name="category" id="category" value={form.category} onChange={handleChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                    </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
            <button type="button" className="px-6 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}