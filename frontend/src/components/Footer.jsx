import React from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#120D24] border-t border-purple-500/20 mt-20">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-3">

              <img src="/project-logo.png" className="w-13 h-13" alt="" />

              <h1 className="text-3xl font-bold text-white">
                Crypto Groww
              </h1>

            </div>

            <p className="text-gray-400 mt-6 leading-7">
              A premium cryptocurrency portal designed for tracking,
              analyzing, and learning about digital assets,
              helping you grow your trading knowledge.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h2 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/market/all" className="text-gray-400 hover:text-purple-400 transition">
                  All Markets
                </Link>
              </li>

              <li>
                <Link to="/market/web3" className="text-gray-400 hover:text-purple-400 transition">
                  Web3 Universe
                </Link>
              </li>

              <li>
                <Link to="/products/services" className="text-gray-400 hover:text-purple-400 transition">
                  Services
                </Link>
              </li>

            </ul>

          </div>

          {/* Learn & Grow Tools */}
          <div>

            <h2 className="text-white text-xl font-semibold mb-5">
              Learn & Grow
            </h2>

            <ul className="space-y-3">

              <li>
                <Link to="/more/cryptoheatmap" className="text-gray-400 hover:text-purple-400 transition">
                  Crypto Heatmap
                </Link>
              </li>

              <li>
                <Link to="/more/priceprediction" className="text-gray-400 hover:text-purple-400 transition">
                  Price Prediction
                </Link>
              </li>

              <li>
                <Link to="/more/cryptocalculator" className="text-gray-400 hover:text-purple-400 transition">
                  Crypto Calculator
                </Link>
              </li>

              <li>
                <Link to="/more/curencyconverter" className="text-gray-400 hover:text-purple-400 transition">
                  Currency Converter
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h2 className="text-white text-xl font-semibold mb-5">
              Connect With Us
            </h2>

            <div className="flex gap-4 mb-6">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#1C1633] flex items-center justify-center hover:bg-purple-600 transition"
              >
                <FiGithub className="text-white text-xl" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#1C1633] flex items-center justify-center hover:bg-sky-500 transition"
              >
                <FiTwitter className="text-white text-xl" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#1C1633] flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FiLinkedin className="text-white text-xl" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#1C1633] flex items-center justify-center hover:bg-pink-500 transition"
              >
                <FiInstagram className="text-white text-xl" />
              </a>

            </div>

            <div className="flex items-center gap-3 text-gray-400">

              <FiMail className="text-purple-400" />

              support@cryptogrow.com

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-purple-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Crypto Groww. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;