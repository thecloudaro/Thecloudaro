"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Heading from "@/components/HomeSection/BuildAround/Heading";
import Paragraph from "@/components/HomeSection/BuildAround/Paragraph";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";

export default function Customer() {
  const reviews = [
    { name: "S.K.", date: "2 days ago", title: "Reliable domain provider with...", review: "I use TheCloudaro.com from Germany to purchase domains and currently have seven registered there. Together with the Advanced DNS Manager,...", rating: 5 },
    { name: "ZealCrypto", date: "3 days ago", title: "Great Service Since Getting My...", review: "I've had a really positive experience with TheCloudaro.com since registering my domain. The process was smooth, setup was quick, and everything...", rating: 5 },
    { name: "Sorabh Tomar", date: "6 days ago", title: "Fantastic UI, even better pricing!", review: "I'm so impressed with TheCloudaro.com. I was initially drawn in by their excellent pricing plans, but the UI is what has truly won me over. It's so...", rating: 5 },
    { name: "Rosemary", date: "1 week ago", title: "Simplistic and efficient", review: "Simplistic and efficient — managing multiple domains on TheCloudaro.com is effortless and fast!", rating: 5 },
    { name: "Alex M.", date: "1 week ago", title: "Perfect for small businesses", review: "TheCloudaro.com has been perfect for my small business. Easy to manage multiple domains and the pricing is unbeatable. Highly recommend!", rating: 5 },
    { name: "David Chen", date: "2 weeks ago", title: "Outstanding support team", review: "The support team at TheCloudaro.com is outstanding! They helped me migrate my domains seamlessly. Best decision I made this year!", rating: 5 },
    { name: "Sarah Williams", date: "2 weeks ago", title: "Fast and reliable service", review: "Fast, reliable, and affordable. TheCloudaro.com has everything I need for my web projects. The DNS management tools are top-notch!", rating: 5 },
    { name: "Michael R.", date: "3 weeks ago", title: "Best domain registrar ever!", review: "After trying several domain registrars, TheCloudaro.com stands out as the best. Clean interface, great features, and excellent value for money!", rating: 5 },
  ];

  const controls = useAnimation();

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      controls
        .start({
          x: ["0%", "-50%"],
          transition: { duration: 25, ease: "linear", repeat: Infinity },
        })
        .then(() => {
          controls.set({ x: "0%" });
          animationFrameId = requestAnimationFrame(animate);
        });
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [controls]);

  const handlePause = () => controls.stop();
  const handleResume = () =>
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: 25, ease: "linear", repeat: Infinity },
    });

  return (
    <section className="bg-customer-bg text-customer-text py-24 sm:py-32 md:py-40 lg:py-52 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col space-y-28 sm:space-y-32 md:space-y-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <div>
            <Heading title={"Customer <br/> Know best"} />
          </div>

          <div className="lg:pl-8">
            <Paragraph
              text={
                "Here's what people with first-hand<br/>" +
                "experience are saying about<br/>" +
                "TheCloudaro."
              }
            />
          </div>
        </motion.div>

        {/* Rating and Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-y-12 sm:gap-y-16 md:gap-x-20 items-start">
          {/* Rating Summary */}
          <div className="flex justify-center md:justify-start">
            <RatingSummary rating={4.8} totalReviews={3681} />
          </div>

          {/* Review Cards */}
          <div className="overflow-hidden relative w-full">
            <div className="absolute left-0 top-0 h-full w-10 sm:w-14 md:w-16 bg-gradient-to-r from-[hsl(var(--customer-gradient-from))] via-[hsl(var(--customer-gradient-via))] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-10 sm:w-14 md:w-16 bg-gradient-to-l from-[hsl(var(--customer-gradient-from))] via-[hsl(var(--customer-gradient-via))] to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={controls}
              className="flex gap-5 sm:gap-6 lg:gap-2"
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
            >
              {reviews.map((review, i) => (
                <div
                  key={`first-${i}`}
                  className="min-w-[55%] sm:min-w-[200px] md:min-w-[200px] lg:min-w-[200px] flex-shrink-0"
                >
                  <ReviewCard {...review} />
                </div>
              ))}
              {reviews.map((review, i) => (
                <div
                  key={`second-${i}`}
                  className="min-w-[55%] sm:min-w-[200px] md:min-w-[200px] lg:min-w-[200px] flex-shrink-0"
                >
                  <ReviewCard {...review} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
{/* Trustpilot Section - Center mein */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="flex items-center justify-center gap-2 sm:gap-3 bg-customer-trustpilot-bg py-3 sm:py-4 px-4 sm:px-6 w-auto max-w-[200px] sm:max-w-[240px] h-14 sm:h-16 mx-auto"
>
  <p className="text-customer-trustpilot-text text-md sm:text-lg font-medium whitespace-nowrap">Review us</p>
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className="w-5 h-5 sm:w-6 sm:h-6 text-customer-trustpilot-star fill-current" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
</motion.div>
      </div>
    </section>
  );
}