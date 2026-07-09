import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  FiBell
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/data/UserDataProvider";
import { CiLogout } from "react-icons/ci";
import api from "../api/api";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");
      toast.success(response.data.message);
      sessionStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something Went Wrong.");
    }
  };

  const navlinks = [
    {
      name: "Market",
      pages: [
        {
          name: "spot",
          link: "/market/spot"
        },
        {
          name: "Future",
          link: "/market/future"
        },
        {
          name: "All",
          link: "/market/all"
        },
        {
          name: "Web3",
          link: "/market/web3"
        }
      ]
    },
    {
      name: "Products",
      pages: [
        {
          name: "App Promotion",
          link: "/products/apppromotion"
        },
        {
          name: "SIP Plan",
          link: "/products/sipplan"
        },
        {
          name: "Services",
          link: "/products/services"
        }
      ]
    },
    {
      name: "More",
      pages: [
        {
          name: "Crypto Heatmap",
          link: "/more/cryptoheatmap"
        },
        {
          name: "Crypto Compare",
          link: "/more/cryptocompare"
        },
        {
          name: "Price Prediction",
          link: "/more/priceprediction"
        },
        {
          name: "Curency Converter",
          link: "/more/curencyconverter"
        },
        {
          name: "Crypto Calculator",
          link: "/more/cryptocalculator"
        },
      ]
    }
  ];

  return (
    <nav className="w-full bg-[#120A25]/90 backdrop-blur-md border-b border-purple-700/20 fixed top-0 z-50 left-0">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <img src="/project-logo.png" className="w-13 h-13" alt="" />

          <h1 className="text-3xl font-bold text-white">
            Crypto Groww
          </h1>
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex items-center gap-10 text-gray-300 font-medium">
          {navlinks.map((select, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => {
                setActiveMenu(select.name);
                setHoveredMenu(select.name);
              }}
            >
              <h3 className="flex items-center gap-2 cursor-pointer text-white hover:text-purple-400">
                {select.name}

                <FaAngleDown
                  className={`transition-all duration-300 ${hoveredMenu === select.name
                    ? "translate-y-1 text-purple-500"
                    : "translate-y-0 rotate-0 text-white"
                    }`}
                />
              </h3>
              {activeMenu === select.name && (
                <div onMouseLeave={() => {
                  setActiveMenu(null);
                  setHoveredMenu(null);
                }} className={`absolute top-10 left-0 bg-[#1A1332] border border-purple-500/30 rounded-xl shadow-xl z-50 ${activeMenu === "More" ? "flex items-start justify-center w-100 p-3" : " w-56 py-2"}`}>
                  <div className={`flex flex-col justify-start items-start ${activeMenu === "More" ? "w-[60%]" : "w-full"}`}>
                    {select.pages.map((page, index) => (
                      <Link
                        key={index}
                        to={page.link}
                        className="block px-4 py-3 text-gray-300 hover:bg-purple-600 hover:text-white w-full"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                  {activeMenu === "More" && (
                    <img src="/MenuImage.png" className="h-100 w-[80%]" alt="" />
                  )}
                </div>
              )}
            </div>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">


          {/* Notification */}
          <button className="w-12 h-12 rounded-full bg-[#1A1332] border border-purple-600/30 flex items-center justify-center hover:bg-purple-600 transition">
            <FiBell className="text-white text-xl" />
          </button>

          {/* Profile */}
          {user ? (
            <div className="relative">
              {/* Profile Avatar Button */}
              <button 
                onClick={() => setOpenMenu(!openMenu)} 
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg cursor-pointer border-none hover:scale-105 transition-transform"
              >
                {user.name ? (user.name.trim().split(" ").length > 1 ? (user.name.trim().split(" ")[0].charAt(0) + user.name.trim().split(" ")[1].charAt(0)).toUpperCase() : user.name.trim().slice(0, 2).toUpperCase()) : "U"}
              </button>

              {/* Dropdown Menu */}
              {openMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div 
                    onClick={() => setOpenMenu(false)} 
                    className="fixed inset-0 z-40 bg-transparent"
                  />
                  
                  {/* Actual Dropdown */}
                  <div className="absolute right-0 mt-3 w-56 bg-[#151026] border border-purple-500/20 rounded-2xl p-2.5 shadow-2xl z-50 flex flex-col gap-1 text-white">
                    <Link 
                      to={'/profile'} 
                      onClick={() => setOpenMenu(false)}
                      className="flex items-center gap-3 hover:bg-purple-500/10 p-3 rounded-xl transition-all text-white hover:text-white font-medium"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                        {user.name ? (user.name.trim().split(" ").length > 1 ? (user.name.trim().split(" ")[0].charAt(0) + user.name.trim().split(" ")[1].charAt(0)).toUpperCase() : user.name.trim().slice(0, 2).toUpperCase()) : "U"}
                      </div>
                      Profile
                    </Link>
                    <button 
                      type="button" 
                      onClick={() => { setOpenMenu(false); handleLogout(); }}
                      className="flex items-center gap-3 p-3 hover:bg-red-500/15 hover:text-red-400 text-gray-300 font-semibold cursor-pointer rounded-xl transition-all text-left border-none bg-transparent"
                    >
                      <CiLogout className="text-lg text-red-400" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to={'/login'} className="text-2xl text-white">Login</Link>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;