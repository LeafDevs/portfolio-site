import { useEffect } from 'react';
import anime from 'animejs';
import Nav from '../components/nav';

const mods = [
  {
    title: "Mob API",
    desc: "Easily add new mobs to your Minecraft server.",
    img: "/images/rose.webp", 
    type: "Plugin",
    tech: ["Java", "Spigot API"],
    link: "https://www.spigotmc.org/resources/leafs-mob-api.108711/"
  },
  {
    title: "Arctic Prisons",
    desc: "A prison plugin core for Minecraft with build in permissions and a customisable GUI.",
    img: "/images/rose.webp",
    link: "https://github.com/LeafDevs/ArcticPrisons",
    type: "Mod",
    tech: ["Java", "Paper API", "Maven"] 
  },
  {
    title: "MMORPG Core",
    desc: "A core plugin for a MMORPG Minecraft server.",
    img: "/images/rose.webp",
    link: "https://github.com/LeafDevs/SeniorProject",
    type: "Plugin",
    tech: ["MMORPG", "Java", "Spigot API"]
  }
];

function Mods() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('section-title')) {
            anime({
              targets: entry.target,
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutElastic(1, .8)'
            });
          }
          if (entry.target.classList.contains('mod-card')) {
            anime({
              targets: entry.target,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutCubic',
              delay: anime.stagger(100)
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.section-title, .mod-card').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF7F6E] to-[#FFA07A] py-10 sm:py-20 px-4 text-white">
      <div className="container mx-auto max-w-7xl">
        <Nav />

        <h1 className="section-title text-4xl sm:text-6xl font-bold text-center mb-6 sm:mb-8 opacity-0 text-white">
          Minecraft Mods & Plugins
        </h1>
        
        <p className="text-white/90 text-lg sm:text-xl text-center mb-10 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
          Explore my collection of custom Minecraft mods and plugins that enhance gameplay with new features, mechanics, and improvements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {mods.length === 0 ? (
            <div className="col-span-full text-center py-10 sm:py-20 bg-white/10 backdrop-blur-lg rounded-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">No Mods Available</h2>
              <p className="text-white/80 text-base sm:text-lg">Check back soon for exciting new mods!</p>
            </div>
          ) : (
            mods.map((mod, index) => (
              <div
                key={index}
                className="mod-card group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 opacity-0 flex flex-col"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={mod.img}
                    alt={mod.title}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF7F6E] transition-colors duration-300 mb-2 sm:mb-0">
                      {mod.title}
                    </h3>
                    <span className="px-3 py-1 bg-[#FF7F6E] text-white rounded-full text-sm font-medium">
                      {mod.type}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{mod.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mod.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-white/20 text-white rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <a
                      href={mod.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 text-white bg-[#FF7F6E] hover:bg-[#FF8674] px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 w-full transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7F6E]"
                    >
                      <span className="text-sm font-medium">
                        {mod.link.includes('spigotmc.org') ? 'View on Spigot' : 'View on GitHub'}
                      </span>
                      {mod.link.includes('spigotmc.org') ? (
                        <svg 
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 15.75h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008zm0-2.25h.008v.008H12v-.008zm0 4.5a.75.75 0 000-1.5.75.75 0 000 1.5zm0-7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Mods;
