"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQcdn = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is a CDN?",
      answer: "A CDN (Content Delivery Network) is a network of geographically distributed servers that store cached copies of your website's content. When users visit your site, they receive content from the server closest to them, resulting in faster load times and improved performance. CDNs are essential for delivering static assets like images, videos, CSS, and JavaScript files quickly to users worldwide."
    },
    {
      question: "What is CDN caching?",
      answer: "CDN caching is the process of storing frequently accessed content on edge servers located closer to end users. When a user requests content, the CDN serves it from the nearest cache instead of the origin server, significantly reducing latency and bandwidth usage. Cached content includes HTML pages, images, videos, and other static files, which speeds up website loading times and improves user experience."
    },
    {
      question: "What is a CDN edge server?",
      answer: "A CDN edge server is a server located at the edge of the network, geographically close to end users. These servers cache and serve content to users in their region, reducing the distance data must travel and improving response times. Edge servers are strategically placed in data centers around the world, ensuring fast content delivery regardless of where your visitors are located."
    },
    {
      question: "Do I need a CDN?",
      answer: "If you have a website with global visitors, large files, or high traffic, a CDN can significantly improve your site's performance and user experience. CDNs are particularly beneficial for e-commerce sites, media-heavy websites, and applications requiring fast load times. They also help protect against DDoS attacks and traffic spikes, making them valuable for businesses of all sizes."
    },
    {
      question: "How can I measure my website's performance?",
      answer: "You can measure your website's performance using various tools and metrics. Key performance indicators include page load time, Time to First Byte (TTFB), and Core Web Vitals. Tools like Google PageSpeed Insights, GTmetrix, and Pingdom provide detailed performance reports. Monitoring your CDN's analytics dashboard also helps track cache hit rates, bandwidth usage, and response times to optimize your content delivery strategy."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--cdn-section-bg))' }}
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
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                        style={{ color: 'rgb(var(--hosting-text-white))' }}
                      />        </motion.div>

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
              style={{ borderColor: 'rgba(var(--cdn-faq-border))' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 
                  className="text-lg md:text-xl font-semibold pr-8 text-left"
                  style={{ color: 'rgb(var(--cdn-faq-question-text))' }}
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
                    style={{ color: 'rgb(var(--cdn-faq-question-text))' }} 
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
                      style={{ color: 'rgba(var(--cdn-faq-answer-text))' }}
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

export default FAQcdn;

