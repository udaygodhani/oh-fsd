import React from "react";
import { FiAward, FiTrendingUp } from "react-icons/fi";

const Leaderboard = () => {
    const users = [
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
        <div className="bg-[#17112D] border border-purple-500/20 rounded-2xl p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <FiAward className="text-white text-xl" />
                </div>

                <h2 className="text-white text-xl font-bold">
                    Leaderboard
                </h2>
            </div>

            {/* Users */}
            <div className="space-y-5">

                {users.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#231A43] transition duration-300"
                    >

                        {/* Left */}
                        <div className="flex items-center gap-3">

                            <span className="text-purple-400 font-bold w-5">
                                #{index + 1}
                            </span>

                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover border border-purple-500"
                            />

                            <div>
                                <h3 className="text-white font-semibold">
                                    {user.name}
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    {user.posts} Posts
                                </p>
                            </div>

                        </div>

                        {/* Score */}
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-green-400 justify-end">
                                <FiTrendingUp />
                                <span className="font-semibold">
                                    {user.points}
                                </span>
                            </div>

                            <p className="text-xs text-gray-500">
                                Points
                            </p>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default Leaderboard;