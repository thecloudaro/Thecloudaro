"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Laptop
} from "lucide-react";

const DomainEmail = () => {
  const emailPlans = [
    {
      name: "Basic",
      price: 1.99,
      period: "per month",
      features: [
        "1 Email Account",
        "5 GB Storage",
        "Webmail Access",
        "Mobile Sync",
        "Spam Protection",
        "Email Forwarding"
      ],
      icon: Mail,
      color: "from-gray-600 to-gray-700",
      popular: false
    },
    {
      name: "Professional",
      price: 3.99,
      period: "per month",
      features: [
        "5 Email Accounts",
        "25 GB Storage",
        "Webmail Access",
        "Mobile Sync",
        "Advanced Spam Protection",
        "Email Forwarding",
        "Calendar & Contacts",
        "IMAP/POP3 Support"
      ],
      icon: Shield,
      color: "from-[hsl(var(--gradient-teal))] to-[hsl(var(--gradient-dark-teal))]",
      popular: true
    },
    {
      name: "Business",
      price: 7.99,
      period: "per month",
      features: [
        "Unlimited Email Accounts",
        "100 GB Storage",
        "Webmail Access",
        "Mobile Sync",
        "Enterprise Spam Protection",
        "Email Forwarding",
        "Calendar & Contacts",
        "IMAP/POP3 Support",
        "Email Archiving",
        "Advanced Security"
      ],
      icon: Zap,
      color: "from-[hsl(var(--gradient-bright-green))] to-[hsl(var(--gradient-teal))]",
      popular: false
    }
  ];

  const emailFeatures = [
    {
      icon: Globe,
      title: "Professional Email",
      description: "Use your domain name for professional email addresses"
    },
    {
      icon: Smartphone,
      title: "Mobile Sync",
      description: "Access your email on any device with full synchronization"
    },
    {
      icon: Shield,
      title: "Spam Protection",
      description: "Advanced spam filtering to keep your inbox clean"
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Built-in calendar and contact management"
    }
  ];

  const emailBenefits = [
    "Professional email addresses",
    "Reliable email delivery",
    "Mobile device sync",
    "Spam and virus protection",
    "Webmail interface",
    "Email forwarding",
    "Calendar integration",
    "Contact management"
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Professional Email for Your Domain
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Get professional email addresses with your domain name. 
            Reliable, secure, and feature-rich email hosting for your business.
          </p>
        </div>

        {/* Email Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {emailPlans.map((plan, index) => (
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

        {/* Email Features */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Email Features & Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {emailFeatures.map((feature, index) => (
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

          {/* Benefits Grid */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-8">
            <h4 className="text-xl font-semibold text-white mb-6 text-center">
              What&apos;s Included with Email Hosting
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emailBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-[hsl(var(--gradient-teal))] rounded-full mr-3"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Professional Email Examples
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-6 text-center">
              <Mail className="w-12 h-12 text-[hsl(var(--gradient-teal))] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Business Email</h4>
              <p className="text-gray-400 text-sm mb-4">info@yourdomain.com</p>
              <p className="text-gray-300 text-sm">Perfect for general inquiries</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-[hsl(var(--gradient-teal))] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Support Email</h4>
              <p className="text-gray-400 text-sm mb-4">support@yourdomain.com</p>
              <p className="text-gray-300 text-sm">Customer support inquiries</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-6 text-center">
              <Laptop className="w-12 h-12 text-[hsl(var(--gradient-teal))] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Sales Email</h4>
              <p className="text-gray-400 text-sm mb-4">sales@yourdomain.com</p>
              <p className="text-gray-300 text-sm">Sales and business inquiries</p>
            </div>
          </div>
        </div>

        {/* Bundle Offer */}
        <div className="bg-gradient-to-r from-[hsl(var(--gradient-teal))]/20 to-[hsl(var(--gradient-dark-teal))]/20 border border-[hsl(var(--gradient-teal))]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Complete Domain Package
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get your domain, hosting, and email all in one package. 
            Save money and simplify your setup with our complete solution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                Domain
              </div>
              <div className="text-gray-300 text-sm">
                Professional domain name
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                Hosting
              </div>
              <div className="text-gray-300 text-sm">
                Reliable web hosting
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-[hsl(var(--gradient-teal))] mb-2">
                Email
              </div>
              <div className="text-gray-300 text-sm">
                Professional email accounts
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 inline-flex items-center"
          >
            Get Complete Package
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DomainEmail;
