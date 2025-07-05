interface WarningBoxProps {
  children: React.ReactNode
}

export default function WarningBox({ children }: WarningBoxProps) {
  return (
    <div className="warning-box">
      <div className="warning-text blink">
        ★☆★緊急告知★☆★
      </div>
      {children}
    </div>
  )
}