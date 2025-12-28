"use client";

import FAQ from "@/components/HomeSection/FAQ/FAQ";

const faqItems = [
  {
    question: "What do you need for your migration?",
    answer:
      "You’ll need a full cPanel backup of your existing website, including files, databases, and configuration settings. Our team will use this to restore your site on The Cloud Aro hosting."
  },
  {
    question: "What cannot be migrated?",
    answer:
      "Proprietary applications, third-party services, or custom server configurations may not migrate automatically. We’ll review your backup and let you know if anything requires manual configuration."
  },
  {
    question: "How many websites can be migrated?",
    answer:
      "You can migrate as many websites as your hosting plan supports. Submit a backup for each site, and we’ll schedule the migrations one by one to ensure everything transfers smoothly."
  },
  {
    question: "How can I transfer my emails to The Cloud Aro?",
    answer:
      "Download an email backup from your current provider or use IMAP sync tools. Our support documentation walks you through importing email data to Business Email step by step."
  }
];

const FAQMigration = () => {
  return (
    <FAQ
      items={faqItems}
      backgroundClassName="py-24"
      className=""
      title="Frequently asked<br/>questions"
      headingClassName="text-3xl sm:text-3xl md:text-4xl"
      sectionStyle={{ backgroundColor: 'rgb(var(--migration-faq-bg))' }}
    />
  );
};

export default FAQMigration;


