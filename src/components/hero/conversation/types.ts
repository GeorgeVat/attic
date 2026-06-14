export type CardPayload =
  | {
      type: 'flow'
      title: string
      nodes: string[]
      caption: string
      pulse?: boolean
    }
  | {
      type: 'metrics'
      title: string
      bars: number[]
      stats: { value: string; label: string }[]
    }
  | {
      type: 'timeline'
      title: string
      steps: { label: string; detail: string }[]
      caption: string
    }
  | {
      type: 'sparkline'
      title: string
      points: number[]
      stats: { value: string; label: string }[]
    }
  | {
      type: 'savings'
      title: string
      headline: string
      before: { label: string; value: number }
      after: { label: string; value: number }
    }

export type ChatFrame =
  | { kind: 'user'; text: string }
  | { kind: 'ai'; text: string; cta?: { label: string; href: string } }
  | { kind: 'card'; card: CardPayload }

export interface ScenarioFrame {
  /** ms after the previous frame finished appearing */
  delay: number
  frame: ChatFrame
}

export interface Scenario {
  id: string
  label: string
  frames: ScenarioFrame[]
}
