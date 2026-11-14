'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { TAILWIND_CLASSES } from '@/app/lib/constants'
import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import { RoutinePlayer } from './player/RoutinePlayer'
import { unlockAudio } from './player/cues'
import { sendShareEvent } from './shareEvents'

interface SharedRoutineExperienceProps {
  code: string
  senderUserId: string | null
  stretches: PlayableStretch[]
  oneLink: string | null
}

function newDistinctId(): string | null {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : null
}

/**
 * The interactive part of /r/<code>: reports the open, offers "Start routine",
 * runs the browser player and reports a completion. One anonymous id per tab
 * (memory only, no cookies or storage) ties the open and completion together.
 */
export function SharedRoutineExperience({ code, senderUserId, stretches, oneLink }: SharedRoutineExperienceProps) {
  const distinctId = useRef<string | null>(null)
  const idForTab = useCallback(() => {
    distinctId.current = distinctId.current ?? newDistinctId()
    return distinctId.current
  }, [])

  // Strict Mode runs effects twice in dev; the ref keeps it to one event.
  const openSent = useRef(false)
  useEffect(() => {
    if (openSent.current) return
    openSent.current = true
    sendShareEvent('routine_share_link_opened', { code, senderUserId, distinctId: idForTab() })
  }, [code, senderUserId, idForTab])

  const [run, setRun] = useState(0)
  const open = run > 0

  const start = () => {
    unlockAudio() // must happen inside the click for browsers to allow sound
    setRun((n) => n + 1)
  }
  const close = useCallback(() => setRun(0), [])
  const completed = useCallback(() => {
    sendShareEvent('routine_share_completed', { code, senderUserId, distinctId: idForTab() })
  }, [code, senderUserId, idForTab])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={start}
        className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.primary} ${TAILWIND_CLASSES.button.sizes.lg}`}
      >
        Start routine
      </button>
      {open && (
        <RoutinePlayer
          key={run}
          code={code}
          stretches={stretches}
          oneLink={oneLink}
          onClose={close}
          onCompleted={completed}
        />
      )}
    </>
  )
}
