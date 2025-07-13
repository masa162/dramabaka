'use client';

import { FC, useState, useRef, useMemo } from 'react'
import { DramaDetail, Review } from '@/lib/types'
import DramaHeader from './DramaHeader'
import CastSection from './CastSection'
import ProductionInfo from './ProductionInfo'
import BakaRating from './BakaRating'
import ReviewForm from '@/components/review/ReviewForm'
import ReviewList from '@/components/review/ReviewList'
import { BakaRankingSystem } from './BakaRankingSystem'
import { CompetitiveMotivation } from './CompetitiveMotivation'
import { ViralShareSystem } from './ViralShareSystem'
import { useRanking } from '@/hooks/useRanking'
import { useReviews } from '@/hooks/useReviews'

interface DramaDetailPageProps {
  drama: DramaDetail
}

const DramaDetailPage: FC<DramaDetailPageProps> = ({ drama }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isViralShareVisible, setIsViralShareVisible] = useState(false);
  
  // レビューデータ管理
  const { reviews } = useReviews(drama.slug);
  
  // ランキングシステム
  const { userStats, isRankingVisible, toggleRanking, refreshRanking, getUserRank } = useRanking(reviews);
  
  // レビューフォームのref（競争心煽りからのスクロール用）
  const reviewFormRef = useRef<HTMLDivElement>(null);
  
  // ユーザーランキング情報
  const userRankings = useMemo(() => ({
    bakaRank: getUserRank('baka'),
    activityRank: getUserRank('activity'),
    popularityRank: getUserRank('popularity')
  }), [getUserRank]);
  
  // バイラルシェア表示切り替え
  const toggleViralShare = () => {
    setIsViralShareVisible(!isViralShareVisible);
  };
  
  // 競争心煽りのクリック処理
  const handleMotivationClick = () => {
    // レビューフォームにスクロール
    reviewFormRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    
    // 少し遅延してフォームをハイライト
    setTimeout(() => {
      const formElement = reviewFormRef.current?.querySelector('.review-form-container');
      if (formElement) {
        formElement.classList.add('motivation-highlight');
        setTimeout(() => {
          formElement.classList.remove('motivation-highlight');
        }, 2000);
      }
    }, 500);
  };

  const handleReviewSubmitted = (newReview: Review) => {
    console.log('新しいレビューが投稿されました:', newReview);
    setRefreshTrigger(prev => prev + 1);
    refreshRanking(); // ランキングを即座に更新
  };

  return (
    <div className="drama-detail-container">
      {/* 競争心煽りシステム */}
      <CompetitiveMotivation
        reviews={reviews}
        userStats={userStats}
        userRankings={userRankings}
        onMotivationClick={handleMotivationClick}
      />

      <DramaHeader drama={drama} />

      {/* ランキング切り替えセクション */}
      <div className="ranking-control-section">
        <div className="ranking-toggle-container">
          <button onClick={toggleRanking} className="ranking-toggle-button">
            {isRankingVisible ? (
              <>📊 ランキング非表示 <span className="toggle-hint">(競争から逃げる？)</span></>
            ) : (
              <>🏆 ランキング表示 <span className="toggle-hint">(廃人バトル参戦！)</span></>
            )}
          </button>
          
          {!isRankingVisible && userStats.totalReviews > 0 && (
            <div className="quick-rank-preview">
              バカ度ランキング: {userRankings.bakaRank}位 
              {userRankings.bakaRank <= 3 && <span className="rank-badge">🏆</span>}
              {userRankings.bakaRank > 3 && userRankings.bakaRank <= 10 && <span className="rank-badge">📈</span>}
              {userRankings.bakaRank > 10 && <span className="rank-badge">💪</span>}
            </div>
          )}
        </div>
      </div>

      {/* バカ度ランキングシステム */}
      {isRankingVisible && (
        <div className="ranking-section">
          <BakaRankingSystem 
            reviews={reviews}
            currentUserStats={userStats}
          />
          
          {/* 個人ランキング詳細 */}
          <div className="personal-ranking-details">
            <div className="ranking-detail-header">
              🎯 あなたの廃人度詳細レポート
            </div>
            <div className="ranking-detail-content">
              <div className="ranking-row">
                <span className="ranking-label">バカ度総合ランキング:</span>
                <span className="ranking-value">
                  {userStats.totalReviews > 0 ? `${userRankings.bakaRank}位` : '未参戦'}
                  {userRankings.bakaRank === 1 && <span className="crown">👑</span>}
                </span>
              </div>
              <div className="ranking-row">
                <span className="ranking-label">活動度ランキング:</span>
                <span className="ranking-value">
                  {userStats.totalReviews > 0 ? `${userRankings.activityRank}位` : '未参戦'}
                </span>
              </div>
              <div className="ranking-row">
                <span className="ranking-label">人気度ランキング:</span>
                <span className="ranking-value">
                  {userStats.totalReviews > 0 ? `${userRankings.popularityRank}位` : '未参戦'}
                </span>
              </div>
              <div className="ranking-summary">
                <div className="summary-text">
                  {userStats.totalReviews === 0 && "まだ廃人の仲間入りをしていません..."}
                  {userStats.totalReviews > 0 && userRankings.bakaRank <= 3 && "🏆 真の廃人です！尊敬します"}
                  {userStats.totalReviews > 0 && userRankings.bakaRank > 3 && userRankings.bakaRank <= 10 && "📈 なかなかの廃人ぶりですね"}
                  {userStats.totalReviews > 0 && userRankings.bakaRank > 10 && "💪 まだまだ上位廃人への道のりは長いです"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* バイラルシェアシステム */}
      <ViralShareSystem
        dramaSlug={drama.slug}
        isVisible={isViralShareVisible}
        onToggleVisibility={toggleViralShare}
      />
      
      {drama.synopsis && (
        <div className="content-section">
          <div className="content-header">
            📖 あらすじ
          </div>
          <div className="content-body">
            <div style={{ 
              fontSize: '12px', 
              lineHeight: '1.5',
              whiteSpace: 'pre-line'
            }}>
              {drama.synopsis}
            </div>
          </div>
        </div>
      )}
      
      <BakaRating level={drama.initial_baka_level} warnings={drama.warning_flags} />
      
      <CastSection drama={drama} />
      
      <ProductionInfo drama={drama} />
      
      {drama.content && (
        <div className="content-section">
          <div className="content-header">
            📝 詳細情報
          </div>
          <div className="content-body">
            <div 
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.5' 
              }}
              dangerouslySetInnerHTML={{ 
                __html: drama.content.replace(/\n/g, '<br>') 
              }}
            />
          </div>
        </div>
      )}
      
      {drama.author && (
        <div style={{ 
          marginTop: '20px', 
          fontSize: '10px', 
          color: '#666666',
          textAlign: 'right'
        }}>
          記事作成: {drama.author}
          {drama.updated_at && (
            <span style={{ marginLeft: '10px' }}>
              最終更新: {new Date(drama.updated_at).toLocaleDateString('ja-JP')}
            </span>
          )}
        </div>
      )}
      
      {/* レビューフォーム（ref追加） */}
      <div ref={reviewFormRef} className="review-form-section">
        <ReviewForm 
          dramaSlug={drama.slug} 
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>
      
      <ReviewList 
        dramaSlug={drama.slug}
        refreshTrigger={refreshTrigger}
      />

      {/* Phase 3a専用CSS */}
      <style jsx>{`
        .ranking-control-section {
          margin: 20px 0;
          padding: 15px;
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          border: 2px outset #cccccc;
          border-radius: 8px;
        }

        .ranking-toggle-container {
          text-align: center;
        }

        .ranking-toggle-button {
          background: linear-gradient(135deg, #ff6600, #ff9900);
          border: 3px outset #ffcc00;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'MS UI Gothic', sans-serif;
          font-size: 16px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          width: 100%;
          max-width: 400px;
          transition: all 0.3s;
        }

        .ranking-toggle-button:hover {
          background: linear-gradient(135deg, #ff9900, #ffcc00);
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        .ranking-toggle-button:active {
          transform: translateY(0);
          border: 3px inset #ffcc00;
        }

        .toggle-hint {
          font-size: 12px;
          opacity: 0.8;
          font-style: italic;
        }

        .quick-rank-preview {
          margin-top: 10px;
          padding: 8px 12px;
          background: linear-gradient(135deg, #0066cc, #0099ff);
          color: white;
          border-radius: 5px;
          font-size: 14px;
          display: inline-block;
          animation: slideIn 0.5s ease-out;
        }

        .rank-badge {
          margin-left: 5px;
          font-size: 16px;
        }

        .ranking-section {
          margin: 20px 0;
          animation: fadeInExpand 0.6s ease-out;
        }

        @keyframes fadeInExpand {
          from {
            opacity: 0;
            transform: scaleY(0.3);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        .personal-ranking-details {
          background: linear-gradient(135deg, #e6f3ff, #cce6ff);
          border: 2px outset #99ccff;
          border-radius: 8px;
          margin-top: 15px;
          overflow: hidden;
        }

        .ranking-detail-header {
          background: linear-gradient(90deg, #0066cc, #0099ff);
          color: white;
          padding: 10px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .ranking-detail-content {
          padding: 15px;
        }

        .ranking-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #ccc;
          font-size: 14px;
        }

        .ranking-row:last-child {
          border-bottom: none;
        }

        .ranking-label {
          font-weight: bold;
          color: #333;
        }

        .ranking-value {
          color: #0066cc;
          font-weight: bold;
        }

        .crown {
          margin-left: 5px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .ranking-summary {
          margin-top: 15px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 5px;
          text-align: center;
        }

        .summary-text {
          font-size: 13px;
          color: #666;
          font-style: italic;
        }

        /* 競争心煽りからのハイライト効果 */
        .motivation-highlight {
          animation: motivationPulse 2s ease-in-out;
          border: 3px solid #ff6600 !important;
        }

        @keyframes motivationPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 102, 0, 0);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 0 20px rgba(255, 102, 0, 0.5);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* モバイル対応 */
        @media (max-width: 600px) {
          .ranking-toggle-button {
            font-size: 14px;
            padding: 10px 16px;
          }
          
          .ranking-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .quick-rank-preview {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default DramaDetailPage