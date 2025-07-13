import { useState, useEffect, useCallback } from 'react';
import { Review } from '@/lib/types';
import { getReviewsByDrama } from '@/lib/review';

export const useReviews = (dramaSlug: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshReviews = useCallback(() => {
    setLoading(true);
    const dramaReviews = getReviewsByDrama(dramaSlug);
    setReviews(dramaReviews);
    setLoading(false);
  }, [dramaSlug]);

  useEffect(() => {
    refreshReviews();
  }, [refreshReviews]);

  const sortReviews = (sortBy: 'newest' | 'baka' | 'likes') => {
    const sorted = [...reviews].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortBy === 'baka') return b.bakaLevel - a.bakaLevel;
      if (sortBy === 'likes') return b.likes - a.likes;
      return 0;
    });
    setReviews(sorted);
  };

  const filterByBakaLevel = (level: number) => {
    const allReviews = getReviewsByDrama(dramaSlug);
    const filtered = level === 0 ? allReviews : allReviews.filter(r => r.bakaLevel === level);
    setReviews(filtered);
  };

  return {
    reviews,
    loading,
    refreshReviews,
    sortReviews,
    filterByBakaLevel
  };
};