import React from 'react';
import { Review } from '@/lib/types';

interface ReviewItemProps {
  review: Review;
  index: number;
  onLike?: (reviewId: string) => void;
  isLiked?: boolean;
  isAnimating?: boolean;
  likeCount?: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, index, onLike, isLiked = false, isAnimating = false, likeCount }) => {
  const bakaLevelDisplay = (level: number) => {
    const emojis = '🧠'.repeat(level);
    const labels = ['', 'まだ正気', 'ちょっとヤバい', '沼が見えてきた', 'もう戻れない', '完全に廃人'];
    return { emojis, label: labels[level] };
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}分前`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}時間前`;
    return `${Math.floor(diffMinutes / 1440)}日前`;
  };

  const bakaDisplay = bakaLevelDisplay(review.bakaLevel);

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
      border: '2px outset #cccccc',
      margin: '10px 0',
      padding: '15px',
      borderRadius: '0',
      fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif'
    }}>
      {/* ヘッダー行 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'linear-gradient(to bottom, #ff6600, #ff3300)',
            color: 'white',
            padding: '3px 8px',
            fontSize: '11px',
            fontWeight: 'bold',
            border: '1px outset #ff6600',
            textShadow: '1px 1px 0px #000000'
          }}>
            {review.nickname}
          </span>
          
          <span style={{ fontSize: '24px' }}>
            {review.emotion}
          </span>
          
          <div style={{
            background: 'linear-gradient(to bottom, #ffff00, #ffcc00)',
            border: '1px outset #ffcc00',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            {bakaDisplay.emojis} {bakaDisplay.label}
          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#666666' }}>
          {formatTimeAgo(review.timestamp)}
        </div>
      </div>

      {/* レビュー内容 */}
      <div style={{
        background: '#fefefe',
        border: '1px inset #cccccc',
        padding: '10px',
        marginBottom: '10px'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: review.detailedReview ? '8px' : '0'
        }}>
          {review.quickReview}
        </div>
        
        {review.detailedReview && (
          <div style={{
            fontSize: '12px',
            color: '#555555',
            lineHeight: '1.4',
            borderTop: '1px dotted #cccccc',
            paddingTop: '8px'
          }}>
            {review.detailedReview}
          </div>
        )}
      </div>

      {/* アクション */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => onLike?.(review.id)}
          style={{
            background: isLiked 
              ? 'linear-gradient(to bottom, #ff6600, #ff3300)'
              : 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
            border: isLiked ? '2px inset #ff6600' : '2px outset #cccccc',
            padding: '8px 15px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            color: isLiked ? 'white' : '#333333',
            borderRadius: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.1s',
            transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
            textShadow: isLiked ? '1px 1px 0px #000000' : 'none',
            fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif'
          }}
          onMouseOver={(e) => {
            if (!isLiked) {
              (e.target as HTMLElement).style.background = 'linear-gradient(to bottom, #ffff00, #ffcc00)';
            }
          }}
          onMouseOut={(e) => {
            if (!isLiked) {
              (e.target as HTMLElement).style.background = 'linear-gradient(to bottom, #ffffff, #f0f0f0)';
            }
          }}
        >
          <span style={{
            fontSize: '16px',
            animation: isAnimating ? 'bounce 0.3s ease' : 'none'
          }}>
            👍
          </span>
          <span>
            {isLiked ? '同じ穴のムジナ！' : '同じ穴のムジナ'}
          </span>
          <span style={{
            background: isLiked ? '#ff3300' : '#666666',
            color: 'white',
            padding: '2px 6px',
            fontSize: '10px',
            border: '1px outset',
            borderRadius: '0'
          }}>
            {likeCount ?? review.likes}
          </span>
        </button>

        <div style={{ fontSize: '10px', color: '#999999' }}>
          #{index + 1}
        </div>
      </div>

      {/* いいね済み表示 */}
      {isLiked && (
        <div style={{
          marginTop: '8px',
          padding: '5px',
          background: 'linear-gradient(to right, #ffffcc, #ffff99)',
          border: '1px solid #ffcc00',
          fontSize: '10px',
          color: '#cc6600',
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif'
        }}>
          ✅ あなたはこのレビューに共感しました（取り消すには再度クリック）
        </div>
      )}

      {/* CSS追加 */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ReviewItem;