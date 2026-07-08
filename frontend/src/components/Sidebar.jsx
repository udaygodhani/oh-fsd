import React from "react";
import Leaderboard from "./Leaderboard";

const Sidebar = () => {
  const cryptoFacts = [
    {
      fact: "The mysterious creator of Bitcoin, Satoshi Nakamoto, is estimated to own around 1.1 million Bitcoins, which have never been spent.",
      category: "Bitcoin History",
      icon: "🕵️‍♂️",
    },
    {
      fact: "The first commercial Bitcoin transaction was made in 2010 by Laszlo Hanyecz, who bought two pizzas for 10,000 Bitcoins.",
      category: "Pizza Day",
      icon: "🍕",
    },
    {
      fact: "Ethereum launched in 2015 introducing smart contracts, enabling decentralized applications (dApps) to run without intermediaries.",
      category: "Ethereum Tech",
      icon: "⟠",
    },
    {
      fact: "The maximum supply of Bitcoin is capped at 21 million. Around 3-4 million Bitcoins are estimated to be lost forever.",
      category: "Scarcity",
      icon: "🔒",
    },
  ];

  const leaderboardUsers = [
    {
      name: "John Carter",
      avatar: "https://i.pravatar.cc/150?img=11",
      posts: 124,
      points: 1580,
    },
    {
      name: "Emily",
      avatar: "https://i.pravatar.cc/150?img=32",
      posts: 110,
      points: 1435,
    },
    {
      name: "Alex",
      avatar: "https://i.pravatar.cc/150?img=41",
      posts: 95,
      points: 1310,
    },
    {
      name: "Sophia",
      avatar: "https://i.pravatar.cc/150?img=47",
      posts: 90,
      points: 1250,
    },
  ];

  return (
    <aside className="w-full lg:w-[360px] space-y-8">

      {/* Interesting Crypto Facts */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-5 flex items-center gap-2">
          💡 Interesting Crypto Facts
        </h2>

        <div className="space-y-4">
          {cryptoFacts.map((item, index) => (
            <div
              key={index}
              className="bg-[#17112D] border border-purple-500/20 rounded-2xl p-5 hover:border-purple-500 hover:bg-[#231A43]/40 transition-all duration-300 group cursor-pointer flex gap-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-[#1F1638] border border-purple-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Text & Category */}
              <div>
                <span className="inline-block text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 bg-purple-500/10 text-purple-400 rounded-full mb-2">
                  {item.category}
                </span>
                <p className="text-gray-300 text-[13px] leading-relaxed font-medium">
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard users={leaderboardUsers} />


    </aside>
  );
};

export default Sidebar;