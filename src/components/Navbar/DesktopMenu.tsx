"use client";

interface DesktopMenuProps {
  menuItems: string[];
  activeDropdown: string | null;
  toggleDropdown: (menu: string) => void;
}

const DesktopMenu = ({ menuItems, activeDropdown, toggleDropdown }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() => toggleDropdown(item)}
          data-dropdown-trigger
          className={`text-white hover:text-white font-medium py-2 px-2 rounded-full transition-colors ${
            activeDropdown === item ? "bg-gray-800/50" : "hover:bg-gray-800/50"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default DesktopMenu;
