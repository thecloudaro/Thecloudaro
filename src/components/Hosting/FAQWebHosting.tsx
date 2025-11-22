"use client";

import { motion } from "framer-motion";
import QuestionAnswer from "../HomeSection/FAQ/QandA";
import Heading from "../HomeSection/BuildAround/Heading";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is web hosting, and why do I need it?",
    answer:
      "Web hosting provides the infrastructure that keeps your website online. It stores your site’s files on secure servers so visitors can access your content 24/7. Without hosting, your domain would have nowhere to point and your site would not load."
  },
  {
    question: "How do I choose the right web hosting plan for my website?",
    answer:
      "Start by estimating your traffic, storage, and performance requirements. Pick a plan that covers your expected resource use and offers room to scale. Consider the included features such as SSL, backups, and support when comparing plans."
  },
  {
    question: "How does shared hosting work?",
    answer:
      "Shared hosting places multiple websites on the same physical server so resources are shared. It’s cost-effective and managed by the provider, making it ideal for personal sites, blogs, and small businesses that don’t need dedicated resources."
  },
  {
    question: "How can I manage my shared hosting plan?",
    answer:
      "You’ll get access to an intuitive control panel to manage domains, email accounts, databases, files, and security settings. We also provide guided documentation and support to help you configure your hosting environment."
  },
  {
    question: "Can I host multiple websites on a single hosting plan?",
    answer:
      "Most of our shared plans support multiple domains. You can add additional sites from your control panel, assigning separate folders, domains, and email accounts for each project."
  },
  {
    question: "Is your shared hosting cloud-based?",
    answer:
      "Yes. Our shared platform runs on redundant cloud infrastructure with automated failover and load balancing. This ensures better uptime, flexibility, and performance compared to traditional single-server hosting."
  },
  {
    question: "Can I use WordPress with your shared hosting?",
    answer:
      "Absolutely. WordPress installs in one click, complete with automatic updates, caching, and security hardening. Our plans are optimized for WordPress so you can build faster without manual tuning."
  },
  {
    question:
      "Are AI tools and the website builder included for free, and how do they differ?",
    answer:
      "Our plans include both AI-assisted site creation tools and a drag-and-drop website builder. AI tools generate layouts and copy based on your prompts, while the builder lets you customize every section visually."
  },
  {
    question: "How many visitors can web hosting handle?",
    answer:
      "Shared hosting comfortably supports tens of thousands of visits per month. If you experience sustained spikes beyond your plan’s limits, you can upgrade seamlessly to higher tiers or managed WordPress options."
  },
  {
    question: "Is shared hosting suitable for e-commerce?",
    answer:
      "Yes, for small to medium stores. Shared plans include SSL, PCI-friendly infrastructure, and integrations with popular carts. As sales grow, you can scale to VPS or dedicated plans without rebuilding your store."
  },
  {
    question: "Can I migrate my existing site to your hosting?",
    answer:
      "We offer complimentary migrations. Provide access to your current host and our specialists will transfer files, databases, and email, then validate everything before going live on your new plan."
  },
  {
    question: "Do you provide automated backups?",
    answer:
      "Daily automated backups are included. Restore points are retained for 30 days so you can roll back at any time. You can also trigger manual backups before major updates for extra peace of mind."
  },
  {
    question: "What security protections are included?",
    answer:
      "Security is layered with Imunify360 malware protection, web application firewalls, DDoS mitigation, free SSL certificates, and continuous monitoring. We keep the stack patched so you can focus on your site."
  },
  {
    question: "How can I reach support if I need help?",
    answer:
      "Our hosting experts are available 24/7 by live chat, email, and phone. Average response times are under 15 minutes, and the team can assist with troubleshooting, migrations, and optimization tips."
  }
];

const FAQWebHosting = () => {
  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Heading
            title="Frequently asked questions"
            className="text-[hsl(var(--faq-text))] !text-[2.25rem] sm:!text-[2.75rem] md:!text-[2.75rem]"
          />
        </motion.div>

        <div className="space-y-0">
          {faqItems.map((item, index) => (
            <QuestionAnswer
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQWebHosting;


