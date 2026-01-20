"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import QuestionAnswer from "./QandA";
import Heading from "../BuildAround/Heading";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  className?: string;
  title?: string;
  subtitle?: string;
  backgroundClassName?: string;
  sectionStyle?: React.CSSProperties;
  headingClassName?: string;
}

const defaultFaqData: FAQItem[] = [
  {
    question: "What is TheCloudaro?",
    answer:
      "TheCloudaro is a premium web hosting service provider that offers reliable, fast, and secure hosting solutions for websites of all sizes. We specialize in cloud-based infrastructure, ensuring your website performs optimally with 99.9% uptime guarantee."
  },
  {
    question: "What types of hosting plans does TheCloudaro offer?",
    answer:
      "TheCloudaro offers a variety of hosting solutions including Shared Hosting, VPS Hosting, Dedicated Servers, Cloud Hosting, and Managed WordPress Hosting. Each plan is designed to meet different needs, from small personal blogs to large enterprise applications."
  },
  {
    question: "How do I get started with TheCloudaro hosting?",
    answer:
      "Getting started is easy! Simply choose a hosting plan that fits your needs, register a domain name (or transfer your existing one), and complete the checkout process. Our team will set up your hosting account within minutes, and you'll receive login credentials to access your control panel."
  },
  {
    question: "Does TheCloudaro provide website migration services?",
    answer:
      "Yes! We offer free website migration services for all new customers. Our expert migration team will handle the entire process, ensuring your website is transferred seamlessly without any downtime or data loss. Simply provide us with your current hosting details, and we'll take care of the rest."
  },
  {
    question: "What is the uptime guarantee with TheCloudaro?",
    answer:
      "TheCloudaro guarantees 99.9% uptime for all hosting services. Our infrastructure is built on redundant systems with multiple failover mechanisms. In the rare event that we don't meet this guarantee, you'll be eligible for service credits as outlined in our Service Level Agreement (SLA)."
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer:
      "Absolutely! TheCloudaro makes it easy to upgrade your hosting plan as your website grows. You can upgrade at any time through your control panel, and the transition is seamless with no downtime. You'll only pay the prorated difference for the remaining billing period."
  },
  {
    question: "What security features does TheCloudaro provide?",
    answer:
      "Security is our top priority. TheCloudaro includes free SSL certificates, DDoS protection, automated daily backups, malware scanning, firewall protection, and regular security updates. Our advanced security measures ensure your website and data remain safe from threats."
  },
  {
    question: "Does TheCloudaro offer email hosting?",
    answer:
      "Yes! All TheCloudaro hosting plans include professional email hosting with your domain name. You'll get spam filtering, virus protection, webmail access, and support for popular email clients. Create unlimited email addresses depending on your plan."
  },
  {
    question: "What control panel does TheCloudaro use?",
    answer:
      "TheCloudaro uses cPanel, the industry's most popular and user-friendly control panel. With cPanel, you can easily manage your websites, databases, email accounts, and files through an intuitive interface. We also provide video tutorials and documentation to help you get started."
  },
  {
    question: "Is technical support available 24/7?",
    answer:
      "Yes! TheCloudaro provides 24/7/365 technical support through multiple channels including live chat, email, and phone. Our experienced support team is always ready to assist you with any questions or issues. We typically respond to support tickets within 15 minutes."
  },
  {
    question: "What is the backup policy at TheCloudaro?",
    answer:
      "TheCloudaro performs automated daily backups of all hosting accounts. Backups are stored on separate servers for added security and retained for 30 days. You can also create manual backups anytime through your control panel. Restoring from a backup is quick and straightforward."
  },
  {
    question: "Does TheCloudaro offer a money-back guarantee?",
    answer:
      "Yes! We offer a 30-day money-back guarantee on all new hosting plans. If you're not completely satisfied with our services within the first 30 days, simply contact our support team for a full refund, no questions asked. We're confident you'll love TheCloudaro!"
  }
];

const FAQ = ({
  items = defaultFaqData,
  className,
  title = "Frequently asked<br/>questions",
  subtitle,
  backgroundClassName = "bg-[hsl(var(--faq-bg-default))]",
  sectionStyle,
  headingClassName = "text-4xl sm:text-5xl md:text-6xl font-bold"
}: FAQProps) => {
  const wrapperClasses = [
    "min-h-screen",
    "py-12",
    "px-4",
    "sm:px-6",
    "lg:px-8",
    backgroundClassName,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} style={sectionStyle}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Heading
            title={title}
            className={`${headingClassName} text-[hsl(var(--faq-text))] mb-4`}
          />
          {subtitle && (
            <p className="text-lg text-[hsl(var(--faq-text-muted))]">{subtitle}</p>
          )}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {items.map((item, index) => (
            <QuestionAnswer
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
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
          {!subtitle && (
            <p className="text-[hsl(var(--faq-text-muted))] text-base md:text-lg">
              Still have questions?{" "}
              <Link
                href="/about/contactus"
                className="text-[hsl(var(--faq-text))] hover:underline font-semibold transition-all duration-300"
              >
                Contact our support team
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
