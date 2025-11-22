"use client";

import { motion } from "framer-motion";
import { Circle, Shield, User } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

const HowItWork = () => {
  const steps = [
    {
      icon: Circle,
      title: "Register a domain",
      description: "Start your online story by searching for a domain name, and registering it."
    },
    {
      icon: Shield,
      title: "Free protection",
      description: "Privacy protection service Withheld for Privacy automatically hides your details."
    },
    {
      icon: User,
      title: "Stay anonymous",
      description: "Anyone that searches for your domain on WHOIS will see anonymized information."
    }
  ];

  return (
    <section 
      className="py-24 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--domain-name-privacy-private-bg))' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <ContentHeading 
            title="How it works"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div 
                  className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--domain-name-privacy-hero-description)) 0%, hsl(var(--domain-name-privacy-hero-description)) / 0.3 100%)`
                  }}
                >
                  <step.icon 
                    className="w-8 h-8 sm:w-10 sm:h-10" 
                    style={{ color: 'hsl(var(--domain-name-privacy-hero-description))' }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{ color: 'rgb(var(--domain-name-privacy-text-white))' }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p 
                className="text-sm sm:text-base"
                style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }}
              >
                {step.description.includes('Withheld for Privacy') ? (
                  <>
                    Privacy protection service{' '}
                    <span 
                      className="underline"
                      style={{ color: 'hsl(var(--domain-name-privacy-link-blue))' }}
                    >
                      Withheld for Privacy
                    </span>
                    {' '}automatically hides your details.
                  </>
                ) : (
                  step.description
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;

