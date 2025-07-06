import React from 'react';
import { Review, LikeStats } from '@/lib/types';

interface ReviewStatsProps {
  reviews: Review[];
  likeStats?: LikeStats;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews, likeStats }) => {
  const totalReviews = reviews.length;
  const averageBaka = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.bakaLevel, 0) / totalReviews).toFixed(1)
    : '0.0';
  const maxBaka = totalReviews > 0 ? Math.max(...reviews.map(r => r.bakaLevel)) : 0;
  const totalLikes = likeStats?.totalLikes || reviews.reduce((sum, r) => sum + r.likes, 0);

  return (
    <div style={{
      background: 'linear-gradient(to right, #ffff00, #ffcc00)',
      border: '2px outset #ffcc00',
      padding: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif'
    }}>
      📊 総レビュー数: {totalReviews}件 | 
      平均バカ度: {averageBaka} | 
      最高バカ度: {maxBaka} | 
      総共感数: {totalLikes} | 
      あなたの共感数: {likeStats?.myLikesCount || 0}
    </div>
  );
};

export default ReviewStats;