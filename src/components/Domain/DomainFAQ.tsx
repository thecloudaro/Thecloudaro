"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const DomainFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I register a domain name?",
      answer: "To register a domain, simply search for your desired domain name using our search tool. If it's available, you can add it to your cart and complete the registration process. You'll need to provide contact information and choose a registration period (1-10 years)."
    },
    {
      question: "What is the difference between .com, .net, and .org?",
      answer: ".com domains are the most popular and suitable for commercial websites. .net domains are often used for network-related services. .org domains are typically used by non-profit organizations. All three are generic top-level domains (gTLDs) and can be used by anyone."
    },
    {
      question: "How long does domain registration take?",
      answer: "Domain registration is typically instant once payment is processed. However, it may take up to 24-48 hours for the domain to be fully active and accessible worldwide due to DNS propagation."
    },
    {
      question: "Can I transfer my domain to another registrar?",
      answer: "Yes, you can transfer your domain to another registrar. The process involves unlocking your domain, obtaining an authorization code, and initiating the transfer with the new registrar. Transfers usually take 5-7 days to complete."
    },
    {
      question: "What is domain privacy protection?",
      answer: "Domain privacy protection (also called WHOIS privacy) hides your personal contact information from public WHOIS databases. Instead of showing your real contact details, it shows proxy information to protect your privacy and reduce spam."
    },
    {
      question: "How much does domain registration cost?",
      answer: "Domain registration costs vary by extension. .com domains typically cost around $12-15 per year, while premium extensions like .io can cost $40-50 per year. We offer competitive pricing with no hidden fees."
    },
    {
      question: "Can I change my domain name after registration?",
      answer: "No, you cannot change a domain name after registration. Domain names are unique identifiers and cannot be modified. If you need a different name, you would need to register a new domain."
    },
    {
      question: "What happens if I don't renew my domain?",
      answer: "If you don't renew your domain before it expires, it will enter a grace period (usually 30 days) where you can still renew it. After the grace period, it enters a redemption period where renewal costs more. If not renewed, the domain becomes available for public registration."
    },
    {
      question: "Do I need web hosting to register a domain?",
      answer: "No, domain registration and web hosting are separate services. You can register a domain without hosting and use it for email forwarding or park it for later use. However, to have a website, you'll need both a domain and web hosting."
    },
    {
      question: "Can I register multiple domains?",
      answer: "Yes, you can register as many domains as you want. Many businesses register multiple extensions (.com, .net, .org) of their domain name to protect their brand and prevent competitors from using similar names."
    },
    {
      question: "What is DNS and why do I need it?",
      answer: "DNS (Domain Name System) translates domain names into IP addresses so browsers can load websites. When you register a domain, you'll need to configure DNS settings to point your domain to your web hosting or other services."
    },
    {
      question: "How do I contact support for domain issues?",
      answer: "You can contact our support team 24/7 through live chat, email, or phone. We provide comprehensive support for all domain-related issues including registration, transfers, DNS configuration, and technical problems."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'rgb(var(--domain-faq-bg))' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4" style={{ color: 'rgb(var(--domain-faq-heading))' }}>
  We are here to help!
</h2>


          <p className="text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: 'rgb(var(--domain-faq-description))' }}>
            Frequently asked question
          </p>
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
              style={{ borderColor: 'rgb(var(--domain-faq-border))' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg md:text-xl font-semibold pr-8" style={{ color: 'rgb(var(--domain-faq-question))' }}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6" style={{ color: 'rgb(var(--domain-faq-question))' }} />
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
                      className="pb-6 leading-relaxed text-base md:text-lg"
                      style={{ color: 'rgb(var(--domain-faq-answer))' }}
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-base md:text-lg" style={{ color: 'rgb(var(--domain-faq-description))' }}>
            Still have questions?{" "}
            <Link
              href="#contact"
              className="hover:underline font-semibold transition-all duration-300"
              style={{ color: 'rgb(var(--domain-faq-link))' }}
            >
              Contact our support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DomainFAQ;
