'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface StaticOverlayProps {
  active: boolean
}

export default function StaticOverlay({ active }: StaticOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const lastFrameTime = useRef(0)
  const FPS = 24
  const [showText, setShowText] = useState(true)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    // Generate authentic TV static noise
    for (let i = 0; i < data.length; i += 4) {
      const rand = Math.random()
      let val: number
      
      if (rand < 0.3) {
        val = Math.floor(Math.random() * 30)
      } else if (rand < 0.85) {
        val = Math.floor(Math.random() * 120 + 40)
      } else {
        val = Math.floor(Math.random() * 100 + 155)
      }
      
      const tint = Math.random() * 10 - 5
      data[i]     = Math.max(0, Math.min(255, val + tint))
      data[i + 1] = Math.max(0, Math.min(255, val))
      data[i + 2] = Math.max(0, Math.min(255, val - tint * 0.5))
      data[i + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)

    // Draw "NO SIGNAL" text in a black rounded badge (like reference)
    if (showText) {
      const text = 'NO SIGNAL'
      ctx.font = 'bold 28px VT323, monospace'
      const textMetrics = ctx.measureText(text)
      const textWidth = textMetrics.width
      const textHeight = 28
      const paddingX = 24
      const paddingY = 12
      const badgeWidth = textWidth + paddingX * 2
      const badgeHeight = textHeight + paddingY * 2
      const badgeX = (width - badgeWidth) / 2
      const badgeY = (height - badgeHeight) / 2

      // Draw rounded rectangle background
      const radius = 6
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
      ctx.beginPath()
      ctx.moveTo(badgeX + radius, badgeY)
      ctx.lineTo(badgeX + badgeWidth - radius, badgeY)
      ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + radius)
      ctx.lineTo(badgeX + badgeWidth, badgeY + badgeHeight - radius)
      ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY + badgeHeight, badgeX + badgeWidth - radius, badgeY + badgeHeight)
      ctx.lineTo(badgeX + radius, badgeY + badgeHeight)
      ctx.quadraticCurveTo(badgeX, badgeY + badgeHeight, badgeX, badgeY + badgeHeight - radius)
      ctx.lineTo(badgeX, badgeY + radius)
      ctx.quadraticCurveTo(badgeX, badgeY, badgeX + radius, badgeY)
      ctx.closePath()
      ctx.fill()

      // Draw text
      ctx.fillStyle = '#e0e0e0'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, width / 2, height / 2)
    }
  }, [showText])

  // Blink text effect
  useEffect(() => {
    if (!active) return
    const blinkInterval = setInterval(() => {
      setShowText((prev) => !prev)
    }, 600)
    return () => clearInterval(blinkInterval)
  }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (active) {
      const loop = (timestamp: number) => {
        if (timestamp - lastFrameTime.current >= 1000 / FPS) {
          draw()
          lastFrameTime.current = timestamp
        }
        animRef.current = requestAnimationFrame(loop)
      }
      animRef.current = requestAnimationFrame(loop)
    } else {
      cancelAnimationFrame(animRef.current)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    return () => cancelAnimationFrame(animRef.current)
  }, [active, draw])

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={360}
      className="absolute inset-0 w-full h-full"
      style={{ 
        display: active ? 'block' : 'none',
        opacity: 0.95,
      }}
      aria-hidden="true"
    />
  )
}
