import Image from 'next/image'
import { Header, Footer } from '@/app/components/layout'
import { DownloadButtons } from '@/app/components/ui'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

/** Shown for a badly formed, unknown or expired /r/<code> link. */
export default function SharedRoutineNotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="w-full py-20 lg:py-28">
        <div className={`${TAILWIND_CLASSES.container} max-w-2xl text-center`}>
          <div className="flex justify-center mb-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-[22.5%] border border-gray-200 bg-white shadow-lg">
              <Image
                src="/images/LIMBA@2x.png"
                alt="Limba app icon"
                width={160}
                height={53}
                priority
                className="h-auto w-16"
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">
            This routine link has expired or doesn&rsquo;t exist
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Ask your friend to share it again. In the meantime, Limba builds
            you your own stretch routine in under 5 minutes a day.
          </p>
          <DownloadButtons justify="center" />
        </div>
      </section>
      <Footer />
    </main>
  )
}
