import React, { useState, useEffect, useMemo } from 'react';
import { Review } from '@/lib/types';

interface MotivationMessage {
  type: 'challenge' | 'achievement' | 'ranking' | 'streak';
  message: string;
  action: string;
  urgency: 'low' | 'medium' | 'high';
  icon: string;
}

interface CompetitiveMotivationProps {
  reviews: Review[];
  userStats: {
    totalReviews: number;
    averageBaka: number;
    maxBaka: number;
    totalLikes: number;
    recentActivity: number;
  };
  userRankings: {
    bakaRank: number;
    activityRank: number;
    popularityRank: number;
  };
  onMotivationClick: () => void;
}

export const CompetitiveMotivation: React.FC<CompetitiveMotivationProps> = ({
  reviews,
  userStats,
  userRankings,
  onMotivationClick
}) => {
  const [currentMessage, setCurrentMessage] = useState<MotivationMessage | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  // 競争心を煽るメッセージを生成
  const generateMotivationMessage = useMemo((): MotivationMessage | null => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayReviews = reviews.filter(r => new Date(r.timestamp) >= todayStart);
    const todayMaxBaka = Math.max(...todayReviews.map(r => r.bakaLevel), 0);
    const userTodayReviews = todayReviews.filter(r => r.nickname.includes('廃人候補'));

    // 今日の最高バカ度チャレンジ
    if (todayMaxBaka > 0 && userStats.maxBaka < todayMaxBaka && userTodayReviews.length === 0) {
      return {
        type: 'challenge',
        message: `今日の最高バカ度は${todayMaxBaka}レベル！あなたを超える廃人が現れました...`,
        action: '負けていられない！投稿する',
        urgency: 'high',
        icon: '🔥'
      };
    }

    // 週間ランキングが下位の場合
    if (userRankings.bakaRank > 3 && userStats.totalReviews > 0) {
      return {
        type: 'ranking',
        message: `バカ度ランキング${userRankings.bakaRank}位...上位の廃人たちに差をつけられています`,
        action: 'ランクアップを目指す！',
        urgency: 'medium',
        icon: '📈'
      };
    }

    // 活動度が低い場合
    if (userStats.recentActivity === 0 && userStats.totalReviews > 0) {
      return {
        type: 'streak',
        message: '最近投稿していませんね...廃人レベルが下がってしまいます！',
        action: '廃人復活投稿をする',
        urgency: 'medium',
        icon: '⚠️'
      };
    }

    // いいねが少ない場合
    if (userStats.totalLikes < userStats.totalReviews * 0.5 && userStats.totalReviews > 2) {
      return {
        type: 'achievement',
        message: 'あなたの投稿、まだ真の廃人に認められていないかも...？',
        action: 'より廃人的な投稿で勝負！',
        urgency: 'low',
        icon: '💡'
      };
    }

    // バカ度5を達成していない場合
    if (userStats.maxBaka < 5 && userStats.totalReviews > 0) {
      return {
        type: 'achievement',
        message: 'まだバカ度5（完全に廃人）を経験していませんね...',
        action: '真の廃人を目指す！',
        urgency: 'medium',
        icon: '🧠'
      };
    }

    // 新規ユーザー向け
    if (userStats.totalReviews === 0) {
      return {
        type: 'challenge',
        message: '他の廃人たちが熱い戦いを繰り広げています...あなたも参戦しませんか？',
        action: '廃人デビューする！',
        urgency: 'high',
        icon: '🚀'
      };
    }

    return null;
  }, [reviews, userStats, userRankings]);

  // メッセージ表示ロジック
  useEffect(() => {
    if (generateMotivationMessage && !messageHistory.includes(generateMotivationMessage.message)) {
      setCurrentMessage(generateMotivationMessage);
      setIsVisible(true);
      
      // メッセージ履歴に追加（重複防止）
      setMessageHistory(prev => [...prev.slice(-4), generateMotivationMessage.message]);
      
      // 一定時間後に非表示（緊急度に応じて調整）
      const hideDelay = generateMotivationMessage.urgency === 'high' ? 10000 : 
                       generateMotivationMessage.urgency === 'medium' ? 7000 : 5000;
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);

      return () => clearTimeout(timer);
    }
  }, [generateMotivationMessage, messageHistory]);

  // メッセージクリック処理
  const handleMessageClick = () => {
    setIsVisible(false);
    onMotivationClick();
    
    // クリック履歴を保存
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastMotivationClick', Date.now().toString());
      }
    } catch (error) {
      console.warn('localStorage save failed:', error);
    }
  };

  // 閉じるボタン処理
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!currentMessage || !isVisible) {
    return null;
  }

  return (
    <div className="competitive-motivation">
      <style jsx>{`
        .competitive-motivation {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ff6600, #ff3300);
          color: white;
          border: 3px outset #ffcc00;
          border-radius: 10px;
          padding: 15px;
          max-width: 300px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 1000;
          font-family: 'MS UI Gothic', sans-serif;
          animation: slideInBounce 0.5s ease-out;
        }

        @keyframes slideInBounce {
          0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateX(-10px) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        .motivation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .motivation-icon {
          font-size: 24px;
          animation: ${currentMessage.urgency === 'high' ? 'pulse 1s infinite' : 'none'};
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .close-button:hover {
          opacity: 1;
        }

        .motivation-message {
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 12px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .motivation-action {
          background: linear-gradient(135deg, #ffff00, #ffcc00);
          color: #333;
          border: 2px outset #ffdd00;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
          width: 100%;
          text-align: center;
          transition: all 0.2s;
          font-family: 'MS UI Gothic', sans-serif;
        }

        .motivation-action:hover {
          background: linear-gradient(135deg, #ffdd00, #ffaa00);
          transform: translateY(-2px);
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        }

        .motivation-action:active {
          transform: translateY(0);
          border: 2px inset #ffdd00;
        }

        .urgency-high {
          animation: shake 0.5s ease-in-out infinite;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        .urgency-indicator {
          font-size: 10px;
          opacity: 0.8;
          margin-top: 5px;
          text-align: center;
        }

        /* モバイル対応 */
        @media (max-width: 600px) {
          .competitive-motivation {
            position: fixed;
            top: auto;
            bottom: 20px;
            right: 20px;
            left: 20px;
            max-width: none;
          }
        }
      `}</style>

      <div className={`motivation-container ${currentMessage.urgency === 'high' ? 'urgency-high' : ''}`}>
        <div className="motivation-header">
          <span className="motivation-icon">{currentMessage.icon}</span>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        
        <div className="motivation-message">
          {currentMessage.message}
        </div>
        
        <button className="motivation-action" onClick={handleMessageClick}>
          {currentMessage.action}
        </button>
        
        <div className="urgency-indicator">
          {currentMessage.urgency === 'high' && '🚨 緊急'}
          {currentMessage.urgency === 'medium' && '⚡ 注意'}
          {currentMessage.urgency === 'low' && '💭 提案'}
        </div>
      </div>
    </div>
  );
};