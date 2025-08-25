import React from "react";
import { MapPin, Car, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    icon: <MapPin className="w-10 h-10 text-blue-600" />,
    title: "Plan Your Trip",
    description:
      "Enter your pickup and destination. Get instant transparent fares and route options tailored to your needs.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    icon: <Car className="w-10 h-10 text-green-600" />,
    title: "Choose Your Ride",
    description:
      "Pick a vehicle that suits your style. From budget rides to premium comfort, customize it your way.",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    icon: <CheckCircle className="w-10 h-10 text-yellow-600" />,
    title: "Confirm & Go",
    description:
      "Pay a small advance, get driver details, and enjoy a smooth travel experience with full transparency.",
    color: "from-yellow-400 to-orange-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A simple, 3-step process to plan, book, and ride with confidence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Animated line between steps */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 -z-10"
          ></motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center max-w-xs relative z-10 hover:shadow-2xl transition-all duration-300"
            >
              {/* Step Circle */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} mb-6 shadow-md`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>

              {/* Step number floating */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute text-[100px] font-extrabold text-gray-200 bottom-0 right-4 -z-10"
              >
                {step.id}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
