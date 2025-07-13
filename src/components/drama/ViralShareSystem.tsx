import React, { useState, useMemo } from 'react';
import { Review } from '@/lib/types';
import { useViralStats } from '@/hooks/useViralStats';

interface ViralShareSystemProps {
  dramaSlug: string;
  selectedReview?: Review;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

type SharePlatform = 'twitter' | 'line' | 'facebook' | 'clipboard';
type ShareTemplate = 'excitement' | 'challenge' | 'obsession' | 'custom';

export const ViralShareSystem: React.FC<ViralShareSystemProps> = ({
  dramaSlug,
  selectedReview,
  isVisible,
  onToggleVisibility
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ShareTemplate>('excitement');
  const [customText, setCustomText] = useState('');
  const [shareAnimation, setShareAnimation] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const { viralStats, shareContent, generateShareText, isViralMaster } = useViralStats(dramaSlug);

  // バイラル度に応じたメッセージ
  const viralLevelMessage = useMemo(() => {
    const messages = {
      1: '👶 シェア初心者',
      2: '📱 SNS慣れ',
      3: '🔥 バイラル候補',
      4: '💀 拡散マスター',
      5: '👑 バイラル帝王'
    };
    return messages[viralStats.viralLevel as keyof typeof messages];
  }, [viralStats.viralLevel]);

  // テンプレート情報
  const templates = {
    excitement: {
      name: '興奮系',
      emoji: '🔥',
      description: '熱い気持ちを爆発させる',
      color: '#ff6600'
    },
    challenge: {
      name: '挑戦系',
      emoji: '⚔️',
      description: '他の廃人に挑戦状を叩きつける',
      color: '#cc0000'
    },
    obsession: {
      name: '沼系',
      emoji: '💀',
      description: '完全に沼落ちした危険な状態',
      color: '#9900cc'
    },
    custom: {
      name: 'カスタム',
      emoji: '✨',
      description: '自分だけのオリジナルメッセージ',
      color: '#0066cc'
    }
  };

  // プラットフォーム情報
  const platforms = {
    twitter: {
      name: 'Twitter(X)',
      emoji: '🐦',
      color: '#1da1f2',
      action: (text: string) => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=550,height=420');
      }
    },
    line: {
      name: 'LINE',
      emoji: '💬',
      color: '#00b900',
      action: (text: string) => {
        const url = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      }
    },
    facebook: {
      name: 'Facebook',
      emoji: '📘',
      color: '#4267b2',
      action: (text: string) => {
        const currentUrl = window.location.href;
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    clipboard: {
      name: 'クリップボード',
      emoji: '📋',
      color: '#666666',
      action: async (text: string) => {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedText(true);
          setTimeout(() => setCopiedText(false), 2000);
        } catch (error) {
          console.warn('クリップボードへのコピーに失敗:', error);
        }
      }
    }
  };

  // シェア実行
  const handleShare = async (platform: SharePlatform) => {
    const text = selectedTemplate === 'custom' && customText ? 
      customText : generateShareText(selectedTemplate, dramaSlug, selectedReview);

    // アニメーション開始
    setShareAnimation(platform);
    setTimeout(() => setShareAnimation(null), 1000);

    // プラットフォーム別のシェア実行
    await platforms[platform].action(text);

    // 統計に記録
    shareContent(platform, selectedTemplate, dramaSlug, selectedReview?.id);
  };

  // バイラル度に応じたアニメーション
  const getViralAnimation = () => {
    if (viralStats.viralLevel >= 5) return 'viral-master';
    if (viralStats.viralLevel >= 4) return 'viral-high';
    if (viralStats.viralLevel >= 3) return 'viral-medium';
    return 'viral-low';
  };

  if (!isVisible) {
    return (
      <div className="viral-share-toggle">
        <style jsx>{`
          .viral-share-toggle {
            margin: 20px 0;
            text-align: center;
          }

          .toggle-button {
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
            transition: all 0.3s;
          }

          .toggle-button:hover {
            background: linear-gradient(135deg, #ff9900, #ffcc00);
            transform: translateY(-3px);
          }

          .viral-preview {
            margin-top: 10px;
            font-size: 12px;
            color: #666;
          }
        `}</style>
        
        <button className="toggle-button" onClick={onToggleVisibility}>
          📱 バイラルシェア機能 {viralLevelMessage}
        </button>
        
        {viralStats.totalShares > 0 && (
          <div className="viral-preview">
            総シェア: {viralStats.totalShares}回 | 連続: {viralStats.shareStreak}日 | ランク: {viralStats.shareRank}位
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="viral-share-system">
      <style jsx>{`
        .viral-share-system {
          background: linear-gradient(135deg, #e6f3ff, #cce6ff);
          border: 3px outset #99ccff;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          font-family: 'MS UI Gothic', sans-serif;
          animation: ${getViralAnimation()} 3s ease-in-out infinite;
        }

        @keyframes viral-master {
          0%, 100% { box-shadow: 0 0 10px #ff6600; }
          50% { box-shadow: 0 0 30px #ff6600, 0 0 50px #ff0000; }
        }

        @keyframes viral-high {
          0%, 100% { box-shadow: 0 0 5px #ff9900; }
          50% { box-shadow: 0 0 20px #ff9900; }
        }

        @keyframes viral-medium {
          0%, 100% { box-shadow: 0 0 3px #0099ff; }
          50% { box-shadow: 0 0 10px #0099ff; }
        }

        @keyframes viral-low {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }

        .viral-header {
          background: linear-gradient(90deg, #ff6600, #ff9900);
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .viral-title {
          font-size: 18px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          margin-bottom: 5px;
        }

        .viral-subtitle {
          font-size: 12px;
          opacity: 0.9;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          opacity: 0.8;
        }

        .close-button:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .viral-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.8);
          border: 2px outset #dddddd;
          border-radius: 5px;
          padding: 10px;
          text-align: center;
          font-size: 12px;
        }

        .stat-value {
          font-size: 16px;
          font-weight: bold;
          color: #ff6600;
          display: block;
        }

        .template-section {
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
          border-bottom: 2px solid #ff6600;
          padding-bottom: 5px;
        }

        .template-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 8px;
          margin-bottom: 15px;
        }

        .template-button {
          background: ${templates[selectedTemplate].color};
          color: white;
          border: 2px ${selectedTemplate === 'excitement' ? 'inset' : 'outset'} #cccccc;
          padding: 8px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 11px;
          font-weight: bold;
          text-align: center;
          transition: all 0.2s;
          font-family: 'MS UI Gothic', sans-serif;
        }

        .template-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        }

        .template-button.active {
          border: 2px inset #cccccc;
          transform: translateY(1px);
        }

        .custom-text-area {
          width: 100%;
          height: 80px;
          border: 2px inset #cccccc;
          border-radius: 5px;
          padding: 8px;
          font-family: 'MS UI Gothic', sans-serif;
          font-size: 12px;
          resize: vertical;
          margin-bottom: 10px;
        }

        .preview-area {
          background: rgba(255, 255, 255, 0.9);
          border: 2px inset #cccccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 15px;
          font-size: 12px;
          line-height: 1.4;
          min-height: 60px;
          white-space: pre-line;
        }

        .platform-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
        }

        .platform-button {
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          border: 3px outset #cccccc;
          padding: 12px 8px;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          font-size: 11px;
          font-weight: bold;
          transition: all 0.3s;
          font-family: 'MS UI Gothic', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .platform-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 10px rgba(0,0,0,0.3);
        }

        .platform-button:active {
          transform: translateY(0);
          border: 3px inset #cccccc;
        }

        .platform-emoji {
          font-size: 20px;
          display: block;
          margin-bottom: 5px;
        }

        .share-animation {
          animation: shareSuccess 1s ease-out;
          background: linear-gradient(135deg, #00ff00, #66ff66) !important;
        }

        @keyframes shareSuccess {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .copied-notification {
          background: #00cc00;
          color: white;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 11px;
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          animation: fadeInOut 2s ease-in-out;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .viral-master-badge {
          position: absolute;
          top: 5px;
          left: 5px;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #ff6600;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: bold;
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px #ffd700; }
          50% { box-shadow: 0 0 15px #ffd700, 0 0 25px #ff6600; }
        }

        /* モバイル対応 */
        @media (max-width: 600px) {
          .viral-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .template-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .platform-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .viral-header {
            padding: 10px;
          }
          
          .viral-title {
            font-size: 16px;
          }
        }
      `}</style>

      {isViralMaster && (
        <div className="viral-master-badge">
          👑 バイラル帝王
        </div>
      )}

      <div className="viral-header">
        <button className="close-button" onClick={onToggleVisibility}>×</button>
        <div className="viral-title">
          📱 バイラルシェア機能 {viralLevelMessage}
        </div>
        <div className="viral-subtitle">
          あなたの廃人っぷりを世界に拡散しよう！
        </div>
      </div>

      <div className="viral-stats">
        <div className="stat-item">
          <span className="stat-value">{viralStats.totalShares}</span>
          総シェア数
        </div>
        <div className="stat-item">
          <span className="stat-value">{viralStats.shareStreak}</span>
          連続投稿日数
        </div>
        <div className="stat-item">
          <span className="stat-value">{viralStats.shareRank}</span>
          シェアランク
        </div>
        <div className="stat-item">
          <span className="stat-value">{viralStats.weeklyShares}</span>
          今週のシェア
        </div>
      </div>

      <div className="template-section">
        <div className="section-title">🎭 シェアテンプレート選択</div>
        <div className="template-buttons">
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              className={`template-button ${selectedTemplate === key ? 'active' : ''}`}
              onClick={() => setSelectedTemplate(key as ShareTemplate)}
              style={{ 
                background: selectedTemplate === key ? template.color : `linear-gradient(135deg, ${template.color}, #ffffff)`,
                border: `2px ${selectedTemplate === key ? 'inset' : 'outset'} #cccccc`
              }}
            >
              <div>{template.emoji}</div>
              <div>{template.name}</div>
            </button>
          ))}
        </div>

        {selectedTemplate === 'custom' && (
          <textarea
            className="custom-text-area"
            placeholder="オリジナルのシェアメッセージを入力..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
        )}

        <div className="section-title">📝 プレビュー</div>
        <div className="preview-area">
          {selectedTemplate === 'custom' && customText ? 
            customText : 
            generateShareText(selectedTemplate, dramaSlug, selectedReview)
          }
        </div>
      </div>

      <div className="template-section">
        <div className="section-title">🚀 シェア先選択</div>
        <div className="platform-buttons">
          {Object.entries(platforms).map(([key, platform]) => (
            <button
              key={key}
              className={`platform-button ${shareAnimation === key ? 'share-animation' : ''}`}
              onClick={() => handleShare(key as SharePlatform)}
              style={{ borderColor: platform.color }}
            >
              <span className="platform-emoji">{platform.emoji}</span>
              {platform.name}
              {key === 'clipboard' && copiedText && (
                <div className="copied-notification">コピー完了!</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};