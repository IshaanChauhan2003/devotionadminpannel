import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiMagicPalm } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { RiHome4Fill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";

const Sidebar = ({isSidebaropen , setsidebaropen ,setActiveTab}) => {

    return (
        <div className="h-screen flex">
            <div className="group fixed h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out">
                <div onMouseEnter={()=>{setsidebaropen(true)}} onMouseLeave={()=>{setsidebaropen(false)}} className={isSidebaropen?"w-64 h-full flex flex-col items-center justify-center space-y-8 transition-all duration-100 ease-in":"w-16 h-full flex flex-col items-center justify-center space-y-8 transition-all duration-100 ease-in"}>


                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-8 group-hover:block hidden">Admin Panel</h2>
                        <nav>
                            <ul>
                                <li className="mb-4">
                                    <Link to="/home" className="hover:bg-gray-700 p-2 block rounded">
                                        <span className="hidden group-hover:inline-block">Home section</span>
                                        <span className="block group-hover:hidden text-center"><RiHome4Fill /></span>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/user" className="hover:bg-gray-700 p-2 block rounded">
                                        <span className="hidden group-hover:inline-block">User Section</span>
                                        <span className="block group-hover:hidden text-center"><FaUser /></span>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/ecommerce" className="hover:bg-gray-700 p-2 block rounded" onClick={()=>{setActiveTab("ManageHome")}}>
                                        <span className="hidden group-hover:inline-block">E-commerce Section</span>
                                        <span className="block group-hover:hidden text-center"><FaShoppingCart /></span>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <a href="#astrology-section" className="hover:bg-gray-700 p-2 block rounded">
                                        <span className="hidden group-hover:inline-block">Astrology Section</span>
                                        <span className="block group-hover:hidden text-center"><GiMagicPalm /></span>
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <Link to="/admin" className="hover:bg-gray-700 p-2 block rounded">
                                        <span className="hidden group-hover:inline-block">Admin Section</span>
                                        <span className="block group-hover:hidden text-center"><FaUserTie /></span>
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/upload" className="hover:bg-gray-700 p-2 block rounded">
                                        <span className="hidden group-hover:inline-block">Upload Section</span>
                                        <span className="block group-hover:hidden text-center"><IoMdCloudUpload /></span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
