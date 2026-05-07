'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import TVFrame from '@/components/tv/TVFrame'
import type { ScreenHandle } from '@/components/tv/Screen'
import type { Decade } from '@/lib/videos'
import { getRandomVideo, getFailedVideos, markVideoAsFailed } from '@/lib/videos'
import { useClickSound } from '@/hooks/useClickSound'

const HISTORY_LIMIT = 5
const ALL_DECADES: Decade[] = ['60s', '70s', '80s', '90s', '00s', '10s', '20s']

function getStoredVolume(): number {
  if (typeof window === 'undefined') return 50
  const stored = localStorage.getItem('retrotv-volume')
  return stored !== null ? parseInt(stored, 10) : 50
}

export type ColorMode = 'color' | 'bw' | 'sepia'

export default function RetroTVPage() {
  const screenRef = useRef<ScreenHandle>(null)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-0 sm:p-10"
      style={{
        background: '#0a0a0a',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: '100%',
        }}
      >
        <PageContent screenRef={screenRef} />
      </div>
    </div>
  )
}

// Extract the page logic into a separate component
function PageContent({ screenRef }: { screenRef: React.RefObject<ScreenHandle | null> }) {
  const isMobile = useIsMobile()
  const playerRef = useRef<YT.Player | null>(null)

  const [currentDecade, setCurrentDecade] = useState<Decade | null>(null)
  const [volume, setVolume] = useState<number>(50)
  const [isStatic, setIsStatic] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPowered, setIsPowered] = useState(true)
  const [history, setHistory] = useState<string[]>([])
  const [nowPlaying, setNowPlaying] = useState<{
    title: string
    artist: string
    year: number
  } | null>(null)
  const [failedVideos, setFailedVideos] = useState<string[]>([])
  const [skipNotice, setSkipNotice] = useState<string | null>(null)

  // Display adjustment state
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [colorMode, setColorMode] = useState<ColorMode>('color')

  const playbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPlayingRef = useRef(false)
  const currentVideoIdRef = useRef<string>('')
  const failedVideosRef = useRef<string[]>([])
  const skipNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleVideoFailedRef = useRef<((videoId: string, decade: Decade) => void) | null>(null)

  // Restore volume and failed videos from localStorage on mount
  useEffect(() => {
    const stored = getStoredVolume()
    setVolume(stored)
    const failed = getFailedVideos()
    setFailedVideos(failed)
    failedVideosRef.current = failed
  }, [])

  // Sync volume with player
  useEffect(() => {
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(volume)
      } catch {}
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('retrotv-volume', String(volume))
    }
  }, [volume])

  // Power on/off
  useEffect(() => {
    if (!isPowered) {
      setIsPlaying(false)
      if (playerRef.current) {
        try { playerRef.current.pauseVideo() } catch {}
      }
    }
  }, [isPowered])

  const handlePlayerReady = useCallback((player: YT.Player) => {
    playerRef.current = player
    const stored = getStoredVolume()
    player.setVolume(stored)
  }, [])

  const loadDecade = useCallback(
    (decade: Decade) => {
      if (!isPowered) return

      const failed = failedVideosRef.current
      const video =
        getRandomVideo(decade, history, failed) ??
        getRandomVideo(decade, [], failed) ??
        getRandomVideo(decade, [], [])

      if (!video) return

      setNowPlaying({ title: video.title, artist: video.artist, year: video.year })
      setHistory((prev) => {
        const next = [video.videoId, ...prev].slice(0, HISTORY_LIMIT)
        return next
      })

      // Trigger static transition
      setIsStatic(true)
      setIsPlaying(false)
      isPlayingRef.current = false

      setTimeout(() => {
        if (screenRef.current) {
          screenRef.current.loadVideo(video.videoId)
        }
        currentVideoIdRef.current = video.videoId

        // 3-second timeout: if playback hasn't started, skip the video
        if (playbackTimeoutRef.current) clearTimeout(playbackTimeoutRef.current)
        playbackTimeoutRef.current = setTimeout(() => {
          if (!isPlayingRef.current) {
            handleVideoFailedRef.current?.(video.videoId, decade)
          }
        }, 3000)

        // Fallback static clear
        setTimeout(() => {
          setIsStatic(false)
        }, 800)
      }, 500)
    },
    [history, isPowered]
  )

  // Refs to allow handlePlayerStateChange to read fresh values without
  // becoming a new function reference (which would break YT event listener)
  const currentDecadeRef = useRef<Decade | null>(null)
  useEffect(() => { currentDecadeRef.current = currentDecade }, [currentDecade])

  const loadDecadeRef = useRef(loadDecade)
  useEffect(() => { loadDecadeRef.current = loadDecade }, [loadDecade])

  const handlePlayerStateChange = useCallback((state: number) => {
    // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
    if (state === 1) {
      isPlayingRef.current = true
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current)
        playbackTimeoutRef.current = null
      }
      setIsPlaying(true)
      setIsStatic(false)
    } else if (state === 0) {
      setIsPlaying(false)
      // Auto-advance to next random video in the same decade
      if (currentDecadeRef.current) {
        loadDecadeRef.current(currentDecadeRef.current)
      }
    }
  }, [])

  const handleDecadeChange = useCallback(
    (decade: Decade) => {
      setCurrentDecade(decade)
      loadDecade(decade)
    },
    [loadDecade]
  )

  const handleRandomise = useCallback(() => {
    if (!isPowered) return
    const decade = ALL_DECADES[Math.floor(Math.random() * ALL_DECADES.length)]
    setCurrentDecade(decade)
    loadDecade(decade)
  }, [isPowered, loadDecade])

  const handleVideoFailed = useCallback(
    (videoId: string, decade: Decade) => {
      markVideoAsFailed(videoId)
      const updated = getFailedVideos()
      setFailedVideos(updated)
      failedVideosRef.current = updated

      if (skipNoticeTimerRef.current) clearTimeout(skipNoticeTimerRef.current)
      setSkipNotice('Video unavailable, playing next...')
      skipNoticeTimerRef.current = setTimeout(() => setSkipNotice(null), 1500)

      loadDecade(decade)
    },
    [loadDecade]
  )

  // Keep ref in sync so the playback timeout closure can call the latest version
  useEffect(() => { handleVideoFailedRef.current = handleVideoFailed }, [handleVideoFailed])

  const handlePlayerError = useCallback((_code: number) => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current)
      playbackTimeoutRef.current = null
    }
    if (currentVideoIdRef.current && currentDecadeRef.current) {
      handleVideoFailedRef.current?.(currentVideoIdRef.current, currentDecadeRef.current)
    }
  }, [])

  const handleVolumeChange = useCallback((vol: number) => {
    setVolume(vol)
  }, [])

  const handlePowerToggle = useCallback(() => {
    setIsPowered((prev) => !prev)
  }, [])

  const handleBrightnessChange = useCallback((val: number) => {
    setBrightness(val)
  }, [])

  const handleContrastChange = useCallback((val: number) => {
    setContrast(val)
  }, [])

  const handleColorModeChange = useCallback((mode: ColorMode) => {
    setColorMode(mode)
  }, [])

  const handlePlaylistSelect = useCallback(
    (videoId: string, decade: Decade, title: string, artist: string, year: number) => {
      if (!isPowered) return
      setCurrentDecade(decade)
      setNowPlaying({ title, artist, year })
      setHistory((prev) => [videoId, ...prev].slice(0, HISTORY_LIMIT))
      setIsStatic(true)
      setIsPlaying(false)
      setTimeout(() => {
        if (screenRef.current) screenRef.current.loadVideo(videoId)
        setTimeout(() => setIsStatic(false), 800)
      }, 500)
    },
    [isPowered]
  )

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4"
      style={{
        background: 'linear-gradient(180deg, #09090b 0%, #0f0d0a 50%, #1a1512 100%)',
      }}
    >
      {/* Ambient desk surface glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(30, 25, 20, 0.6) 0%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient glow behind TV */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 500,
          background:
            'radial-gradient(ellipse at center, rgba(20,180,80,0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <TVFrame
        ref={screenRef}
        isMobile={isMobile}
        currentDecade={currentDecade}
        volume={volume}
        isStatic={isStatic || !isPowered}
        isPlaying={isPlaying}
        nowPlaying={nowPlaying}
        isPowered={isPowered}
        brightness={brightness}
        contrast={contrast}
        colorMode={colorMode}
        onDecadeChange={handleDecadeChange}
        onVolumeChange={handleVolumeChange}
        onPowerToggle={handlePowerToggle}
        onBrightnessChange={handleBrightnessChange}
        onContrastChange={handleContrastChange}
        onColorModeChange={handleColorModeChange}
        onRandomise={handleRandomise}
        onPlaylistItemSelect={handlePlaylistSelect}
        onPlayerReady={handlePlayerReady}
        onPlayerStateChange={handlePlayerStateChange}
        onPlayerError={handlePlayerError}
        skipNotice={skipNotice}
      />
    </main>
  )
}
