import { Header, Footer } from '@/app/components/layout'
import {
  HeroSection,
  ValuePropSection,
  LearnMoreSection,
  BetaLaunchSection,
} from '@/app/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ValuePropSection />
      <LearnMoreSection />
      <BetaLaunchSection />
      <Footer />
    </main>
  )
}
