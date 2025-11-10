'use client';

import { useState } from 'react';
import { Star, Send, ThumbsUp } from 'lucide-react';
import { Product, ProductReview } from '../../../_types/product';

interface ProductReviewsProps {
  product: Product;
  reviews: ProductReview[];
  onSubmitReview: (rating: number, comment: string) => void;
  userHasPurchased: boolean;
}

export default function ProductReviews({
  product,
  reviews,
  onSubmitReview,
  userHasPurchased,
}: ProductReviewsProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmitReview(rating, comment);
    setRating(0);
    setComment('');
    setIsSubmitting(false);
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse();
  };

  const distribution = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Opiniones del Producto</h2>

        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {product.rating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              {product.reviews} {product.reviews === 1 ? 'opinión' : 'opiniones'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars, idx) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-20">
                  <span className="text-sm font-medium text-gray-700">{stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{
                      width: `${totalReviews > 0 ? (distribution[idx] / totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {distribution[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review */}
      {userHasPurchased && (
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Escribe tu opinión</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tu calificación
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {rating === 1 && 'Malo'}
                    {rating === 2 && 'Regular'}
                    {rating === 3 && 'Bueno'}
                    {rating === 4 && 'Muy bueno'}
                    {rating === 5 && 'Excelente'}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tu comentario
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos tu experiencia con este producto..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={rating === 0 || comment.trim() === '' || isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Enviando...' : 'Publicar opinión'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="border-t border-gray-200 pt-8 space-y-6">
        <h3 className="text-xl font-bold text-gray-900">
          Opiniones de compradores ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Aún no hay opiniones para este producto</p>
            {userHasPurchased && (
              <p className="text-sm text-blue-600 mt-2">¡Sé el primero en opinar!</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {review.userName}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.comment}
                </p>

                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  Útil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
