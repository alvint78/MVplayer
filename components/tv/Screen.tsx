'use client'

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import StaticOverlay from './StaticOverlay'
import NowPlaying from './NowPlaying'
import type { ColorMode } from '@/app/page'

declare global {
  namespace YT {
    interface Player {
      loadVideoById(id: string): void
      playVideo(): void
      pauseVideo(): void
      destroy(): void
    }
  }
  interface Window {
    YT: {
      Player: new (
        container: HTMLElement,
        options: {
          width: string | number
          height: string | number
          videoId: string
          playerVars: Record<string, unknown>
          events: Record<string, (event: { target: YT.Player; data?: number }) => void>
        }
      ) => YT.Player
      PlayerState: {
        UNSTARTED: number
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface ScreenProps {
  isStatic: boolean
  isPlaying: boolean
  videoId: string | null
  nowPlaying: { title: string; artist: string; year: number } | null
  brightness: number
  contrast: number
  colorMode: ColorMode
  scanlinesOn: boolean
  onPlayerReady: (player: YT.Player) => void
  onPlayerStateChange: (state: number) => void
}

export interface ScreenHandle {
  loadVideo: (videoId: string) => void
}

const Screen = forwardRef<ScreenHandle, ScreenProps>(function Screen(
  { isStatic, isPlaying, videoId, nowPlaying, brightness, contrast, colorMode, scanlinesOn, onPlayerReady, onPlayerStateChange },
  ref
) {
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const playerReadyRef = useRef(false)

  useImperativeHandle(ref, () => ({
    loadVideo: (id: string) => {
      if (playerRef.current && playerReadyRef.current) {
        playerRef.current.loadVideoById(id)
      }
    },
  }))

  useEffect(() => {
    const initPlayer = () => {
      if (!playerContainerRef.current) return
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        width: '100%',
        height: '100%',
        videoId: '',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          enablejsapi: 1,
        },
        events: {
          onReady: (event) => {
            playerReadyRef.current = true
            onPlayerReady(event.target)
          },
          onStateChange: (event) => {
            if (event.data !== undefined) {
              onPlayerStateChange(event.data)
            }
          },
        },
      })
    }

    if (typeof window !== 'undefined') {
      if (window.YT && window.YT.Player) {
        initPlayer()
      } else {
        // Inject the script
        if (!document.getElementById('yt-iframe-api')) {
          const tag = document.createElement('script')
          tag.id = 'yt-iframe-api'
          tag.src = 'https://www.youtube.com/iframe_api'
          const firstScriptTag = document.getElementsByTagName('script')[0]
          firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
        }
        window.onYouTubeIframeAPIReady = initPlayer
      }
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch {}
        playerRef.current = null
        playerReadyRef.current = false
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Compute filter class based on color mode
  const getFilterClass = () => {
    if (colorMode === 'bw') return 'grayscale-mode'
    if (colorMode === 'sepia') return 'sepia-mode'
    return 'crt-display'
  }

  return (
    <div
      className="relative w-full overflow-hidden crt-flicker"
      style={{
        aspectRatio: '4 / 3',
        minWidth: '100%',
        borderRadius: '12% / 8%',
        background: '#000',
        boxShadow:
          'inset 0 0 80px 30px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,255,100,0.05), 0 0 20px rgba(0,255,100,0.1)',
        transform: 'perspective(600px) rotateX(2deg)',
        // Apply brightness and contrast as CSS custom properties
        ['--brightness' as string]: brightness / 100,
        ['--contrast' as string]: contrast / 100,
      }}
    >
      {/* YouTube iframe container - with display filter */}
      <div
        className={`absolute inset-0 w-full h-full ${getFilterClass()}`}
        style={{ 
          opacity: isPlaying && !isStatic ? 1 : 0, 
          transition: 'opacity 0.3s, filter 0.3s',
        }}
      >
        <div ref={playerContainerRef} className="w-full h-full" />
      </div>

      {/* Static noise - NO SIGNAL text is rendered on canvas inside StaticOverlay */}
      <StaticOverlay active={isStatic || (!isPlaying && !isStatic)} />

      {/* Deep vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at center, transparent 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)',
          borderRadius: 'inherit',
        }}
        aria-hidden="true"
      />

      {/* Scanlines overlay - conditional */}
      {scanlinesOn && (
        <div
          className="absolute inset-0 z-12 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            borderRadius: 'inherit',
          }}
          aria-hidden="true"
        />
      )}

      {/* CRT phosphor glow */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(100,255,150,0.02) 0%, transparent 60%)',
          borderRadius: 'inherit',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* Corner glare overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 20% 15%, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: 'inherit',
        }}
        aria-hidden="true"
      />

      {/* Bottom right subtle glare */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 30% 20% at 85% 90%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          borderRadius: 'inherit',
        }}
        aria-hidden="true"
      />

      {/* Now Playing bar */}
      {nowPlaying && isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
          <NowPlaying
            title={nowPlaying.title}
            artist={nowPlaying.artist}
            year={nowPlaying.year}
            visible={true}
          />
        </div>
      )}
    </div>
  )
})

export default Screen
