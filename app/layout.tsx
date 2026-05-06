import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: 'RetroTV — Channel Surf Through the Decades',
  description: 'An interactive retro CRT TV that lets you surf music videos through the decades, from the 60s to the 20s.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${vt323.variable} bg-zinc-950`}>
      <body className="antialiased bg-zinc-950">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
