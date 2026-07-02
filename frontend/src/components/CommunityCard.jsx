import React from "react";
import Button from "./Button";
import { FiUsers } from "react-icons/fi";

const CommunityCard = ({
  image,
  name,
  description,
  members,
}) => {
  return (
    <div className="bg-[#17112D] border border-purple-500/20 rounded-2xl p-5 hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20">

      {/* Top */}
      <div className="flex items-center gap-4">

        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-xl object-cover"
        />

        <div>
          <h3 className="text-white text-lg font-semibold">
            {name}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {description}
          </p>
        </div>

      </div>

      {/* Members */}
      <div className="flex items-center gap-2 mt-5 text-gray-400 text-sm">
        <FiUsers />
        <span>{members} Members</span>
      </div>

      {/* Join Button */}
      <Button className="w-full mt-6">
        Join Community
      </Button>

    </div>
  );
};

export default CommunityCard;