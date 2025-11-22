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
          className="font-medium py-2 px-2 rounded-full transition-colors"
          style={{
            color: 'rgb(var(--navbar-desktop-menu-text))',
            backgroundColor: activeDropdown === item 
              ? 'rgba(var(--navbar-desktop-menu-active-bg))' 
              : 'transparent'
          }}
          onMouseEnter={(e) => {
            if (activeDropdown !== item) {
              e.currentTarget.style.backgroundColor = 'rgba(var(--navbar-desktop-menu-hover-bg))';
            }
          }}
          onMouseLeave={(e) => {
            if (activeDropdown !== item) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default DesktopMenu;
