"use client";

import { motion } from "framer-motion";
import { 
  Server, 
  Zap, 
  Shield, 
  Globe, 
  Database, 
  Cpu, 
  HardDrive,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const DomainHosting = () => {
  const hostingPlans = [
    {
      name: "Starter",
      price: 2.99,
      period: "per month",
      features: [
        "1 Website",
        "10 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "24/7 Support",
        "99.9% Uptime"
      ],
      icon: Server,
      color: "from-gray-600 to-gray-700",
      popular: false
    },
    {
      name: "Professional",
      price: 5.99,
      period: "per month",
      features: [
        "Unlimited Websites",
        "50 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Free Domain",
        "24/7 Priority Support",
        "99.9% Uptime",
        "Daily Backups"
      ],
      icon: Zap,
      color: "from-[hsl(var(--gradient-teal))] to-[hsl(var(--gradient-dark-teal))]",
      popular: true
    },
    {
      name: "Business",
      price: 9.99,
      period: "per month",
      features: [
        "Unlimited Websites",
        "100 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Free Domain",
        "24/7 Priority Support",
        "99.9% Uptime",
        "Daily Backups",
        "Staging Environment",
        "Advanced Security"
      ],
      icon: Shield,
      color: "from-[hsl(var(--gradient-bright-green))] to-[hsl(var(--gradient-teal))]",
      popular: false
    }
  ];

  const hostingFeatures = [
    {
      icon: Globe,
      title: "Global CDN",
      description: "Fast loading times worldwide with our global content delivery network"
    },
    {
      icon: Database,
      title: "MySQL Databases",
      description: "Unlimited MySQL databases for your applications"
    },
    {
      icon: Cpu,
      title: "High Performance",
      description: "SSD storage and optimized servers for maximum speed"
    },
    {
      icon: HardDrive,
      title: "Easy Management",
      description: "User-friendly control panel for managing your hosting"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Complete Your Domain with Web Hosting
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Get your domain online with our reliable web hosting services. 
            Fast, secure, and affordable hosting solutions for every need.
          </p>
        </div>

        {/* Hosting Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {hostingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-800/30 backdrop-blur-sm border rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-[hsl(var(--gradient-teal))] scale-105' 
                  : 'border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[hsl(var(--gradient-teal))] text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ${plan.price}
                </div>
                <div className="text-gray-400">{plan.period}</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                Choose {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Hosting Features */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Why Choose Our Hosting?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hostingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[hsl(var(--gradient-teal))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[hsl(var(--gradient-teal))]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bundle Offer */}
        <div className="bg-gradient-to-r from-[hsl(var(--gradient-teal))]/20 to-[hsl(var(--gradient-dark-teal))]/20 border border-[hsl(var(--gradient-teal))]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Domain + Hosting Bundle
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get your domain and hosting together and save up to 50% on your first year. 
            Perfect for getting your website online quickly and affordably.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                Save 50%
              </div>
              <div className="text-gray-300 text-sm">
                On your first year
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                Free Domain
              </div>
              <div className="text-gray-300 text-sm">
                With hosting plans
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                24/7 Support
              </div>
              <div className="text-gray-300 text-sm">
                Expert assistance
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 inline-flex items-center"
          >
            Get Domain + Hosting Bundle
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DomainHosting;
