import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import DiscussionCard from "../components/DiscussionCard";
import Sidebar from "../components/Sidebar";
import CreateThreadBanner from "../components/CreateThreadBanner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#0B061B] min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Search */}
      <SearchBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            <DiscussionCard
              author="John Carter"
              avatar="https://i.pravatar.cc/150?img=8"
              category="Technology"
              title="What are your thoughts on React 20?"
              description="React continues to evolve rapidly. Let's discuss the new features, server components, performance improvements, and how they affect modern web development."
              likes={248}
              comments={54}
              views="3.1K"
              time="2 hours ago"
            />

            <DiscussionCard
              author="Emily Watson"
              avatar="https://i.pravatar.cc/150?img=25"
              category="JavaScript"
              title="Best State Management Library in 2026?"
              description="Redux, Zustand, Context API, MobX or Jotai? Which one do you prefer for large applications?"
              likes={180}
              comments={42}
              views="2.4K"
              time="5 hours ago"
            />

            <DiscussionCard
              author="Alex Johnson"
              avatar="https://i.pravatar.cc/150?img=15"
              category="Python"
              title="FastAPI vs Django for APIs"
              description="When should you choose FastAPI over Django REST Framework? Share your real-world experience."
              likes={120}
              comments={33}
              views="1.7K"
              time="Yesterday"
            />

          </div>

          {/* Right Side */}
          <Sidebar />

        </div>

      </div>

      {/* Banner */}
      <CreateThreadBanner />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;