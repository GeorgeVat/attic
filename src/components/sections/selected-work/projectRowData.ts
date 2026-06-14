export interface ProjectRowData {
  slug?: string
  title: string
  type: string
  year: string
  client?: string | null
  /** One-line impact statement shown on hover. */
  impact: string
  /** Optional real image; when absent the card renders the `tint` gradient. */
  imageUrl?: string | null
  imageAlt?: string | null
  /** CSS gradient used as the card background when there is no image. */
  tint?: string
}
