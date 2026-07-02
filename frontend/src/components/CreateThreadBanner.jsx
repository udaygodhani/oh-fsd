import React from "react";
import { FiPlusCircle, FiArrowRight } from "react-icons/fi";
import Button from "./Button";

const CreateThreadBanner = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#17112D]">

          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/30 blur-[120px] rounded-full"></div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/20 blur-[130px] rounded-full"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-12">

            {/* Left Side */}
            <div>

              <div className="flex items-center gap-3 mb-5">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">

                  <FiPlusCircle className="text-white text-3xl" />

                </div>

                <h2 className="text-4xl font-bold text-white">
                  Start Your Own Discussion
                </h2>

              </div>

              <p className="text-gray-300 text-lg max-w-2xl leading-8">
                Have a question, an idea, or something worth sharing?
                Create a thread and connect with thousands of developers,
                designers, and tech enthusiasts around the world.
              </p>

            </div>

            {/* Right Side */}
            <div className="flex-shrink-0">

              <Button className="px-8 py-4 text-lg flex items-center gap-3">
                Create Thread
                <FiArrowRight />
              </Button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CreateThreadBanner;