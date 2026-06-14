import type { ChatFrame } from './types'
import { ChatBubble } from './frames/ChatBubble'
import { FlowDiagramCard } from './frames/FlowDiagramCard'
import { MetricsCard } from './frames/MetricsCard'
import { TimelineCard } from './frames/TimelineCard'
import { SparklineCard } from './frames/SparklineCard'
import { SavingsCard } from './frames/SavingsCard'

export function FrameRenderer({ frame }: { frame: ChatFrame }) {
  if (frame.kind === 'user' || frame.kind === 'ai') {
    return <ChatBubble kind={frame.kind} text={frame.text} cta={frame.kind === 'ai' ? frame.cta : undefined} />
  }
  const card = frame.card
  switch (card.type) {
    case 'flow':
      return <FlowDiagramCard title={card.title} nodes={card.nodes} caption={card.caption} pulse={card.pulse} />
    case 'metrics':
      return <MetricsCard title={card.title} bars={card.bars} stats={card.stats} />
    case 'timeline':
      return <TimelineCard title={card.title} steps={card.steps} caption={card.caption} />
    case 'sparkline':
      return <SparklineCard title={card.title} points={card.points} stats={card.stats} />
    case 'savings':
      return <SavingsCard title={card.title} headline={card.headline} before={card.before} after={card.after} />
  }
}
