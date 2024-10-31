import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const EcommerceScreen = ({ isMonthly, setIsMonthly, ActiveTab, setActiveTab }) => {
  // Optional: You can remove the unused handleClick function if not needed
  // function handleClick() {}

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">E-commerce Management</h1>
        {/* <button
          onClick={() => setIsMonthly(!isMonthly)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {isMonthly ? 'Switch to Annual' : 'Switch to Monthly'}
        </button> */}
      </div>
      <div className="flex gap-4 mb-6 font-semibold">
        <Link to="">
          <button
            onClick={() => setActiveTab("ManageHome")}
            className={ActiveTab === "ManageHome" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Home
          </button>
        </Link>
        <Link to="manageProduct">
          <button
            onClick={() => setActiveTab("ManageProducts")}
            className={ActiveTab === "ManageProducts" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Products
          </button>
        </Link>
        <Link to="manageCategory">
          <button
            onClick={() => setActiveTab("ManageCategories")}
            className={ActiveTab === "ManageCategories" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Categories
          </button>
        </Link>
        <Link to="manageReview">
          <button
            onClick={() => setActiveTab("ManageReviews")}
            className={ActiveTab === "ManageReviews" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Reviews
          </button>
        </Link>
        <Link to="manageBanners">
          <button
            onClick={() => setActiveTab("ManageBanners")}
            className={ActiveTab === "ManageBanners" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Banners
          </button>
        </Link>
        <Link to="manageTrendings">
          <button
            onClick={() => setActiveTab("ManageTrending")}
            className={ActiveTab === "ManageTrending" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Trending
          </button>
        </Link>
        <Link to="manageTopSellings">
          <button
            onClick={() => setActiveTab("ManageTop")}
            className={ActiveTab === "ManageTop" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Manage Top Selling
          </button>
        </Link>
        <Link to="manageOrders">
          <button
            onClick={() => setActiveTab("OrdersStatus")}
            className={ActiveTab === "OrdersStatus" ? "bg-blue-500 text-white p-4 rounded" : "bg-gray-200 p-4 rounded hover:bg-gray-400"}
          >
            Orders Status
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default EcommerceScreen;
