import { User, Shield, Wrench } from "lucide-react";

export default function UserRoles() {
  const roles = [
    {
      icon: <User className="h-8 w-8 text-emerald-500" />,
      title: "Citizen",
      desc: "Report public issues, upload photos, track progress, and receive real-time updates on issue resolution.",
    },
    {
      icon: <Shield className="h-8 w-8 text-sky-500" />,
      title: "Admin",
      desc: "Verify reported issues, assign tasks to staff, monitor progress, and ensure transparency.",
    },
    {
      icon: <Wrench className="h-8 w-8 text-orange-500" />,
      title: "Staff",
      desc: "Inspect assigned issues, update work status, and resolve problems efficiently on the ground.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            User
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              {" "}
              Roles
            </span>
          </h2>
          <p className="mt-4 text-slate-600">
            Different roles working together to make city services faster and
            more efficient.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 border border-slate-200 hover:shadow-lg transition text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100">
                {role.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {role.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {role.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
