interface ReviewItemProps {
  drama: string
  rating: string
  comment: string
  author: string
  date: string
  isNew?: boolean
  isHot?: boolean
}

export default function ReviewItem({ 
  drama, 
  rating, 
  comment, 
  author, 
  date, 
  isNew = false, 
  isHot = false 
}: ReviewItemProps) {
  return (
    <div className="review-item">
      <div className="review-drama">
        {drama}
        {isNew && <span className="new-icon">NEW</span>}
        {isHot && <span className="hot-icon">HOT</span>}
      </div>
      <div className="review-rating">{rating}</div>
      <div className="review-comment">{comment}</div>
      <div className="review-meta">投稿者：{author}　{date}</div>
    </div>
  )
}