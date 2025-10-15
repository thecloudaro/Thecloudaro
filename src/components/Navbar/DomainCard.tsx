import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function DomainCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gray-900/40 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition"
    >
      <h3 className="text-white font-semibold text-lg mb-2 flex items-center justify-between">
        {title}
        <ArrowRight size={16} className="text-gray-500" />
      </h3>
      <p className="text-gray-400 text-sm leading-snug">{desc}</p>
    </motion.div>
  );
}
