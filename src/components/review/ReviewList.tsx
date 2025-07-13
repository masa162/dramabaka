'use client';

import React, { useState, useEffect } from 'react';
import { useReviews } from '@/hooks/useReviews';
import { useLikes } from '@/hooks/useLikes';
import ReviewItem from './ReviewItem';
import ReviewStats from './ReviewStats';

interface ReviewListProps {
  dramaSlug: string;
  refreshTrigger?: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ dramaSlug, refreshTrigger }) => {
  const { reviews, loading, refreshReviews, sortReviews, filterByBakaLevel } = useReviews(dramaSlug);
  const { 
    toggleLike, 
    getReviewLikeCount, 
    isLiked, 
    isAnimating,
    getStats 
  } = useLikes(dramaSlug);
  const [sortBy, setSortBy] = useState<'newest' | 'baka' | 'likes'>('newest');
  const [filterBaka, setFilterBaka] = useState(0);

  const handleSort = (newSortBy: 'newest' | 'baka' | 'likes') => {
    setSortBy(newSortBy);
    sortReviews(newSortBy);
  };

  const handleFilter = (level: number) => {
    setFilterBaka(level);
    filterByBakaLevel(level);
  };

  // 統計情報の取得
  const likeStats = getStats(reviews);

  useEffect(() => {
    if (refreshTrigger) {
      refreshReviews();
    }
  }, [refreshTrigger, refreshReviews]);

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        fontSize: '14px',
        color: '#666666',
        fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif'
      }}>
        レビューを読み込み中...
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
      background: 'linear-gradient(to bottom, #0066cc, #004499)',
      border: '3px outset #0066cc',
      padding: '20px',
      margin: '20px 0',
      borderRadius: '0'
    }}>
      <div style={{
        background: '#f0f0f0',
        border: '2px inset #cccccc',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h3 style={{
          color: '#ff0000',
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '0 0 15px 0',
          textShadow: '1px 1px 0px #ffff00',
          textAlign: 'center'
        }}>
          🧠 みんなのバカなレビュー 🧠
        </h3>

        {/* ソート・フィルター */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '15px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '5px' }}>
              並び順:
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as 'newest' | 'baka' | 'likes')}
              style={{
                border: '2px inset #cccccc',
                padding: '5px',
                fontSize: '12px',
                fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
                borderRadius: '0'
              }}
            >
              <option value="newest">新着順</option>
              <option value="baka">バカ度順</option>
              <option value="likes">共感順</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '5px' }}>
              バカ度:
            </label>
            <select
              value={filterBaka}
              onChange={(e) => handleFilter(Number(e.target.value))}
              style={{
                border: '2px inset #cccccc',
                padding: '5px',
                fontSize: '12px',
                fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
                borderRadius: '0'
              }}
            >
              <option value={0}>全て</option>
              <option value={1}>🧠 まだ正気</option>
              <option value={2}>🧠🧠 ちょっとヤバい</option>
              <option value={3}>🧠🧠🧠 沼が見えてきた</option>
              <option value={4}>🧠🧠🧠🧠 もう戻れない</option>
              <option value={5}>🧠🧠🧠🧠🧠 完全に廃人</option>
            </select>
          </div>

          <button
            onClick={refreshReviews}
            style={{
              background: 'linear-gradient(to bottom, #00cc00, #009900)',
              border: '2px outset #00cc00',
              color: 'white',
              padding: '5px 10px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderRadius: '0'
            }}
          >
            🔄 更新
          </button>
        </div>

        {/* 統計表示 */}
        <ReviewStats reviews={reviews} likeStats={likeStats} />
      </div>

      {/* レビュー一覧 */}
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {reviews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '14px',
            color: '#666666',
            background: '#ffffff',
            border: '2px inset #cccccc',
            margin: '10px 0'
          }}>
            📝 まだレビューがありません。最初のレビューを書き散らしてみませんか？
          </div>
        ) : (
          reviews.map((review, index) => (
            <ReviewItem
              key={review.id}
              review={review}
              index={index}
              onLike={toggleLike}
              isLiked={isLiked(review.id)}
              isAnimating={isAnimating(review.id)}
              likeCount={getReviewLikeCount(review.id, review.likes)}
            />
          ))
        )}
      </div>

      {/* フッター */}
      <div style={{
        background: '#ff6600',
        color: 'white',
        padding: '10px',
        fontSize: '11px',
        textAlign: 'center',
        border: '1px solid #ff3300',
        marginTop: '15px'
      }}>
        🔥 レビューを見てるとさらに沼が深くなります 🔥
      </div>
    </div>
  );
};

export default ReviewList;