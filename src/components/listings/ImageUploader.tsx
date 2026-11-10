import { ImagePlus, X } from 'lucide-react'
import { useRef, useState, type ChangeEvent } from 'react'
import { ACCEPTED_IMAGE_TYPES, readImageFile } from '../../utils/image'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  error?: string
  max?: number
}

/** Photo picker with live previews. The first photo is used as the cover image. */
export function ImageUploader({ images, onChange, error, max = 4 }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState<string>()
  const [busy, setBusy] = useState(false)

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, max - images.length)
    event.target.value = ''
    if (files.length === 0) return
    setBusy(true)
    setUploadError(undefined)
    try {
      const results = await Promise.all(files.map(readImageFile))
      onChange([...images, ...results])
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  const remove = (index: number) => onChange(images.filter((_, i) => i !== index))
  const message = uploadError ?? error

  return (
    <div className="flex flex-col gap-2">
      <input ref={inputRef} type="file" accept={ACCEPTED_IMAGE_TYPES.join(',')} multiple hidden onChange={handleFiles} aria-label="Upload photos" />

      {images.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-field text-muted hover:border-primary hover:text-primary ${
            message ? 'border-red-400' : 'border-gray-300'
          }`}
        >
          <ImagePlus className="h-8 w-8" />
          <span className="text-sm font-semibold">{busy ? 'Processing…' : 'Add photos'}</span>
          <span className="text-xs">Up to {max} images · JPG, PNG or WebP</span>
        </button>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-2xl border border-line">
            <img src={images[0]} alt="Cover photo preview" className="aspect-[16/10] w-full object-cover" />
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">Cover</span>
            <button
              type="button"
              onClick={() => remove(0)}
              aria-label="Remove cover photo"
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.slice(1).map((src, index) => (
              <div key={`${index}-${src.slice(-12)}`} className="relative overflow-hidden rounded-xl border border-line">
                <img src={src} alt={`Photo ${index + 2} preview`} className="aspect-square w-full object-cover" />
                <button
                  type="button"
                  onClick={() => remove(index + 1)}
                  aria-label={`Remove photo ${index + 2}`}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {images.length < max && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label="Add another photo"
                className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-muted hover:border-primary hover:text-primary"
              >
                <ImagePlus className="h-5 w-5" />
              </button>
            )}
          </div>
        </>
      )}

      {message && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {message}
        </p>
      )}
    </div>
  )
}
