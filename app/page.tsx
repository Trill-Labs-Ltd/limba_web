import { Header, Footer } from '@/app/components/layout'
import {
  HeroSection,
  ValuePropSection,
  LearnMoreSection,
  BetaLaunchSection,
} from '@/app/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-50 to-white">
      <Header />
      <HeroSection />
      <ValuePropSection />
      <LearnMoreSection />
      <BetaLaunchSection />
      <Footer />
    </main>
  )
}
