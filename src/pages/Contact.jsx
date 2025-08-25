import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  // Variants for the main container to introduce the elements with a coordinated stagger
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren", // Start container animation before children
        staggerChildren: 0.2, // Stagger the animation of direct children
      },
    },
  };

  // Variants for each individual item (heading, paragraph, info cards, form inputs)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Variants for the button's click and hover effects
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center px-6 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 md:p-16"
      >
        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-center text-blue-600 mb-6"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-600 mb-12"
        >
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="flex-1 flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <MapPin size={28} className="text-blue-500" />
              <p className="text-gray-700">123 Main Street, City, Country</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <Mail size={28} className="text-blue-500" />
              <p className="text-gray-700">contact@trendra.com</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <Phone size={28} className="text-blue-500" />
              <p className="text-gray-700">+91 98765 43210</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            variants={containerVariants} // Apply container variants to stagger form inputs
            className="flex-1 flex flex-col gap-6"
          >
            <motion.div variants={itemVariants}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 px-1 text-gray-700 placeholder-gray-400 transition-colors duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 px-1 text-gray-700 placeholder-gray-400 transition-colors duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 px-1 text-gray-700 placeholder-gray-400 transition-colors duration-300 resize-none"
              />
            </motion.div>
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;