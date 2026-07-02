import React from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiEye,
  FiClock,
} from "react-icons/fi";
import Button from "./Button";

const DiscussionCard = ({
  author,
  avatar,
  category,
  title,
  description,
  likes,
  comments,
  views,
  time,
}) => {
  return (
    <div className="bg-[#17112D] border border-purple-500/20 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src={avatar}
            alt={author}
            className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
          />

          <div>
            <h3 className="text-white font-semibold text-lg">
              {author}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <FiClock />
              {time}
            </div>
          </div>

        </div>

        <span className="px-4 py-2 rounded-full bg-purple-600/20 text-purple-300 text-sm">
          {category}
        </span>

      </div>

      {/* Title */}

      <h2 className="text-white text-2xl font-bold mt-6">
        {title}
      </h2>

      {/* Description */}

      <p className="text-gray-400 mt-4 leading-7">
        {description}
      </p>

      {/* Stats */}

      <div className="flex items-center gap-8 mt-8 text-gray-400">

        <div className="flex items-center gap-2">
          <FiHeart className="text-pink-500" />
          {likes}
        </div>

        <div className="flex items-center gap-2">
          <FiMessageCircle className="text-cyan-400" />
          {comments}
        </div>

        <div className="flex items-center gap-2">
          <FiEye className="text-green-400" />
          {views}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex justify-end">

        <Button className="px-5 py-2">
          Read More
        </Button>

      </div>

    </div>
  );
};

export default DiscussionCard;