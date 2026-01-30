"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const SSLHero = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        color: "rgb(var(--security-spacemail-heading-text))",
      }}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Security/Security.png"
          alt="Secure connection background"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(12,74,110,0.9))",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pb-20 pt-16 text-center sm:px-10 sm:pt-24 lg:pb-28 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-medium uppercase tracking-[0.2em]"
          style={{
            backgroundColor: "rgba(15,23,42,0.7)",
            color: "rgba(148,163,184,1)",
            border: "1px solid rgba(148,163,184,0.3)",
          }}
        >
          <span>Trust &amp; security</span>
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          <span>SSL Certificates</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-6 w-full max-w-4xl"
        >
          <ContentHeading
            title="Encrypt every click with SSL."
            className="!text-[2.75rem] sm:!text-[3.5rem] md:!text-[4.25rem] lg:!text-[4.75rem] font-bold leading-[1.1] !text-[rgb(var(--security-spacemail-heading-text))]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-4 max-w-3xl"
        >
          <ContentDescription
            size="lg"
            className="!text-[rgb(var(--security-spacemail-description-text))]"
            text="Protect logins, payments, and customer data with SSL certificates that work seamlessly across The Cloud Aro hosting plans."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            className="rounded-full px-8 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgb(248,250,252)",
              color: "rgb(15,23,42)",
              boxShadow: "0 18px 45px rgba(15,23,42,0.45)",
            }}
          >
            Get SSL protection
          </button>
          <button
            className="rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "rgba(15,23,42,0.6)",
              color: "rgba(226,232,240,1)",
            }}
          >
            Learn how SSL works
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
          className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 text-xs text-slate-300 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left">
            <p className="font-semibold mb-1 text-slate-50">Padlock in the browser</p>
            <p>Instant visual trust with HTTPS and padlock icons for your visitors.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left">
            <p className="font-semibold mb-1 text-slate-50">Strong encryption</p>
            <p>Modern TLS keeps logins, payments, and forms encrypted in transit.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left">
            <p className="font-semibold mb-1 text-slate-50">Better SEO & trust</p>
            <p>Search engines and customers both expect secure, HTTPS-ready sites.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SSLHero;

