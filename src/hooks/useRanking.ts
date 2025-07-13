import { useState, useEffect, useMemo, useCallback } from 'react';
import { Review } from '../lib/types';

interface UserStats {
  totalReviews: number;
  averageBaka: number;
  maxBaka: number;
  totalLikes: number;
  recentActivity: number; // 過去7日間の投稿数
}

interface RankingHook {
  userStats: UserStats;
  isRankingVisible: boolean;
  toggleRanking: () => void;
  refreshRanking: () => void;
  getUserRank: (type: 'baka' | 'activity' | 'popularity') => number;
}

export const useRanking = (reviews: Review[], userNickname?: string): RankingHook => {
  const [isRankingVisible, setIsRankingVisible] = useState(true);
  const [, setLastRefresh] = useState(Date.now());

  // ユーザーの統計情報を計算
  const userStats = useMemo<UserStats>(() => {
    if (!userNickname) {
      return {
        totalReviews: 0,
        averageBaka: 0,
        maxBaka: 0,
        totalLikes: 0,
        recentActivity: 0
      };
    }

    const userReviews = reviews.filter(r => r.nickname === userNickname);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentReviews = userReviews.filter(r => new Date(r.timestamp) >= weekAgo);

    const totalBaka = userReviews.reduce((sum, r) => sum + r.bakaLevel, 0);
    const maxBaka = userReviews.reduce((max, r) => Math.max(max, r.bakaLevel), 0);
    const totalLikes = userReviews.reduce((sum, r) => sum + r.likes, 0);

    return {
      totalReviews: userReviews.length,
      averageBaka: userReviews.length > 0 ? totalBaka / userReviews.length : 0,
      maxBaka,
      totalLikes,
      recentActivity: recentReviews.length
    };
  }, [reviews, userNickname]);

  // ランキング順位を取得
  const getUserRank = useCallback((type: 'baka' | 'activity' | 'popularity'): number => {
    if (!userNickname) return 0;

    // 全ユーザーの統計を計算
    const userStatsMap = new Map<string, UserStats>();
    
    reviews.forEach(review => {
      const nickname = review.nickname;
      if (!userStatsMap.has(nickname)) {
        userStatsMap.set(nickname, {
          totalReviews: 0,
          averageBaka: 0,
          maxBaka: 0,
          totalLikes: 0,
          recentActivity: 0
        });
      }
      
      const stats = userStatsMap.get(nickname)!;
      stats.totalReviews++;
      stats.maxBaka = Math.max(stats.maxBaka, review.bakaLevel);
      stats.totalLikes += review.likes;
      
      // 最近の活動をチェック
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      if (new Date(review.timestamp) >= weekAgo) {
        stats.recentActivity++;
      }
    });

    // 平均バカ度を計算
    userStatsMap.forEach((stats, nickname) => {
      const userReviews = reviews.filter(r => r.nickname === nickname);
      const totalBaka = userReviews.reduce((sum, r) => sum + r.bakaLevel, 0);
      stats.averageBaka = userReviews.length > 0 ? totalBaka / userReviews.length : 0;
    });

    // ランキングを作成
    const sortedUsers = Array.from(userStatsMap.entries()).sort((a, b) => {
      const [, statsA] = a;
      const [, statsB] = b;
      
      switch (type) {
        case 'baka':
          // バカ度ランキング（平均バカ度 × √投稿数）
          const scoreA = statsA.averageBaka * Math.sqrt(statsA.totalReviews);
          const scoreB = statsB.averageBaka * Math.sqrt(statsB.totalReviews);
          return scoreB - scoreA;
        
        case 'activity':
          // 活動ランキング（最近の投稿数）
          return statsB.recentActivity - statsA.recentActivity;
        
        case 'popularity':
          // 人気ランキング（いいね数）
          return statsB.totalLikes - statsA.totalLikes;
        
        default:
          return 0;
      }
    });

    // 自分の順位を取得
    const userRank = sortedUsers.findIndex(([nickname]) => nickname === userNickname) + 1;
    return userRank;
  }, [reviews, userNickname]);

  // ランキング表示切り替え
  const toggleRanking = useCallback(() => {
    setIsRankingVisible(!isRankingVisible);
  }, [isRankingVisible]);

  // ランキング更新
  const refreshRanking = useCallback(() => {
    setLastRefresh(Date.now());
  }, []);

  // ローカルストレージから設定を復元
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedVisibility = localStorage.getItem('rankingVisible');
      if (savedVisibility !== null) {
        setIsRankingVisible(JSON.parse(savedVisibility));
      }
    } catch (error) {
      console.warn('localStorage access failed:', error);
    }
  }, []);

  // ローカルストレージに設定を保存
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('rankingVisible', JSON.stringify(isRankingVisible));
    } catch (error) {
      console.warn('localStorage save failed:', error);
    }
  }, [isRankingVisible]);

  // 定期的に更新（1分間隔）
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRanking();
    }, 60000); // 1分

    return () => clearInterval(interval);
  }, [refreshRanking]);

  return {
    userStats,
    isRankingVisible,
    toggleRanking,
    refreshRanking,
    getUserRank
  };
};