import { Review } from './types';

export const generateReviewId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const generateRandomNickname = (): string => {
  const prefixes = ['廃人候補', 'ドラマ中毒', '沼落ち', 'バカ一代', 'ハマり'];
  const suffixes = ['さん', 'くん', 'ちゃん', '氏', '民'];
  const number = Math.floor(Math.random() * 9999) + 1;
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}#${number}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

export const saveReview = (review: Omit<Review, 'id' | 'timestamp' | 'likes'>): Review => {
  const newReview: Review = {
    ...review,
    id: generateReviewId(),
    timestamp: new Date().toISOString(),
    likes: 0,
  };

  const existingReviews = getReviewsByDrama(review.dramaSlug);
  const updatedReviews = [...existingReviews, newReview];
  
  localStorage.setItem(`reviews_${review.dramaSlug}`, JSON.stringify(updatedReviews));
  
  return newReview;
};

export const getReviewsByDrama = (dramaSlug: string): Review[] => {
  if (typeof window === 'undefined') return [];
  
  const reviews = localStorage.getItem(`reviews_${dramaSlug}`);
  return reviews ? JSON.parse(reviews) : [];
};