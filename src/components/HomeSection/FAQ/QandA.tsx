"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionAnswerProps {
  question: string;
  answer: string;
  index: number;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconClassName?: string;
}

const QuestionAnswer = ({
  question,
  answer,
  index,
  className,
  questionClassName,
  answerClassName,
  iconClassName
}: QuestionAnswerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("border-b border-[hsl(var(--faq-border))]", className)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-all duration-300 hover:opacity-80"
        aria-expanded={isOpen}
      >
        <h3
          className={cn(
            "pr-8 text-lg font-semibold text-[hsl(var(--faq-text))] md:text-xl",
            questionClassName
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn("h-6 w-6 text-[hsl(var(--faq-text))]", iconClassName)}
          />
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
              className={cn(
                "pb-6 text-base leading-relaxed text-[hsl(var(--faq-text-muted))] md:text-lg",
                answerClassName
              )}
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
