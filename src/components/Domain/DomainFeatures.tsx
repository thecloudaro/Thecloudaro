"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Mail, 
  Settings, 
  BarChart3, 
  Smartphone,
  Cloud,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";

const DomainFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Protect your domain with enterprise-grade security features including DNSSEC, domain locking, and fraud protection.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast DNS",
      description: "Global DNS network with sub-second response times across 200+ locations worldwide.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Global Availability",
      description: "Register domains in over 200 countries with local support and compliance.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Keep your personal information private with our free WHOIS privacy protection service.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Mail,
      title: "Email Forwarding",
      description: "Forward emails from your domain to any email address with unlimited forwarding rules.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Settings,
      title: "Easy Management",
      description: "Intuitive control panel for managing DNS, subdomains, and domain settings.",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your domain performance with detailed analytics and traffic insights.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage your domains on the go with our feature-rich mobile application.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamlessly integrate with popular cloud services and hosting providers.",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const benefits = [
    "99.9% Uptime Guarantee",
    "24/7 Customer Support",
    "Free SSL Certificates",
    "Auto-renewal Protection",
    "Domain Transfer Service",
    "Bulk Domain Management"
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Domain Features
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Everything you need to manage your domains professionally with enterprise-grade features and tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-6 hover:border-[hsl(var(--gradient-teal))]/50 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Why Choose Our Domain Services?
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We provide comprehensive domain management solutions with industry-leading features, 
                security, and support to help you succeed online.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[hsl(var(--gradient-teal))]/20 to-[hsl(var(--gradient-dark-teal))]/20 rounded-2xl p-8 border border-[hsl(var(--gradient-teal))]/30">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[hsl(var(--gradient-teal))] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Trusted by Millions
                  </h4>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                        10M+
                      </div>
                      <div className="text-gray-400 text-sm">
                        Domains Managed
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                        99.9%
                      </div>
                      <div className="text-gray-400 text-sm">
                        Uptime Guarantee
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-[hsl(var(--gradient-bright-green))]/60 rounded-full flex items-center justify-center"
              >
                <Clock className="w-4 h-4 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-[hsl(var(--gradient-turquoise))]/60 rounded-full flex items-center justify-center"
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DomainFeatures;
