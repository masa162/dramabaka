import { useState, useEffect, useCallback } from 'react';
import { 
  getLikedReviews, 
  saveLikedReviews, 
  incrementLike, 
  decrementLike,
  getTotalLikeCount,
  getLikeStats
} from '@/lib/likes';
import { Review } from '@/lib/types';

export const useLikes = (dramaSlug: string) => {
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [animatingLikes, setAnimatingLikes] = useState<Set<string>>(new Set());

  // 初期化
  useEffect(() => {
    const liked = getLikedReviews(dramaSlug);
    setLikedReviews(liked);
  }, [dramaSlug]);

  // いいねの切り替え
  const toggleLike = useCallback((reviewId: string) => {
    const isLiked = likedReviews.has(reviewId);
    
    // アニメーション開始
    setAnimatingLikes(prev => new Set(prev).add(reviewId));
    
    setTimeout(() => {
      if (isLiked) {
        // いいね取り消し
        setLikedReviews(prev => {
          const newSet = new Set(prev);
          newSet.delete(reviewId);
          saveLikedReviews(dramaSlug, newSet);
          return newSet;
        });
        decrementLike(dramaSlug, reviewId);
      } else {
        // いいね追加
        setLikedReviews(prev => {
          const newSet = new Set(prev).add(reviewId);
          saveLikedReviews(dramaSlug, newSet);
          return newSet;
        });
        incrementLike(dramaSlug, reviewId);
      }
      
      // アニメーション終了
      setAnimatingLikes(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }, 200);
  }, [dramaSlug, likedReviews]);

  // レビューのいいね数を取得
  const getReviewLikeCount = useCallback((reviewId: string, originalLikes: number) => {
    return getTotalLikeCount(dramaSlug, reviewId, originalLikes);
  }, [dramaSlug]);

  // いいね統計を取得
  const getStats = useCallback((reviews: Review[]) => {
    return getLikeStats(dramaSlug, reviews);
  }, [dramaSlug]);

  return {
    likedReviews,
    animatingLikes,
    toggleLike,
    getReviewLikeCount,
    getStats,
    isLiked: (reviewId: string) => likedReviews.has(reviewId),
    isAnimating: (reviewId: string) => animatingLikes.has(reviewId)
  };
};