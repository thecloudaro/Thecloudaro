"use client";

import Heading from "@/components/HomeSection/BuildAround/Heading";
import QuestionAnswer from "@/components/HomeSection/FAQ/QandA";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
  className?: string;
  containerClassName?: string;
  headingWrapperClassName?: string;
  headingClassName?: string;
  contentClassName?: string;
  itemsWrapperClassName?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconClassName?: string;
  wrapItems?: boolean;
}

const FAQSection = ({
  title,
  items,
  className,
  containerClassName,
  headingWrapperClassName,
  headingClassName,
  contentClassName,
  itemsWrapperClassName,
  itemClassName,
  questionClassName,
  answerClassName,
  iconClassName,
  wrapItems = true
}: FAQSectionProps) => {
  const renderedItems = items.map((item, index) => (
    <QuestionAnswer
      key={item.question}
      question={item.question}
      answer={item.answer}
      index={index}
      className={cn(
        "px-6 py-6 sm:px-8 sm:py-8 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl",
        itemClassName
      )}
      questionClassName={questionClassName}
      answerClassName={answerClassName}
      iconClassName={iconClassName}
    />
  ));

  return (
    <section className={cn("py-24", className)}>
      <div
        className={cn(
          "mx-auto max-w-5xl px-6 sm:px-8 lg:px-10",
          containerClassName
        )}
      >
        <div className={cn("mb-16 text-center", headingWrapperClassName)}>
          <Heading
            title={title}
            className={cn(
              "!text-[2.75rem] sm:!text-[3rem] md:!text-[3.5rem] font-semibold",
              headingClassName
            )}
          />
        </div>

        {wrapItems ? (
          <div
            className={cn(
              "rounded-2xl border backdrop-blur-sm",
              contentClassName,
              itemsWrapperClassName
            )}
            style={{
              backgroundColor: 'rgba(var(--ui-faq-section-bg))',
              borderColor: 'rgba(var(--ui-faq-section-border))'
            }}
          >
            {renderedItems}
          </div>
        ) : (
          renderedItems
        )}
      </div>
    </section>
  );
};

export default FAQSection;


