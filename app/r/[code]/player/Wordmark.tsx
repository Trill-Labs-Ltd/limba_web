'use client'

/**
 * Writes "Limba" as the app's LIMBA wordmark (the logo artwork), sized to the
 * capital height of the text around it, like the app's "Ask LIMBA" header.
 */
export function WithWordmark({
  text,
  fontSize,
}: {
  text: string
  fontSize: number
}) {
  const parts = text.split('Limba')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/LIMBA@2x.png"
              alt="Limba"
              className="inline-block w-auto align-baseline"
              style={{ height: fontSize * 0.72 }}
            />
          )}
        </span>
      ))}
    </>
  )
}
