"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Star } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import ReviewCard from "@/components/HomeSection/Customers/ReviewCard";

export default function Rated() {
  const reviews = [
    { name: "Philip", date: "13 days ago", title: "Cheap, reliable and helpful", review: "I've purchased numerous domains from Spaceship and they have always been the cheapest I have found them. All of the domains are very easy to s...", rating: 5 },
    { name: "Mahmudul Hussain", date: "15 days ago", title: "I've been using Spaceship.com...", review: "I've been using Spaceship.com for hosting my 4 websites, and honestly, it's been a great experience so far. Everything runs fast and smooth - n...", rating: 5 },
    { name: "Mohammad Rasel", date: "17 days ago", title: "Spaceship.com has been an...", review: "Spaceship.com has been an excellent platform for managing my domains. Everything from registration to DNS setup is super easy and fast. The...", rating: 5 },
    { name: "Skco A", date: "19 days ago", title: "This is", review: "This is I have e use and", rating: 2 },
    { name: "S.K.", date: "2 days ago", title: "Reliable domain provider with...", review: "I use TheCloudaro.com from Germany to purchase domains and currently have seven registered there. Together with the Advanced DNS Manager,...", rating: 5 },
    { name: "ZealCrypto", date: "3 days ago", title: "Great Service Since Getting My...", review: "I've had a really positive experience with TheCloudaro.com since registering my domain. The process was smooth, setup was quick, and everything...", rating: 5 },
    { name: "Sorabh Tomar", date: "6 days ago", title: "Fantastic UI, even better pricing!", review: "I'm so impressed with TheCloudaro.com. I was initially drawn in by their excellent pricing plans, but the UI is what has truly won me over. It's so...", rating: 5 },
    { name: "Rosemary", date: "1 week ago", title: "Simplistic and efficient", review: "Simplistic and efficient — managing multiple domains on TheCloudaro.com is effortless and fast!", rating: 5 },
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
          className="flex flex-col items-center text-center gap-6 sm:gap-8 mt-8 sm:mt-12 md:mt-16"
        >
          <div>
            <ContentHeading
              title="Rated by you"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[hsl(var(--hosting-text-white))] leading-tight tracking-tight text-center"
            />
          </div>

          <div>
            <ContentDescription
              text="Real feedback from real customers."
              size="lg"
              className="text-[hsl(var(--hosting-text-gray-300))] text-center"
            />
          </div>
        </motion.div>

        {/* Rating and Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-y-12 sm:gap-y-16 md:gap-x-20 items-start">
          {/* Rating Summary */}
          <div className="flex justify-center md:justify-start">
            <div className="flex flex-col items-start space-y-4 text-[hsl(var(--rating-summary-text))]">
              <p className="text-xl font-semibold">Excellent</p>
              {/* Stars - 4.5 rating */}
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < 4) {
                    // First 4 stars fully filled
                    return <Star key={i} fill="hsl(var(--rating-summary-star-filled))" stroke="none" className="w-8 h-8" />;
                  } else {
                    // 5th star partially filled (4.5 rating)
                    return (
                      <div key={i} className="relative w-8 h-8">
                        <Star fill="hsl(var(--rating-summary-star-empty))" stroke="none" className="w-8 h-8 absolute" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                          <Star fill="hsl(var(--rating-summary-star-filled))" stroke="none" className="w-8 h-8" />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <p className="text-sm text-[hsl(var(--rating-summary-text-muted))]">
                Showing our favorite reviews
              </p>
              <p className="text-sm text-[hsl(var(--rating-summary-text-muted))]">
                Based on <span className="underline cursor-pointer hover:text-[hsl(var(--rating-summary-text-hover))]">3759 reviews</span>
              </p>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="hsl(var(--rating-summary-star-filled))" viewBox="0 0 24 24">
                  <path d="M12 .288l2.833 8.718h9.167l-7.416 5.389 2.833 8.718L12 17.424l-7.417 5.689L7.416 14.395 0 9.006h9.167z"/>
                </svg>
                <span className="text-sm font-semibold text-[hsl(var(--rating-summary-text))]">Trustpilot</span>
              </div>
            </div>
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
                  className="min-w-[60%] xs:min-w-[55%] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[340px] flex-shrink-0"
                >
                  <ReviewCard {...review} />
                </div>
              ))}
              {reviews.map((review, i) => (
                <div
                  key={`second-${i}`}
                  className="min-w-[60%] xs:min-w-[55%] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[340px] flex-shrink-0"
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
          className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-6 w-auto mx-auto border rounded"
          style={{
            backgroundColor: 'rgb(var(--about-rated-trustpilot-bg))',
            borderColor: 'rgb(var(--about-rated-trustpilot-star))'
          }}
        >
          <p 
            className="text-md sm:text-lg font-medium whitespace-nowrap"
            style={{ color: 'rgb(var(--about-rated-trustpilot-text))' }}
          >
            Review us on
          </p>
          <div className="flex">
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current" 
              viewBox="0 0 24 24"
              style={{ color: 'rgb(var(--about-rated-trustpilot-star))' }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span 
            className="text-md sm:text-lg font-medium"
            style={{ color: 'rgb(var(--about-rated-trustpilot-text))' }}
          >
            Trustpilot
          </span>
        </motion.div>
      </div>
    </section>
  );
}

