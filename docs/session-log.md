# garbery 開発セッションログ

最終更新: 2026-06-01

---

## 1. 完了した実装内容

### サイト全体レイアウト
- **サイドバーナビゲーション**（`components/layout/Header.tsx`）
  - PC（lg+）: 左側 200px 固定サイドバー
  - モバイル: 上部スリムバー（h-12）+ ハンバーガーで左からスライドイン
  - ナビ項目: HOME / concept / SHOP / MEMBERSHIP / CONTACT（下部寄せ: `mt-auto`）
  - 最下部: CART（点数表示）/ LINK（Instagram）テキストリンク
  - アクティブページのリンクを黒でハイライト

- **レイアウトオフセット**（`app/layout.tsx`）
  - PC: `lg:ml-[200px]` でサイドバー分ずらす
  - モバイル: `pt-12` でトップバー分ずらす

### ブランドロゴ
- フォント: **Playfair Display Bold**（Google Fonts を `@import` で直接読み込み）
- 表記: `garbery`（小文字）で統一
- 適用箇所: サイドバー・モバイルバー・ヒーロー・フッター
- `globals.css` に `.font-logo { font-family: 'Playfair Display', Georgia, serif; }` を直書き
  - ※ Tailwind の `font-logo` ユーティリティは JIT が即時反映しなかったため CSS 直書きで解決

### ページ一覧

| ページ | パス | 状態 |
|--------|------|------|
| トップ | `/` | ✅ Hero のみ（シンプル） |
| ショップ | `/products` | ✅ 1商品フィーチャーレイアウト |
| 商品詳細 | `/products/001` | ✅ サイズ・カラー選択・カート追加 |
| コンセプト | `/concept` | ✅ 花畑画像 + ブランドテキスト |
| メンバーシップ | `/membership` | ✅ ログイン・新規登録・会員特典 |
| お問い合わせ | `/contact` | ✅ Instagram DM・メールアドレス |
| カート | `/cart` | ✅ 数量変更・削除・合計計算 |
| 404 | `/not-found` | ✅ 既存 |

### アニメーション
- **ヒーロー画像**: ページ読み込み時 フェードイン + ズームイン（scale 1.08→1、1.8秒）
- **ヒーローテキスト**: シーズン→garbery→SHOP NOW が順に下から浮上
- **コンセプトページ画像**: ヒーローと同じ演出（`ConceptHero.tsx` コンポーネント）
- **コンセプトテキスト**: スクロール連動でフェードイン（AnimatedSection / StaggerContainer）
- スクロールパララックス（ヒーロー背景画像）

### 商品データ（`lib/products.ts`）
- 商品: **1点のみ**（不要な12商品を削除済み）
  - ID: `001`
  - 名前: `Three Gerberas - I Love You T-shirt`
  - 価格: ¥8,000
  - サイズ: S / M / L / XL
  - カラー: ホワイト
  - 画像: `/images/products/001-1.png`

### カート機能
- Context API（`context/CartContext.tsx`）+ localStorage 永続化
- カートドロワー（右からスライドイン）
- カートページ（数量変更・削除・送料計算 ¥10,000以上無料）

---

## 2. 未完了・課題・TODO

### 画像関連
- [ ] 商品サブ画像（`/images/products/001-2.png`）が未設定（現在メイン画像と同じ）
- [ ] OGP画像（`/images/ogp.png`）がプレースホルダーのまま
- [ ] カテゴリ画像（`/images/categories/`）は SVG プレースホルダー

### 機能
- [ ] **お問い合わせフォーム** 未実装（現状は Instagram DM とメールへの誘導のみ）
- [ ] **メンバーシップ機能** 未実装（UI のみ。ログイン・登録は動作しない）
- [ ] **決済機能** 未実装（「購入手続きへ」ボタンは非機能）
- [ ] `/concept` `/contact` `/membership` `/shipping` `/privacy` `/terms` `/returns` `/about` — フッターリンクの一部が 404 になる可能性あり

### デザイン
- [ ] 商品詳細ページのサイズガイド
- [ ] Footer の法務ページ（特定商取引法・プライバシーポリシー等）が未作成

### その他
- [ ] 価格（¥8,000）は仮設定。正式価格に要変更
- [ ] Instagram URL（`https://instagram.com`）が仮。正式アカウントに要変更
- [ ] メールアドレス（`info@garbery.jp`）が仮

---

## 3. 技術的な決定事項

### フォント読み込み方法
- `next/font/google` の CSS変数（`--font-playfair`）経由では Tailwind JIT が即時反映しない問題が発生
- **解決策**: `globals.css` に `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap')` を直書きし、`.font-logo` クラスで `font-family` を直接指定
- `next/font` の Playfair 設定は `layout.tsx` から削除済み

### サイドバーレイアウト
- サイドバーは `position: fixed` → メインコンテンツは CSS `margin-left` でオフセット
- モバイルではトップバー（h-12）+ スライドドロワーの組み合わせ
- `usePathname()` でアクティブリンクをハイライト

### 商品ページのレイアウト
- 1商品のみのため、グリッドではなく**左：大画像 / 右：商品情報**の2カラムエディトリアルレイアウトを採用
- 商品が増えた場合、`products[0]` がフィーチャー、`products.slice(1)` が下部グリッドに自動追加される設計

### 画像管理
- 商品画像: `/public/images/products/{id}-1.jpg（or .png）`
- ヒーロー画像: `/public/images/top/hero.png`
- コンセプト画像: `/public/images/top/concept.png`
- ファイルを上書きするだけでサイトに反映される

### コンセプトページのアニメーション
- `export default function ConceptPage()` は `'use client'` が必要（motion を直接使用）
- 画像アニメーション部分は `ConceptHero.tsx` として分離（将来の metadata サーバーコンポーネント化に備えて）

---

## 4. 次回再開時に引き継ぐ重要情報

### プロジェクト構成
```
C:\Users\artno\Desktop\apparel-ec\   ← garbery EC サイト本体
C:\Users\artno\Desktop\GOBE\         ← GOBE Web制作LP（別プロジェクト）
```

### 開発サーバー起動方法
```
cd C:\Users\artno\Desktop\apparel-ec
npm run dev
# → http://localhost:3000
```

### 主要ファイルの場所

| 目的 | ファイル |
|------|---------|
| 商品データ変更 | `lib/products.ts` |
| ナビ項目変更 | `components/layout/Header.tsx`（`navLinks` 配列） |
| ヒーロー画像変更 | `public/images/top/hero.png` を上書き |
| コンセプト画像変更 | `public/images/top/concept.png` を上書き |
| 商品画像変更 | `public/images/products/001-1.png` を上書き |
| グローバルスタイル | `app/globals.css` |
| Tailwind設定 | `tailwind.config.ts` |

### 現在の商品（1点）
- **ID**: `001`
- **名前**: Three Gerberas - I Love You T-shirt
- **価格**: ¥8,000（仮）
- **画像**: `/public/images/products/001-1.png` に設定済み

### 注意点
- `lib/products.ts` の `rankingPosition` フィールドが消えたため、もし Ranking セクションを復活させる場合は型定義も確認すること（`types/index.ts` の `Product` インターフェースに `rankingPosition?: number` は残っている）
- `app/products/page.tsx` のカテゴリフィルター UI は削除済み。復活させる場合は旧コードを参考に再実装が必要
