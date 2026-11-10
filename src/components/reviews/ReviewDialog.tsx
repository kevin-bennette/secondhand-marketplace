import { useState, type FormEvent } from 'react'
import { useCurrentUser } from '../../hooks/useAuth'
import { useReviews } from '../../hooks/useReviews'
import { useToast } from '../../hooks/useToast'
import type { Transaction } from '../../types/transaction'
import { formatDate, formatPrice } from '../../utils/format'
import { Button } from '../common/Button'
import { TextArea } from '../common/FormFields'
import { Modal } from '../common/Modal'
import { ProductImage } from '../common/ProductImage'
import { StarInput } from './StarInput'

interface ReviewDialogProps {
  transaction: Transaction | null
  revieweeName: string
  onClose: () => void
}

/** Rating + written review form for a completed transaction. */
export function ReviewDialog({ transaction, revieweeName, onClose }: ReviewDialogProps) {
  return (
    <Modal open={transaction !== null} title={`Review ${revieweeName}`} onClose={onClose}>
      {transaction && <ReviewForm key={transaction.id} transaction={transaction} onDone={onClose} />}
    </Modal>
  )
}

function ReviewForm({ transaction, onDone }: { transaction: Transaction; onDone: () => void }) {
  const user = useCurrentUser()
  const { submitReview } = useReviews()
  const { showToast } = useToast()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<{ rating?: string; comment?: string; form?: string }>({})

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = {
      rating: rating ? undefined : 'Please choose a star rating.',
      comment: comment.trim().length >= 10 ? undefined : 'Please write at least 10 characters.',
    }
    if (nextErrors.rating || nextErrors.comment) {
      setErrors(nextErrors)
      return
    }
    const result = submitReview({ transactionId: transaction.id, reviewerId: user.id, rating, comment })
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    showToast('Thanks! Your review has been published.')
    onDone()
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl bg-field p-3">
        <ProductImage src={transaction.listingImage} alt={transaction.listingTitle} className="h-12 w-12 rounded-lg" />
        <div className="min-w-0 text-sm">
          <p className="truncate font-semibold">{transaction.listingTitle}</p>
          <p className="text-xs text-muted">
            {formatPrice(transaction.price)} · completed {formatDate(transaction.completedAt)}
          </p>
        </div>
      </div>
      <div>
        <StarInput
          value={rating}
          onChange={(value) => {
            setRating(value)
            setErrors((current) => ({ ...current, rating: undefined }))
          }}
        />
        {errors.rating && (
          <p role="alert" className="text-center text-xs font-medium text-red-600">
            {errors.rating}
          </p>
        )}
      </div>
      <TextArea
        label="Your review"
        placeholder="How was the item and the hand-over?"
        value={comment}
        maxLength={500}
        onChange={(event) => {
          setComment(event.target.value)
          setErrors((current) => ({ ...current, comment: undefined }))
        }}
        error={errors.comment}
      />
      {errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errors.form}
        </p>
      )}
      <Button type="submit" fullWidth>
        Submit review
      </Button>
    </form>
  )
}
