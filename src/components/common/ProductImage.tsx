import { ImageOff } from 'lucide-react'
import { useState } from 'react'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
}

/** Image with a graceful fallback when the file is missing or fails to load. */
export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`} role="img" aria-label={alt}>
        <ImageOff className="h-6 w-6" />
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
