const MAX_DIMENSION = 900
const MAX_FILE_BYTES = 10 * 1024 * 1024

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/**
 * Reads an uploaded photo and downscales it to a compact JPEG data URL so that
 * it can be stored with the listing in LocalStorage (which has a ~5MB quota).
 */
export async function readImageFile(file: File): Promise<string> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) throw new Error('Please choose a JPG, PNG, WebP or GIF image.')
  if (file.size > MAX_FILE_BYTES) throw new Error('Images must be smaller than 10MB.')

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Could not read that image.'))
    reader.readAsDataURL(file)
  })

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image()
    element.onload = () => resolve(element)
    element.onerror = () => reject(new Error('That file does not look like a valid image.'))
    element.src = dataUrl
  })

  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)
  const context = canvas.getContext('2d')
  if (!context) return dataUrl
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.75)
}
