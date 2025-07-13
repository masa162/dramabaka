import React, { useState, useMemo } from 'react';
import { Review } from '@/lib/types';

interface RankingData {
  todayMaxBaka: {
    review: Review | null;
    level: number;
  };
  weeklyChampion: {
    nickname: string;
    totalScore: number;
    count: number;
  };
  hallOfFame: Review[];
  distribution: {
    level: number;
    count: number;
    percentage: number;
  }[];
}

interface BakaRankingSystemProps {
  reviews: Review[];
  currentUserStats: {
    totalReviews: number;
    averageBaka: number;
    maxBaka: number;
  };
}

export const BakaRankingSystem: React.FC<BakaRankingSystemProps> = ({
  reviews,
  currentUserStats
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'hall' | 'distribution'>('today');
  const [isAnimating, setIsAnimating] = useState(false);

  // ランキングデータを計算
  const rankingData = useMemo<RankingData>(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 今日の最高バカ度
    const todayReviews = reviews.filter(r => new Date(r.timestamp) >= todayStart);
    const todayMaxBaka = todayReviews.reduce((max, review) => {
      if (review.bakaLevel > max.level) {
        return { review, level: review.bakaLevel };
      }
      return max;
    }, { review: null as Review | null, level: 0 });

    // 週間チャンピオン（投稿数×平均バカ度で計算）
    const weeklyReviews = reviews.filter(r => new Date(r.timestamp) >= weekStart);
    const weeklyStats = weeklyReviews.reduce((acc, review) => {
      if (!acc[review.nickname]) {
        acc[review.nickname] = { totalBaka: 0, count: 0 };
      }
      acc[review.nickname].totalBaka += review.bakaLevel;
      acc[review.nickname].count += 1;
      return acc;
    }, {} as Record<string, { totalBaka: number; count: number; }>);

    const weeklyChampion = Object.entries(weeklyStats).reduce((champion, [nickname, stats]) => {
      const score = (stats.totalBaka / stats.count) * Math.sqrt(stats.count); // 平均×√投稿数
      if (score > champion.totalScore) {
        return { nickname, totalScore: score, count: stats.count };
      }
      return champion;
    }, { nickname: '', totalScore: 0, count: 0 });

    // 殿堂入り廃人（バカ度5を5回以上投稿）
    const bakaLevel5Users = reviews.filter(r => r.bakaLevel === 5).reduce((acc, review) => {
      acc[review.nickname] = (acc[review.nickname] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const hallOfFame = reviews.filter(r => 
      r.bakaLevel === 5 && bakaLevel5Users[r.nickname] >= 5
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
     .slice(0, 10);

    // バカ度分布
    const distribution = [1, 2, 3, 4, 5].map(level => {
      const count = reviews.filter(r => r.bakaLevel === level).length;
      return {
        level,
        count,
        percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0
      };
    });

    return {
      todayMaxBaka,
      weeklyChampion,
      hallOfFame,
      distribution
    };
  }, [reviews]);

  // タブ切り替え時のアニメーション
  const handleTabChange = (tab: typeof activeTab) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 200);
  };

  // バカ度表示用のアイコン
  const getBakaIcons = (level: number) => {
    return '🧠'.repeat(level);
  };

  // バカ度レベル説明
  const getBakaLevelText = (level: number) => {
    const texts = {
      1: 'まだ正気',
      2: 'ちょっとヤバい',
      3: '沼が見えてきた',
      4: 'もう戻れない',
      5: '完全に廃人'
    };
    return texts[level as keyof typeof texts] || '';
  };

  return (
    <div className="baka-ranking-system">
      <style jsx>{`
        .baka-ranking-system {
          background: linear-gradient(135deg, #ff6600, #ff9900);
          border: 3px outset #cccccc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          font-family: 'MS UI Gothic', sans-serif;
        }

        .ranking-header {
          background: linear-gradient(90deg, #0066cc, #0099ff);
          color: white;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .ranking-tabs {
          display: flex;
          gap: 5px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .tab-button {
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          border: 2px outset #cccccc;
          padding: 8px 12px;
          font-size: 12px;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.2s;
          font-family: 'MS UI Gothic', sans-serif;
          flex: 1;
          min-width: 80px;
        }

        .tab-button:hover {
          background: linear-gradient(135deg, #e0e0e0, #d0d0d0);
          transform: translateY(-1px);
        }

        .tab-button.active {
          background: linear-gradient(135deg, #ffff00, #ffdd00);
          border: 2px inset #cccccc;
          font-weight: bold;
        }

        .ranking-content {
          background: rgba(255, 255, 255, 0.9);
          border: 2px inset #cccccc;
          border-radius: 5px;
          padding: 15px;
          min-height: 200px;
          opacity: ${isAnimating ? 0.3 : 1};
          transition: opacity 0.2s;
        }

        .today-max {
          text-align: center;
          padding: 20px;
        }

        .baka-crown {
          font-size: 48px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .max-baka-display {
          font-size: 24px;
          margin: 10px 0;
          color: #ff0000;
          font-weight: bold;
        }

        .champion-card {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          border: 3px solid #ffa500;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          margin: 10px 0;
        }

        .champion-name {
          font-size: 18px;
          font-weight: bold;
          color: #ff6600;
          margin-bottom: 5px;
        }

        .champion-score {
          font-size: 16px;
          color: #0066cc;
        }

        .hall-of-fame {
          max-height: 300px;
          overflow-y: auto;
        }

        .fame-item {
          background: linear-gradient(135deg, #ff99ff, #ffccff);
          border: 2px solid #ff00ff;
          border-radius: 5px;
          padding: 10px;
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fame-nickname {
          font-weight: bold;
          color: #800080;
        }

        .fame-baka {
          font-size: 18px;
        }

        .distribution-chart {
          padding: 10px;
        }

        .distribution-bar {
          display: flex;
          align-items: center;
          margin: 8px 0;
          gap: 10px;
        }

        .bar-label {
          width: 100px;
          font-size: 12px;
          font-weight: bold;
        }

        .bar-container {
          flex: 1;
          height: 20px;
          background: #f0f0f0;
          border: 1px solid #cccccc;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6600, #ff9900);
          transition: width 0.5s ease;
        }

        .bar-percentage {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 11px;
          font-weight: bold;
          color: #333;
        }

        .no-data {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 40px;
        }

        .blinking {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }

        @media (max-width: 600px) {
          .ranking-tabs {
            flex-direction: column;
          }
          
          .tab-button {
            flex: none;
          }
        }
      `}</style>

      <div className="ranking-header">
        🏆 バカ度ランキング - 廃人たちの戦場 🏆
      </div>

      <div className="ranking-tabs">
        <button
          className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => handleTabChange('today')}
        >
          今日の最高バカ度
        </button>
        <button
          className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => handleTabChange('weekly')}
        >
          週間チャンピオン
        </button>
        <button
          className={`tab-button ${activeTab === 'hall' ? 'active' : ''}`}
          onClick={() => handleTabChange('hall')}
        >
          殿堂入り廃人
        </button>
        <button
          className={`tab-button ${activeTab === 'distribution' ? 'active' : ''}`}
          onClick={() => handleTabChange('distribution')}
        >
          バカ度分布
        </button>
      </div>

      <div className="ranking-content">
        {activeTab === 'today' && (
          <div className="today-max">
            {rankingData.todayMaxBaka.review ? (
              <>
                <div className="baka-crown">👑</div>
                <div className="max-baka-display">
                  {getBakaIcons(rankingData.todayMaxBaka.level)}
                </div>
                <div style={{ fontSize: '16px', color: '#0066cc', marginBottom: '10px' }}>
                  本日の最高バカ度: <span className="blinking">レベル{rankingData.todayMaxBaka.level}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  達成者: {rankingData.todayMaxBaka.review.nickname}
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                  「{rankingData.todayMaxBaka.review.quickReview}」
                </div>
              </>
            ) : (
              <div className="no-data">
                まだ今日の投稿がありません...<br />
                あなたが最初の廃人になりませんか？
              </div>
            )}
          </div>
        )}

        {activeTab === 'weekly' && (
          <div>
            {rankingData.weeklyChampion.nickname ? (
              <div className="champion-card">
                <div className="champion-name">
                  🏆 {rankingData.weeklyChampion.nickname} 🏆
                </div>
                <div className="champion-score">
                  廃人度スコア: {rankingData.weeklyChampion.totalScore.toFixed(1)}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  ({rankingData.weeklyChampion.count}回投稿)
                </div>
              </div>
            ) : (
              <div className="no-data">
                まだ週間チャンピオンがいません...<br />
                今週の廃人王を目指しませんか？
              </div>
            )}
          </div>
        )}

        {activeTab === 'hall' && (
          <div className="hall-of-fame">
            {rankingData.hallOfFame.length > 0 ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
                  💀 殿堂入り廃人たち 💀<br />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    (バカ度5を5回以上投稿した猛者たち)
                  </span>
                </div>
                {rankingData.hallOfFame.map((review, index) => (
                  <div key={review.id} className="fame-item">
                    <div>
                      <div className="fame-nickname">
                        {index === 0 ? '👑 ' : '💀 '}
                        {review.nickname}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        「{review.quickReview}」
                      </div>
                    </div>
                    <div className="fame-baka">
                      {getBakaIcons(review.bakaLevel)}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-data">
                まだ殿堂入り廃人がいません...<br />
                バカ度5を5回投稿して伝説になりませんか？
              </div>
            )}
          </div>
        )}

        {activeTab === 'distribution' && (
          <div className="distribution-chart">
            <div style={{ textAlign: 'center', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
              📊 バカ度分布 - あなたの立ち位置は？
            </div>
            {rankingData.distribution.map((dist) => (
              <div key={dist.level} className="distribution-bar">
                <div className="bar-label">
                  {getBakaIcons(dist.level)} {getBakaLevelText(dist.level)}
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${dist.percentage}%` }}
                  />
                  <div className="bar-percentage">
                    {dist.count}人 ({dist.percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '15px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
              あなたの平均バカ度: {getBakaIcons(Math.round(currentUserStats.averageBaka))} 
              (レベル{currentUserStats.averageBaka.toFixed(1)})
            </div>
          </div>
        )}
      </div>
    </div>
  );
};