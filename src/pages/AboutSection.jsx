import React from "react";
import { Check } from "lucide-react";
import abo from "../assets/abo.png";

const AboutSection = () => {
  const features = [
    "Transparent pricing",
    "Wide range of vehicles",
    "Safe, reliable, and comfortable journeys",
  ];

  return (
    <section
      id="about"
      className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 sm:py-24"
    >
      <div className="max-w-[1304px] mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* Image with floating effect */}
        <div className="relative w-full md:w-[480px] md:h-[480px] rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-700 group">
          <img
            src={abo}
            alt="About Us"
            className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
          />
          {/* Decorative gradient overlay */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            Your Travel Companion
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            We're on a mission to make travel simpler, smarter, and more affordable for everyone.
            Our platform connects travelers with reliable vehicles and trusted drivers, ensuring
            every journey is safe, transparent, and stress-free.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-500"
              >
                <Check className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="mt-6 self-start bg-blue-500 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-md">
            Know More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
