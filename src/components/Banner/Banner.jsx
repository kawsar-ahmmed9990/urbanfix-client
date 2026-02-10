import { motion } from "framer-motion";
import { ArrowRight, MapPin, Camera, CheckCircle } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1 text-sm text-emerald-300">
              <CheckCircle className="h-4 w-4" />
              Transparent • Fast • Trackable
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl xl:text-6xl">
              Report Public Issues
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                Make Your City Better
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Report potholes, broken streetlights, water leaks, garbage
              overflow and track issues from <b>Pending</b> to <b>Closed</b> in
              real time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur p-6">
              <MapPin className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-xl font-semibold">Pin Exact Location</h3>
              <p className="mt-2 text-sm text-slate-300">
                Mark the issue directly on the map for faster response.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur p-6">
              <Camera className="h-8 w-8 text-sky-400" />
              <h3 className="mt-4 text-xl font-semibold">Upload Photos</h3>
              <p className="mt-2 text-sm text-slate-300">
                Photos help staff verify and resolve issues faster.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur p-6 sm:col-span-2">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-xl font-semibold">Track Status</h3>
              <p className="mt-2 text-sm text-slate-300">
                Pending → In-Progress → Resolved → Closed. Premium citizens get
                priority support.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
