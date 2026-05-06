'use client'

import { useCallback } from 'react'

export function useClickSound() {
  const playClick = useCallback(() => {
    try {
      const audio = new Audio('/tv-knob-click.ogg')
      audio.volume = 0.4
      audio.currentTime = 0
      audio.play().catch(() => {
        console.log('Audio playback failed')
      })
    } catch (e) {
      console.log('Audio not available')
    }
  }, [])
  
  return { playClick }
}
