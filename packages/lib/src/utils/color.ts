function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full  = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'))
    .join('')
}

export function interpolateColor(from: string, to: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(from)
  const [r2, g2, b2] = hexToRgb(to)
  return rgbToHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
  )
}

export function buildLevelColors(colors: string[], levels: number): string[] {
  if (colors.length >= levels) return colors.slice(0, levels)
  const last = colors[colors.length - 1] ?? '#216e39'
  return [...colors, ...Array<string>(levels - colors.length).fill(last)]
}

/**
 * Generate a discrete N-level palette from a single target color.
 * Level 0 = emptyColor (no data). Levels 1..N-1 interpolate from a
 * light tint of `toColor` (or explicit `fromColor`) to `toColor`.
 */
export function generatePalette(
  toColor:    string,
  levels:     number,
  emptyColor  = '#ebedf0',
  fromColor?: string,
): string[] {
  if (levels <= 1) return [emptyColor ?? '#ebedf0']
  const empty = emptyColor ?? '#ebedf0'
  // Start from colorFrom if given, otherwise use a very light tint (5% toward toColor)
  const start = fromColor ?? interpolateColor('#ffffff', toColor, 0.05)
  return [
    empty,
    ...Array.from({ length: levels - 1 }, (_, i) =>
      interpolateColor(start, toColor, (i + 1) / (levels - 1)),
    ),
  ]
}
