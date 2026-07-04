import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  FiSearch,
  FiBell,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/data/UserDataProvider";
import api from "../api/api";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(true)
  const handleLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");
      toast.success(response.data.message)
      localStorage.removeItem("user")
      setUser(null)
      navigate("/login")
    } catch (error) {
      toast.error(error.message || "Something Went Wrong.")
    }
  }
  const navlinks = [
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
    },
    {
      name: "Market",
      pages: [
        {
          name: "Sport",
          link: ""
        },
        {
          name: "Future",
          link: ""
        },
        {
          name: "All",
          link: ""
        },
        {
          name: "Web3",
          link: ""
        }
      ]
    },
    {
      name: "Products",
      pages: [
        {
          name: "App Promotion",
          link: ""
        },
        {
          name: "SIP Plan",
          link: ""
        },
        {
          name: "Services",
          link: ""
        }
      ]
    }
  ]
  return (
    <nav className="w-full bg-[#120A25]/90 backdrop-blur-md border-b border-purple-700/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/40">
            T
          </div>

          <h1 className="text-3xl font-bold text-white">
            Crypto Grow
          </h1>
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex items-center gap-10 text-gray-300 font-medium">

          {
            navlinks.map((select, idx) => (
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
                  }} className={`absolute top-10 left-0 bg-[#1A1332] border border-purple-500/30 rounded-xl shadow-xl z-50 ${activeMenu==="More"?"flex items-start justify-center w-100 p-3":" w-56 py-2"}`}>
                    <div className={`flex flex-col justify-start items-start ${activeMenu==="More"?"w-[60%]":"w-full"}`}>
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
                    {
                      activeMenu==="More" && (
                        <img src="MenuImage.png" className="h-100 w-[80%]" alt="" />
                      )
                    }
                  </div>
                )}
              </div>
            ))
          }
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden md:flex items-center bg-[#1A1332] rounded-full px-5 py-3 border border-purple-500/30 w-[320px]">

            <FiSearch className="text-gray-400 text-xl" />

            <input
              type="text"
              placeholder="Search threads..."
              className="bg-transparent outline-none ml-3 w-full text-white placeholder-gray-500"
            />
          </div>

          {/* Notification */}

          <button className="w-12 h-12 rounded-full bg-[#1A1332] border border-purple-600/30 flex items-center justify-center hover:bg-purple-600 transition">

            <FiBell className="text-white text-xl" />

          </button>

          {/* Profile */}

          {
            user ? <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl cursor-pointer relative">
              {user.name.charAt(0) + user.name.split(" ")[1].charAt(0)}
              <div className={`flex absolute border border-white bg-white top-20 right-20 h-auto w-auto p-5 rounded-2xl flex-col ${openMenu?"":"hidden"}`}>
                <Link to={'#'}>Profile</Link>
                <button type="button" onClick={()=>handleLogout()}>Logout</button>
              </div>
            </div> : <Link to={'/login'} className="text-2xl text-white">Login</Link>
          }

        </div>

      </div>
    </nav>
  );
};

export default Navbar;