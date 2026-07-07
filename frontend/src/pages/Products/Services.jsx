import React from 'react';
import { FaShieldAlt, FaChartLine, FaWallet, FaHeadset } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaShieldAlt className="text-5xl" />,
      title: "Secure Custody",
      desc: "Institutional-grade cold storage"
    },
    {
      icon: <FaChartLine className="text-5xl" />,
      title: "Advanced Trading",
      desc: "Spot, Futures & Margin trading"
    },
    {
      icon: <FaWallet className="text-5xl" />,
      title: "Multi-Chain Wallet",
      desc: "Support for 20+ blockchains"
    },
    {
      icon: <FaHeadset className="text-5xl" />,
      title: "24/7 Support",
      desc: "Priority customer service"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-16">Our Services</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <div key={i} className="bg-[#1A1332] p-10 rounded-3xl hover:bg-[#221B3A] transition group">
            <div className="text-purple-400 mb-6 group-hover:scale-110 transition">
              {service.icon}
            </div>
            <h3 className="text-3xl font-semibold mb-4">{service.title}</h3>
            <p className="text-gray-400 text-lg">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;