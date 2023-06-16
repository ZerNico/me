export class SeededRandom {
  private seed: string

  constructor(seed: string) {
    this.seed = seed
  }

  private hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.codePointAt(i)
      if (!char) continue
      hash = (hash << 5) - hash + char
      hash = Math.trunc(hash)
    }
    return hash
  }

  public nextInt(min: number, max: number): number {
    const hash = this.hashCode(this.seed)
    const range = max - min + 1
    const random = ((hash % range) + range) % range
    return min + random
  }
}

export const shuffleArray = <T>(array: T[], seed: string): T[] => {
  const random = new SeededRandom(seed)
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = random.nextInt(0, i)
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}
