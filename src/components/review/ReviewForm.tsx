'use client';

import React, { useState } from 'react';
import { saveReview, generateRandomNickname } from '@/lib/review';
import { Review } from '@/lib/types';

interface ReviewFormProps {
  dramaSlug: string;
  onReviewSubmitted?: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ dramaSlug, onReviewSubmitted }) => {
  const [step, setStep] = useState(1);
  const [bakaLevel, setBakaLevel] = useState(0);
  const [emotion, setEmotion] = useState('');
  const [nickname, setNickname] = useState('');
  const [quickReview, setQuickReview] = useState('');
  const [detailedReview, setDetailedReview] = useState('');

  const emotions = [
    { emoji: '😍', label: '萌え死んだ', template: 'もう萌え死にそう！' },
    { emoji: '😤', label: 'イライラする', template: 'イライラが止まらない...' },
    { emoji: '😭', label: '泣ける', template: '涙が止まらない...' },
    { emoji: '🤣', label: '笑える', template: '腹筋崩壊した！' },
    { emoji: '😱', label: '衝撃展開', template: 'まさかの展開すぎる！' },
  ];

  const bakaLevels = [
    { level: 1, emoji: '🧠', label: 'まだ正気', desc: '（普通に見てる）' },
    { level: 2, emoji: '🧠🧠', label: 'ちょっとヤバい', desc: '（録画し始めた）' },
    { level: 3, emoji: '🧠🧠🧠', label: '沼が見えてきた', desc: '（考察サイト巡回中）' },
    { level: 4, emoji: '🧠🧠🧠🧠', label: 'もう戻れない', desc: '（関連グッズ購入）' },
    { level: 5, emoji: '🧠🧠🧠🧠🧠', label: '完全に廃人', desc: '（ロケ地巡礼済み）' },
  ];

  const handleEmotionClick = (selectedEmotion: typeof emotions[0]) => {
    setEmotion(selectedEmotion.emoji);
    setQuickReview(selectedEmotion.template);
    setStep(2);
  };

  const handleSubmit = () => {
    const finalNickname = nickname || generateRandomNickname();
    
    try {
      const savedReview = saveReview({
        dramaSlug,
        nickname: finalNickname,
        emotion,
        bakaLevel,
        quickReview,
        detailedReview,
      });

      // 投稿完了後のリセット
      setStep(1);
      setBakaLevel(0);
      setEmotion('');
      setNickname('');
      setQuickReview('');
      setDetailedReview('');

      // 親コンポーネントに通知
      onReviewSubmitted?.(savedReview);

      alert('レビュー投稿完了！ありがとうございます！');
    } catch (error) {
      console.error('レビュー保存エラー:', error);
      alert('投稿に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div style={{
      fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
      background: 'linear-gradient(to bottom, #ff6600, #ffff00)',
      border: '3px outset #ff6600',
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
          fontSize: '16px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          textShadow: '1px 1px 0px #ffff00'
        }}>
          ⚡ あなたも今すぐレビューを書き散らそう！ ⚡
        </h3>
        
        {step === 1 && (
          <div>
            <p style={{ fontSize: '14px', color: '#0066cc', fontWeight: 'bold', marginBottom: '15px' }}>
              まずは今の気持ちを選んでください（3秒で完了）
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '10px',
              marginBottom: '15px'
            }}>
              {emotions.map((emo, index) => (
                <button
                  key={index}
                  onClick={() => handleEmotionClick(emo)}
                  style={{
                    background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
                    border: '2px outset #cccccc',
                    padding: '10px 5px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333333',
                    borderRadius: '0',
                    textAlign: 'center',
                    transition: 'all 0.1s'
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(to bottom, #ffff00, #ffcc00)';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(to bottom, #ffffff, #f0f0f0)';
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '5px' }}>{emo.emoji}</div>
                  <div>{emo.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p style={{ fontSize: '14px', color: '#0066cc', fontWeight: 'bold', marginBottom: '15px' }}>
              選択した感情: {emotion} → 今のバカ度は？
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '8px',
              marginBottom: '15px'
            }}>
              {bakaLevels.map((level, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setBakaLevel(level.level);
                    setStep(3);
                  }}
                  style={{
                    background: bakaLevel === level.level 
                      ? 'linear-gradient(to bottom, #ffff00, #ffcc00)'
                      : 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
                    border: '2px outset #cccccc',
                    padding: '8px 4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#333333',
                    borderRadius: '0',
                    textAlign: 'center',
                    transition: 'all 0.1s'
                  }}
                  onMouseOver={(e) => {
                    if (bakaLevel !== level.level) {
                      (e.target as HTMLElement).style.background = 'linear-gradient(to bottom, #ffffcc, #ffff99)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (bakaLevel !== level.level) {
                      (e.target as HTMLElement).style.background = 'linear-gradient(to bottom, #ffffff, #f0f0f0)';
                    }
                  }}
                >
                  <div style={{ fontSize: '16px', marginBottom: '3px' }}>{level.emoji}</div>
                  <div style={{ fontSize: '9px' }}>{level.label}</div>
                  <div style={{ fontSize: '8px', color: '#666666' }}>{level.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p style={{ fontSize: '14px', color: '#0066cc', fontWeight: 'bold', marginBottom: '15px' }}>
              最後に一言どうぞ！（50文字以内でサクッと）
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#333333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                ニックネーム（空白で自動生成）
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={generateRandomNickname()}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '2px inset #cccccc',
                  fontSize: '12px',
                  fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
                  borderRadius: '0',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#333333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                感想（50文字以内）
              </label>
              <textarea
                value={quickReview}
                onChange={(e) => setQuickReview(e.target.value)}
                placeholder="今の気持ちを書き散らしてください..."
                maxLength={50}
                style={{
                  width: '100%',
                  height: '60px',
                  padding: '8px',
                  border: '2px inset #cccccc',
                  fontSize: '12px',
                  fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
                  borderRadius: '0',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ fontSize: '10px', color: '#666666', textAlign: 'right' }}>
                {quickReview.length}/50文字
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#333333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                詳細レビュー（任意・200文字以内）
              </label>
              <textarea
                value={detailedReview}
                onChange={(e) => setDetailedReview(e.target.value)}
                placeholder="もっと語りたい場合はこちらに..."
                maxLength={200}
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '8px',
                  border: '2px inset #cccccc',
                  fontSize: '12px',
                  fontFamily: '"MS UI Gothic", "MS Gothic", sans-serif',
                  borderRadius: '0',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ fontSize: '10px', color: '#666666', textAlign: 'right' }}>
                {detailedReview.length}/200文字
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={handleSubmit}
                disabled={!quickReview.trim()}
                style={{
                  background: quickReview.trim() 
                    ? 'linear-gradient(to bottom, #ff6600, #ff3300)'
                    : 'linear-gradient(to bottom, #cccccc, #999999)',
                  border: '3px outset #ff6600',
                  padding: '12px 30px',
                  cursor: quickReview.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white',
                  borderRadius: '0',
                  textShadow: '1px 1px 0px #000000',
                  animation: quickReview.trim() ? 'blink 1s infinite' : 'none'
                }}
              >
                📝 レビューを書き散らす！
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{
        background: '#0066cc',
        color: 'white',
        padding: '10px',
        fontSize: '11px',
        textAlign: 'center',
        border: '1px solid #003399'
      }}>
        💡 投稿したレビューは即座に表示されます！みんなで沼を深めましょう 💡
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ReviewForm;