import {
  Bot,
  Globe,
  Handshake,
  PenTool,
  Shield,
  ShoppingBag,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  web: Globe,
  systems: Workflow,
  ai: Bot,
  commerce: ShoppingBag,
  design: PenTool,
  partnership: Handshake,
  team: Users,
  durable: Shield,
  fast: Zap,
}
