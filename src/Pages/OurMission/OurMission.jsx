import React from "react";
import { Users, Clock, MapPin, ChartPie } from "lucide-react";

export default function OurMission() {
  const benefits = [
    {
      icon: <Users className="h-10 w-10 text-emerald-500" />,
      title: "Empower Citizens",
      desc: "Citizens can actively report public issues and participate in improving their city.",
    },
    {
      icon: <Clock className="h-10 w-10 text-sky-400" />,
      title: "Faster Response",
      desc: "Government staff can respond quicker, reducing delays and improving city services.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-purple-400" />,
      title: "Track Issues Easily",
      desc: "Users can track reported issues in real-time and get updates directly.",
    },
    {
      icon: <ChartPie className="h-10 w-10 text-orange-400" />,
      title: "Data-Driven Decisions",
      desc: "Collected infrastructure data helps authorities analyze and prioritize city improvements.",
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Why <span className="text-emerald-500">UrbanFix</span>?
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            UrbanFix is a digital platform that bridges the gap between citizens
            and municipal services. We help track, report, and resolve public
            infrastructure issues efficiently.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white/10 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
