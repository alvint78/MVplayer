import { videos } from "../src/data/videos"

interface VideoEntry {
  title: string
  artist: string
  videoId: string
  year: number
  tags: string[]
}

const allEntries: VideoEntry[] = Object.values(videos).flat()

const seenIds = new Map<string, VideoEntry[]>()

const invalidIds: VideoEntry[] = []
const duplicateIds: [string, VideoEntry[]][] = []

const VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/

for (const entry of allEntries) {
  // Check invalid IDs
  if (!VIDEO_ID_REGEX.test(entry.videoId)) {
    invalidIds.push(entry)
  }

  // Track duplicates
  if (!seenIds.has(entry.videoId)) {
    seenIds.set(entry.videoId, [])
  }

  seenIds.get(entry.videoId)!.push(entry)
}

// Find duplicate IDs used by multiple songs
for (const [id, entries] of seenIds.entries()) {
  const uniqueSongs = new Set(
    entries.map((e) => `${e.artist}-${e.title}`)
  )

  if (uniqueSongs.size > 1) {
    duplicateIds.push([id, entries])
  }
}

console.log("\\n====================")
console.log("INVALID VIDEO IDS")
console.log("====================")
console.table(invalidIds)

console.log("\\n====================")
console.log("DUPLICATE VIDEO IDS")
console.log("====================")

for (const [id, entries] of duplicateIds) {
  console.log(`\\nVIDEO ID: ${id}`)
  console.table(entries)
}
