"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

const FAQSecurity = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Why is website security so important?",
      answer: "Website security is crucial because it protects your business, customers, and reputation from cyber threats like data breaches, malware attacks, and unauthorized access. A secure website builds trust with your visitors, protects sensitive information, and ensures your business operations run smoothly without interruptions."
    },
    {
      question: "What is the point of domain privacy?",
      answer: "Domain privacy protects your personal information from being publicly visible in WHOIS databases. Without domain privacy, your name, address, email, and phone number are accessible to anyone, which can lead to spam, identity theft, and unwanted solicitations. Domain privacy keeps your contact details private and secure."
    },
    {
      question: "How secure are your Web Hosting plans?",
      answer: "Our Web Hosting plans include multiple layers of security including free SSL certificates, firewall protection, virus and malware monitoring, regular security updates, and automated backups. We use enterprise-grade security measures to protect your website 24/7, ensuring your data and your visitors' information stays safe."
    },
    {
      question: "What is encryption?",
      answer: "Encryption is the process of converting data into a coded format that can only be accessed with a specific key or password. It protects your information from being read by unauthorized parties. When data is encrypted, even if someone intercepts it, they cannot understand it without the decryption key."
    },
    {
      question: "Do I really need an SSL certificate?",
      answer: "Yes, an SSL certificate is essential for any website. It encrypts the connection between your website and visitors' browsers, protecting sensitive data like passwords, credit card information, and personal details. SSL certificates also improve your search engine rankings and display a padlock icon in browsers, building trust with your visitors."
    },
    {
      question: "How does DNSSEC protect my domain?",
      answer: "DNSSEC (Domain Name System Security Extensions) adds an extra layer of security to your DNS by using cryptographic signatures to verify that DNS responses are authentic and haven't been tampered with. This prevents attackers from redirecting your visitors to malicious websites by spoofing your domain's DNS records."
    },
    {
      question: "What is two-factor authentication and why should I use it?",
      answer: "Two-factor authentication (2FA) adds an additional security layer to your accounts by requiring both your password and a second verification method, such as a code sent to your phone. This significantly reduces the risk of unauthorized access even if someone obtains your password. It's one of the most effective ways to protect your accounts from hackers."
    }
  ];

  return (
    <section 
      className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--security-faq-bg))' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <ContentHeading
            title="Frequently asked questions"
            className="text-4xl sm:text-5xl md:text-6xl !text-[rgb(var(--security-faq-heading-text))]"
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
              style={{ borderColor: 'rgba(var(--security-faq-border))' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 
                  className="text-lg md:text-xl font-semibold pr-8"
                  style={{ color: 'rgb(var(--security-faq-question-text))' }}
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
                    style={{ color: 'rgb(var(--security-faq-question-text))' }} 
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
                    <div 
                      className="pb-6 text-base md:text-lg"
                      style={{ color: 'rgba(var(--security-faq-answer-text))' }}
                    >
                      {faq.answer}
                    </div>
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

export default FAQSecurity;

