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
import { CONTENT, PROJECTS } from '@/data/content'

export default function HomePage() {
  return (
    <main id="main">
      <HeroSection />
      <TrustMarquee />
      <SelectedWorkSection projects={PROJECTS} />
      <ServicesSection services={CONTENT.services} />
      <ProcessSection />
      <StatsBand />
      <ManifestoSection manifesto={CONTENT.manifesto} />
      <TestimonialsSection />
      <FaqSection faq={CONTENT.faq} />
      <ContactBand contactTypes={CONTENT.contactTypes} />
    </main>
  )
}
