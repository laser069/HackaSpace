// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = ({ setDark, dark }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to HackNest</h1>
        <p className="text-lg">Join hackathons, create teams, and collaborate with others!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
