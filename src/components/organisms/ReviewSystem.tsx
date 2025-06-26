
import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { TextArea } from '../atoms/TextArea';
import { Star, ThumbsUp, ThumbsDown, Flag, User } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
  variant?: string;
}

interface ReviewSystemProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onSubmitReview?: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'createdAt' | 'helpful' | 'notHelpful'>) => void;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({
  productId,
  reviews,
  averageRating,
  totalReviews,
  onSubmitReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: '',
    verified: false,
    images: []
  });
  const [sortBy, setSortBy] = useState('newest');

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.content.trim()) {
      onSubmitReview?.(newReview);
      setNewReview({ rating: 0, title: '', content: '', verified: false, images: [] });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-neutral-300 dark:text-neutral-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <Card variant="outlined" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                {averageRating.toFixed(1)}
              </span>
              {renderStars(averageRating, 'lg')}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Based on {totalReviews} reviews
            </p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </Button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {rating}
                  </span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card variant="outlined" padding="lg">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Write Your Review
          </h3>
          
          <div className="space-y-6">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Your Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-300 dark:text-neutral-600 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Review Title (Optional)
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                placeholder="Summarize your experience"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              />
            </div>

            {/* Review Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Your Review
              </label>
              <TextArea
                value={newReview.content}
                onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                placeholder="Share your thoughts about this product..."
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="primary"
                onClick={handleSubmitReview}
                disabled={newReview.rating === 0 || !newReview.content.trim()}
              >
                Submit Review
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Customer Reviews ({totalReviews})
          </h3>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        {sortedReviews.map((review) => (
          <Card key={review.id} variant="outlined" padding="lg">
            <div className="space-y-4">
              {/* Review Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    {review.userAvatar ? (
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-neutral-500" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {review.userName}
                      </h4>
                      {review.verified && (
                        <Badge variant="success" size="sm">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating, 'sm')}
                      <span className="text-sm text-neutral-500">
                        {review.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>

              {/* Review Content */}
              <div>
                {review.title && (
                  <h5 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    {review.title}
                  </h5>
                )}
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {review.content}
                </p>
                {review.variant && (
                  <p className="text-sm text-neutral-500 mt-2">
                    Variant: {review.variant}
                  </p>
                )}
              </div>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex space-x-2">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center space-x-4 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <button className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                  <ThumbsDown className="w-4 h-4" />
                  <span>Not helpful ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
