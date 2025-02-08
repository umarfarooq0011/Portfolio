const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-5 px-4 text-white shadow-lg space-y-2">
      {/* Footer Title */}
      <p className="text-lg font-semibold text-gray-200">
        Designed & Developed by <span className="text-blue-400">Omer Awan</span>
      </p>

      {/* Social Media Links */}
      <div className="flex space-x-6">
        {/* GitHub */}
        <a
          href="https://github.com/umarfarooq0011"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 hover:text-blue-400"
        >
          <div className="relative">
            <img
              src="/assets/github.png"
              alt="GitHub"
              className="w-10 h-10 rounded-full shadow-lg"
              loading="lazy" // Lazy loading the image
            />
            <div className="absolute inset-0 w-full h-full bg-blue-400 opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </div>
          <span className="text-xs mt-2 text-gray-400">GitHub</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/omer-awan-96b70430a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 hover:text-blue-400"
        >
          <div className="relative">
            <img
              src="/assets/linkedin.png"
              alt="LinkedIn"
              className="w-10 h-10 rounded-full shadow-lg"
              loading="lazy" // Lazy loading the image
            />
            <div className="absolute inset-0 w-full h-full bg-blue-400 opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </div>
          <span className="text-xs mt-2 text-gray-400">LinkedIn</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/923457058686"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 hover:text-green-400"
        >
          <div className="relative">
            <img
              src="/assets/whatsapp.png"
              alt="WhatsApp"
              className="w-10 h-10 rounded-full shadow-lg"
              loading="lazy" // Lazy loading the image
            />
            <div className="absolute inset-0 w-full h-full bg-green-400 opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </div>
          <span className="text-xs mt-2 text-gray-400">WhatsApp</span>
        </a>
      </div>

      {/* Horizontal Line */}
      <div className="w-full border-t border-gray-700 mt-5"></div>

      {/* Copyright Section */}
      <p className="text-xs text-gray-500 mt-2">
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
