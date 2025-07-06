import { LikeStats, Review } from './types';

// ブラウザ固有IDの生成・取得
export const getUserId = (): string => {
  if (typeof window === 'undefined') return 'server_user';
  
  const STORAGE_KEY = 'dramabaka_user_id';
  let userId = localStorage.getItem(STORAGE_KEY);
  
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY, userId);
  }
  
  return userId;
};

// いいね状態の保存・取得
export const getLikedReviews = (dramaSlug: string): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  
  const userId = getUserId();
  const key = `likes_${dramaSlug}_${userId}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) return new Set();
  
  try {
    const likedIds = JSON.parse(stored);
    return new Set(likedIds);
  } catch {
    return new Set();
  }
};

export const saveLikedReviews = (dramaSlug: string, likedReviews: Set<string>): void => {
  if (typeof window === 'undefined') return;
  
  const userId = getUserId();
  const key = `likes_${dramaSlug}_${userId}`;
  const likedArray = Array.from(likedReviews);
  localStorage.setItem(key, JSON.stringify(likedArray));
};

// いいね数の管理
export const incrementLike = (dramaSlug: string, reviewId: string): number => {
  if (typeof window === 'undefined') return 0;
  
  const key = `like_count_${dramaSlug}_${reviewId}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const newCount = current + 1;
  localStorage.setItem(key, newCount.toString());
  return newCount;
};

export const decrementLike = (dramaSlug: string, reviewId: string): number => {
  if (typeof window === 'undefined') return 0;
  
  const key = `like_count_${dramaSlug}_${reviewId}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const newCount = Math.max(0, current - 1);
  localStorage.setItem(key, newCount.toString());
  return newCount;
};

export const getLikeCount = (dramaSlug: string, reviewId: string): number => {
  if (typeof window === 'undefined') return 0;
  
  const key = `like_count_${dramaSlug}_${reviewId}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
};

// レビューの現在のいいね数を取得（元のいいね数 + 追加分）
export const getTotalLikeCount = (dramaSlug: string, reviewId: string, originalLikes: number): number => {
  const additionalLikes = getLikeCount(dramaSlug, reviewId);
  return originalLikes + additionalLikes;
};

// いいね統計の取得
export const getLikeStats = (dramaSlug: string, reviews: Review[]): LikeStats => {
  const likedReviews = getLikedReviews(dramaSlug);
  const totalLikes = reviews.reduce((sum, review) => {
    return sum + getTotalLikeCount(dramaSlug, review.id, review.likes);
  }, 0);
  
  return {
    totalLikes,
    likedReviews,
    myLikesCount: likedReviews.size
  };
};