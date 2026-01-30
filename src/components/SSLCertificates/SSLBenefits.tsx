"use client";

import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Protect every visitor",
    description:
      "Encrypt traffic between your site and your visitors so logins, forms, and checkouts stay private.",
  },
  {
    title: "Show you’re trustworthy",
    description:
      "HTTPS, padlock icons, and security signals give customers confidence to share their details.",
  },
  {
    title: "Boost search visibility",
    description:
      "Search engines prefer secure sites. SSL is a quick win for modern SEO best practices.",
  },
];

const SSLBenefits = () => {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "rgb(var(--security-spacemail-bg))" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-start">
        <div className="lg:w-1/3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-security-spacemail-heading mb-4">
            Why SSL with The Cloud Aro?
          </h2>
          <p className="text-sm sm:text-base text-security-spacemail-description max-w-md">
            SSL certificates are built into our Cloudaro stack, so you can turn
            on secure browsing without wrestling with server configs.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3">
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-5"
            >
              <h3 className="mb-2 text-base sm:text-lg font-semibold text-security-spacemail-feature-title">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-security-spacemail-feature-description">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SSLBenefits;

