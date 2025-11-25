"use client";

import ContentHeading from "@/components/ui/content-heading";
import QuestionAnswer from "@/components/HomeSection/FAQ/QandA";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Why Spaceship hosting for WordPress?",
    answer:
      "Spaceship delivers a managed WordPress experience with performance optimizations, automated maintenance, and a dashboard designed to keep your sites running smoothly without the overhead."
  },
  {
    question: "What are the key benefits of Managed WordPress Hosting?",
    answer:
      "Managed WordPress hosting includes automatic updates, hardened security, staging tools, and WordPress-specialized support so you can focus on publishing content while we manage the infrastructure."
  },
  {
    question: "Does EasyWP use cPanel?",
    answer:
      "EasyWP uses a custom control panel purpose-built for WordPress, giving you the essentials—backups, SSL, SFTP—without the clutter of a traditional cPanel experience."
  },
  {
    question: "Can I install custom plugins and themes using EasyWP?",
    answer:
      "Yes. Upload your favorite themes and plugins or install from the WordPress directory. EasyWP stays compatible with most extensions and continuously monitors for vulnerable versions."
  },
  {
    question:
      "How can I boost my online presence using managed hosting for WordPress?",
    answer:
      "Managed hosting brings caching, CDN integrations, image optimization, and expert support—all of which improve speed, SEO rankings, and the overall visitor experience."
  },
  {
    question: "Do I need anything else to start out?",
    answer:
      "All you need is a domain. EasyWP plans include SSL, backups, and email forwarding so you can launch immediately without additional services."
  },
  {
    question: "How can I secure my EasyWP website?",
    answer:
      "Activate EasyWP Guardian security tools like HackGuardian and MalwareGuardian, enforce two-factor authentication, and keep your plugins updated—everything is manageable within the dashboard."
  },
  {
    question: "What is HackGuardian?",
    answer:
      "HackGuardian is a one-click hardening tool that locks down core files, guards against unauthorized changes, and protects your site without affecting standard workflows."
  },
  {
    question: "What is MalwareGuardian?",
    answer:
      "MalwareGuardian continuously scans for threats, quarantines suspicious files, and—on higher plans—automatically cleans infections to keep your site safe."
  }
];

const FAQWP = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48" style={{ backgroundColor: 'rgb(var(--wp-faqwp-bg))', color: 'rgb(var(--wp-faqwp-heading))' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center">
          <ContentHeading
            title="Frequently asked questions"
            className="!text-[2.75rem] sm:!text-[3.25rem] md:!text-[3.75rem] font-bold !text-[rgb(var(--wp-faqwp-heading))]"
          />
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-30 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto space-y-2 sm:space-y-3 md:space-y-4">
          {faqItems.map((item, index) => (
            <QuestionAnswer
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
              // className="border-b border-white/5"
              questionClassName="text-xs font-bold tracking-tight !text-[rgb(var(--wp-faqwp-question))]"
              answerClassName="text-xs !text-[rgba(var(--wp-faqwp-answer))]"
              iconClassName="!text-[rgb(var(--wp-faqwp-icon))]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQWP;


