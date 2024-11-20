import { useEffect } from 'react'
import anime from 'animejs'
import Nav from '../components/nav'

const websites = [
  {
    title: "Portfolio Site",
    desc: "My personal portfolio showcasing photography, mods, and web projects.",
    img: "/portfolio.png",
    type: "Personal", 
    tech: ["React", "TailwindCSS", "AnimeJS"],
    link: "https://lesbians.monster"
  },
  {
    title: "Highlands Job Portal", 
    desc: "A full-featured job portal for Highlands School District. Not Production. Submitted for FBLA.",
    img: "/highlands.png",
    type: "Competition",
    tech: ["Shadcn/UI", "TailwindCSS", "React"],
    link: "https://highlands.monster"
  },
  {
    title: "Nameless Clothing",
    desc: "A clothing store website built with base HTML and CSS.",
    img: "/nameless.png", 
    type: "~~Competition~~",
    tech: ["HTML", "CSS"],
    link: "https://nameless.monster"
  }
]

function Websites() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2
    }

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
            })
          }
          if (entry.target.classList.contains('website-card')) {
            anime({
              targets: entry.target,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutCubic',
              delay: anime.stagger(100)
            })
          }
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll('.section-title, .website-card').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF7F6E] to-[#FFA07A] py-20 px-4 text-white">
      <div className="container mx-auto max-w-7xl">
        <Nav />

        <h1 className="section-title text-6xl font-bold text-center mb-8 opacity-0 text-white">
          Web Projects
        </h1>
        
        <p className="text-white/90 text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed">
          Explore a collection of meticulously crafted web projects that seamlessly blend aesthetics with functionality,
          delivering intuitive and visually stunning user experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {websites.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white/10 backdrop-blur-lg rounded-3xl">
              <h2 className="text-3xl font-semibold text-white mb-4">No Web Projects Available</h2>
              <p className="text-white/80 text-lg">Check back soon for exciting new web projects!</p>
            </div>
          ) : (
            websites.map((website, index) => (
              <div
                key={index}
                className="website-card group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 opacity-0 flex flex-col"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={website.img}
                    alt={website.title}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#FF7F6E] transition-colors duration-300">
                      {website.title}
                    </h3>
                    <span className="px-3 py-1 bg-[#FF7F6E] text-white rounded-full text-sm font-medium">
                      {website.type.startsWith('~~') && website.type.endsWith('~~') ? (
                        <s>{website.type.slice(2, -2)}</s>
                      ) : website.type}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{website.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {website.tech.map((tech, i) => (
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
                      href={website.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 text-white bg-[#FF7F6E] hover:bg-[#FF8674] px-6 py-3 rounded-full transition-all duration-300 w-full transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7F6E]"
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Websites
