import React from "react";
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

              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/40">
                T
              </div>

              <h1 className="text-3xl font-bold text-white">
                threada
              </h1>

            </div>

            <p className="text-gray-400 mt-6 leading-7">
              A modern community platform where developers,
              designers and creators connect, share knowledge,
              and grow together.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h2 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Discussions
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Communities
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  About
                </a>
              </li>

            </ul>

          </div>

          {/* Community */}
          <div>

            <h2 className="text-white text-xl font-semibold mb-5">
              Community
            </h2>

            <ul className="space-y-3">

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Contact
                </a>
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

              support@threada.com

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-purple-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Threada. All rights reserved.
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