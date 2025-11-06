"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap, Shield, Globe } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const DomainPricing = () => {
  const pricingTiers = [
    {
      name: "Basic",
      price: 12.99,
      period: "per year",
      popular: false,
      features: [
        "Domain registration",
        "DNS management",
        "Email forwarding",
        "Basic support",
        "SSL certificate"
      ],
      icon: Globe,
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "Professional",
      price: 24.99,
      period: "per year",
      popular: true,
      features: [
        "Everything in Basic",
        "Advanced DNS",
        "Domain privacy protection",
        "Priority support",
        "Auto-renewal",
        "Domain locking",
        "Transfer protection"
      ],
      icon: Shield,
      color: "from-[hsl(var(--gradient-teal))] to-[hsl(var(--gradient-dark-teal))]"
    },
    {
      name: "Premium",
      price: 49.99,
      period: "per year",
      popular: false,
      features: [
        "Everything in Professional",
        "Premium DNS",
        "Advanced security",
        "24/7 phone support",
        "Domain monitoring",
        "Backup & restore",
        "Custom DNS records",
        "API access"
      ],
      icon: Zap,
      color: "from-[hsl(var(--gradient-bright-green))] to-[hsl(var(--gradient-teal))]"
    }
  ];

  const domainExtensions = [
    { extension: ".com", price: 12.99, description: "Most popular", popular: true },
    { extension: ".net", price: 15.99, description: "Network focused" },
    { extension: ".org", price: 18.99, description: "Organizations" },
    { extension: ".io", price: 45.99, description: "Tech startups", popular: true },
    { extension: ".co", price: 25.99, description: "Companies" },
    { extension: ".app", price: 20.99, description: "Applications" },
    { extension: ".dev", price: 15.99, description: "Developers" },
    { extension: ".blog", price: 8.99, description: "Blogging" },
    { extension: ".shop", price: 25.99, description: "E-commerce" },
    { extension: ".tech", price: 35.99, description: "Technology" },
    { extension: ".ai", price: 89.99, description: "Artificial Intelligence", popular: true },
    { extension: ".xyz", price: 1.99, description: "Creative" }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            heading="Transparent Domain Pricing"
            description="No hidden fees, no surprises. Choose the perfect plan for your domain needs with our competitive pricing."
            headingTag="h2"
            headingClassName="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            descriptionClassName="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto"
          />
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-800/30 backdrop-blur-sm border rounded-2xl p-8 ${
                tier.popular 
                  ? 'border-[hsl(var(--gradient-teal))] scale-105' 
                  : 'border-gray-600'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[hsl(var(--gradient-teal))] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ${tier.price}
                </div>
                <div className="text-gray-400">{tier.period}</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  tier.popular
                    ? 'bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                Choose {tier.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Domain Extensions */}
        <div className="mb-12">
          <SectionHeading
            heading="Domain Extensions & Pricing"
            description="Choose from hundreds of domain extensions at competitive prices"
            headingTag="h3"
            headingClassName="text-2xl sm:text-3xl font-bold text-white mb-6"
            descriptionClassName="text-gray-400 text-lg max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {domainExtensions.map((domain, index) => (
            <motion.div
              key={domain.extension}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-gray-800/30 backdrop-blur-sm border rounded-lg p-4 text-center hover:border-[hsl(var(--gradient-teal))]/50 transition-all duration-300 ${
                domain.popular ? 'border-[hsl(var(--gradient-teal))]/50' : 'border-gray-600'
              }`}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {domain.extension}
              </div>
              <div className="text-lg font-semibold text-[hsl(var(--gradient-teal))] mb-1">
                ${domain.price}
              </div>
              <div className="text-sm text-gray-400 mb-2">
                {domain.description}
              </div>
              {domain.popular && (
                <div className="flex items-center justify-center text-yellow-400 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h4 className="text-xl font-bold text-white mb-4">
              Why Choose Our Domain Services?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-[hsl(var(--gradient-teal))] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-white mb-2">Secure & Reliable</h5>
                  <p className="text-gray-400 text-sm">
                    Industry-leading security with 99.9% uptime guarantee
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-[hsl(var(--gradient-teal))] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-white mb-2">Fast Setup</h5>
                  <p className="text-gray-400 text-sm">
                    Get your domain up and running in minutes, not hours
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-[hsl(var(--gradient-teal))] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-white mb-2">Global Support</h5>
                  <p className="text-gray-400 text-sm">
                    24/7 customer support in multiple languages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainPricing;
