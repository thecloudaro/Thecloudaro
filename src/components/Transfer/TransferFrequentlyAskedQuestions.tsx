"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const TransferFrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does a domain transfer take?",
      answer: "Domain transfers typically take 5-7 business days to complete. The exact duration depends on your current registrar's processing time and the domain extension. We'll keep you updated throughout the transfer process via email notifications."
    },
    {
      question: "How do I transfer a domain from one host to another?",
      answer: "To transfer your domain, first unlock it at your current registrar and obtain your authorization (EPP) code. Then initiate the transfer through our platform by entering your domain name and authorization code. Complete the payment, and we'll handle the rest of the process for you."
    },
    {
      question: "How much does it cost to transfer a domain name?",
      answer: "The cost of transferring a domain varies by extension, but typically ranges from $8 to $15 per year. This includes a one-year renewal added to your current expiration date, so you don't lose any registration time. Privacy protection is included free with all transfers."
    },
    {
      question: "How do I transfer a domain name out of The Cloud Aro?",
      answer: "To transfer a domain away from The Cloud Aro, unlock the domain in your account settings, disable privacy protection temporarily, and obtain your authorization code. Then provide this code to your new registrar, who will initiate the transfer request."
    },
    {
      question: "How do I transfer domain ownership?",
      answer: "Domain ownership transfer requires updating the registrant contact information. You'll need to unlock the domain, verify your identity, and update the WHOIS registrant details. Once the changes are verified and the mandatory waiting period (if applicable) passes, ownership is transferred."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-transfer-faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <div className="mb-6 sm:mb-16 md:mb-10">
          <SectionHeading
            heading="Frequently asked questions"
            headingTag="h2"
            headingClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight"
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-0 mt-12 sm:mt-16 md:mt-20">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-transfer-faq-separator"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-bold text-transfer-faq-question pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-transfer-faq-question" />
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
                      className="pb-6 text-transfer-faq-answer leading-relaxed text-sm sm:text-sm md:text-base"
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

export default TransferFrequentlyAskedQuestions;

