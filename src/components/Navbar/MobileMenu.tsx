"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  menuItems: string[];
  activeDropdown: string | null;
  toggleDropdown: (menu: string) => void;
}

const MobileMenu = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  menuItems, 
  activeDropdown, 
  toggleDropdown 
}: MobileMenuProps) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 sm:p-2 rounded-full transition-colors"
          style={{ color: 'rgb(var(--navbar-mobile-menu-text))' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-hover-text))';
            e.currentTarget.style.backgroundColor = 'rgba(var(--navbar-mobile-menu-hover-bg))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-text))';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {isMenuOpen ? (
            <X size={20} className="sm:w-6 sm:h-6" />
          ) : (
            <Menu size={20} className="sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdowns */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-transparent backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleDropdown(item)}
                  data-dropdown-trigger
                  className="font-medium py-2 px-4 rounded-full transition-colors text-left"
                  style={{
                    color: 'rgb(var(--navbar-mobile-menu-text))',
                    backgroundColor: activeDropdown === item 
                      ? 'rgba(var(--navbar-mobile-menu-active-bg))' 
                      : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (activeDropdown !== item) {
                      e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-hover-text))';
                      e.currentTarget.style.backgroundColor = 'rgba(var(--navbar-mobile-menu-hover-bg))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeDropdown !== item) {
                      e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-text))';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
