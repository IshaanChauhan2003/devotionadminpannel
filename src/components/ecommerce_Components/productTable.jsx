// import React, { useState } from 'react';

// const ProductTable = ({ filteredProducts }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10; // Number of products per page

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   // Get the products for the current page
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Pagination controls
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="py-2 border">Product ID</th>
//             <th className="py-2 border">Product Name</th>
//             <th className="py-2 border">Price</th>
//             <th className="py-2 border">Quantity</th>
//             <th className="py-2 border">Stock Status</th>
//             <th className="py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map((product) => (
//             <tr key={product.id}>
//               <td className="py-2 border">{product.id}</td>
//               <td className="py-2 border">{product.name}</td>
//               <td className="py-2 border">${product.sellingPrice}</td>
//               <td className="py-2 border">{product.quantity}</td>
//               <td className="py-2 border">{product.stockStatus}</td>
//               <td className="py-2 border">
//                 <button
//                   onClick={() => {
//                     setEditProductId(product.id);
//                     setIsEditPopupOpen(true);
//                   }}
//                   className="bg-green-500 text-white px-4 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div className="mt-4 flex justify-center space-x-4">
//         <button
//           onClick={handlePrevious}
//           className="bg-gray-300 px-3 py-1 rounded"
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button
//           onClick={handleNext}
//           className="bg-gray-300 px-3 py-1 rounded"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default ProductTable;



import React, { useEffect, useState } from 'react';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch products from backend with pagination
  const fetchProducts = async (page) => {
    try {
      const response = await fetch(`http://192.168.1.8:8000/api/admin/view/products?page=${page}&limit=10`);
  
      if (!response.ok) {
        // Handle non-200 responses
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data)
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch products when component mounts or page changes
    fetchProducts(currentPage);
  }, [currentPage]);

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">Product ID</th>
            <th className="py-2 border">Product Name</th>
            <th className="py-2 border">Price</th>
            <th className="py-2 border">Quantity</th>
            <th className="py-2 border">Stock Status</th>
            <th className="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 border"> {product._id}</td>
              <td className="py-2 border"> {product.productName}</td>
              <td className="py-2 border"> Rs {product.productPrice.sellingPrice}</td>
              <td className="py-2 border"> {product.productQuantity}</td>
              <td className="py-2 border"> {product.productStock}</td>
              <td className="py-2 border">
                <button
                  onClick={() => {
                    setEditProductId(product._id);
                    setIsEditPopupOpen(true);
                  }}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-300 px-3 py-1 rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 px-3 py-1 rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
