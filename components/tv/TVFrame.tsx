'use client'

import { forwardRef } from 'react'
import ChannelKnob, { type Decade } from './ChannelKnob'
import VolumeKnob from './VolumeKnob'
import Controls from './Controls'
import Screen, { type ScreenHandle } from './Screen'
import type { ColorMode } from '@/app/page'

interface VideoMeta {
  title: string
  artist: string
  year: number
}

interface TVFrameProps {
  isMobile: boolean
  currentDecade: Decade | null
  volume: number
  isStatic: boolean
  isPlaying: boolean
  nowPlaying: VideoMeta | null
  isPowered: boolean
  brightness: number
  contrast: number
  colorMode: ColorMode
  scanlinesOn: boolean
  onDecadeChange: (decade: Decade) => void
  onVolumeChange: (volume: number) => void
  onPowerToggle: () => void
  onBrightnessChange: (val: number) => void
  onContrastChange: (val: number) => void
  onColorModeChange: (mode: ColorMode) => void
  onScanlinesToggle: () => void
  onPlayerReady: (player: YT.Player) => void
  onPlayerStateChange: (state: number) => void
}

const TVFrame = forwardRef<ScreenHandle, TVFrameProps>(function TVFrame(
  {
    isMobile,
    currentDecade,
    volume,
    isStatic,
    isPlaying,
    nowPlaying,
    isPowered,
    brightness,
    contrast,
    colorMode,
    scanlinesOn,
    onDecadeChange,
    onVolumeChange,
    onPowerToggle,
    onBrightnessChange,
    onContrastChange,
    onColorModeChange,
    onScanlinesToggle,
    onPlayerReady,
    onPlayerStateChange,
  },
  ref
) {
  return (
    <div
      className={`relative inline-flex tv-shadow w-full ${isMobile ? 'flex-col' : 'flex-col'}`}
      style={{
        background: 'linear-gradient(180deg, #2a2a2d 0%, #1f1f22 30%, #1a1a1c 100%)',
        borderRadius: 16,
        padding: 16,
        maxWidth: 900,
        width: '100%',
      }}
    >
      {isMobile ? (
        // MOBILE LAYOUT: Stack vertically
        <>
          {/* Screen - full width on top */}
          <div
            className="relative w-full"
            style={{
              background: '#0a0a0a',
              borderRadius: 16,
              padding: 14,
              boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.95), inset 0 0 0 3px #151517',
              marginBottom: 12,
            }}
          >
            <Screen
              ref={ref}
              isStatic={isStatic}
              isPlaying={isPlaying && isPowered}
              videoId={null}
              nowPlaying={nowPlaying}
              brightness={brightness}
              contrast={contrast}
              colorMode={colorMode}
              scanlinesOn={scanlinesOn}
              onPlayerReady={onPlayerReady}
              onPlayerStateChange={onPlayerStateChange}
            />
          </div>

          {/* NOW PLAYING - centered below screen */}
          <div
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#52525b',
              fontFamily: 'var(--font-vt323)',
              minHeight: 20,
              marginBottom: 12,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {nowPlaying && (
              <span>{nowPlaying.artist} • {nowPlaying.year}</span>
            )}
          </div>

          {/* Controls row - horizontal on mobile */}
          <div
            className="flex items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(180deg, #27272a 0%, #1f1f22 100%)',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 12,
            }}
          >
            {/* Channel knob - scaled down to 90px */}
            <div style={{ flex: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}>
                <ChannelKnob currentDecade={currentDecade} onChange={onDecadeChange} />
              </div>
            </div>

            {/* Branding + Speaker in center */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 16,
                    letterSpacing: '-0.02em',
                    color: '#e4e4e7',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    fontStyle: 'italic',
                  }}
                >
                  RetroTV
                </span>
                <div className="flex h-1.5 w-8 rounded overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  <div className="flex-1" style={{ background: '#ef4444' }} />
                  <div className="flex-1" style={{ background: '#22c55e' }} />
                  <div className="flex-1" style={{ background: '#3b82f6' }} />
                </div>
              </div>
              <div
                style={{ 
                  width: 80,
                  height: 32,
                  background: `repeating-linear-gradient(
                    to bottom,
                    #1a1a1c 0px,
                    #1a1a1c 2px,
                    #0f0f10 2px,
                    #0f0f10 4px
                  )`,
                  borderRadius: 4,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Volume knob - scaled down to 90px */}
            <div style={{ flex: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}>
                <VolumeKnob volume={volume} onChange={onVolumeChange} />
              </div>
            </div>
          </div>
        </>
      ) : (
        // DESKTOP LAYOUT: Side by side
        <>
          {/* Main body: screen + right panel */}
          <div className="flex gap-0">
            {/* Screen area - takes ~70% of width */}
            <div
              className="relative flex-1"
              style={{
                background: '#0a0a0a',
                borderRadius: 16,
                padding: 14,
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.95), inset 0 0 0 3px #151517',
                marginRight: 12,
              }}
            >
              <Screen
                ref={ref}
                isStatic={isStatic}
                isPlaying={isPlaying && isPowered}
                videoId={null}
                nowPlaying={nowPlaying}
                brightness={brightness}
                contrast={contrast}
                colorMode={colorMode}
                scanlinesOn={scanlinesOn}
                onPlayerReady={onPlayerReady}
                onPlayerStateChange={onPlayerStateChange}
              />
            </div>

            {/* Right control panel - fixed width */}
            <div
              className="flex flex-col"
              style={{ 
                width: 200,
                gap: 0,
              }}
            >
              {/* Channel section */}
              <div
                className="flex flex-col items-center"
                style={{
                  background: 'linear-gradient(180deg, #27272a 0%, #1f1f22 100%)',
                  borderRadius: '12px 12px 0 0',
                  padding: '12px 8px 8px 8px',
                  borderBottom: '1px solid #18181b',
                }}
              >
                <ChannelKnob currentDecade={currentDecade} onChange={onDecadeChange} />
              </div>

              {/* Branding + Speaker section */}
              <div
                className="flex flex-col"
                style={{
                  background: 'linear-gradient(180deg, #1f1f22 0%, #1a1a1c 100%)',
                  padding: '12px 16px',
                  borderBottom: '1px solid #18181b',
                }}
              >
                {/* RetroTV branding */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-zinc-200 italic"
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 20,
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    RetroTV
                  </span>
                  {/* RGB stripe */}
                  <div className="flex h-2 flex-1 rounded overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div className="flex-1" style={{ background: '#ef4444' }} />
                    <div className="flex-1" style={{ background: '#22c55e' }} />
                    <div className="flex-1" style={{ background: '#3b82f6' }} />
                  </div>
                </div>
                
                {/* Speaker grille - horizontal lines */}
                <div
                  className="rounded"
                  style={{ 
                    height: 56,
                    background: `repeating-linear-gradient(
                      to bottom,
                      #1a1a1c 0px,
                      #1a1a1c 3px,
                      #0f0f10 3px,
                      #0f0f10 6px
                    )`,
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Volume section */}
              <div
                className="flex flex-col items-center flex-1"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1c 0%, #18181a 100%)',
                  borderRadius: '0 0 12px 12px',
                  padding: '8px 8px 12px 8px',
                  justifyContent: 'center',
                }}
              >
                <VolumeKnob volume={volume} onChange={onVolumeChange} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom controls strip - seamlessly attached to TV body */}
      <div
        style={{
          background: 'linear-gradient(180deg, #27272a 0%, #1f1f22 100%)',
          overflow: 'hidden',
        }}
      >
        <Controls 
          isPowered={isPowered} 
          onPowerToggle={onPowerToggle}
          brightness={brightness}
          contrast={contrast}
          colorMode={colorMode}
          scanlinesOn={scanlinesOn}
          onBrightnessChange={onBrightnessChange}
          onContrastChange={onContrastChange}
          onColorModeChange={onColorModeChange}
          onScanlinesToggle={onScanlinesToggle}
        />
      </div>
    </div>
  )
})

export default TVFrame
