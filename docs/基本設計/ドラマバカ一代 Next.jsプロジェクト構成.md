## 📁 プロジェクト構造

```
dramabaka/
├── app/
│   ├── layout.tsx              # 全体レイアウト（2000年代風CSS含む）
│   ├── page.tsx                # TOPページ
│   ├── dramas/
│   │   ├── page.tsx            # ドラマ一覧
│   │   └── [slug]/
│   │       └── page.tsx        # ドラマ詳細
│   ├── ranking/
│   │   └── page.tsx            # ランキング
│   ├── baka-check/
│   │   └── page.tsx            # バカ度診断
│   ├── review/
│   │   └── page.tsx            # 感想投稿
│   ├── bbs/
│   │   └── page.tsx            # 掲示板
│   └── globals.css             # 2000年代風スタイル
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # ヘッダー（オレンジグラデーション）
│   │   ├── Menu.tsx            # メニューバー（青）
│   │   ├── Sidebar.tsx         # サイドバー
│   │   └── Footer.tsx          # フッター
│   ├── common/
│   │   ├── AccessCounter.tsx   # アクセスカウンタ
│   │   ├── WarningBox.tsx      # 警告ボックス
│   │   ├── ContentSection.tsx  # コンテンツセクション
│   │   └── ButtonLink.tsx      # 2000年代風ボタン
│   └── drama/
│       ├── ReviewItem.tsx      # レビューアイテム
│       ├── RankingItem.tsx     # ランキングアイテム
│       └── BakaRating.tsx      # バカ度評価（★★★★★）
├── lib/
│   ├── types.ts               # TypeScript型定義
│   ├── data/                  # ダミーデータ
│   │   ├── dramas.ts
│   │   └── reviews.ts
│   └── utils.ts               # ユーティリティ関数
├── public/
│   ├── favicon.ico            # 2000年代風ファビコン
│   └── images/
└── styles/
    └── retro.css              # 2000年代風CSS

```

## 🎨 CSS設計方針

### 2000年代風スタイルガイド

```css
/* カラーパレット */
:root {
  --retro-orange: #ff6600;
  --retro-blue: #0066cc;
  --retro-red: #ff0000;
  --retro-green: #009900;
  --retro-yellow: #ffff00;
  --retro-gray: #f0f0f0;
  --retro-border: #666666;
  --retro-text: #000000;
  --retro-link: #0000ff;
  --retro-visited: #800080;
}

/* フォント */
body {
  font-family: 'MS UI Gothic', 'ＭＳ Ｐゴシック', sans-serif;
  font-size: 12px;
  line-height: 1.4;
}

/* テーブルレイアウト風 */
.retro-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.retro-cell {
  display: table-cell;
  vertical-align: top;
  padding: 8px;
}

/* 2000年代風ボタン */
.retro-button {
  background: linear-gradient(90deg, #cccccc 0%, #ffffff 50%, #cccccc 100%);
  border: 2px outset #cccccc;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: bold;
}

```

## 📝 実装優先順位

### Phase 1: 基盤構築（今週）

1. ✅ Next.jsプロジェクト作成
2. ✅ 2000年代風CSS実装
3. ✅ Layout + Header + Menu + Footer
4. ✅ TOPページ実装

### Phase 2: コア機能（来週）

1. ドラマ一覧ページ
2. ドラマ詳細ページ
3. ランキングページ
4. バカ度診断ページ

### Phase 3: インタラクション（再来週）

1. 感想投稿機能
2. 掲示板機能
3. アクセスカウンタ
4. 検索機能

## 🛠 開発コマンド

```bash
# プロジェクト作成
npx create-next-app@latest dramabaka --typescript --tailwind --eslint --app

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

```

## 📊 データ構造

### Drama（ドラマ）

```tsx
interface Drama {
  id: string
  title: string
  slug: string
  broadcaster: 'フジ' | '日テレ' | 'TBS' | 'テレ朝' | 'テレ東'
  timeslot: string      // "月9", "火9" etc
  genre: string[]       // ["恋愛", "サスペンス"]
  cast: string[]
  synopsis: string
  startDate: Date
  endDate: Date | null
  averageBakaLevel: 1 | 2 | 3 | 4 | 5
  reviewCount: number
  status: 'airing' | 'ended' | 'upcoming'
  isWarning: boolean    // 要注意フラグ
}

```

### Review（感想）

```tsx
interface Review {
  id: string
  dramaId: string
  nickname: string      // "バカ仲間A", "沼民B"
  bakaLevel: 1 | 2 | 3 | 4 | 5
  oneLineComment: string
  detailedReview?: string
  createdAt: Date
  likes: number
  isNew: boolean        // NEWマーク
  isHot: boolean        // HOTマーク
}

```

### BakaLevel（バカ度）

```tsx
const BAKA_LEVELS = {
  1: { stars: '★', label: 'まだ正気', emoji: '🧠' },
  2: { stars: '★★', label: 'ちょっとヤバい', emoji: '🧠🧠' },
  3: { stars: '★★★', label: '沼が見えてきた', emoji: '🧠🧠🧠' },
  4: { stars: '★★★★', label: 'もう戻れない', emoji: '🧠🧠🧠🧠' },
  5: { stars: '★★★★★', label: '完全に廃人', emoji: '🧠🧠🧠🧠🧠' }
} as const

```

## 🎯 MVP実装目標

**完成イメージ：**

- 2000年代風デザイン完全再現
- 40代over↑にドストライクなノスタルジー
- 地上波ドラマ特化のレビューサイト
- 「愛のあるバカ」コミュニティ

この構成で **Claude Code** を使って実装していきましょう！