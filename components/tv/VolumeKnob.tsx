'use client'

import { useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useClickSound } from '@/hooks/useClickSound'

const MIN_ROT = -135
const MAX_ROT = 135

function rotationToVolume(rotation: number): number {
  const clamped = Math.max(MIN_ROT, Math.min(MAX_ROT, rotation))
  return Math.round(((clamped - MIN_ROT) / (MAX_ROT - MIN_ROT)) * 100)
}

function volumeToRotation(volume: number): number {
  return ((volume / 100) * (MAX_ROT - MIN_ROT)) + MIN_ROT
}

// Generate dot marks around the knob arc (like the reference image)
const DOTS = Array.from({ length: 11 }, (_, i) => ({
  rotation: MIN_ROT + (i / 10) * (MAX_ROT - MIN_ROT),
}))

interface VolumeKnobProps {
  volume: number
  onChange: (volume: number) => void
}

export default function VolumeKnob({ volume, onChange }: VolumeKnobProps) {
  const rotation = useMotionValue(volumeToRotation(volume))
  const knobRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const center = useRef({ x: 0, y: 0 })
  const lastAngle = useRef(0)
  const lastClickVol = useRef(volume)
  const { playClick } = useClickSound()

  const getAngle = (clientX: number, clientY: number) => {
    return Math.atan2(clientY - center.current.y, clientX - center.current.x) * (180 / Math.PI)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    const el = knobRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    center.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    lastAngle.current = getAngle(e.clientX, e.clientY)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const angle = getAngle(e.clientX, e.clientY)
    let delta = angle - lastAngle.current
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    lastAngle.current = angle
    const newRot = Math.max(MIN_ROT, Math.min(MAX_ROT, rotation.get() + delta))
    rotation.set(newRot)
    const vol = rotationToVolume(newRot)
    onChange(vol)
    // Play click every 5 volume units
    if (Math.abs(vol - lastClickVol.current) >= 5) {
      playClick()
      lastClickVol.current = vol
    }
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  const CONTAINER_SIZE = 120
  const KNOB_SIZE = 72
  const DOT_RADIUS = 50

  return (
    <div className="flex flex-col items-center gap-0 select-none">
      {/* VOLUME label at top */}
      <span
        className="text-zinc-400 tracking-[0.15em] uppercase mb-1"
        style={{ fontFamily: 'var(--font-vt323)', fontSize: 13 }}
      >
        VOLUME
      </span>

      <div className="relative" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>
        {/* Dot indicators around the arc */}
        {DOTS.map((dot, i) => {
          const rad = ((dot.rotation - 90) * Math.PI) / 180
          const x = CONTAINER_SIZE / 2 + DOT_RADIUS * Math.cos(rad)
          const y = CONTAINER_SIZE / 2 + DOT_RADIUS * Math.sin(rad)
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                width: 5,
                height: 5,
                background: '#52525b',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
              }}
              aria-hidden="true"
            />
          )
        })}

        {/* MIN / MAX labels */}
        <span
          className="absolute text-zinc-500"
          style={{
            fontFamily: 'var(--font-vt323)',
            fontSize: 11,
            bottom: 8,
            left: 6,
          }}
        >
          MIN
        </span>
        <span
          className="absolute text-zinc-500"
          style={{
            fontFamily: 'var(--font-vt323)',
            fontSize: 11,
            bottom: 8,
            right: 6,
          }}
        >
          MAX
        </span>

        {/* Knob with outer bezel */}
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
          {/* Outer ring / bezel */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #4a4a4f 0%, #1a1a1c 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          />

          <motion.div
            ref={knobRef}
            className="absolute rounded-full knob-drag"
            style={{
              rotate: rotation,
              inset: 4,
              background: 'radial-gradient(circle at 40% 35%, #5a5a5f 0%, #3a3a3f 30%, #2a2a2f 70%, #1a1a1c 100%)',
              boxShadow:
                'inset 0 4px 8px rgba(255,255,255,0.1), inset 0 -4px 8px rgba(0,0,0,0.6)',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Indicator line */}
            <div
              className="absolute"
              style={{
                top: '12%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 3,
                height: '24%',
                background: '#e4e4e7',
                borderRadius: 2,
              }}
            />
            {/* Center cap */}
            <div
              className="absolute rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 22,
                height: 22,
                background: 'radial-gradient(circle at 40% 30%, #6a6a70 0%, #3a3a3f 50%, #1a1a1d 100%)',
                boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
