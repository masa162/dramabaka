**作成日**: 2025年7月6日

**対象**: Phase 2レビューシステム実装

**前提**: Phase 1番組詳細ページ完了済み

---

## 🎯 プロジェクト基本情報

### サイト概要

- **プロジェクト名**: 「ドラマバカ一代」
- **コンセプト**: 見すぎて頭おかしくなったヤツらの感想サイト
- **ターゲット**: 40代over↑の民度低い（いい意味で）地上波ドラマ好き日本人
- **特徴**: 2000年代のブログ文化に懐かしさを感じる層向け

### URL・リポジトリ

- **本番URL**: https://dramabaka.com
- **GitHub**: https://github.com/masa162/dramabaka
- **動作確認済みページ**: https://dramabaka.com/drama/2025/winter/nhk/taiga/berabou

### 技術スタック

- **フロントエンド**: Next.js 15.3.5 + TypeScript
- **スタイリング**: 手書きCSS（2000年代風デザイン）
- **開発環境**: Node.js v22.17.0 (nvm管理)
- **デプロイ**: Vercel自動デプロイ
- **ドメイン**: dramabaka.com (Namecheap)
- **コンテンツ管理**: Markdownファイル + gray-matter

---

## ✅ Phase 1完了済み機能

### 実装完了項目

1. **動的ルーティングシステム**
    - `src/app/drama/[...slug]/page.tsx`
    - URL形式: `/drama/年/季/放送局/ジャンル/番組名`
    - generateStaticParams/generateMetadata対応
2. **番組詳細ページコンポーネント**
    
    ```
    src/components/drama/
    ├── DramaDetailPage.tsx      # メインコンポーネント
    ├── DramaHeader.tsx          # ヘッダー部分
    ├── CastSection.tsx          # キャスト情報
    ├── ProductionInfo.tsx       # 制作情報
    └── BakaRating.tsx          # バカ度表示システム
    
    ```
    
3. **データ管理システム**
    - `src/lib/drama.ts`: MDファイル解析機能
    - `src/lib/types.ts`: TypeScript型定義
    - `content/years/` 階層構造
4. **サンプルコンテンツ**
    - `content/years/2025/winter/nhk/taiga/berabou.md`
    - 実際に動作する番組詳細ページ

### 動作確認済み

- ✅ 本番環境: https://dramabaka.com/drama/2025/winter/nhk/taiga/berabou
- ✅ ローカル環境: http://localhost:3000/drama/2025/winter/nhk/taiga/berabou

---

## 🎨 デザイン仕様（重要）

### 2000年代風デザインの特徴

- **オレンジ→黄色グラデーションヘッダー**
- **青色メニューバー**（ホバー時黄色）
- **MS UI Gothic フォント使用**
- **テーブルレイアウト風構造**
- **立体的なボタン**（outset border）
- **点滅・マーキーアニメーション**

### カラーパレット

```css
:root {
  --retro-orange: #ff6600;
  --retro-blue: #0066cc;
  --retro-red: #ff0000;
  --retro-green: #009900;
  --retro-yellow: #ffff00;
  --retro-gray: #f0f0f0;
}

```

### バカ度表示システム

- **🧠** → まだ正気（レベル1）
- **🧠🧠** → ちょっとヤバい（レベル2）
- **🧠🧠🧠** → 沼が見えてきた（レベル3）
- **🧠🧠🧠🧠** → もう戻れない（レベル4）
- **🧠🧠🧠🧠🧠** → 完全に廃人（レベル5）

---

## 📊 重要な型定義

### Drama Interface

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
  production: {
    script: string[];
    director: string[];
    producer: string[];
    music?: string;
    production_company: string;
  };

  cast: {
    main: Array<{
      name: string;
      character: string;
      description: string;
    }>;
    supporting: Array<{
      name: string;
      character: string;
      description: string;
    }>;
  };

  // コンテンツ
  synopsis: string;
  content: string;

  // バカ度
  initial_baka_level: number;
  warning_flags: string[];

  // メタデータ
  tags: string[];
  categories: string[];
  status: 'upcoming' | 'airing' | 'ended' | 'cancelled';
  created_at: string;
  updated_at: string;
  author: string;

  // パス情報
  filePath: string;
  urlPath: string;
  imagePath: string;
}

```

---

## 🎯 Phase 2実装目標

### メインコンセプト

**「閲覧者が勝手にレビューを書き散らしたくなるデザイン」**

### 実装予定機能

1. **💬 匿名レビュー投稿フォーム**
    - 超簡単投稿（最低3クリック）
    - ニックネーム自動生成
    - バカ度選択システム
2. **📝 レビュー表示システム**
    - リアルタイム更新
    - 新着順・バカ度順・共感順ソート
    - 2000年代風レビューカード
3. **👥 コミュニティ機能**
    - 「同じ穴のムジナ」いいね機能
    - 「沼登録」ブックマーク
    - 「布教活動」シェア機能
4. **🧠 バカ度集計システム**
    - リアルタイムバカ度平均更新
    - バカ度分布グラフ
    - 要注意ドラマ自動判定

### 実装場所

**べらぼうページ**（https://dramabaka.com/drama/2025/winter/nhk/taiga/berabou）の下部に追加

---

## 🎮 Phase 2設計詳細

### レビュー投稿UX設計

```tsx
// 投稿ハードル最小化
const quickPost = {
  required: ['バカ度選択', '感想入力（50文字以内）'],
  optional: ['ニックネーム', '詳細レビュー'],
  autoGenerate: 'ニックネーム（廃人候補#{ランダム数字}）',
  validation: 'soft' // 厳しすぎないバリデーション
};

```

### 感情直結型UI

```
感情ボタン配置:
[😍 萌え死んだ] [😤 イライラする] [😭 泣ける]
[🤣 笑える] [😱 衝撃展開]
→ 選択すると自動的にテンプレート文章生成

```

### ゲーミフィケーション要素

```yaml
badges:
  - name: "沼落ち初心者" (初回投稿)
  - name: "バカ度マスター" (全レベル投稿)
  - name: "廃人製造機" (投稿が100共感獲得)
  - name: "布教の達人" (SNSシェア10回)

```

---

## 📁 ファイル構成

### 現在の構成

```
dramabaka/
├── src/
│   ├── app/
│   │   ├── drama/[...slug]/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── drama/
│   │   │   ├── DramaDetailPage.tsx
│   │   │   ├── BakaRating.tsx
│   │   │   └── ...
│   │   └── layout/
│   └── lib/
│       ├── drama.ts
│       └── types.ts
├── content/
│   └── years/2025/winter/nhk/taiga/berabou.md
└── package.json

```

### Phase 2で追加予定

```
src/components/
├── review/
│   ├── ReviewForm.tsx          # 投稿フォーム
│   ├── ReviewList.tsx          # レビュー一覧
│   ├── ReviewItem.tsx          # 個別レビュー
│   └── ReviewStats.tsx         # 統計表示
└── common/
    ├── EmotionButtons.tsx      # 感情ボタン
    └── BakaLevelSelector.tsx   # バカ度選択

```

---

## 🔧 開発環境

### セットアップ完了済み

- **Node.js**: v22.17.0 (nvm管理)
- **npm**: v10.9.2
- **起動時間**: 1.6秒
- **動作**: 安定（zsh: killedエラー解決済み）

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

```

---

## 🌐 デプロイ・運用

### 自動デプロイフロー

```
1. ローカル開発・確認
   ↓
2. GitHubプッシュ
   ↓
3. Vercel自動デプロイ（2-3分）
   ↓
4. 本番URL確認

```

### 運用方針

- **週5時間以内**: 持続可能な運用
- **更新頻度**: 週2回が理想
- **コンテンツ**: 地上波ドラマのみに特化

---

## 🚨 重要な注意事項

### 既存機能への影響回避

- **既存のコード変更禁止**: layout.tsx、globals.css等
- **新機能として追加**: 既存ページに影響しない実装
- **TypeScript型安全**: 完全な型定義を維持

### 2000年代風デザイン継承

- **新しいUIも2000年代風**: モダンデザイン禁止
- **既存カラーパレット使用**: 新色追加時は慎重に
- **レトロ感の維持**: 最新トレンドではなく懐かしさ優先

### パフォーマンス配慮

- **静的生成活用**: Next.js ISR使用
- **画像最適化**: Next.js Image使用
- **軽量実装**: 不要な依存関係追加禁止

---

## 🎯 Phase 2成功指標

### 機能面

- ✅ レビュー投稿が3クリックで完了
- ✅ リアルタイムでレビュー表示更新
- ✅ バカ度平均が自動計算・表示
- ✅ 2000年代風デザイン完全継承

### UX面

- ✅ 「書き散らしたくなる」UI実現
- ✅ ストレスフリーな投稿体験
- ✅ コミュニティ感の醸成
- ✅ 既存ページへの影響ゼロ

---

## 📞 実装開始時の確認事項

### 1. 現在の状況確認

- べらぼうページが正常表示されているか
- ローカル環境が正常動作するか

### 2. Phase 2実装方針

- どのコンポーネントから実装開始するか
- データ管理方法（ローカルストレージ vs API）

### 3. デザイン詳細

- レビューフォームの具体的なレイアウト
- 2000年代風UIの詳細仕様

---

## 🎊 Phase 1からの引き継ぎ完了

この設計書により、新しいチャットでPhase 2レビューシステム実装を即座に開始できます。

**重要なポイント**:

- 既存機能は完璧に動作中
- 2000年代風デザインの世界観確立済み
- 開発環境は最適化完了
- 次はレビューシステムでコミュニティ機能を実現

**Phase 2実装準備完了！** 🚀