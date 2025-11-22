"use client";

import { motion } from "framer-motion";
import { Globe, RefreshCw, SlidersHorizontal, Square } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Reliability = () => {
  const features = [
    {
      icon: Globe,
      title: "Secure global network",
      description: "Protect your site from cyber attacks\nlike DDoS and SQL injections with\nSupersonic CDN's worldwide\nnetwork of secure servers.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: RefreshCw,
      title: "Fast caching",
      description: "Prevent service interruption and\naccelerate streaming and media\ndelivery capabilities, including\nvideo, music, and images.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: SlidersHorizontal,
      title: "Handy management tools",
      description: "Easily manage everything with\nfeatures like static and dynamic\ncache options, instant file purge,\nand whitelist/blacklist tools.",
      color: "from-blue-500 to-teal-500"
    },
    {
      icon: Square,
      title: "SSL and CMS integration",
      description: "Use it with any Content\nManagement System and enjoy the\noption of adding custom SSL\ncertificates to enhance security in\nmoments.",
      color: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--cdn-section-bg))' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-20 sm:mb-24 md:mb-28 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 sm:gap-8"
          >
            {/* Heading */}
            <ContentHeading 
              title="Reliability you can<br/>count on"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold"
            />

            {/* Description */}
            <ContentDescription 
              text="Everything you need to keep your site available and secure."
              size="lg"
              className="max-w-3xl text-white"
            />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col text-center items-center"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-7 h-7" style={{ color: 'rgb(var(--cdn-reliability-icon-text))' }} />
              </div>

              {/* Title */}
              <h3 
                className="text-xl sm:text-2xl font-bold mb-3 text-center"
                style={{ color: 'rgb(var(--cdn-reliability-title-text))' }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p 
                className="text-lg leading-relaxed text-center"
                style={{ color: 'rgba(var(--cdn-reliability-description-text))' }}
              >
                {feature.description.split('\n').map((line, lineIndex, arr) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex !== arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reliability;

