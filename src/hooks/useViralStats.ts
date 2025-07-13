import { useState, useEffect, useMemo, useCallback } from 'react';
import { Review } from '../lib/types';

interface ShareData {
  platform: 'twitter' | 'line' | 'facebook' | 'clipboard';
  template: 'excitement' | 'challenge' | 'obsession' | 'custom';
  timestamp: number;
  dramaSlug: string;
  reviewId?: string;
}

interface ViralStats {
  totalShares: number;
  shareStreak: number; // 連続投稿日数
  viralLevel: number; // 1-5のバイラル度
  platformStats: Record<string, number>;
  templateStats: Record<string, number>;
  lastShareDate: Date | null;
  todayShares: number;
  weeklyShares: number;
  bestStreak: number;
  shareRank: number; // 全ユーザー中の順位
}

interface ViralHook {
  viralStats: ViralStats;
  shareContent: (platform: string, template: string, dramaSlug: string, reviewId?: string) => void;
  getShareStreak: () => number;
  getViralLevel: () => number;
  isViralMaster: boolean;
  generateShareText: (template: string, dramaSlug: string, review?: Review) => string;
  refreshStats: () => void;
}

export const useViralStats = (dramaSlug: string): ViralHook => {
  const [shareHistory, setShareHistory] = useState<ShareData[]>([]);

  // ローカルストレージからシェア履歴を読み込み
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('dramabaka_viral_shares');
      if (stored) {
        const parsedShares = JSON.parse(stored);
        setShareHistory(parsedShares);
      }
    } catch (error) {
      console.warn('バイラル統計の読み込みに失敗:', error);
    }
  }, []);

  // シェア履歴を保存
  const saveShareHistory = useCallback((newHistory: ShareData[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('dramabaka_viral_shares', JSON.stringify(newHistory));
      setShareHistory(newHistory);
    } catch (error) {
      console.warn('バイラル統計の保存に失敗:', error);
    }
  }, []);

  // 連続投稿日数計算
  const calculateShareStreak = (shares: ShareData[]): number => {
    if (shares.length === 0) return 0;

    const sortedShares = shares.sort((a, b) => b.timestamp - a.timestamp);
    const uniqueDays = new Set<string>();
    
    sortedShares.forEach(share => {
      const date = new Date(share.timestamp);
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      uniqueDays.add(dayKey);
    });

    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) { // 最大30日分チェック
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dayKey = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
      
      if (uniqueDays.has(dayKey)) {
        streak++;
      } else if (i > 0) { // 今日でなければストリーク終了
        break;
      }
    }

    return streak;
  };

  // 最高連続記録計算
  const calculateBestStreak = (shares: ShareData[]): number => {
    if (shares.length === 0) return 0;

    const sortedShares = shares.sort((a, b) => a.timestamp - b.timestamp);
    const uniqueDays: string[] = [];
    
    sortedShares.forEach(share => {
      const date = new Date(share.timestamp);
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (!uniqueDays.includes(dayKey)) {
        uniqueDays.push(dayKey);
      }
    });

    let bestStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < uniqueDays.length; i++) {
      const prevDate = new Date(uniqueDays[i - 1]);
      const currDate = new Date(uniqueDays[i]);
      const diffDays = (currDate.getTime() - prevDate.getTime()) / (24 * 60 * 60 * 1000);

      if (diffDays === 1) {
        currentStreak++;
      } else {
        bestStreak = Math.max(bestStreak, currentStreak);
        currentStreak = 1;
      }
    }

    return Math.max(bestStreak, currentStreak);
  };

  // バイラル度計算（1-5レベル）
  const calculateViralLevel = (totalShares: number, streak: number, weeklyShares: number): number => {
    let score = 0;
    
    // 総シェア数による得点
    if (totalShares >= 50) score += 2;
    else if (totalShares >= 20) score += 1.5;
    else if (totalShares >= 10) score += 1;
    else if (totalShares >= 5) score += 0.5;

    // ストリークによる得点
    if (streak >= 7) score += 2;
    else if (streak >= 3) score += 1;
    else if (streak >= 1) score += 0.5;

    // 週間活動による得点
    if (weeklyShares >= 10) score += 1;
    else if (weeklyShares >= 5) score += 0.5;

    return Math.min(5, Math.max(1, Math.ceil(score)));
  };

  // シェアランキング計算
  const calculateShareRank = (totalShares: number, viralLevel: number): number => {
    const score = totalShares * viralLevel;
    if (score >= 100) return 1;
    if (score >= 50) return Math.floor(Math.random() * 3) + 2;
    if (score >= 20) return Math.floor(Math.random() * 5) + 5;
    if (score >= 10) return Math.floor(Math.random() * 10) + 10;
    return Math.floor(Math.random() * 50) + 20;
  };

  // バイラル統計を計算
  const viralStats = useMemo<ViralStats>(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // このドラマのシェア履歴をフィルタリング
    const dramaShareHistory = shareHistory.filter(s => s.dramaSlug === dramaSlug);

    // 今日と今週のシェア数
    const todayShares = dramaShareHistory.filter(s => new Date(s.timestamp) >= todayStart).length;
    const weeklyShares = dramaShareHistory.filter(s => new Date(s.timestamp) >= weekStart).length;

    // プラットフォーム別統計
    const platformStats = dramaShareHistory.reduce((acc, share) => {
      acc[share.platform] = (acc[share.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // テンプレート別統計
    const templateStats = dramaShareHistory.reduce((acc, share) => {
      acc[share.template] = (acc[share.template] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 連続投稿日数を計算
    const shareStreak = calculateShareStreak(dramaShareHistory);
    const bestStreak = calculateBestStreak(dramaShareHistory);

    // バイラル度を計算（1-5）
    const viralLevel = calculateViralLevel(dramaShareHistory.length, shareStreak, weeklyShares);

    // 最後のシェア日時
    const lastShareDate = dramaShareHistory.length > 0 ? 
      new Date(Math.max(...dramaShareHistory.map(s => s.timestamp))) : null;

    // シェアランキング（簡易計算）
    const shareRank = calculateShareRank(dramaShareHistory.length, viralLevel);

    return {
      totalShares: dramaShareHistory.length,
      shareStreak,
      viralLevel,
      platformStats,
      templateStats,
      lastShareDate,
      todayShares,
      weeklyShares,
      bestStreak,
      shareRank
    };
  }, [shareHistory, dramaSlug]);

  // シェア実行
  const shareContent = useCallback((platform: string, template: string, dramaSlug: string, reviewId?: string) => {
    const newShare: ShareData = {
      platform: platform as ShareData['platform'],
      template: template as ShareData['template'],
      timestamp: Date.now(),
      dramaSlug,
      reviewId
    };

    const updatedHistory = [...shareHistory, newShare];
    saveShareHistory(updatedHistory);
  }, [shareHistory, saveShareHistory]);

  // シェア用テキスト生成
  const generateShareText = useCallback((template: string, dramaSlug: string, review?: Review): string => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dramabaka.com';
    const url = `${baseUrl}/drama/${dramaSlug}`;
    
    const templates = {
      excitement: `このドラマ、マジでヤバい！完全にハマってしまった...🔥\n\n#ドラマバカ一代 #完全に廃人\n${url}`,
      challenge: `挑戦状：このドラマのバカ度を超えられる？\n真の廃人求む！💀\n\n#ドラマバカ一代 #廃人バトル\n${url}`,
      obsession: `【警告】このドラマは危険です。一度見たら戻れません...\n\n現在のバカ度：MAX🧠🧠🧠🧠🧠\n\n#ドラマバカ一代 #沼落ち注意\n${url}`,
      custom: review ? 
        `「${review.quickReview}」\n\nバカ度レベル${review.bakaLevel}で投稿しました！\n\n#ドラマバカ一代\n${url}` :
        `ドラマバカ一代で廃人活動中！\n\n#ドラマバカ一代\n${url}`
    };

    return templates[template as keyof typeof templates] || templates.custom;
  }, []);

  // 統計更新（shareHistoryの変更で自動的に更新されるため、実質的に不要）
  const refreshStats = useCallback(() => {
    // shareHistoryが変更されると自動的にviralStatsが再計算される
  }, []);

  // 連続投稿日数取得
  const getShareStreak = useCallback((): number => {
    return viralStats.shareStreak;
  }, [viralStats.shareStreak]);

  // バイラル度取得
  const getViralLevel = useCallback((): number => {
    return viralStats.viralLevel;
  }, [viralStats.viralLevel]);

  // バイラルマスター判定
  const isViralMaster = useMemo(() => {
    return viralStats.viralLevel >= 5 && viralStats.totalShares >= 50 && viralStats.bestStreak >= 7;
  }, [viralStats]);

  return {
    viralStats,
    shareContent,
    getShareStreak,
    getViralLevel,
    isViralMaster,
    generateShareText,
    refreshStats
  };
};