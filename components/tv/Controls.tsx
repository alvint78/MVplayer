'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { useClickSound } from '@/hooks/useClickSound'
import type { ColorMode } from '@/app/page'

interface ControlsProps {
  isPowered: boolean
  onPowerToggle: () => void
  brightness: number
  contrast: number
  colorMode: ColorMode
  onBrightnessChange: (val: number) => void
  onContrastChange: (val: number) => void
  onColorModeChange: (mode: ColorMode) => void
  onRandomise: () => void
}

// Small rotary knob for BRIGHT/CONTRAST (like reference image)
function SmallKnob({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (val: number) => void
}) {
  const isMobile = useIsMobile()
  const KNOB_SIZE = isMobile ? 28 : 32

  const MIN_ROT = -135
  const MAX_ROT = 135

  const valueToRotation = (v: number) => ((v / 200) * (MAX_ROT - MIN_ROT)) + MIN_ROT
  const rotationToValue = (r: number) => Math.round(((r - MIN_ROT) / (MAX_ROT - MIN_ROT)) * 200)

  const rotation = useMotionValue(valueToRotation(value))
  const knobRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const center = useRef({ x: 0, y: 0 })
  const lastAngle = useRef(0)
  const lastClickVal = useRef(value)
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
    const val = rotationToValue(newRot)
    onChange(val)
    // Play click every 10 units
    if (Math.abs(val - lastClickVal.current) >= 10) {
      playClick()
      lastClickVal.current = val
    }
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  const handleDoubleClick = () => {
    animate(rotation, valueToRotation(100), { duration: 0.2 })
    onChange(100)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative"
        style={{ width: KNOB_SIZE, height: KNOB_SIZE, padding: 4 }}
      >
        <div
          className="absolute inset-4 rounded-full"
          style={{
            background: 'linear-gradient(145deg, #3a3a3f 0%, #1a1a1c 100%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
          }}
        />
        <motion.div
          ref={knobRef}
          className="absolute rounded-full knob-drag"
          style={{
            rotate: rotation,
            inset: isMobile ? 6 : 2,
            background: 'radial-gradient(circle at 40% 35%, #4a4a4f 0%, #2a2a2f 60%, #1a1a1c 100%)',
            boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.08), inset 0 -2px 3px rgba(0,0,0,0.4)',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleDoubleClick}
        >
          {/* Indicator line */}
          <div
            className="absolute"
            style={{
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2,
              height: '30%',
              background: '#d4d4d8',
              borderRadius: 1,
            }}
          />
        </motion.div>
      </div>
      <span
        className="text-zinc-500 uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-vt323)', fontSize: isMobile ? 9 : 11 }}
      >
        {label}
      </span>
    </div>
  )
}

// Color mode knob (cycles through modes)
function ColorKnob({
  colorMode,
  onChange,
}: {
  colorMode: ColorMode
  onChange: (mode: ColorMode) => void
}) {
  const modes: ColorMode[] = ['color', 'bw', 'sepia']
  const { playClick } = useClickSound()

  const modeColors = {
    color: 'rgba(255, 255, 255, 0)',
    bw: 'rgba(120, 120, 120, 0.5)',
    sepia: 'rgba(200, 140, 60, 0.5)',
  }

  const handleClick = () => {
    playClick()
    const currentIndex = modes.indexOf(colorMode)
    const nextIndex = (currentIndex + 1) % modes.length
    onChange(modes[nextIndex])
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="relative focus:outline-none"
        style={{ width: 32, height: 32 }}
        aria-label={`Color mode: ${colorMode}`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(145deg, #3a3a3f 0%, #1a1a1c 100%)',
            boxShadow: `0 2px 6px rgba(0,0,0,0.6), 0 0 10px ${modeColors[colorMode]}`,
            transition: 'box-shadow 0.2s',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: 2,
            background: 'radial-gradient(circle at 40% 35%, #4a4a4f 0%, #2a2a2f 60%, #1a1a1c 100%)',
            boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.08), inset 0 -2px 3px rgba(0,0,0,0.4)',
          }}
        />
      </button>
      <span
        className="text-zinc-500 uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-vt323)', fontSize: 11 }}
      >
        COLOR
      </span>
      <span
        style={{
          fontFamily: 'var(--font-vt323)',
          fontSize: 9,
          color: '#666',
          marginTop: 2,
        }}
      >
        {colorMode === 'color' ? '●' : colorMode === 'bw' ? '○' : '◐'}
      </span>
    </div>
  )
}


// Randomiser button — plays a random song from any decade
function RandomiserButton({ onRandomise }: { onRandomise: () => void }) {
  const { playClick } = useClickSound()

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => {
          playClick()
          onRandomise()
        }}
        className="focus:outline-none"
        style={{
          width: 48,
          height: 24,
          background: 'linear-gradient(145deg, #2a2a2f 0%, #18181a 100%)',
          borderRadius: 6,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)',
        }}
        aria-label="Play random song from any decade"
      />
      <span
        className="text-zinc-500 uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-vt323)', fontSize: 11 }}
      >
        RANDOM
      </span>
    </div>
  )
}

export default function Controls({
  isPowered,
  onPowerToggle,
  brightness,
  contrast,
  colorMode,
  onBrightnessChange,
  onContrastChange,
  onColorModeChange,
  onRandomise,
}: ControlsProps) {
  const isMobile = useIsMobile()
  const [pressing, setPressing] = useState(false)
  const { playClick } = useClickSound()

  const handlePowerClick = () => {
    playClick()
    setPressing(true)
    onPowerToggle()
    setTimeout(() => setPressing(false), 150)
  }

  return (
    <div
      className="flex items-center justify-between"
      style={{
        paddingTop: isMobile ? 12 : 12,
        paddingBottom: isMobile ? 12 : 12,
        paddingLeft: isMobile ? 12 : 20,
        paddingRight: isMobile ? 12 : 20,
        background: 'linear-gradient(180deg, #27272a 0%, #1f1f22 100%)',
        gap: isMobile ? 8 : 16,
      }}
    >
      {/* Power button with LED */}
      <div className="flex flex-col items-center gap-1" style={{ minWidth: isMobile ? 40 : 50 }}>
        <button
          onClick={handlePowerClick}
          className={`relative focus:outline-none ${pressing ? 'power-press' : ''}`}
          style={{
            width: isMobile ? 24 : 36,
            height: isMobile ? 24 : 36,
            borderRadius: '50%',
            background: isPowered
              ? 'radial-gradient(circle at 40% 30%, #ef4444 0%, #b91c1c 60%, #7f1d1d 100%)'
              : 'radial-gradient(circle at 40% 30%, #52525b 0%, #27272a 100%)',
            boxShadow: isPowered
              ? '0 0 12px 3px rgba(239, 68, 68, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)'
              : 'inset 0 2px 4px rgba(0,0,0,0.4)',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
          aria-label={isPowered ? 'Power off' : 'Power on'}
        />
        <span
          className="text-zinc-500 uppercase tracking-wide"
          style={{ fontFamily: 'var(--font-vt323)', fontSize: isMobile ? 9 : 11 }}
        >
          POWER
        </span>
      </div>

      {/* Center control knobs */}
      <div className="flex items-center" style={{ gap: isMobile ? 12 : 24 }}>
        <SmallKnob
          label="BRIGHT"
          value={brightness}
          onChange={onBrightnessChange}
        />
        <SmallKnob
          label="CONTRAST"
          value={contrast}
          onChange={onContrastChange}
        />
        <ColorKnob
          colorMode={colorMode}
          onChange={onColorModeChange}
        />
      </div>

      {/* Randomiser button */}
      <div style={{ minWidth: isMobile ? 40 : 50 }}>
        <RandomiserButton onRandomise={onRandomise} />
      </div>
    </div>
  )
}
