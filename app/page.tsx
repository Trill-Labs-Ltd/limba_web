'use client'

import { useState } from 'react'
import { Header, Footer } from '@/app/components/layout'
import {
  HeroSection,
  ValuePropSection,
  BetaLaunchSection,
} from '@/app/components/sections'
import { WaitlistModal } from '@/app/components/ui'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onJoinWaitlist={openModal} />
      <HeroSection onJoinWaitlist={openModal} />
      <ValuePropSection />
      <BetaLaunchSection onJoinWaitlist={openModal} />
      <Footer />
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source="web-app"
      />
    </main>
  )
}
