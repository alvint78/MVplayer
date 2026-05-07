'use client'

import { videos, type VideoEntry, type Decade } from '@/lib/videos'

const DECADES: Decade[] = ['60s', '70s', '80s', '90s', '00s', '10s', '20s']

interface PlaylistPanelProps {
  nowPlaying: { title: string; artist: string; year: number } | null
  onSelect: (videoId: string, decade: Decade, title: string, artist: string, year: number) => void
  onClose: () => void
}

export default function PlaylistPanel({ nowPlaying, onSelect, onClose }: PlaylistPanelProps) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: 'rgba(8, 8, 8, 0.97)',
        borderRadius: 16,
        zIndex: 50,
        fontFamily: 'var(--font-vt323)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          padding: '10px 14px 8px',
          borderBottom: '1px solid #1a3a1a',
        }}
      >
        <span style={{ color: '#22c55e', fontSize: 18, letterSpacing: '0.15em' }}>
          ▶ PLAYLIST
        </span>
        <button
          onClick={onClose}
          className="focus:outline-none"
          style={{
            color: '#4a4a4f',
            fontSize: 18,
            lineHeight: 1,
            padding: '0 4px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#22c55e')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#4a4a4f')}
          aria-label="Close playlist"
        >
          ✕
        </button>
      </div>

      {/* Scrollable song list */}
      <div className="overflow-y-auto flex-1" style={{ padding: '6px 0' }}>
        {DECADES.map((decade) => (
          <div key={decade}>
            {/* Decade header */}
            <div
              style={{
                padding: '6px 14px 3px',
                color: '#ef4444',
                fontSize: 13,
                letterSpacing: '0.2em',
                borderTop: '1px solid #1a1a1c',
              }}
            >
              {decade}
            </div>

            {/* Songs */}
            {videos[decade].map((video: VideoEntry) => {
              const isActive =
                nowPlaying?.title === video.title && nowPlaying?.artist === video.artist
              return (
                <button
                  key={video.videoId}
                  onClick={() => onSelect(video.videoId, decade, video.title, video.artist, video.year)}
                  className="w-full text-left focus:outline-none"
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 6,
                    padding: '3px 14px',
                    background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent',
                    transition: 'background 0.1s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  <span style={{ color: isActive ? '#22c55e' : '#3a3a3f', fontSize: 11, flexShrink: 0 }}>
                    {isActive ? '▶' : '·'}
                  </span>
                  <span
                    style={{
                      color: isActive ? '#22c55e' : '#52525b',
                      fontSize: 13,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {video.title}
                  </span>
                  <span style={{ color: '#3a3a3f', fontSize: 11, flexShrink: 0 }}>
                    {video.artist} ({video.year})
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div
        style={{
          padding: '5px 14px',
          borderTop: '1px solid #1a1a1c',
          color: '#2a2a2f',
          fontSize: 10,
          letterSpacing: '0.1em',
          flexShrink: 0,
        }}
      >
        CLICK BLUE BAR TO CLOSE
      </div>
    </div>
  )
}
