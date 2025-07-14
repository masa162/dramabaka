'use client'
import { useState } from 'react'
import ContentSection from '@/components/common/ContentSection'
import { BAKA_CHECK_QUESTIONS } from '@/lib/data/bakaCheck'
import { getBakaLevelInfo } from '@/lib/utils'
import Link from 'next/link'

export default function BakaCheckPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < BAKA_CHECK_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0)
    const averageScore = totalScore / answers.length
    
    let level: 1 | 2 | 3 | 4 | 5
    if (averageScore <= 1.5) level = 1
    else if (averageScore <= 2.5) level = 2
    else if (averageScore <= 3.5) level = 3
    else if (averageScore <= 4.5) level = 4
    else level = 5
    
    return { totalScore, level, info: getBakaLevelInfo(level) }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  return (
    <>
            <ContentSection title="◆バカ度診断◆">
              {!showResult ? (
                <div>
                  <div style={{textAlign: 'center', margin: '20px 0'}}>
                    <strong>質問 {currentQuestion + 1} / {BAKA_CHECK_QUESTIONS.length}</strong>
                  </div>
                  
                  <div style={{margin: '20px 0', fontSize: '14px', fontWeight: 'bold'}}>
                    {BAKA_CHECK_QUESTIONS[currentQuestion].question}
                  </div>
                  
                  <div style={{margin: '20px 0'}}>
                    {BAKA_CHECK_QUESTIONS[currentQuestion].options.map((option, index) => (
                      <div key={index} style={{margin: '10px 0'}}>
                        <button 
                          onClick={() => handleAnswer(option.score)}
                          className="button-link"
                          style={{width: '100%', textAlign: 'left', padding: '10px'}}
                        >
                          {option.text}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {(() => {
                    const result = calculateResult()
                    return (
                      <>
                        <div style={{textAlign: 'center', margin: '30px 0'}}>
                          <h2>🎯 診断結果 🎯</h2>
                        </div>
                        
                        <div style={{
                          textAlign: 'center', 
                          padding: '20px', 
                          border: '3px solid #ff0000',
                          background: result.level >= 4 ? '#ffff00' : '#f0f0f0',
                          margin: '20px 0'
                        }}>
                          <div style={{fontSize: '24px', margin: '10px 0'}}>
                            {result.info.emoji}
                          </div>
                          <div style={{fontSize: '18px', fontWeight: 'bold', color: '#ff0000'}}>
                            {result.info.stars} {result.info.label}
                          </div>
                          <div style={{margin: '15px 0', fontSize: '14px'}}>
                            {result.info.description}
                          </div>
                          <div style={{fontSize: '12px', color: '#666'}}>
                            総合スコア: {result.totalScore}点
                          </div>
                        </div>
                        
                        {result.level >= 4 && (
                          <div className="warning-box" style={{margin: '20px 0'}}>
                            <div className="warning-text blink">
                              ⚠️ 廃人警告 ⚠️
                            </div>
                            あなたは既に重度のドラマ依存症です。<br />
                            専門医（ドラマ仲間）との相談をお勧めします。
                          </div>
                        )}
                        
                        <div style={{textAlign: 'center', margin: '30px 0'}}>
                          <button onClick={reset} className="button-link" style={{marginRight: '10px'}}>
                            もう一度診断
                          </button>
                          <Link href="/" className="button-link">
                            HOMEに戻る
                          </Link>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
      </ContentSection>
    </>
  )
}