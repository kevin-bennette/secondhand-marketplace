import { useState } from 'react'
import { ProductImage } from '../common/ProductImage'

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const current = images[Math.min(index, images.length - 1)]

  return (
    <div>
      <ProductImage src={current} alt={title} className="aspect-[4/3] w-full" />
      {images.length > 1 && (
        <div className="flex gap-2 px-4 pt-3" role="tablist" aria-label="Photos">
          {images.map((src, i) => (
            <button
              key={`${i}-${src.slice(-12)}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`overflow-hidden rounded-lg border-2 ${i === index ? 'border-primary' : 'border-transparent'}`}
            >
              <ProductImage src={src} alt="" className="h-12 w-12" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
