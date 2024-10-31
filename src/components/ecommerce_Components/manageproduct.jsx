import React, { useState } from 'react';
import ProductTable from './productTable';

const categories = ['Hinduism', 'Islam', 'Christianity', 'Jainism', 'Buddhism', 'Sikhism'];

const Manageproduct = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editProductId, setEditProductId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mrp: '',
    sellingPrice: '',
    quantity: '',
    stockStatus: 'instock',
    category: categories[0],
    keywords: '',
    offer: '',
    offerTagline: '',
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prevImages) => [...prevImages, ...files]);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      images: productImages,
    };

    try {
      console.log('stock status', formData.stockStatus)
      const response = await fetch('http://192.168.1.8:8000/api/admin/add/product', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          productName: formData.name,
          productimage: 'string',
          description: formData.description,
          productPrice: {
            mrpPrice: formData.mrp,
            sellingPrice: formData.sellingPrice
          },
          productQuantity: formData.quantity,
          productStock: formData.stockStatus,
          productReligion: formData.category,
          productKeyword: formData.keywords,
          offer: formData.offer,
          tagline: formData.offerTagline,
        }),
      });

      if (response.ok) {
        console.log('Product added successfully');
      }
    } catch (error) {
      console.log('Error adding product:', error);
    }

    setIsAddPopupOpen(false);
  };
  

  const handleEditProduct = (e) => {
    e.preventDefault();
    // Implement edit logic here based on `editProductId`
    const updatedProducts = products.map((product) =>
      product.id === editProductId ? { ...product, ...formData } : product
    );
    setProducts(updatedProducts);
    setIsEditPopupOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => setIsAddPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="my-4 flex items-center">
        <p className="text-xl font-bold mr-4">Search Product</p>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={searchQuery}
          onChange={handleSearch}
          className="border px-4 py-2 rounded w-80"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <ProductTable filteredProducts={products} />
      </div>

      {/* Add Product Popup */}
      {isAddPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-10 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <div className="space-y-4 h-96 overflow-y-scroll">
              <p className="font-bold">Product Name</p>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              />
              <p className="font-bold mt-4">Product Images</p>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="border px-4 py-2 w-full"
              />
              <p className="font-bold mt-4">Product Description</p>
              <input
                type="text"
                name="description"
                placeholder="Product Description"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              />
              <p className="font-bold mt-4">Product Price</p>
              <input
                type="number"
                name="mrp"
                placeholder="MRP"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              />
              <input
                type="number"
                name="sellingPrice"
                placeholder="Selling Price"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              />
              <p className="font-bold mt-4">Product Quantity</p>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              />
              <p className="font-bold mt-4">Product Stock Status</p>
              <select
                name="stockStatus"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              >
                <option value="instock">In Stock</option>
                <option value="outstock">Out of Stock</option>
              </select>
              <p className="font-bold mt-4">Product Religion Category</p>
              <select
                name="category"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="font-bold mt-4">Product Search Keywords</p>
              <input
                type="text"
                name="keywords"
                placeholder="Keywords"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
                required
              />
              <p className="font-bold mt-4">Product Ongoing Offer</p>
              <input
                type="text"
                name="offer"
                placeholder="Offer"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
              />
              <input
                type="text"
                name="offerTagline"
                placeholder="Offer Tagline"
                onChange={handleFormChange}
                className="border px-4 py-2 w-full"
              />

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Product
                </button>
                <button
                  onClick={() => setIsAddPopupOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Edit Product Popup */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleEditProduct}
            className="bg-white p-10 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-4 h-96 overflow-y-scroll">
              <p className="font-bold">Product Name</p>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                onChange={handleFormChange}
                value={formData.name}
                className="border px-4 py-2 w-full"
                required
              />
              {/* Same form fields as add product for editing */}
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditPopupOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Manageproduct;
