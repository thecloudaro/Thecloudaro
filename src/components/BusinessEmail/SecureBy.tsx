"use client";

import { Lock, Shield, FileText, Mail, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

interface SecurityFeature {
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  title: string;
  description: string | React.ReactNode;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: Lock,
    title: "Password protected emails",
    description: "Lock your most sensitive emails with a <br/>password so only the intended recipient can open them."
  },
  {
    icon: Lock,
    title: "No unauthorized access",
    description: "With Two-Factor Authentication (2FA) as standard, you choose the level of security you want."
  },
  {
    icon: FileText,
    title: "Threat monitoring",
    description: "Spot unusual activity right away with easy-to-use activity logs that track logins and sessions."
  },
  {
    icon: Shield,
    title: "Identity protection",
    description: "Go incognito with alias email addresses that can conceal your identity and keep your inbox tidy."
  },
  {
    icon: Mail,
    title: "Flexible IMAP/SMTP/POP3",
    description: "Email protocols are switched on, for convenience, but can be disabled for additional security."
  },
  {
    icon: EyeOff,
    title: "Protection from tracking",
    description: "Automatic tracking link removal ensures your activity isn't reported to the sender, without sacrificing functionality."
  }
];

const SecureBy = () => {
  return (
    <section className="py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="space-y-6 text-center mb-16">
          <ContentHeading
            title="Secure by default"
            className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-7xl font-bold"
          />

          <ContentDescription
            size="xl"
            className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto"
          >
            All-inclusive security that takes care of everything behind the scenes.
          </ContentDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-24 h-24 flex items-center justify-center" style={{ color: 'rgb(var(--business-choose-popular-badge))' }}>
                  <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[rgb(var(--hosting-text-white))]">
                  {feature.title}
                </h3>
                <p className="text-xl max-w-sm" style={{ color: 'rgba(var(--business-productivity-text-white-70))' }}>
                  {typeof feature.description === 'string' 
                    ? feature.description.split('<br/>').map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))
                    : feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecureBy;

