"use client";

import { motion } from "framer-motion";

const PLAN_ROWS = [
  {
    name: "Standard DV SSL",
    audience: "Personal sites & blogs",
    note: "Encrypts traffic and shows the padlock for one domain.",
    badge: "Included on most plans",
  },
  {
    name: "Business OV SSL",
    audience: "Growing brands & stores",
    note: "Adds business validation for higher customer trust.",
    badge: "Recommended for ecommerce",
  },
  {
    name: "Advanced EV SSL",
    audience: "Enterprises & financial services",
    note: "Highest level of validation and the strongest trust signals.",
    badge: "Best for sensitive data",
  },
];

const SSLPlansStrip = () => {
  return (
    <section
      className="relative py-14 sm:py-16 lg:py-18"
      style={{ backgroundColor: "rgb(15,23,42)" }}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
              SSL options that grow with your site.
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              Start with basic HTTPS or upgrade to higher validation as your
              business and compliance needs increase.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="grid grid-cols-1 divide-y divide-slate-800 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {PLAN_ROWS.map((row, idx) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="px-6 py-6 sm:px-7 sm:py-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {row.audience}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-50 mb-1.5">
                  {row.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-3">
                  {row.note}
                </p>
                <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                  {row.badge}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SSLPlansStrip;

