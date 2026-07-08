import React from "react";
import CommunityCard from "./CommunityCard";
import Leaderboard from "./Leaderboard";

const Sidebar = () => {
  const communities = [
    {
      image: "https://picsum.photos/100?random=1",
      name: "React Developers",
      description: "Everything about React & Next.js",
      members: "12.4K",
    },
    {
      image: "https://picsum.photos/100?random=2",
      name: "UI/UX Designers",
      description: "Share your creative designs",
      members: "9.8K",
    },
    {
      image: "https://picsum.photos/100?random=3",
      name: "Python Community",
      description: "Backend, AI & Automation",
      members: "15.2K",
    },
  ];

  return (
    <aside className="w-full lg:w-[360px] space-y-8">

      {/* Communities */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-5">
          🔥 Trending Communities
        </h2>

        <div className="space-y-5">
          {communities.map((community, index) => (
            <CommunityCard
              key={index}
              image={community.image}
              name={community.name}
              description={community.description}
              members={community.members}
            />
          ))}
        </div>
      </div>

      {/* Leaderboard - Now using MongoDB + Live Prices */}
      <Leaderboard />

      {/* Announcement */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6">
        <h3 className="text-white text-xl font-bold">
          📢 Announcement
        </h3>

        <p className="text-white/90 mt-3 leading-7">
          Join our weekly developer meetup every Friday and
          connect with thousands of developers around the world.
        </p>
      </div>

    </aside>
  );
};

export default Sidebar;