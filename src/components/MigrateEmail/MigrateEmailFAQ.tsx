"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import { migrateEmailStyles } from "@/lib/migrateEmailUtils";

interface FAQItem {
  question: string;
  answer: string;
}

const MigrateEmailFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How to migrate email to Spacemail?",
      answer: "To migrate your email to Spacemail, you can use our built-in migration tool. First, create your Spacemail account and choose your plan. Then, navigate to the Settings menu and click 'Migrate to Spacemail' to launch our migration tool. Follow the step-by-step instructions to connect your existing email provider and transfer your emails, contacts, and calendar data."
    },
    {
      question: "I have a trial subscription, can I still migrate email?",
      answer: "Yes, you can migrate your email even if you have a trial subscription. Our migration tool works with trial accounts, allowing you to transfer your emails during the trial period. Once your trial ends and you upgrade to a paid plan, all your migrated data will remain intact."
    },
    {
      question: "Which providers support migration to Spacemail?",
      answer: "Spacemail supports migration from most major email providers including Gmail, Outlook, Yahoo Mail, and other IMAP-compatible email services. Our migration tool can automatically detect and connect to these providers, making the transfer process seamless and straightforward."
    },
    {
      question: "How long does it take to migrate?",
      answer: "The migration time depends on the amount of data you're transferring. For most users with a few thousand emails, the migration typically completes within a few hours. Larger migrations with tens of thousands of emails may take up to 24-48 hours. You can monitor the progress in real-time through the migration dashboard."
    },
    {
      question: "How can I get Spacemail free for 1 year?",
      answer: "You can get Spacemail free for 1 year by migrating a domain into Spaceship. When you transfer your domain to Spaceship hosting, you'll automatically receive a complimentary year of Spacemail service. This offer applies to new domain migrations and is a great way to try our email service at no cost."
    },
    {
      question: "Can I migrate my calendar/contacts?",
      answer: "Yes, Spacemail's migration tool supports transferring your calendar events and contacts along with your emails. The tool can sync calendar data from Google Calendar, Outlook Calendar, and other standard calendar services. Your contacts will be imported from your existing email provider's contact list."
    },
    {
      question: "Can I migrate using a backup?",
      answer: "Yes, if you have a backup of your emails (such as a PST, MBOX, or EML file), you can import it into Spacemail. Our migration tool supports various backup formats, allowing you to restore your emails from a local backup file. This is particularly useful if you want to migrate from an old email client or have archived emails stored locally."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24" style={{ backgroundColor: migrateEmailStyles.bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <ContentHeading
            title="Frequently asked<br/> questions"
            className="!text-[rgb(var(--migrate-email-simple-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-7xl font-bold"
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
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg md:text-xl font-semibold pr-8" style={{ color: migrateEmailStyles.textWhite }}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6" style={{ color: migrateEmailStyles.textWhite }} />
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
                       className="pb-6 leading-relaxed text-sm"
                       style={{ color: migrateEmailStyles.text85 }}
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

export default MigrateEmailFAQ;

