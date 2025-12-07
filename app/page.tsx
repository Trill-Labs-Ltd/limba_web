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
  const [modalSource, setModalSource] = useState('landing_page')

  const openModal = (source: string) => {
    setModalSource(source)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onJoinWaitlist={() => openModal('header')} />
      <HeroSection onJoinWaitlist={() => openModal('hero')} />
      <ValuePropSection />
      <BetaLaunchSection onJoinWaitlist={() => openModal('beta_section')} />
      <Footer />
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source={modalSource}
      />
    </main>
  )
}
