import React, { useState } from "react";
import { Menu, X, Smartphone, LogIn } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Home", to: "/" },
    { name: "How it Works", href: "#how-it-works-section" },
    { name: "About Us", to: "/about" },
    { name: "Contact Us", to: "/contact" },
  ];

  const handleLinkClick = (link) => {
    if (link.href) {
      const el = document.getElementById(link.href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link.to);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1304px] mx-auto px-2">
        <div className="flex items-center justify-between h-[56px]">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="Logo" className="w-[50px] h-[50px] object-contain" />
            <img src="/name.png" alt="Brand Name" className="h-[40px] object-contain" />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link, idx) =>
              link.to ? (
                <NavLink
                  key={idx}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-[10px] py-[10px] transition-colors duration-300 group ${
                      isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute left-0 bottom-1 h-[2px] bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              ) : (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link)}
                  className="relative px-[10px] py-[10px] text-gray-800 hover:text-blue-600 transition-colors group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-1 h-[2px] bg-blue-600 w-0 group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            )}

            <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-[#0566E5] text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md">
              <Smartphone size={20} /> Get the App
            </motion.button>

            <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-2 border border-gray-400 text-gray-800 px-[7px] py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors" onClick={onLoginClick}>
              <LogIn size={20} /> Log In
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.4 }} className="lg:hidden fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-40">
                <nav className="flex flex-col p-6 h-full justify-between">
                  <div className="flex flex-col gap-4">
                    {links.map((link, idx) =>
                      link.to ? (
                        <NavLink key={idx} to={link.to} className="py-3 text-gray-800 hover:text-blue-600 text-left" onClick={() => setIsMenuOpen(false)}>
                          {link.name}
                        </NavLink>
                      ) : (
                        <button key={idx} className="py-3 text-gray-800 hover:text-blue-600 text-left" onClick={() => handleLinkClick(link)}>
                          {link.name}
                        </button>
                      )
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <motion.button whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 bg-[#0566E5] text-white py-3 rounded-xl font-medium shadow-md">
                      <Smartphone size={20} /> Get the App
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 border border-gray-400 text-gray-800 py-3 rounded-xl font-medium" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>
                      <LogIn size={20} /> Log In
                    </motion.button>
                  </div>
                </nav>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black z-30" onClick={() => setIsMenuOpen(false)} />
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
