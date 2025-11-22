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
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24" style={{ backgroundColor: 'rgba(var(--domain-common-bg-overlay))' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
            Transfer Your Domain
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>
            Move your existing domain to us and enjoy better management, security, and support. 
            Transfer process is simple, secure, and free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Transfer Form */}
          <div className="backdrop-blur-sm border rounded-2xl p-8" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-30))', borderColor: 'rgb(var(--domain-common-border-gray-600))' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
              Start Domain Transfer
            </h3>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {transferSteps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: transferStep >= step.step ? 'hsl(var(--gradient-teal))' : 'rgb(var(--domain-common-bg-gray-600))',
                      color: transferStep >= step.step ? 'rgb(var(--domain-common-text-white))' : 'rgb(var(--domain-common-text-gray-300))'
                    }}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium" style={{ color: transferStep >= step.step ? 'rgb(var(--domain-common-text-white))' : 'rgb(var(--domain-common-text-gray-400))' }}>
                      {step.title}
                    </div>
                    <div className="text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-500))' }}>
                      {step.description}
                    </div>
                  </div>
                  {index < transferSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 mx-4" style={{ color: 'rgb(var(--domain-common-text-gray-500))' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Transfer Form */}
            {transferStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 placeholder:text-[rgb(var(--domain-common-text-gray-400))]"
                    style={{
                      backgroundColor: 'rgba(var(--domain-common-bg-gray-700-50))',
                      borderColor: 'rgb(var(--domain-common-border-gray-600))',
                      color: 'rgb(var(--domain-common-text-white))'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'hsl(var(--gradient-teal))';
                      e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--gradient-teal) / 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--domain-common-border-gray-600))';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                    Authorization Code (EPP Code)
                  </label>
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="Enter your domain's auth code"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 placeholder:text-[rgb(var(--domain-common-text-gray-400))]"
                    style={{
                      backgroundColor: 'rgba(var(--domain-common-bg-gray-700-50))',
                      borderColor: 'rgb(var(--domain-common-border-gray-600))',
                      color: 'rgb(var(--domain-common-text-white))'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'hsl(var(--gradient-teal))';
                      e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--gradient-teal) / 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--domain-common-border-gray-600))';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <p className="text-sm mt-2" style={{ color: 'rgb(var(--domain-common-text-gray-500))' }}>
                    You can get this code from your current domain registrar
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTransfer}
                  disabled={!domainName || !authCode || isTransferring}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-all duration-300"
                  style={{
                    backgroundColor: 'hsl(var(--gradient-teal))',
                    color: 'rgb(var(--domain-common-text-white))'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--gradient-teal) / 0.8)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--gradient-teal))';
                    }
                  }}
                >
                  {isTransferring ? "Processing..." : "Start Transfer"}
                </motion.button>
              </div>
            )}

            {transferStep === 2 && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgb(var(--domain-common-text-green-400))' }} />
                <h4 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
                  Transfer Initiated Successfully!
                </h4>
                <p className="mb-6" style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>
                  We&apos;ve started the transfer process. You&apos;ll receive email updates about the progress.
                </p>
                <div className="rounded-lg p-4 text-left" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-700-50))' }}>
                  <h5 className="font-semibold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>Next Steps:</h5>
                  <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
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
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
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
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
                        {benefit.title}
                      </h4>
                      <p style={{ color: 'rgb(var(--domain-common-text-gray-400))' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Transfer Info */}
            <div className="backdrop-blur-sm border rounded-xl p-6" style={{ backgroundColor: 'rgba(var(--domain-common-bg-gray-800-20))', borderColor: 'rgb(var(--domain-common-border-gray-600))' }}>
              <div className="flex items-start mb-4">
                <Info className="w-5 h-5 mr-3 mt-1 flex-shrink-0" style={{ color: 'rgb(var(--domain-common-text-blue-400))' }} />
                <h4 className="text-lg font-semibold" style={{ color: 'rgb(var(--domain-common-text-white))' }}>
                  Transfer Information
                </h4>
              </div>
              <div className="space-y-3 text-sm" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="font-medium" style={{ color: 'rgb(var(--domain-common-text-green-400))' }}>FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>5-7 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Downtime:</span>
                  <span style={{ color: 'rgb(var(--domain-common-text-green-400))' }}>None</span>
                </div>
                <div className="flex justify-between">
                  <span>Support:</span>
                  <span>24/7 assistance</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="border rounded-xl p-6" style={{ backgroundColor: 'rgba(var(--domain-common-bg-yellow-900-20))', borderColor: 'rgba(var(--domain-common-border-yellow-600-30))' }}>
              <div className="flex items-start mb-3">
                <AlertCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" style={{ color: 'rgb(var(--domain-common-text-yellow-400))' }} />
                <h4 className="text-lg font-semibold" style={{ color: 'rgb(var(--domain-common-text-yellow-400))' }}>
                  Important Notes
                </h4>
              </div>
              <ul className="text-sm space-y-2" style={{ color: 'rgb(var(--domain-common-text-gray-300))' }}>
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
