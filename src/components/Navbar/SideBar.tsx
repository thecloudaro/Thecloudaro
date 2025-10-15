"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Mail, Cloud, Shield } from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: (val: string) => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
  const items = [
    { name: "Domains", icon: <Globe size={18} /> },
    { name: "Hosting", icon: <Server size={18} /> },
    { name: "Email", icon: <Mail size={18} /> },
    { name: "Starlight™ Cloud", icon: <Cloud size={18} /> },
    { name: "Security", icon: <Shield size={18} /> },
  ];

  return (
    <aside className="w-64 border-r border-gray-800 p-6 space-y-8 flex-shrink-0">
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Products</h2>
        <nav className="space-y-3">
          {items.map((item) => (
            <AnimatePresence mode="wait" key={item.name}>
              <motion.button
                key={item.name}
                onClick={() => setActive(item.name)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center w-full gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active === item.name
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                {item.icon}
                {item.name}
              </motion.button>
            </AnimatePresence>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-800 pt-6 space-y-3 text-sm">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="block w-full text-left text-gray-400 hover:text-white transition"
        >
          Transfer to us
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="block w-full text-left text-gray-400 hover:text-white transition"
        >
          Why Spaceship
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="block w-full text-left text-gray-400 hover:text-white transition"
        >
          About us
        </motion.button>
      </div>
    </aside>
  );
}
