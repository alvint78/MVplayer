'use client'

interface NowPlayingProps {
  title: string
  artist: string
  year: number
  visible: boolean
}

export default function NowPlaying({ title, artist, year, visible }: NowPlayingProps) {
  if (!visible) return null

  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-3 py-1 flex items-center gap-2 z-20"
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
      }}
    >
      <span
        className="text-green-400 text-xl tracking-wide truncate"
        style={{ fontFamily: 'var(--font-vt323)', textShadow: '0 0 8px #4ade8099' }}
      >
        {title}
      </span>
      <span
        className="text-green-600 text-lg tracking-wide shrink-0"
        style={{ fontFamily: 'var(--font-vt323)' }}
      >
        — {artist} ({year})
      </span>
    </div>
  )
}
