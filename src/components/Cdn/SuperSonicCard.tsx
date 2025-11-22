"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuperSonicCard = () => {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for beginners and solopreneurs.",
      originalPrice: 88.88,
      currentPrice: 58.88,
      discount: 34,
      popular: false,
      features: [
        "Powerful DDoS protection",
        "Advanced WAF security Coming Soon",
        "Custom SSL Upload",
        "Secured by SSL",
        "Monitoring Coming Soon",
        "250GB/mo Traffic Limit"
      ],
      renewalPrice: 88.88
    },
    {
      name: "Medium",
      description: "Ideal for startups and small businesses.",
      originalPrice: 188.88,
      currentPrice: 118.88,
      discount: 37,
      popular: true,
      features: [
        "Powerful DDoS protection",
        "Advanced WAF security Coming Soon",
        "Custom SSL Upload",
        "Secured by SSL",
        "Monitoring Coming Soon",
        "500GB/mo Traffic Limit"
      ],
      renewalPrice: 188.88
    },
    {
      name: "Advanced",
      description: "Great for turbo-charging any business.",
      originalPrice: 388.88,
      currentPrice: 238.88,
      discount: 39,
      popular: false,
      features: [
        "Powerful DDoS protection",
        "Advanced WAF security Coming Soon",
        "Custom SSL Upload",
        "Secured by SSL",
        "Monitoring Coming Soon",
        "1000GB/mo Traffic Limit"
      ],
      renewalPrice: 388.88
    }
  ];

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: 'rgb(var(--cdn-section-bg))' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-md p-5 sm:p-6 max-w-[280px] mx-auto md:max-w-none ${
                index === 1 ? '-mt-6 sm:-mt-8' : 'mt-6 sm:mt-8'
              }`}
              style={{
                backgroundColor: 'rgba(var(--cdn-card-bg))'
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="text-center mb-2">
                  <span 
                    className="text-xs font-medium"
                    style={{ 
                      color: 'rgb(var(--cdn-card-text))'
                    }}
                  >
                    Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 
                className="text-2xl font-semibold mb-2"
                style={{ color: 'rgb(var(--cdn-card-text))' }}
              >
                {plan.name}
              </h3>

              {/* Description */}
              <p 
                className="text-xs mb-5"
                style={{ color: 'rgba(var(--cdn-card-text-gray))' }}
              >
                {plan.description}
              </p>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span 
                    className="text-xs line-through"
                    style={{ color: 'rgba(var(--cdn-card-text-gray-70))' }}
                  >
                    ${plan.originalPrice.toFixed(2)}/yr
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: 'rgba(var(--cdn-card-text-gray-70))' }}
                  >
                    {plan.discount}% OFF*
                  </span>
                </div>
                <div 
                  className="text-3xl font-semibold"
                  style={{ color: 'rgb(var(--cdn-card-text))' }}
                >
                  ${plan.currentPrice.toFixed(2)}/yr
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => {
                  const isComingSoon = feature.includes("Coming Soon");
                  return (
                    <li 
                      key={featureIndex} 
                      className="flex items-start text-xs"
                      style={{ color: 'rgba(var(--cdn-card-text-gray))' }}
                    >
                      <CheckCircle 
                        className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" 
                        style={{ color: isComingSoon ? 'rgba(var(--cdn-card-checkmark-disabled))' : 'rgba(var(--cdn-card-checkmark))' }}
                      />
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-full font-medium text-sm transition-all duration-300 mb-2"
                style={{
                  backgroundColor: 'rgba(var(--cdn-card-button-bg))',
                  color: 'rgb(var(--cdn-card-text))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(var(--cdn-card-button-bg-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(var(--cdn-card-button-bg))';
                }}
              >
                Add to cart
              </motion.button>

              {/* Renewal Info */}
              <p 
                className="text-xs text-center"
                style={{ color: 'rgba(var(--cdn-card-text-gray-70))' }}
              >
                Renews at ${plan.renewalPrice.toFixed(2)}/yr.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuperSonicCard;

