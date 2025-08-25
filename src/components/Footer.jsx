import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import logo from "../assets/logo.png";
import name from "../assets/name.png";

const Footer = () => {
  const socialIcons = [
    { Icon: FaFacebook, link: "https://facebook.com" },
    { Icon: FaTwitter, link: "https://twitter.com" },
    { Icon: FaInstagram, link: "https://instagram.com" },
    { Icon: FaLinkedin, link: "https://linkedin.com" },
  ];

  return (
    <motion.footer
      className="w-full bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6 relative overflow-hidden shadow-inner"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="max-w-[1300px] mx-auto flex flex-col gap-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-center md:text-left">
          {/* Logo + Description */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 mb-3">
              <motion.img
                src={logo}
                alt="Logo"
                className="w-12 h-auto object-contain"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
              />
              <img src={name} alt="Name" className="h-6 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-600 max-w-[300px]">
              Multi-vehicle rentals made simple. All brands, one platform, for a smoother journey.
            </p>
            <div className="flex items-center gap-4 mt-4">
              {socialIcons.map(({ Icon, link }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-gray-600">
              {["About", "Careers", "Press"].map((item, idx) => (
                <li key={idx}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-gray-600">
              {["Help Center", "Contact", "Safety"].map((item, idx) => (
                <li key={idx}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-gray-600">
              {["Terms", "Privacy"].map((item, idx) => (
                <li key={idx}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="border-t border-gray-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-sm"
        >
          <p>© 2025 Trendra Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialIcons.map(({ Icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-blue-600"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
