// Hand-written content types for the static (no-CMS) site. These mirror the
// shapes the section components consume, so the components stay data-agnostic.
import type { SERVICE_ICONS } from '@/components/sections/services/serviceIcons'

export type ServiceIconKey = keyof typeof SERVICE_ICONS

export interface ServiceItem {
  title: string
  description: string
  icon?: ServiceIconKey | null
  id?: string | null
}

export interface ManifestoData {
  paragraph1?: { line: string; id?: string | null }[] | null
  paragraph2?: string | null
}

export interface FaqData {
  eyebrow?: string | null
  heading?: string | null
  items?: { question: string; answer: string; id?: string | null }[] | null
}

export interface ContactTypeItem {
  type: string
  id?: string | null
}

/** The single content bundle, replacing the old Payload `content` global. */
export interface Content {
  services?: ServiceItem[] | null
  manifesto?: ManifestoData
  faq?: FaqData
  contactTypes?: ContactTypeItem[] | null
}
