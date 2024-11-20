import { useEffect } from 'react'
import anime from 'animejs'
import Nav from '../components/nav'

const designs = [

]

function Graphic() {
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
          if (entry.target.classList.contains('design-card')) {
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

    document.querySelectorAll('.section-title, .design-card').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF7F6E] to-[#FFA07A] py-10 sm:py-20 px-4 text-white">
      <div className="container mx-auto max-w-7xl">
        <Nav />

        <h1 className="section-title text-4xl sm:text-6xl font-bold text-center mb-6 sm:mb-8 opacity-0 text-white">
          Graphic Design
        </h1>
        
        <p className="text-white/90 text-lg sm:text-xl text-center mb-10 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
          Explore a collection of meticulously crafted graphic design projects that seamlessly blend aesthetics with functionality, 
          delivering visually stunning and impactful designs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {designs.length === 0 ? (
            <div className="col-span-full text-center py-10 sm:py-20 bg-white/10 backdrop-blur-lg rounded-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">No Design Projects Available</h2>
              <p className="text-white/80 text-base sm:text-lg">Check back soon for exciting new designs!</p>
            </div>
          ) : (
            designs.map((design, index) => (
              <div
                key={index}
                className="design-card group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 opacity-0 flex flex-col"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={design.img}
                    alt={design.title}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF7F6E] transition-colors duration-300 mb-2 sm:mb-0">
                      {design.title}
                    </h3>
                    <span className="px-3 py-1 bg-[#FF7F6E] text-white rounded-full text-sm font-medium">
                      {design.type}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{design.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {design.tech.map((tech, i) => (
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
                      href={design.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 text-white bg-[#FF7F6E] hover:bg-[#FF8674] px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 w-full transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7F6E]"
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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

export default Graphic
