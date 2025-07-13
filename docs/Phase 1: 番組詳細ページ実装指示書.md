# Phase 1: 番組詳細ページ実装指示書

## 🎯 実装目標

現在のdramabaka.comに番組詳細ページ機能を追加し、MDファイルベースのコンテンツ管理システムを構築する。

## 📁 必要なファイル構成

```
dramabaka/
├── app/
│   └── drama/
│       └── [...slug]/
│           ├── page.tsx          # 動的ルーティング
│           └── loading.tsx       # ローディング画面
├── components/
│   └── drama/
│       ├── DramaDetailPage.tsx   # メインコンポーネント
│       ├── DramaHeader.tsx       # ヘッダー部分
│       ├── CastSection.tsx       # キャスト情報
│       ├── ProductionInfo.tsx    # 制作情報
│       └── BakaRating.tsx        # バカ度表示
├── lib/
│   ├── drama.ts                  # ドラマデータ取得
│   └── types.ts                  # 型定義
├── content/
│   └── years/
│       └── 2025/
│           └── winter/
│               └── nhk/
│                   └── taiga/
│                       └── berabou.md  # サンプル記事
└── public/
    └── images/
        └── dramas/
            └── 2025/winter/nhk/taiga/berabou/
                ├── main.jpg
                └── cast/

```

## 🎨 デザイン要件

### A. 2000年代風デザイン継承

- 既存のglobals.cssスタイルを活用
- オレンジグラデーションヘッダー
- テーブルレイアウト風CSS Grid
- MS UI Gothicフォント

### B. 新規CSSクラス追加

```css
/* ドラマ詳細ページ専用 */
.drama-detail-container { }
.drama-header-section { }
.drama-cast-grid { }
.drama-production-info { }
.baka-rating-display { }

```

## 📊 データ型定義

```tsx
interface Drama {
  // 基本情報
  title: string;
  slug: string;
  english_title?: string;

  // 放送情報
  broadcaster: string;
  genre: string;
  season: 'winter' | 'spring' | 'summer' | 'autumn';
  year: number;
  timeslot: string;
  air_start: string;
  air_end?: string;
  total_episodes: number;

  // 制作・キャスト
  production: ProductionInfo;
  cast: CastInfo;

  // コンテンツ
  synopsis: string;
  content: string;

  // バカ度
  initial_baka_level: number;
  warning_flags: string[];

  // メタデータ
  tags: string[];
  status: 'upcoming' | 'airing' | 'ended';

  // パス情報
  urlPath: string;
  imagePath: string;
}

```

## 🧩 コンポーネント仕様

### 1. DramaDetailPage.tsx (メイン)

```tsx
interface Props {
  drama: Drama;
}

export default function DramaDetailPage({ drama }: Props) {
  return (
    <div className="drama-detail-container">
      <DramaHeader drama={drama} />
      <div className="drama-content-grid">
        <div className="drama-main-content">
          <ProductionInfo production={drama.production} />
          <CastSection cast={drama.cast} />
          <div className="drama-synopsis">
            {/* あらすじ表示 */}
          </div>
          <div className="drama-content">
            {/* Markdown本文表示 */}
          </div>
        </div>
        <div className="drama-sidebar">
          <BakaRating
            level={drama.initial_baka_level}
            warnings={drama.warning_flags}
          />
          {/* 関連情報 */}
        </div>
      </div>
    </div>
  );
}

```

### 2. BakaRating.tsx (重要)

```tsx
interface Props {
  level: number;
  warnings: string[];
  className?: string;
}

export default function BakaRating({ level, warnings }: Props) {
  const getBakaEmoji = (level: number) => {
    const emojis = ['', '🧠', '🧠🧠', '🧠🧠🧠', '🧠🧠🧠🧠', '🧠🧠🧠🧠🧠'];
    return emojis[level] || '';
  };

  const getBakaLabel = (level: number) => {
    const labels = ['', 'まだ正気', 'ちょっとヤバい', '沼が見えてきた', 'もう戻れない', '完全に廃人'];
    return labels[level] || '';
  };

  return (
    <div className="baka-rating-box retro-warning-box">
      <h3>🧠 バカ度判定</h3>
      <div className="baka-level">
        <span className="baka-emoji">{getBakaEmoji(level)}</span>
        <span className="baka-label">{getBakaLabel(level)}</span>
      </div>
      {warnings.length > 0 && (
        <div className="warning-flags">
          <h4>⚠️ 要注意ポイント</h4>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

```

## 🔧 実装詳細

### A. lib/drama.ts

- MDファイル読み込み機能
- フロントマター解析
- エラーハンドリング
- 型安全な戻り値

### B. 動的ルーティング

- [...slug]/page.tsx で5層階層対応
- generateStaticParams でビルド時生成
- generateMetadata でSEO対応

### C. 画像最適化

- Next.js Imageコンポーネント使用
- WebP対応
- レスポンシブ画像

## ✅ 動作確認項目

1. **ルーティング**: `/drama/2025/winter/nhk/taiga/berabou` でアクセス可能
2. **データ表示**: MDファイルの内容が正しく表示される
3. **デザイン**: 2000年代風スタイルが適用されている
4. **バカ度表示**: レーティングシステムが機能する
5. **レスポンシブ**: モバイルでも正常表示
6. **SEO**: メタタグが正しく設定される

## 🚨 注意事項

### 既存コードとの整合性

- 現在のlayout.tsx、globals.cssを変更せずに実装
- 既存のコンポーネント（Header、Menu等）と干渉しない
- 既存のルーティング（/dramas、/ranking等）に影響しない

### パフォーマンス

- 静的生成を活用
- 画像の遅延ロード
- 適切なキャッシュ設定

### エラーハンドリング

- 存在しないドラマのnot-found対応
- MDファイル読み込みエラー対応
- 型安全なデータ処理

## 📝 サンプルデータ

berabou.mdファイルを content/years/2025/winter/nhk/taiga/ に配置し、
実際のドラマ詳細ページとして動作することを確認する。

---

この仕様でPhase 1の実装を進めてください。
完了後、レビューシステム（Phase 2）の実装に進みます。