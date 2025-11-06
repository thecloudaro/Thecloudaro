"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Clock, 
  Zap, 
  Lock,
  AlertCircle,
  Info
} from "lucide-react";

const DomainTransfer = () => {
  const [transferStep, setTransferStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const transferSteps = [
    {
      step: 1,
      title: "Enter Domain",
      description: "Provide your domain name and authorization code",
      icon: Shield
    },
    {
      step: 2,
      title: "Verify Details",
      description: "We'll verify your domain ownership and transfer eligibility",
      icon: CheckCircle
    },
    {
      step: 3,
      title: "Transfer Complete",
      description: "Your domain will be transferred within 5-7 days",
      icon: Zap
    }
  ];

  const transferBenefits = [
    {
      icon: Shield,
      title: "Secure Transfer",
      description: "Your domain is protected throughout the entire transfer process"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Most transfers complete within 5-7 business days"
    },
    {
      icon: Lock,
      title: "No Downtime",
      description: "Your website stays online during the transfer process"
    }
  ];

  const handleTransfer = () => {
    if (!domainName || !authCode) return;
    
    setIsTransferring(true);
    // Simulate transfer process
    setTimeout(() => {
      setIsTransferring(false);
      setTransferStep(2);
    }, 2000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Transfer Your Domain
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Move your existing domain to us and enjoy better management, security, and support. 
            Transfer process is simple, secure, and free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Transfer Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Start Domain Transfer
            </h3>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {transferSteps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transferStep >= step.step 
                      ? 'bg-[hsl(var(--gradient-teal))] text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <div className={`font-medium ${
                      transferStep >= step.step ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {step.description}
                    </div>
                  </div>
                  {index < transferSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-500 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Transfer Form */}
            {transferStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[hsl(var(--gradient-teal))] focus:ring-2 focus:ring-[hsl(var(--gradient-teal))]/20 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Authorization Code (EPP Code)
                  </label>
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="Enter your domain's auth code"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[hsl(var(--gradient-teal))] focus:ring-2 focus:ring-[hsl(var(--gradient-teal))]/20 transition-all duration-300"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    You can get this code from your current domain registrar
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTransfer}
                  disabled={!domainName || !authCode || isTransferring}
                  className="w-full bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-300"
                >
                  {isTransferring ? "Processing..." : "Start Transfer"}
                </motion.button>
              </div>
            )}

            {transferStep === 2 && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">
                  Transfer Initiated Successfully!
                </h4>
                <p className="text-gray-400 mb-6">
                  We&apos;ve started the transfer process. You&apos;ll receive email updates about the progress.
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4 text-left">
                  <h5 className="font-semibold text-white mb-2">Next Steps:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Check your email for transfer confirmation</li>
                    <li>• Approve the transfer when prompted</li>
                    <li>• Transfer will complete in 5-7 days</li>
                    <li>• Your website will remain online</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Benefits & Info */}
          <div className="space-y-8">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Transfer to Us?
              </h3>
              <div className="space-y-6">
                {transferBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-[hsl(var(--gradient-teal))]/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[hsl(var(--gradient-teal))]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Transfer Info */}
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <Info className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-white">
                  Transfer Information
                </h4>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="text-green-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>5-7 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Downtime:</span>
                  <span className="text-green-400">None</span>
                </div>
                <div className="flex justify-between">
                  <span>Support:</span>
                  <span>24/7 assistance</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-yellow-400">
                  Important Notes
                </h4>
              </div>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Domain must be unlocked at current registrar</li>
                <li>• Privacy protection must be disabled</li>
                <li>• Domain must be older than 60 days</li>
                <li>• No pending transfers or disputes</li>
                <li>• Valid authorization code required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainTransfer;
