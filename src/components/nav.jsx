const Nav = () => {
  return (
    <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-sm flex items-center justify-between hover:bg-white/20 transition-all duration-300">
      <a
        href="/"
        className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-all duration-300 hover:scale-105"
      >
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-medium">Home</span>
      </a>
      <div className="flex items-center space-x-4">
        <a href="/photography" className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 hover:font-medium">Photography</a>
        <a href="/mods" className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 hover:font-medium">Mods</a>
        <a href="/apps" className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 hover:font-medium">Websites</a>
        <a href="/design" className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 hover:font-medium">Design</a>
        <a href="/libraries" className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 hover:font-medium">Libraries</a>
        <a href="/ui" className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 hover:font-medium">UI</a>
      </div>
    </div>
  );
};

export default Nav;
