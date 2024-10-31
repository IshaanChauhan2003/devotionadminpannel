import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/loginscreen';
import Sidebar from './components/sidebar';
import HomeScreen from './components/homescreen';
import EcommerceScreen from './components/ecommerce';
import Managebanner from './components/ecommerce_Components/managebanner';
import Managecategory from './components/ecommerce_Components/managecategory';
import Manageorders from './components/ecommerce_Components/manageorders';
import Manageproduct from './components/ecommerce_Components/manageproduct';
import Managereviews from './components/ecommerce_Components/managereviews';
import Managetopselling from './components/ecommerce_Components/managetopselling';
import Managetrending from './components/ecommerce_Components/managetrending';
import Manageecommhome from './components/ecommerce_Components/manageecommhome';
import Adminscreen from './components/Admin_Components/adminscreen';
import ManageUser from './components/ManageUser/ManageUser';
import UploadPost from './components/Upload/uploadPosts';
import VideoPlayer from './components/videoplayer';

const App = () => {
  const [isSidebaropen, setsidebaropen] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const [ActiveTab, setActiveTab] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <div className="flex h-screen">
        <Sidebar isSidebaropen={isSidebaropen} setsidebaropen={setsidebaropen} setActiveTab={setActiveTab} />
        <div className={isSidebaropen ? "flex-1 p-6 bg-gray-100 ml-64" : "flex-1 p-6 bg-gray-100 ml-16"}>
          <Routes>

            <Route path="/home" element={<HomeScreen isMonthly={isMonthly} setIsMonthly={setIsMonthly} setActiveTab={setActiveTab} />} />
            <Route path="/ecommerce" element={<EcommerceScreen isMonthly={isMonthly} setIsMonthly={setIsMonthly} ActiveTab={ActiveTab} setActiveTab={setActiveTab} />}>
              <Route index element={<Manageecommhome isMonthly={isMonthly} setIsMonthly={setIsMonthly} setActiveTab={setActiveTab} />} />
              <Route path="manageProduct" element={<Manageproduct />} />
              <Route path="manageCategory" element={<Managecategory />} />
              <Route path="manageReview" element={<Managereviews />} />
              <Route path="manageBanners" element={<Managebanner />} />
              <Route path="manageTrendings" element={<Managetrending />} />
              <Route path="manageTopSellings" element={<Managetopselling />} />
              <Route path="manageOrders" element={<Manageorders isMonthly={isMonthly} setIsMonthly={setIsMonthly} />} />
            </Route>
            <Route path="/admin" element={<Adminscreen />} />
            <Route path="/user" element={<ManageUser />} />
            <Route path="/upload" element={<UploadPost />} />
            <Route path="/video/:videoUrl" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
