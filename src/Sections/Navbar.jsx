import { useState, useCallback } from "react";
import "../index.css";
import { navLinks } from "../constants";

const NavItems = () => {
  return (
    <ul className="px-3 flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20">
      {navLinks.map(({ id, href, name }) => (
        <li
          className="text-neutral-100 font-medium font-generalsans max-sm:hover:bg-black-500 max-sm:w-full max-sm:rounded-md py-2 max-sm:px-5"
          key={id}
        >
          <a
            className="text-lg md:text-base hover:text-white transition-colors"
            href={href}
            onClick={(e) => {
              e.preventDefault();
              // Smooth scrolling logic
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            aria-label={`Navigate to ${name}`}
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use useCallback to memoize the toggle function to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90" role="navigation" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="#home" // Or use any anchor you want
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold text-3xl px-2.5 hover:text-white transition-colors hover:scale-105 transform duration-300"
            aria-label="Go to homepage"
          >
            Omer Awan
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white px-2 block sm:hidden focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt={isOpen ? "Close menu" : "Open menu"}
              className="w-6 h-6"
              loading="lazy"
            />
          </button>

          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 bg-black-200 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto sm:hidden ${isOpen ? "block" : "hidden"}`}
        aria-hidden={!isOpen}
      >
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;