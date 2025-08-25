import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import VehicleCategories from "./pages/VehicleCategories";
import HowItWorks from "./pages/HowItWorks";
import AboutSection from "./pages/AboutSection";
import MobileApp from "./pages/MobileApp";
import Earn from "./pages/Earn";
import Testimonials from "./pages/Testimonials";
import Newsletter from "./pages/Newsletter";
import LoginForm from "./pages/LoginForm";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="min-h-screen relative">
        <Header onLoginClick={() => setShowLogin(true)} />

        <main id="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <VehicleCategories />
                  <AboutSection />
                  <HowItWorks />
                  <MobileApp />
                  <Earn />
                  <Testimonials />
                  <Newsletter />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      </div>
    </Router>
  );
}

export default App;
