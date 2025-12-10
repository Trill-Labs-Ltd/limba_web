'use client'

import { useState } from 'react'
import { Header, Footer } from '@/app/components/layout'
import {
  HeroSection,
  ValuePropSection,
  LearnMoreSection,
  BetaLaunchSection,
} from '@/app/components/sections'
import { WaitlistModal } from '@/app/components/ui'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState('Landing page - Unknown')

  const openModal = (source: string) => {
    setModalSource(source)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onJoinWaitlist={() => openModal('Landing page - Header')} />
      <HeroSection onJoinWaitlist={() => openModal('Landing page - Hero')} />
      <ValuePropSection />
      <LearnMoreSection />
      <BetaLaunchSection onJoinWaitlist={() => openModal('Landing page - Beta')} />
      <Footer />
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source={modalSource}
      />
    </main>
  )
}
