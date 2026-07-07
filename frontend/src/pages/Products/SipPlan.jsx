import React from 'react';

const SipPlan = () => {
  const plans = [
    {
      name: "Starter SIP",
      amount: "50",
      duration: "Monthly",
      return: "18-25%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Growth SIP",
      amount: "500",
      duration: "Monthly",
      return: "28-40%",
      color: "from-purple-500 to-violet-500"
    },
    {
      name: "Elite SIP",
      amount: "2000",
      duration: "Monthly",
      return: "45%+",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4">Systematic Investment Plans</h1>
      <p className="text-xl text-gray-400 text-center mb-16">Invest small. Grow big. Automatically.</p>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${plan.color} p-1 rounded-3xl`}
          >
            <div className="bg-[#0F0820] h-full rounded-[22px] p-10 hover:scale-105 transition-all">
              <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
              <p className="text-6xl font-bold mb-8">
                ${plan.amount}<span className="text-2xl">/mo</span>
              </p>

              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3">✅ Auto-invest every month</li>
                <li className="flex items-center gap-3">✅ Dollar Cost Averaging</li>
                <li className="flex items-center gap-3">✅ Expected Return: <span className="text-green-400">{plan.return}</span></li>
              </ul>

              <button className="w-full py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 transition">
                Start {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SipPlan;