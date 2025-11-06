"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductData {
  id: string;
  title: string;
  description: string;
  gradientColors: string;
  shapes: Array<{
    position: string;
    size: string;
    color: string;
    shape: string;
    blur?: string;
    rotate?: string;
  }>;
}

interface ProductCardProps {
  product: ProductData;
  index: number;
}

// Custom Paragraph Component for RelatedProducts
const CustomParagraph: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <p className={className}>
      {text.split('<br/>').map((line, index) => (
        <span key={index}>
          {line}
          {index !== text.split('<br/>').length - 1 && <br />}
        </span>
      ))}
    </p>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.25 }}
      className="text-left flex flex-col items-start max-w-md -mx-4"
    >
        {/* Square Color Div */}
        <div className="mb-8 w-[420px] h-[280px] relative overflow-hidden rounded-md shadow-2xl">
        <div className={`absolute inset-0 ${product.gradientColors} rounded-md`}>
          {product.shapes.map((shape, shapeIndex) => (
            <div
              key={shapeIndex}
              className={`absolute ${shape.position} ${shape.size} ${shape.color} ${shape.shape} ${
                shape.blur || ""
              } ${shape.rotate || ""}`}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[1.75rem] font-semibold text-white mb-4 text-left">{product.title}</h3>

        {/* Description */}
        <CustomParagraph 
          text={product.description}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-6 text-left"
        />

      {/* Link */}
      <Link
        href="#"
        className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors duration-200 font-medium mt-4 underline decoration-blue-600 hover:decoration-blue-500"
      >
        Choose your plan
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </motion.div>
  );
};

const RelatedProducts = () => {
  const productsData: ProductData[] = [
    {
      id: "web-hosting",
      title: "Web Hosting",
      description:
        "Get unparalleled speed, security, and<br/>stability with Spaceship Web Hosting.<br/>Choose a suitable plan for your needs<br/>and get your idea online in under an hour.",
      gradientColors:
        "bg-gradient-to-br from-teal-300/40 via-blue-400/50 to-white/30",
      shapes: [
        { position: "top-0 left-0", size: "w-full h-3/5", color: "bg-teal-300/40", shape: "rounded-tl-2xl rounded-bl-2xl", blur: "" },
        { position: "top-0 right-0", size: "w-4/5 h-full", color: "bg-blue-400/50", shape: "rounded-tr-2xl rounded-br-2xl", blur: "" },
        { position: "top-4 right-4", size: "w-16 h-16", color: "bg-white/60", shape: "rounded-lg", blur: "" },
      ],
    },
    {
      id: "spacemail",
      title: "Spacemail",
      description:
        "Build trust from the first email. Create a<br/>business email address that matches<br/>your domain and easily add credibility to<br/>any message you send.",
      gradientColors:
        "bg-gradient-to-br from-gray-800/60 via-purple-600/50 to-purple-400/40",
      shapes: [
        { position: "top-0 left-0", size: "w-2/5 h-full", color: "bg-gray-800/60", shape: "rounded-tl-2xl rounded-bl-2xl", blur: "" },
        { position: "top-0 right-0", size: "w-3/5 h-3/5", color: "bg-purple-600/50", shape: "rounded-tr-2xl", blur: "" },
        { position: "bottom-0 right-0", size: "w-3/5 h-2/5", color: "bg-purple-400/40", shape: "rounded-br-2xl", blur: "" },
      ],
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-6 lg:px-10 min-h-screen flex flex-col justify-center bg-[#191c1c]"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6">Related products</h2>
        <p className="text-gray-400 text-md sm:text-lg max-w-2xl mx-auto">
          Configure and connect the tools you need to grow.
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-start items-start w-[full] h-[full] max-w-4xl mx-auto">
        {productsData.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;