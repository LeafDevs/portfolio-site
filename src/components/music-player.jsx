import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../libs/utils'

const MusicPlayerRoot = ({ children, className }) => {
  return (
    <div className={cn("fixed bottom-4 right-4", className)}>
      {children}
    </div>
  )
}

const MusicPlayerContainer = ({ children, className, isMinimized }) => {
  return (
    <div className={cn(
      "transition-all duration-500 ease-in-out",
      isMinimized ? 'w-12' : 'w-[22rem]',
      className
    )}>
      {children}
    </div>
  )
}

const MusicPlayerContent = ({ children, className, isMinimized }) => {
  return (
    <div className={cn(
      "bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300",
      isMinimized ? 'p-3' : 'p-4',
      className
    )}>
      {children}
    </div>
  )
}

const MusicPlayerMinimizeButton = ({ onClick, className, isMinimized }) => {
  const Icon = isMinimized ? ChevronLeft : ChevronRight
  return (
    <Icon
      onClick={onClick}
      className={cn(
        "w-6 h-6 text-white hover:text-[#FF7F6E] transition-colors cursor-pointer",
        className
      )}
    />
  )
}

const MusicPlayerThumbnail = ({ src, alt, className }) => {
  return (
    <img 
      src={src}
      alt={alt}
      className={cn("w-16 h-16 rounded-lg object-cover shadow-lg", className)}
    />
  )
}

const MusicPlayerInfo = ({ title, artist, titleClassName, artistClassName }) => {
  return (
    <div>
      <h3 className={cn("text-white font-semibold truncate text-sm", titleClassName)}>{title}</h3>
      <p className={cn("text-white/70 text-xs truncate", artistClassName)}>{artist}</p>
    </div>
  )
}

const MusicPlayerVolumeControl = ({ volume, onVolumeChange, className }) => {
  return (
    <div className={cn(
      "absolute top-12 right-4 bg-black/70 backdrop-blur-md rounded-lg p-3 flex items-center gap-2 z-50 shadow-xl border border-white/10",
      className
    )}>
      <div className="relative w-24 h-1">
        <div className="absolute inset-0 bg-white/20 rounded-full" />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#FF7F6E] to-[#FFA07A] rounded-full"
          style={{width: `${volume * 100}%`}}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md pointer-events-none"
          style={{left: `calc(${volume * 100}% - 4px)`}}
        />
      </div>
    </div>
  )
}

const MusicPlayerProgress = ({ currentTime, duration, onSeek, className }) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div 
        className="relative w-full h-1 cursor-pointer rounded-full bg-white/20"
        onClick={onSeek}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#FF7F6E] to-[#FFA07A] rounded-full"
          style={{width: `${(currentTime / duration) * 100}%`}}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md pointer-events-none"
          style={{left: `calc(${(currentTime / duration) * 100}% - 4px)`}}
        />
      </div>
      <div className="flex justify-between text-white/70 text-xs">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

const MusicPlayerControls = ({ onPlayPause, isPlaying, className }) => {
  return (
    <div className={cn("flex items-center justify-center gap-6", className)}>
      <button className="text-white/70 hover:text-[#FF7F6E] transition-colors p-1 bg-transparent">
        <SkipBack className="w-5 h-5" />
      </button>
      <button 
        onClick={onPlayPause}
        className="bg-gradient-to-br from-[#FF7F6E] to-[#FFA07A] text-white rounded-full p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <button className="text-white/70 hover:text-[#FF7F6E] transition-colors p-1 bg-transparent">
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  )
}

const MusicPlayer = ({ audioSrc, songTitle, artistName, thumbnailSrc, className, onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load()
      audioRef.current.play().catch(error => {
        console.log("Playback prevented:", error)
        setIsPlaying(false)
      })
    }
  }, [audioSrc])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      if (onEnded) {
        onEnded()
      }
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause) 
      audio.removeEventListener('ended', handleEnded)
    }
  }, [onEnded])

  const togglePlay = () => {
    if (!audioRef.current || !audioSrc) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(error => {
        console.log("Playback prevented:", error)
      })
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <MusicPlayerRoot className={className}>
      <MusicPlayerContainer isMinimized={isMinimized}>
        <MusicPlayerContent isMinimized={isMinimized}>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            preload="auto"
          />

          {isMinimized ? (
            <MusicPlayerMinimizeButton 
              onClick={() => setIsMinimized(false)}
              isMinimized={true}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {thumbnailSrc && (
                    <MusicPlayerThumbnail 
                      src={thumbnailSrc}
                      alt={`${songTitle} thumbnail`}
                    />
                  )}
                  <MusicPlayerInfo 
                    title={songTitle}
                    artist={artistName}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 
                    className="text-white/70 w-5 h-5 cursor-pointer hover:text-[#FF7F6E] transition-colors"
                    onClick={() => setShowVolume(!showVolume)}
                  />
                  <MusicPlayerMinimizeButton 
                    onClick={() => setIsMinimized(true)}
                    isMinimized={false}
                  />
                </div>
              </div>

              {showVolume && (
                <MusicPlayerVolumeControl 
                  volume={volume}
                  onVolumeChange={handleVolumeChange}
                />
              )}

              <MusicPlayerProgress 
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />

              <MusicPlayerControls 
                onPlayPause={togglePlay}
                isPlaying={isPlaying}
              />
            </div>
          )}
        </MusicPlayerContent>
      </MusicPlayerContainer>
    </MusicPlayerRoot>
  )
}


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

export {
  MusicPlayer,
  MusicPlayerRoot,
  MusicPlayerContainer,
  MusicPlayerContent,
  MusicPlayerMinimizeButton,
  MusicPlayerThumbnail,
  MusicPlayerInfo,
  MusicPlayerVolumeControl,
  MusicPlayerProgress,
  MusicPlayerControls
}
