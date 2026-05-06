'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

const DECADES = ['60s', '70s', '80s', '90s', '00s', '10s', '20s'] as const
export type Decade = (typeof DECADES)[number]

// Place each decade label around the circle (clockwise from top-left)
// Positions in degrees (0 = top, going clockwise)
const DECADE_ANGLES: Record<Decade, number> = {
  '60s': -154,
  '70s': -102,
  '80s': -51,
  '90s': 0,
  '00s': 51,
  '10s': 102,
  '20s': 154,
}

const SNAP_ANGLES = Object.values(DECADE_ANGLES)

function snapToNearest(angle: number): number {
  return SNAP_ANGLES.reduce((prev, curr) =>
    Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev
  )
}

function angleToDecade(angle: number): Decade {
  const snapped = snapToNearest(angle)
  return (Object.keys(DECADE_ANGLES) as Decade[]).find(
    (d) => DECADE_ANGLES[d] === snapped
  ) as Decade
}

interface ChannelKnobProps {
  currentDecade: Decade | null
  onChange: (decade: Decade) => void
}

export default function ChannelKnob({ currentDecade, onChange }: ChannelKnobProps) {
  const rotation = useMotionValue(currentDecade ? DECADE_ANGLES[currentDecade] : 0)
  const knobRef = useRef<HTMLDivElement>(null)

  // Animate knob to the correct position when decade changes externally (e.g. randomiser)
  useEffect(() => {
    if (currentDecade) {
      animate(rotation, DECADE_ANGLES[currentDecade], { duration: 0.3, ease: 'easeOut' })
    }
  }, [currentDecade])
  const dragging = useRef(false)
  const startAngle = useRef(0)
  const startRotation = useRef(0)

  const getAngle = (clientX: number, clientY: number) => {
    const el = knobRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    return (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI + 90
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    startAngle.current = getAngle(e.clientX, e.clientY)
    startRotation.current = rotation.get()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const currentAngle = getAngle(e.clientX, e.clientY)
    let delta = currentAngle - startAngle.current
    // Normalize delta to [-180, 180]
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    const newRot = Math.max(-154, Math.min(154, startRotation.current + delta))
    rotation.set(newRot)
  }

  const handlePointerUp = () => {
    if (!dragging.current) return
    dragging.current = false
    const snapped = snapToNearest(rotation.get())
    animate(rotation, snapped, { duration: 0.15, ease: 'easeOut' })
    const decade = angleToDecade(snapped)
    onChange(decade)
  }

  const handleClick = (decade: Decade) => {
    const angle = DECADE_ANGLES[decade]
    animate(rotation, angle, { duration: 0.25, ease: 'easeOut' })
    onChange(decade)
  }

  const CONTAINER_SIZE = 180
  const KNOB_SIZE = 100
  const LABEL_RADIUS = 72

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <span
        className="text-zinc-400 text-sm tracking-[0.2em] uppercase"
        style={{ fontFamily: 'var(--font-vt323)', letterSpacing: '0.18em', fontSize: 13 }}
      >
        CHANNEL
      </span>

      <div className="relative" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>
        {/* Decade labels arranged around the knob */}
        {DECADES.map((decade) => {
          const angleDeg = DECADE_ANGLES[decade]
          const rad = ((angleDeg - 90) * Math.PI) / 180
          const x = CONTAINER_SIZE / 2 + LABEL_RADIUS * Math.cos(rad)
          const y = CONTAINER_SIZE / 2 + LABEL_RADIUS * Math.sin(rad)
          const isActive = currentDecade === decade

          return (
            <button
              key={decade}
              onClick={() => handleClick(decade)}
              className={`absolute font-bold transition-all duration-200 focus:outline-none ${isActive ? 'decade-label-active' : 'decade-label'}`}
              style={{
                fontFamily: 'var(--font-vt323)',
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                color: isActive ? '#22c55e' : '#52525b',
                fontSize: isActive ? 18 : 14,
                lineHeight: 1,
                fontWeight: isActive ? 900 : 700,
                textShadow: isActive 
                  ? '0 0 12px rgba(34, 197, 94, 0.6), 0 0 24px rgba(34, 197, 94, 0.3)' 
                  : '0 2px 4px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              aria-label={`Select ${decade} channel`}
            >
              {decade}
            </button>
          )
        })}

        {/* Knob body - enlarged with better 3D gradient */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: KNOB_SIZE,
            height: KNOB_SIZE,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Outer ring / bezel with enhanced shadow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #5a5a5f 0%, #0a0a0c 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          />
          
          <motion.div
            ref={knobRef}
            className="absolute rounded-full knob-drag"
            style={{
              rotate: rotation,
              inset: 6,
              background: 'radial-gradient(circle at 35% 35%, #6a6a6f 0%, #4a4a4f 25%, #2a2a2f 70%, #1a1a1c 100%)',
              boxShadow:
                'inset 0 6px 12px rgba(255,255,255,0.15), inset 0 -6px 12px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Indicator line - glowing red */}
            <div
              className="absolute"
              style={{
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 5,
                height: '22%',
                background: 'linear-gradient(to bottom, #ff4444, #cc1111)',
                borderRadius: 2,
                boxShadow: '0 0 10px #ff4444, 0 0 20px #ff000088, 0 2px 4px rgba(0,0,0,0.5)',
              }}
            />
            {/* Center cap with enhanced metallic gradient */}
            <div
              className="absolute rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 32,
                height: 32,
                background: 'radial-gradient(circle at 40% 30%, #8a8a95 0%, #4a4a4f 40%, #1a1a1d 100%)',
                boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
