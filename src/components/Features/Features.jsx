import {
  MapPin,
  Camera,
  ClipboardCheck,
  UserCheck,
  Star,
  Bell,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-emerald-500" />,
      title: "Location-based Reporting",
      desc: "Citizens can pin the exact location of issues on the map for accurate and faster resolution.",
    },
    {
      icon: <Camera className="h-8 w-8 text-sky-500" />,
      title: "Photo Evidence",
      desc: "Upload real photos of issues to help authorities verify problems instantly.",
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-purple-500" />,
      title: "Issue Tracking System",
      desc: "Track issues from Pending → In-Progress → Resolved → Closed in real time.",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-orange-500" />,
      title: "Admin & Staff Management",
      desc: "Admins can verify, assign, and monitor issues efficiently through a centralized dashboard.",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Premium Priority Support",
      desc: "Premium citizens receive faster response and higher priority for reported issues.",
    },
    {
      icon: <Bell className="h-8 w-8 text-rose-500" />,
      title: "Live Notifications",
      desc: "Citizens get instant updates whenever the issue status changes.",
    },
  ];

  return (
    <section className="bg-white text-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Powerful Features for
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              {" "}
              Smarter Cities
            </span>
          </h2>
          <p className="mt-4 text-slate-600">
            Everything you need to report, manage, and resolve public
            infrastructure issues efficiently — all in one platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white shadow">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
