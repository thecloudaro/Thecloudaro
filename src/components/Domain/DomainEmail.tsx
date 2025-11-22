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
      color: "from-[rgb(var(--domain-common-gradient-gray-600))] to-[rgb(var(--domain-common-gradient-gray-700))]",
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
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24" style={{ backgroundColor: 'rgba(var(--domain-common-bg-overlay))' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
            Professional Email for Your Domain
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>
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
              className={`relative backdrop-blur-sm border rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-[hsl(var(--gradient-teal))] scale-105' 
                  : ''
              }`}
              style={{
                backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))',
                borderColor: plan.popular ? 'hsl(var(--gradient-teal))' : 'rgb(var(--domain-common-border-gray-600))'
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[hsl(var(--gradient-teal))] px-4 py-2 rounded-full text-sm font-medium" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8" style={{ color: 'rgb(var(--domain-common-text-white))' }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>{plan.name}</h3>
                <div className="text-4xl font-bold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
                  ${plan.price}
                </div>
                <div style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>{plan.period}</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: 'rgb(var(--domain-common-text-green-400))' }} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor: plan.popular ? 'hsl(var(--gradient-teal))' : 'rgb(var(--domain-common-bg-gray-700))',
                  color: 'rgb(var(--domain-common-text-white))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = plan.popular ? 'hsl(var(--gradient-teal) / 0.8)' : 'rgb(var(--domain-common-bg-gray-600))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = plan.popular ? 'hsl(var(--gradient-teal))' : 'rgb(var(--domain-common-bg-gray-700))';
                }}
              >
                Choose {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Email Features */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
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
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="backdrop-blur-sm border rounded-xl p-8" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))', borderColor: 'rgb(var(--domain-common-border-gray-600))' }}>
            <h4 className="text-xl font-semibold mb-6 text-center" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
              What&apos;s Included with Email Hosting
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emailBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                  <div className="w-2 h-2 bg-[hsl(var(--gradient-teal))] rounded-full mr-3"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
            Professional Email Examples
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-sm border rounded-lg p-6 text-center" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))', borderColor: 'rgb(var(--domain-common-border-gray-600))' }}>
              <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--gradient-teal))' }} />
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>Business Email</h4>
              <p className="text-sm mb-4" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>info@yourdomain.com</p>
              <p className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>Perfect for general inquiries</p>
            </div>
            
            <div className="backdrop-blur-sm border rounded-lg p-6 text-center" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))', borderColor: 'rgb(var(--domain-common-border-gray-600))' }}>
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--gradient-teal))' }} />
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>Support Email</h4>
              <p className="text-sm mb-4" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>support@yourdomain.com</p>
              <p className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>Customer support inquiries</p>
            </div>
            
            <div className="backdrop-blur-sm border rounded-lg p-6 text-center" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))', borderColor: 'rgb(var(--domain-common-border-gray-600))' }}>
              <Laptop className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--gradient-teal))' }} />
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>Sales Email</h4>
              <p className="text-sm mb-4" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>sales@yourdomain.com</p>
              <p className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>Sales and business inquiries</p>
            </div>
          </div>
        </div>

        {/* Bundle Offer */}
        <div className="bg-gradient-to-r from-[hsl(var(--gradient-teal))]/20 to-[hsl(var(--gradient-dark-teal))]/20 border border-[hsl(var(--gradient-teal))]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
            Complete Domain Package
          </h3>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>
            Get your domain, hosting, and email all in one package. 
            Save money and simplify your setup with our complete solution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))' }}>
              <div className="text-2xl font-bold mb-2" style={{ color: 'hsl(var(--gradient-teal))' }}>
                Domain
              </div>
              <div className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                Professional domain name
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))' }}>
              <div className="text-2xl font-bold mb-2" style={{ color: 'hsl(var(--gradient-teal))' }}>
                Hosting
              </div>
              <div className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                Reliable web hosting
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))' }}>
              <div className="text-2xl font-bold mb-2" style={{ color: 'hsl(var(--gradient-teal))' }}>
                Email
              </div>
              <div className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                Professional email accounts
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 inline-flex items-center"
            style={{
              backgroundColor: 'hsl(var(--gradient-teal))',
              color: 'rgb(var(--domain-common-text-white))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--gradient-teal) / 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--gradient-teal))';
            }}
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
