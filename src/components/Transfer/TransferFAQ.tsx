"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { HelpCircle } from "lucide-react";

const TransferFAQ = () => {
  const faqs = [
    {
      question: "What am I paying for during a transfer?",
      answer: "You only pay for 1-year renewal when you transfer an eligible domain. The year is added to your current expiration date, so no registration time is lost."
    },
    {
      question: "Can expiring or expired domains be transferred?",
      answer: "This depends on the stage of expiry. To check if your domain can be transferred, search your domain, hit Transfer, and we'll check for you."
    },
    {
      question: "Is privacy protection included?",
      answer: "Privacy protection is free for life with eligible domain name transfers."
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-transfer-faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <SectionHeading
            heading="What you need to know"
            headingTag="h2"
            headingClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center text-transfer-faq-heading"
          />
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-0">
          {faqs.map((faq, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="py-8"
              >
                <div className="flex items-start gap-4">
                  {/* Circled question mark icon */}
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-transfer-faq-icon border border-transfer-faq-icon"
                  >
                    <HelpCircle className="w-5 h-5 text-transfer-faq-icon" />
                  </div>
                  
                  <div className="flex-1">
                    {/* Question */}
                    <h3 className="text-xs sm:text-sm font-bold mb-2 text-transfer-faq-question">
                      {faq.question}
                    </h3>
                    {/* Answer */}
                    <p className="text-xs sm:text-sm leading-relaxed text-transfer-faq-answer">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Separator line (except for last item) */}
              {index < faqs.length - 1 && (
                <div className="h-px bg-transfer-faq-separator"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransferFAQ;

