"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQvpn = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is a VPN?",
      answer: "A VPN (Virtual Private Network) is a service that creates a secure, encrypted connection between your device and the internet. It routes your internet traffic through a remote server, hiding your IP address and protecting your online activities from prying eyes. VPNs are essential for maintaining privacy, accessing geo-restricted content, and securing your data on public Wi-Fi networks."
    },
    {
      question: "How does a VPN work?",
      answer: "When you connect to a VPN, your device establishes an encrypted tunnel to a VPN server. All your internet traffic is routed through this secure tunnel, making it appear as if you're browsing from the VPN server's location rather than your actual location. This encryption protects your data from hackers, ISPs, and other third parties, while the IP address masking helps maintain your anonymity online."
    },
    {
      question: "Why should I use a VPN?",
      answer: "Using a VPN provides multiple benefits including enhanced privacy and security, the ability to access geo-restricted content, protection on public Wi-Fi networks, and prevention of ISP tracking. VPNs are particularly valuable for remote workers, travelers, and anyone concerned about their online privacy and security."
    },
    {
      question: "Is using a VPN legal?",
      answer: "Yes, using a VPN is legal in most countries around the world. VPNs are legitimate tools for protecting privacy and securing internet connections. However, it's important to note that while VPNs themselves are legal, using them for illegal activities remains illegal. Always ensure you're using a VPN in compliance with local laws and regulations."
    },
    {
      question: "Will a VPN slow down my internet connection?",
      answer: "A high-quality VPN like FastVPN is designed to minimize speed loss. While there may be a slight reduction in speed due to encryption and routing through a remote server, modern VPN technology ensures the impact is minimal. FastVPN's optimized servers and advanced infrastructure are specifically designed to maintain fast connection speeds while providing robust security."
    },
    {
      question: "Is FastVPN compatible with my device?",
      answer: "FastVPN is compatible with a wide range of devices and platforms including Windows, macOS, Linux, iOS, Android, and browser extensions. Our user-friendly apps are designed to work seamlessly across all major operating systems, ensuring you can protect your online activities regardless of the device you're using."
    },
    {
      question: "How many devices can I connect at once?",
      answer: "FastVPN offers unlimited simultaneous connections on privacy servers, allowing you to protect all your devices with a single subscription. Whether you're using a laptop, smartphone, tablet, or smart TV, you can secure all your devices without worrying about connection limits."
    },
    {
      question: "Does FastVPN track my online activities?",
      answer: "No, FastVPN operates under a strict zero-log policy. We do not track, monitor, or store your online activities, browsing history, or connection logs. Your privacy is our top priority, and we're committed to ensuring your online activities remain completely private and anonymous."
    },
    {
      question: "Can I use FastVPN to access geo-restricted content?",
      answer: "Yes, FastVPN allows you to access geo-restricted content by connecting to servers in different countries. Our dedicated streaming servers are optimized for accessing popular streaming platforms like Netflix, Disney+, and more from anywhere in the world. Simply connect to a server in the desired location and enjoy unrestricted access to global content."
    },
    {
      question: "Is the FastVPN app safe?",
      answer: "Absolutely. FastVPN uses military-grade encryption and follows industry-leading security practices to ensure your data and privacy are protected. Our apps are regularly audited, use secure protocols, and include features like Kill Switch protection and DNS leak prevention to keep you safe online."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      style={{ backgroundColor: 'rgb(var(--vpn-section-bg))' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <ContentHeading
            title="Frequently asked questions"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4"
          />
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b"
              style={{ borderColor: 'rgba(var(--vpn-faq-border))' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 
                  className="text-lg md:text-xl font-semibold pr-8 text-left"
                  style={{ color: 'rgb(var(--vpn-faq-question-text))' }}
                >
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    className="w-6 h-6" 
                    style={{ color: 'rgb(var(--vpn-faq-question-text))' }} 
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="pb-6 leading-relaxed text-base md:text-lg text-left"
                      style={{ color: 'rgba(var(--vpn-faq-answer-text))' }}
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQvpn;

