"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ProductData {
  id: string;
  title: string;
  description: string;
  link: string; // ✅ added
  gradientColors: string;
  gradientStyle?: React.CSSProperties;
  shapes: Array<{
    position: string;
    size: string;
    color: string;
    shape: string;
    blur?: string;
    rotate?: string;
    style?: React.CSSProperties;
  }>;
}

interface ProductCardProps {
  product: ProductData;
  index: number;
}

/* ---------- Custom Paragraph ---------- */
const CustomParagraph: React.FC<{
  text: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ text, className, style }) => {
  const lines = text.split("<br/>");
  return (
    <p className={className} style={style}>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index !== lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
};

/* ---------- Product Card ---------- */
const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.25 }}
      className="text-left flex flex-col items-start max-w-md -mx-4"
    >
      {/* Card Visual */}
      <div className="mb-8 w-[420px] h-[280px] relative overflow-hidden rounded-md shadow-2xl">
        <div
          className="absolute inset-0 rounded-md"
          style={
            product.gradientStyle || {
              background:
                product.id === "web-hosting"
                  ? `linear-gradient(to bottom right,
                      rgba(var(--related-products-card-1-gradient-from)),
                      rgba(var(--related-products-card-1-gradient-via)),
                      rgba(var(--related-products-card-1-gradient-to)))`
                  : `linear-gradient(to bottom right,
                      rgba(var(--related-products-card-2-gradient-from)),
                      rgba(var(--related-products-card-2-gradient-via)),
                      rgba(var(--related-products-card-2-gradient-to)))`,
            }
          }
        >
          {product.shapes.map((shape, i) => (
            <div
              key={i}
              className={`absolute ${shape.position} ${shape.size} ${shape.shape} ${shape.blur || ""} ${shape.rotate || ""}`}
              style={shape.style}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-[1.75rem] font-semibold mb-4"
        style={{ color: "rgb(var(--related-products-heading))" }}
      >
        {product.title}
      </h3>

      {/* Description */}
      <CustomParagraph
        text={product.description}
        className="text-lg sm:text-xl max-w-2xl mb-6"
        style={{ color: "rgb(var(--related-products-description))" }}
      />

      {/* Link */}
      <Link
        href={product.link}
        className="inline-flex items-center transition-colors duration-200 font-medium mt-4 underline"
        style={{
          color: "rgb(var(--related-products-link))",
          textDecorationColor: "rgb(var(--related-products-link))",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color =
            "rgb(var(--related-products-link-hover))";
          e.currentTarget.style.textDecorationColor =
            "rgb(var(--related-products-link-hover))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color =
            "rgb(var(--related-products-link))";
          e.currentTarget.style.textDecorationColor =
            "rgb(var(--related-products-link))";
        }}
      >
        Choose your plan
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </motion.div>
  );
};

/* ---------- Related Products ---------- */
const RelatedProducts = () => {
  const productsData: ProductData[] = [
    {
      id: "web-hosting",
      title: "Web Hosting",
      description:
        "Get unparalleled speed, security, and<br/>stability with Spaceship Web Hosting.<br/>Choose a suitable plan for your needs<br/>and get your idea online in under an hour.",
      link: "/web-hosting",
      gradientColors: "",
      shapes: [
        {
          position: "top-0 left-0",
          size: "w-full h-3/5",
          color: "",
          shape: "rounded-tl-2xl rounded-bl-2xl",
          style: { backgroundColor: "rgba(var(--related-products-card-1-shape-1))" },
        },
        {
          position: "top-0 right-0",
          size: "w-4/5 h-full",
          color: "",
          shape: "rounded-tr-2xl rounded-br-2xl",
          style: { backgroundColor: "rgba(var(--related-products-card-1-shape-2))" },
        },
        {
          position: "top-4 right-4",
          size: "w-16 h-16",
          color: "",
          shape: "rounded-lg",
          style: { backgroundColor: "rgba(var(--related-products-card-1-shape-3))" },
        },
      ],
    },
    {
      id: "spacemail",
      title: "Business mail",
      description:
        "Build trust from the first email. Create a<br/>business email address that matches<br/>your domain and easily add credibility to<br/>any message you send.",
      link: "/business-email#choose-your-business",
      gradientColors: "",
      shapes: [
        {
          position: "top-0 left-0",
          size: "w-2/5 h-full",
          color: "",
          shape: "rounded-tl-2xl rounded-bl-2xl",
          style: { backgroundColor: "rgba(var(--related-products-card-2-shape-1))" },
        },
        {
          position: "top-0 right-0",
          size: "w-3/5 h-3/5",
          color: "",
          shape: "rounded-tr-2xl",
          style: { backgroundColor: "rgba(var(--related-products-card-2-shape-2))" },
        },
        {
          position: "bottom-0 right-0",
          size: "w-3/5 h-2/5",
          color: "",
          shape: "rounded-br-2xl",
          style: { backgroundColor: "rgba(var(--related-products-card-2-shape-3))" },
        },
      ],
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-6 lg:px-10 min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "rgb(var(--related-products-bg))" }}
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2
          className="text-5xl font-bold mb-6"
          style={{ color: "rgb(var(--related-products-heading))" }}
        >
          Related products
        </h2>
        <p
          className="text-md sm:text-lg max-w-2xl mx-auto"
          style={{ color: "rgb(var(--related-products-description))" }}
        >
          Configure and connect the tools you need to grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
        {productsData.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
