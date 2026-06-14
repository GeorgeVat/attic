import { HeroSection } from '@/components/hero/HeroSection'
import { TrustMarquee } from '@/components/sections/trust/TrustMarquee'
import { SelectedWorkSection } from '@/components/sections/selected-work/SelectedWorkSection'
import { ServicesSection } from '@/components/sections/services/ServicesSection'
import { ProcessSection } from '@/components/sections/process/ProcessSection'
import { StatsBand } from '@/components/sections/stats/StatsBand'
import { ManifestoSection } from '@/components/sections/manifesto/ManifestoSection'
import { TestimonialsSection } from '@/components/sections/testimonials/TestimonialsSection'
import { FaqSection } from '@/components/sections/faq/FaqSection'
import { ContactBand } from '@/components/sections/contact/ContactBand'
import { getProjects, getStats } from '@/data/content'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main id="main">
      <HeroSection dict={dict.hero} locale={locale} />
      <TrustMarquee dict={dict.trust} />
      <SelectedWorkSection dict={dict.selectedWork} projects={getProjects(dict)} locale={locale} />
      <ServicesSection dict={dict.services} />
      <ProcessSection dict={dict.process} />
      <StatsBand items={getStats(dict)} />
      <ManifestoSection dict={dict.manifesto} />
      <TestimonialsSection dict={dict.testimonials} />
      <FaqSection dict={dict.faq} />
      <ContactBand dict={dict.contactBand} form={dict.contactForm} />
    </main>
  )
}
