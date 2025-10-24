"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface QuestionAnswerProps {
  question: string;
  answer: string;
  index: number;
}

const QuestionAnswer = ({ question, answer, index }: QuestionAnswerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-[hsl(var(--faq-border))]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 hover:opacity-80"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--faq-text))] pr-8">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-[hsl(var(--faq-text))]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
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
              className="pb-6 text-[hsl(var(--faq-text-muted))] leading-relaxed text-base md:text-lg"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionAnswer;
