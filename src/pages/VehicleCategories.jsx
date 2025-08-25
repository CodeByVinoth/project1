import React from "react";
import { motion } from "framer-motion";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";
import car4 from "../assets/car4.png";

const VehicleCategories = () => {
  const categories = [
    {
      id: 1,
      image: car1,
      title: "Sedans",
      description:
        "Best for couples or small families. Comfortable and budget-friendly.",
    },
    {
      id: 2,
      image: car2,
      title: "SUVs",
      description: "Perfect for group trips with extra space.",
    },
    {
      id: 3,
      image: car3,
      title: "Travellers & Minivans",
      description:
        "Spacious seating for large families, friends, or corporate trips.",
    },
    {
      id: 4,
      image: car4,
      title: "Tourist Buses",
      description:
        "Spacious and comfortable rides for large groups and long journeys.",
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
    hover: {
      scale: 1.05,
      y: -10,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.2,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
    },
  };

  const textVariants = {
    initial: { y: "100%", opacity: 0 },
    hover: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1304px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Find the Perfect Ride for Every Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            From cozy sedans to spacious Travellers, choose a vehicle that fits
            your trip and style — with extra features to make it truly yours.
          </motion.p>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "1 / 1" }}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              custom={index}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Vehicle Image */}
              <motion.img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
                variants={imageVariants}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>

              {/* Text Slide-up */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 text-white overflow-hidden"
                variants={textVariants}
              >
                <h3 className="text-2xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-base text-gray-200 leading-snug">{cat.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
