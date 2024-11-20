"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import 'animate.css'
import { MusicPlayer } from '../components/music-player'

// Import all songs
import DarknessOfGreed from '../../public/audio/Darkness.mp3'

// Define playlist
const playlist = [
  {
    audioSrc: "/audio/Darkness.mp3",
    songTitle: "Darkness",
    artistName: "Rage Against the Machine", 
    thumbnailSrc: "/images/ratm.webp"
  },
  {
    audioSrc: "/audio/GuerillaRadio.mp3",
    songTitle: "Guerilla Radio",
    artistName: "Rage Against the Machine", 
    thumbnailSrc: "/images/ratm.webp"
  },
  {
    audioSrc: "/audio/Bombtrack.mp3",
    songTitle: "Bombtrack",
    artistName: "Rage Against the Machine", 
    thumbnailSrc: "/images/ratm.webp"
  }

  // Add more songs here in the same format
]

const projects = [
  {
    title: "Photography Portfolio",
    desc: "A curated collection showcasing my photographic journey through landscapes, portraits, and street photography.",
    img: "/images/photography.webp",
    color: "from-orange-400 to-coral-500",
    page: "/photography"
  },
  {
    title: "Game Development", 
    desc: "Custom Minecraft mods and plugins that enhance gameplay with new mechanics and features.",
    img: "/mods.webp",
    color: "from-orange-400 to-coral-500",
    page: "/mods"
  },
  {
    title: "Full Stack Applications",
    desc: "Scalable web applications built with modern frameworks and cloud infrastructure.",
    img: "/images/websites.webp", 
    color: "from-orange-400 to-coral-500",
    page: "/apps"
  },
  {
    title: "UI/UX Design",
    desc: "Modern, intuitive user interfaces and experiences designed with user-centered principles.",
    img: "/images/design.webp",
    color: "from-orange-400 to-coral-500", 
    page: "/ui"
  },
  {
    title: "Graphic Design",
    desc: "Creative visual designs including logos, branding materials, and digital artwork for various platforms.",
    img: "/images/graphic.webp",
    color: "from-orange-400 to-coral-500",
    page: "/design"
  },
  {
    title: "Libraries",
    desc: "Creating reusable libraries, frameworks and SDKs to help developers build better software more efficiently.",
    img: "/opensource.jpg",
    color: "from-orange-400 to-coral-500",
    page: "/libraries"
  }
]

export default function Component() {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => {
      // Loop back to start if at end of playlist
      if (prevIndex === playlist.length - 1) {
        return 0
      }
      return prevIndex + 1
    })
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })

    const getPolyhedraCount = () => {
      if (window.innerWidth < 640) return 50 // Mobile
      if (window.innerWidth < 1024) return 100 // Tablet
      return 200 // Desktop
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const polyhedra = []
    const polyhedraCount = getPolyhedraCount()

    const colorSchemes = [
      new THREE.Color(1, 0.5, 0.4),
      new THREE.Color(1, 0.4, 0.3),
      new THREE.Color(1, 0.3, 0.2),
      new THREE.Color(1, 0.6, 0.5),
      new THREE.Color(0.95, 0.45, 0.35),
    ]

    const getShapeSize = () => {
      if (window.innerWidth < 640) return {
        min: 0.03,
        max: 0.15
      }
      return {
        min: 0.08,
        max: 0.3
      }
    }

    const shapeSize = getShapeSize()

    for (let i = 0; i < polyhedraCount; i++) {
      const width = Math.random() * shapeSize.max + shapeSize.min
      const height = Math.random() * shapeSize.max + shapeSize.min
      const depth = Math.random() * shapeSize.max + shapeSize.min

      const geometry = new THREE.BoxGeometry(width, height, depth)
      const material = new THREE.MeshBasicMaterial({
        color: colorSchemes[i % colorSchemes.length],
        transparent: true,
        opacity: 0.8,
      })

      const shape = new THREE.Mesh(geometry, material)
      const distance = Math.random() * 8 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)

      shape.position.set(
        distance * Math.sin(phi) * Math.cos(theta),
        distance * Math.sin(phi) * Math.sin(theta),
        distance * Math.cos(phi)
      )

      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      scene.add(shape)
      polyhedra.push(shape)
    }

    const createLightning = (target, duration = 300) => {
      const points = []
      const segments = Math.floor(Math.random() * 15) + 5
      const startPoint = new THREE.Vector3(0, 0, 0)
      const endPoint = new THREE.Vector3(target.x, target.y, target.z)

      for (let i = 0; i <= segments; i++) {
        const point = new THREE.Vector3().lerpVectors(startPoint, endPoint, i / segments)
        if (i !== 0 && i !== segments) {
          point.x += (Math.random() - 0.5) * 2
          point.y += (Math.random() - 0.5) * 2
          point.z += (Math.random() - 0.5) * 2
        }
        points.push(point)
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0xFFFF00,
        transparent: true,
        opacity: 0.7,
      })

      const lightning = new THREE.Line(geometry, material)
      scene.add(lightning)

      setTimeout(() => {
        scene.remove(lightning)
        geometry.dispose()
        material.dispose()
      }, duration)

      new TWEEN.Tween(material)
        .to({ opacity: 0 }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
    }

    const getLightningInterval = () => {
      if (window.innerWidth < 640) return 1000
      if (window.innerWidth < 1024) return 800
      return 600
    }

    const lightningInterval = setInterval(() => {
      const lightningCount = window.innerWidth < 640 ? 1 : 2
      for (let i = 0; i < lightningCount; i++) {
        const targetShape = polyhedra[Math.floor(Math.random() * polyhedra.length)]
        const randomOffset = new THREE.Vector3(
          targetShape.position.x + (Math.random() - 0.5) * 2,
          targetShape.position.y + (Math.random() - 0.5) * 2,
          targetShape.position.z + (Math.random() - 0.5) * 2
        )
        createLightning(randomOffset, 300)
      }
    }, getLightningInterval())

    const setCameraPosition = () => {
      if (window.innerWidth < 640) {
        camera.position.set(0, 0, 14)
      } else if (window.innerWidth < 1024) {
        camera.position.set(0, 0, 12)
      } else {
        camera.position.set(0, 0, 10)
      }
    }

    setCameraPosition()

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      TWEEN.update()

      const rotationSpeed = window.innerWidth < 640 ? 0.0003 : 0.0005
      scene.rotation.y += rotationSpeed

      const oscillationSpeed = window.innerWidth < 640 ? 0.0001 : 0.0002
      scene.rotation.x = Math.sin(Date.now() * oscillationSpeed) * 0.03
      scene.rotation.z = Math.cos(Date.now() * oscillationSpeed) * 0.03

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      setCameraPosition()
    }

    window.addEventListener('resize', handleResize)

    const handleOrientation = () => {
      setTimeout(handleResize, 100)
    }

    window.addEventListener('orientationchange', handleOrientation)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearInterval(lightningInterval)
      polyhedra.forEach(shape => {
        shape.geometry.dispose()
        shape.material.dispose()
      })
      while(scene.children.length > 0) {
        scene.remove(scene.children[0])
      }
      renderer.dispose()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientation)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF7F6E] to-[#FFA07A] font-outfit snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth relative">
      {/* Music Player - Now fixed position */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MusicPlayer 
          audioSrc={playlist[currentSongIndex].audioSrc}
          songTitle={playlist[currentSongIndex].songTitle}
          artistName={playlist[currentSongIndex].artistName}
          thumbnailSrc={playlist[currentSongIndex].thumbnailSrc}
          onEnded={handleSongEnd}
        />
      </div>

      {/* Hero Section */}
      <header className="h-screen w-full relative snap-start flex flex-shrink-0 motion-safe:animate-fadeIn">
        <canvas
          id="canvas"
          ref={canvasRef}
          className="absolute inset-0 bg-[radial-gradient(circle,#FF7F6E_0%,#FF8674_20%,#FF8D7A_40%,#FF957F_60%,#FF9C84_80%,#FFA07A_100%)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-1 absolute bottom-24 px-4 w-full max-w-[90vw] sm:max-w-none">
            <div className="text-content motion-safe:animate-slideUpFade">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl font-bold text-white hover:text-orange-50 transition-colors duration-300 transform hover:scale-105">
                Aaron Schriver
              </h1>
              <p className="hero-subtitle text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/90 hover:text-white motion-safe:animate-slideUpFadeDelay">
                Full Stack Developer & Freelancer
              </p>
            </div>
            <div className="arrow-container motion-safe:animate-slideUpFadeDelayLong">
              <div id="arrow" className="mt-16 animate-float flex justify-center hover:animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:text-orange-50 transition-all duration-300 hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 13l-7 9m0 0l-7-9m7 9V1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="h-screen w-full py-2 sm:py-8 px-3 bg-gradient-to-b from-[#FF8674] to-[#FFA07A] snap-start flex flex-shrink-0 items-center">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3 sm:mb-6 lg:mb-8 motion-safe:animate-slideDown">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-3 sm:gap-6 lg:gap-8">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 shrink-0 mx-auto md:mx-0 motion-safe:animate-slideRight">
              <img
                src="https://github.com/leafdevs.png"
                alt="Profile"
                className="w-full h-full rounded-full object-cover shadow-lg ring-2 sm:ring-4 ring-white/80 hover:ring-white transition-all duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex-1 space-y-3 md:space-y-4 lg:space-y-6 md:pl-6 lg:pl-8 motion-safe:animate-slideLeft">
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed hover:text-white transform hover:translate-x-2 transition-all duration-300">
                I'm a 17-year-old Full Stack Developer who's passionate about both coding and gaming.
                When I'm not programming, you can find me playing my favorite games like Overwatch
                and the Diablo series, which I've been following since 2018 when I first started with
                Diablo 3.
              </p>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed hover:text-white transform hover:translate-x-2 transition-all duration-300">
                My gaming journey through the Diablo series has been incredible - from Diablo 3,
                to Diablo 2 Resurrected, and now Diablo 4. This passion for gaming inspires my
                development work, especially in creating Minecraft mods and plugins.
              </p>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed hover:text-white transform hover:translate-x-2 transition-all duration-300">
                As a young developer, I'm excited to keep growing my skills while balancing my
                interests in technology and gaming. I believe my perspective as both a developer
                and gamer helps me create better digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen w-full py-12 sm:py-20 bg-gradient-to-b from-[#FF7F6E] to-[#FF9C84] snap-start flex flex-shrink-0">
        <div className="container mx-auto max-w-7xl px-4 pb-20 sm:pb-0"> {/* Added bottom padding on mobile */}
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-16 text-white motion-safe:animate-slideDown">
            My Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"> {/* Increased gap on mobile */}
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105 motion-safe:animate-fadeInStagger touch-manipulation"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 transition-all duration-500"> {/* Removed opacity toggle on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-0 transition-transform duration-500"> {/* Removed translate on mobile */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-4 opacity-100 transition-all duration-500 delay-100"> {/* Increased text size and removed opacity toggle on mobile */}
                      {project.desc}
                    </p>
                    <a
                      href={project.page}
                      className="inline-flex items-center space-x-2 text-white bg-[#FF7F6E] hover:bg-[#FF8674] px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <span className="text-sm font-medium">View Projects</span> {/* Increased text size on mobile */}
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen w-full py-12 sm:py-20 px-4 pb-24 sm:pb-32 bg-gradient-to-b from-[#FF8674] to-[#FFA07A] snap-start flex flex-shrink-0 items-center">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-8 sm:mb-16 motion-safe:animate-slideDown">
            Let's Connect
          </h2>
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 motion-safe:animate-slideLeft">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Send a Message</h3>
              <form className="space-y-4 sm:space-y-6" onSubmit={async (e) => {
                e.preventDefault()
                const formData = {
                  name: (e.target).name.value,
                  email: (e.target).email.value,
                  message: (e.target).message.value
                }

                try {
                  const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                      access_key: '8703b17a-bcb0-4ccd-92c9-f4082ec88df5',
                      ...formData
                    })
                  })

                  if (response.ok) {
                    alert('Message sent successfully!')
                    ;(e.target).reset()
                  } else {
                    throw new Error('Failed to send message')
                  }
                } catch (err) {
                  alert('Error sending message. Please try again.')
                  console.error(err)
                }
              }}>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 border-2 border-[#FF7F6E] rounded-xl text-[#FF7F6E] text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#FF8674] hover:border-[#FF8674] transition-all duration-300 transform hover:scale-[1.02]"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 border-2 border-[#FF7F6E] rounded-xl text-[#FF7F6E] text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#FF8674] hover:border-[#FF8674] transition-all duration-300 transform hover:scale-[1.02]"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 border-2 border-[#FF7F6E] rounded-xl text-[#FF7F6E] text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#FF8674] hover:border-[#FF8674] transition-all duration-300 transform hover:scale-[1.02]"
                    placeholder="What would you like to discuss?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF7F6E] text-white text-base sm:text-lg font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:bg-[#FF8674] hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-6 sm:space-y-8 motion-safe:animate-slideRight">
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contact Information</h3>
                <div className="space-y-4 sm:space-y-6">
                  <a
                    href="mailto:gammaleaf@gmail.com"
                    className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    gammaleaf@gmail.com
                  </a>
                  <p
                    className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    N/A
                  </p>
                  <p
                    className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    lesbiananimegirls
                  </p>
                  <p className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-white/90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Remote / Worldwide
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="https://github.com/LeafDevs"
                  className="motion-safe:animate-fadeInStagger flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm text-white p-4 sm:p-6 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="text-base sm:text-lg font-medium">GitHub</span>
                </a>
                <a
                  href="https://x.com/leaftopg"
                  className="motion-safe:animate-fadeInStagger flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm text-white p-4 sm:p-6 rounded-xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-base sm:text-lg font-medium">X</span>
                </a>
                <a
                  href="https://bsky.app/profile/leafdevs.bsky.social"
                  className="motion-safe:animate-fadeInStagger flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm text-white p-4 sm:p-6 rounded-xl hover:bg-sky-500 hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95 group col-span-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 600 530" fill="currentColor">
                    <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
                  </svg>
                  <span className="text-base sm:text-lg font-medium">Bluesky</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}