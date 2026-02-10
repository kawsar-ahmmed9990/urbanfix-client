import React from "react";
import { CheckCircle } from "lucide-react";

export default function About() {
  const steps = [
    "Citizens submit a report with issue details, photos, and location.",
    "Admin reviews & assigns the issue to staff.",
    "Staff verifies the issue and updates progress.",
    "System tracks status from Pending → In-Progress → Resolved → Closed.",
    "Citizens get updates and can track their issue anytime.",
    "Premium citizens get priority support.",
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          About UrbanFix
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          The Public Infrastructure Issue Reporting System is a digital platform
          that enables citizens to report real-world public issues such as
          broken streetlights, potholes, water leakage, garbage overflow,
          damaged footpaths, etc. Government staff and admins can manage,
          verify, assign, and resolve reported issues efficiently.
        </p>
        <p className="text-slate-600 text-lg leading-relaxed mt-4">
          Municipal services often suffer from delayed response and lack of
          tracking. Citizens have no centralized platform to report problems.
          This system improves transparency, reduces response time, helps
          collect and analyze infrastructure data, and makes city service
          delivery more efficient.
        </p>
      </div>

      <div className="mt-20 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          How the System Works
        </h2>
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <CheckCircle className="text-emerald-500 w-6 h-6 mt-1 flex-shrink-0" />
              <p className="text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">
          Ready to Make Your City Better?
        </h3>
        <p className="text-slate-600 mb-6">
          Join UrbanFix today and help authorities fix public infrastructure
          issues faster.
        </p>
        <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-medium hover:bg-emerald-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
