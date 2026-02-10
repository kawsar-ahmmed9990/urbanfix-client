import { FilePlus, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <FilePlus className="h-7 w-7 text-emerald-500" />,
      title: "Report an Issue",
      desc: "Citizens submit an issue with details, photos, and exact location using the platform.",
    },
    {
      step: "02",
      icon: <ShieldCheck className="h-7 w-7 text-sky-500" />,
      title: "Admin Review & Assign",
      desc: "Admin verifies the issue and assigns it to the appropriate department or staff.",
    },
    {
      step: "03",
      icon: <Wrench className="h-7 w-7 text-orange-500" />,
      title: "Staff Resolve the Issue",
      desc: "Assigned staff inspects the issue, updates progress, and resolves the problem.",
    },
    {
      step: "04",
      icon: <CheckCircle2 className="h-7 w-7 text-emerald-600" />,
      title: "Track & Close",
      desc: "Citizens track status from Pending to Closed and receive live notifications.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            How It
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              {" "}
              Works
            </span>
          </h2>
          <p className="mt-4 text-slate-600">
            A simple and transparent process to report and resolve public
            infrastructure issues efficiently.
          </p>
        </div>

        <div className="relative mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center hover:shadow-lg transition"
            >
              {/* Step Number */}
              <span className="absolute -top-4 left-6 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                {item.step}
              </span>

              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
