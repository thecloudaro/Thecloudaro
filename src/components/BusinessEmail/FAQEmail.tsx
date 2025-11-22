"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQEmail = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Why would I need encrypted email?",
      answer: "Encrypted email ensures that your sensitive business communications remain private and secure. It protects your messages from unauthorized access, making it essential for handling confidential information, financial data, and personal details. This is particularly important for businesses that need to comply with data protection regulations."
    },
    {
      question: "How do I set up a business email address with Spacemail?",
      answer: "Setting up a business email with Spacemail is straightforward. First, choose your plan and complete the purchase. Then, access your control panel where you can create email accounts, configure your domain settings, and set up mailboxes. Our step-by-step guide and 24/7 support team are available to help you through the process."
    },
    {
      question: "Does Spacemail have Two-Factor Authentication (2FA)?",
      answer: "Yes, Spacemail includes Two-Factor Authentication (2FA) protection. This adds an extra layer of security to your email account by requiring a second verification step in addition to your password. You can enable 2FA through your account settings to protect against unauthorized access."
    },
    {
      question: "What is the Security Center in Spacemail and what can I do there?",
      answer: "The Security Center is a comprehensive dashboard where you can manage all your email security settings. You can view login history, manage active sessions, configure security alerts, set up password policies, and monitor account activity. It's your central hub for keeping your email account secure."
    },
    {
      question: "Can I configure Spacemail's email service with domains from 3rd party providers?",
      answer: "Yes, you can use Spacemail with domains registered through third-party providers. Simply update your domain's MX records to point to Spacemail's mail servers. Our support team can provide you with the specific DNS settings and guide you through the configuration process."
    },
    {
      question: "Can I order additional email addresses (mailboxes) later?",
      answer: "Absolutely! You can add more email addresses and mailboxes to your Spacemail plan at any time. Simply log into your control panel, navigate to the mailboxes section, and add new email accounts. Additional mailboxes are billed according to your current plan's pricing structure."
    },
    {
      question: "Can I use Spacemail business email with email clients like Outlook, Thunderbird, or Gmail?",
      answer: "Yes, Spacemail supports all major email clients including Outlook, Thunderbird, Apple Mail, and Gmail. You can configure your Spacemail account using standard IMAP/SMTP/POP3 protocols. We provide detailed setup instructions for each email client in our knowledge base."
    },
    {
      question: "Is Spacemail's email service sufficient for business needs?",
      answer: "Yes, Spacemail is designed specifically for business needs. It offers professional email hosting with features like custom domain support, ample storage, advanced security, spam protection, calendar integration, and reliable uptime. Our plans scale with your business, from small startups to large enterprises."
    },
    {
      question: "Are there any limits for sending/receiving emails with Spacemail?",
      answer: "Spacemail has reasonable sending limits to prevent abuse and ensure service quality. Standard plans typically allow hundreds of emails per day. For high-volume sending needs, we offer enterprise plans with higher limits. There are no limits on receiving emails. Contact our sales team to discuss your specific requirements."
    },
    {
      question: "Can I have email aliases with Spacemail?",
      answer: "Yes, Spacemail supports email aliases. Aliases allow you to receive emails at multiple addresses that all deliver to the same mailbox. This is useful for organizing incoming mail, creating department addresses, or managing multiple contact points. The number of aliases depends on your plan."
    },
    {
      question: "I have The Cloud Aro hosting, do I need to buy Spacemail business email?",
      answer: "If you already have The Cloud Aro hosting, you may have access to basic email features. However, Spacemail business email offers enhanced features like larger storage, advanced security, better spam protection, calendar integration, and dedicated support. You can use both services together or upgrade to Spacemail for enhanced email capabilities."
    },
    {
      question: "Can I connect several domains to a single Spacemail subscription?",
      answer: "Yes, depending on your plan, you can connect multiple domains to a single Spacemail subscription. This allows you to manage email for multiple businesses or brands from one account. Check your plan details for the number of domains supported, or contact us to discuss adding more domains."
    },
    {
      question: "Do you provide a refund for Spacemail email service?",
      answer: "Yes, we offer a refund policy for Spacemail services. If you're not satisfied within the refund period (typically 30 days), you can request a full refund. Please review our terms of service for specific refund conditions and contact our support team to initiate a refund request."
    },
    {
      question: "How can I login to my Spacemail email account?",
      answer: "You can log in to your Spacemail account through our webmail interface at mail.spacemail.com, or configure your email client with your credentials. You can also access your account management panel to manage settings, billing, and email configuration. If you need help, our support team is available 24/7."
    },
    {
      question: "Can I migrate my existing emails to Spacemail?",
      answer: "Yes, you can migrate your existing emails to Spacemail. We provide migration tools and support to help you transfer emails from other providers like Gmail, Outlook, or other email services. Our support team can guide you through the migration process to ensure a smooth transition."
    },
    {
      question: "What are password-protected emails, and can I send them to non-Spacemail addresses?",
      answer: "Password-protected emails allow you to send sensitive information securely by requiring a password to open the email. Yes, you can send password-protected emails to any email address, not just Spacemail users. The recipient will receive instructions on how to access the protected content using the password you set."
    },
    {
      question: "Does Spacemail include a calendar?",
      answer: "Yes, Spacemail includes a built-in calendar feature. You can schedule meetings, set reminders, create events, and share calendars with team members. The calendar integrates seamlessly with your email account and is accessible through webmail and compatible email clients."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <ContentHeading
            title="Frequently asked questions"
            className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl font-bold"
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border-b"
              style={{ borderColor: 'rgb(var(--business-make-dot-inactive))' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg md:text-xl font-semibold text-[rgb(var(--hosting-text-white))] pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-[rgb(var(--hosting-text-white))]" />
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
                      style={{ color: 'rgb(var(--hosting-choose-text-gray-300))' }}
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

export default FAQEmail;

