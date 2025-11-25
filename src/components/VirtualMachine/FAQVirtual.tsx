'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ContentHeading from '@/components/ui/content-heading';
import { virtualMachineStyles } from '@/lib/virtualMachineUtils';

const FAQVirtual = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Why should I choose The Cloud Aro?',
      answer: 'The Cloud Aro offers high-performance virtual machines with flexible pricing, reliable infrastructure, and excellent customer support. Our VMs are designed to scale with your needs, whether you\'re running a small project or a large enterprise application. With 99.99% uptime guarantee and data centers in multiple locations, The Cloud Aro provides the reliability and performance you need.'
    },
    {
      question: 'What are Virtual Machines?',
      answer: 'Virtual Machines (VMs) are virtualized computing environments that run on physical servers. Each VM operates as an independent server with its own operating system, CPU, RAM, and storage. VMs allow you to run applications and services in an isolated environment, providing flexibility, scalability, and cost-effectiveness compared to dedicated physical servers.'
    },
    {
      question: 'What are Virtual Machines\' specifications for CPU, RAM, storage, network speed, and core information?',
      answer: 'Our Virtual Machines come with various configurations to suit different needs. You can choose from Standard, CPU-optimized, and Memory-optimized plans. Each plan offers different CPU cores (ranging from 2 to 8+ cores), RAM options (from 2 GiB to 16+ GiB), storage options (from 25 GiB to 320+ GiB), and network speeds up to 10 Gbps. All VMs include SSD storage for optimal performance.'
    },
    {
      question: 'Where are The Cloud Aro\'s data centers located?',
      answer: 'The Cloud Aro operates data centers in multiple strategic locations including the United States and Singapore. This global presence ensures low latency and high performance for users worldwide. You can choose the data center location that best serves your target audience when deploying your Virtual Machine.'
    },
    {
      question: 'Can I upgrade from Web to Starlight™ Hosting?',
      answer: 'Yes, you can easily upgrade from Web Hosting to Starlight™ Hosting at any time. The upgrade process is seamless and can be done through your control panel. Your data and configurations will be migrated automatically, ensuring minimal downtime. You\'ll only pay the prorated difference for the remaining billing period.'
    },
    {
      question: 'How do I terminate my VM?',
      answer: 'You can terminate your Virtual Machine at any time through the Starlight™ Manager control panel. Simply navigate to your VM settings, select the termination option, and confirm your choice. Please note that termination is permanent and all data will be deleted. We recommend backing up your data before terminating a VM. For pay-as-you-go plans, you\'ll only be charged for the time you used.'
    },
    {
      question: 'What else is available with Starlight™ Virtual Machines?',
      answer: 'Starlight™ Virtual Machines come with a comprehensive set of features including flexible block storage, automated backups, DDoS protection, firewall management, monitoring tools, and API access. You also get access to Starlight™ Manager, our intuitive control panel for managing your VMs, and 24/7 technical support from our expert team.'
    },
    {
      question: 'Are there any restrictions on email services with Virtual Machines?',
      answer: 'Yes, there are some restrictions on email services with Virtual Machines to prevent spam and abuse. By default, outbound SMTP ports (25, 465, 587) are blocked. However, you can request to have these ports unblocked by contacting our support team and providing a valid use case. We also recommend using our Business Email service for professional email hosting needs.'
    },
    {
      question: 'How do I get started with a Virtual Machine?',
      answer: 'Getting started is easy! Simply choose a Virtual Machine plan that fits your needs, select your preferred data center location, and complete the checkout process. Once your VM is provisioned (usually within minutes), you\'ll receive login credentials and can start deploying your applications. Our documentation and support team are available to help you get started quickly.'
    }
  ];

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: virtualMachineStyles.sectionBg }}>
      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <ContentHeading
              title="Frequently asked questions"
              className="text-center !text-[2.5rem] sm:!text-[3.35rem] md:!text-[4.05rem] lg:!text-[4rem] font-bold leading-[1.08] !text-[rgb(var(--virtual-machine-hero-text))]"
            />
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b"
                style={{ borderColor: virtualMachineStyles.borderColor }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
                  aria-expanded={openIndex === index}
                >
                  <h3 
                    className="text-lg md:text-xl font-semibold pr-8"
                    style={{ color: virtualMachineStyles.cardText }}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown 
                      className="w-6 h-6" 
                      style={{ color: virtualMachineStyles.cardText }} 
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8">
                        <p 
                          className="text-base md:text-lg leading-relaxed"
                          style={{ color: virtualMachineStyles.cardTextGray }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQVirtual;

