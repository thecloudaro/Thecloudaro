"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, User } from "lucide-react";

const DomainPrivacy = () => {
  const privacyFeatures = [
    {
      icon: Eye,
      title: "Hide Personal Information",
      description: "Keep your contact details private from public WHOIS databases"
    },
    {
      icon: Lock,
      title: "Protect Against Spam",
      description: "Reduce unwanted emails and phone calls from marketers"
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Prevent identity theft and domain hijacking attempts"
    },
    {
      icon: User,
      title: "Professional Appearance",
      description: "Maintain a professional image with proxy contact information"
    }
  ];

  const privacyBenefits = [
    "Free WHOIS privacy protection",
    "Proxy contact information",
    "Spam reduction",
    "Identity protection",
    "Professional appearance",
    "Easy to enable/disable"
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Domain Privacy Protection
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Keep your personal information private and protect yourself from spam, 
            identity theft, and unwanted solicitations with our free WHOIS privacy protection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Why You Need Domain Privacy Protection
            </h3>
            
            <div className="space-y-6">
              {privacyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-[hsl(var(--gradient-teal))]/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[hsl(var(--gradient-teal))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Benefits & Info */}
          <div className="space-y-8">
            {/* Benefits List */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-4">
                What&apos;s Included
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {privacyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-[hsl(var(--gradient-teal))] rounded-full mr-3"></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Comparison */}
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-4">
                With vs Without Privacy Protection
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-red-400 mr-3" />
                    <span className="text-gray-300">Without Protection</span>
                  </div>
                  <span className="text-red-400 text-sm">Public Information</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">With Protection</span>
                  </div>
                  <span className="text-green-400 text-sm">Private Information</span>
                </div>
              </div>
            </div>

            {/* Contact Info Example */}
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-white mb-4">
                Your Information is Protected
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-gray-300">Proxy Contact</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-gray-300">proxy@privacy.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-gray-300">+1.555.PROXY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="text-gray-300">Proxy Address</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[hsl(var(--gradient-teal))]/20 to-[hsl(var(--gradient-dark-teal))]/20 border border-[hsl(var(--gradient-teal))]/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Free Privacy Protection Included
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              All our domain registrations come with free WHOIS privacy protection. 
              No additional cost, no hidden fees.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
            >
              Register Your Domain Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainPrivacy;
