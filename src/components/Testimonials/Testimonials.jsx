import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rahim Ahmed",
      role: "Citizen",
      feedback:
        "Reporting potholes has never been easier. The real-time updates make it simple to track the issue.",
      rating: 5,
    },
    {
      name: "Sumi Akter",
      role: "Citizen",
      feedback:
        "The platform is very user-friendly. I uploaded photos and the staff resolved the water leakage quickly!",
      rating: 4,
    },
    {
      name: "Tanvir Hossain",
      role: "Citizen",
      feedback:
        "I love how transparent the system is. I can see exactly who is handling the issue and its status.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            What Citizens Say
          </h2>
          <p className="mt-4 text-slate-600">
            Real feedback from users who’ve reported and resolved issues using
            our platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 border border-slate-200 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="mt-4 text-slate-700 text-sm leading-relaxed">
                "{review.feedback}"
              </p>
              <p className="mt-4 font-semibold text-slate-900">{review.name}</p>
              <p className="text-slate-500 text-sm">{review.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
