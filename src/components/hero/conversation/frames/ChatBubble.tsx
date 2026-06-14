import Link from 'next/link'

export function ChatBubble({
  kind,
  text,
  cta,
}: {
  kind: 'user' | 'ai'
  text: string
  cta?: { label: string; href: string }
}) {
  const isUser = kind === 'user'
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isUser
            ? 'max-w-[85%] rounded-[1.25rem] rounded-tr-sm bg-gradient-to-br from-accent to-sky px-4 py-2.5 text-sm leading-relaxed text-white shadow-[0_12px_26px_-14px_rgba(31,90,95,0.8)]'
            : 'max-w-[85%] rounded-[1.25rem] rounded-tl-sm border border-hairline bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-[0_10px_24px_-18px_rgba(18,37,36,0.5)]'
        }
      >
        {text}
        {cta && (
          <Link
            href={cta.href}
            className="btn-primary mt-2.5 inline-flex items-center gap-1 px-3 py-1.5 text-xs"
          >
            {cta.label} →
          </Link>
        )}
      </div>
    </div>
  )
}
