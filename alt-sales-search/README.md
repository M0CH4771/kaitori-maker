# トレカ成約価格検索

ALTの商品ページに表示される「Recent transactions」を、PSAグレード・レアリティ・カード名／型番・取引元で検索する静的サイトです。初期条件は **PSA8 × AR**。URLに検索条件が残ります。GitHub Pagesではこのフォルダの `index.html` から開けます。

## できること

- ひらがな／カタカナ、英語名、全角・半角、型番6桁、複数キーワード検索
- PSA8とPSA9を別商品として扱い、取引元の絞り込み後に直近価格を計算
- 最近の取引・成約日・取引方法を表示し、該当履歴をCSV出力
- JSON／CSVを画面に読み込み。これはその画面限りの置換で、共通データへは保存しません
- 5分ごと／画面に戻ったときに `dist/data.json` を再読込

## データの範囲

`scripts/targets.json` に記載した公開商品ページだけが取得対象です。ALT全商品や、すべてのPSA8 ARを網羅していません。初期データは2026年9月10日にALTの公開画面から確認した実際の表示値です。

**ALTは掲載元で、各成約の取引元はeBay・Fanatics Collect等の場合があります。** 取引元を区別して表示します。「ALTのみ」で0件になる場合は、収録した履歴にALT成約がありません。

出品中のLowest price、現在の入札額、PSA人口を成約価格として取り込みません。価格は画面で確認できるUSD表示値で、送料・税の内訳、ベストオファー表示金額の詳細、同日取引の時間までは取得していません。通常、各ページのRecent transactions欄に表示される最大4件が対象です。「View all」やログインが必要な履歴は取得しません。

グレード切替後も元の商品画像・ヘッダーが残るALTの表示に注意し、価格は選択したPSAグレードの履歴から取り込みます。画像が別グレードのままの場合は画像を表示しません。

## 更新

```bash
npm ci
npx playwright install --with-deps chromium
npm test
npm run collect
```

Node.js 22以降。Playwrightで公開ページを通常表示して読み取ります。ログイン情報・Cookie・非公開APIは使いません。商品ページやレアリティ・型番が想定と違う、認証／人間確認が必要、読み込みが終わらない等の場合は終了し、以前の `dist/data.json` を維持します。

収集用の `github/alt-sales-refresh.yml` をリポジトリの `.github/workflows/alt-sales-refresh.yml` に配置すると、手動実行・毎日03:17 UTC（日本時間12:17）・収集コード変更時に更新します。GitHub上のフォルダ名は `alt-sales-search` を想定しています。GitHub Pagesはデフォルトブランチのルートを公開する構成に対応します。既存サイトを上書きするPages設定変更は不要です。

自動取得は初回のGitHub Actions実行結果で確認してください。外部サイトの変更・制限により止まる可能性があります。

## ファイル

- `dist/`：公開するサイト・共通データ
- `scripts/targets.json`：対象商品のURL、日本語名、型番、PSAグレード
- `scripts/collect-alt.mjs`：公開画面からの取得
- `scripts/parse-alt.mjs`：成約行の解析と商品照合
- `scripts/core.test.mjs`：グレード分離・取引元・検索・CSV・異常値の検証

## 追加対象

`targets.json` の products に既存商品と同じ形式で追加します。対象ページに日本語版Art Rareと該当番号が表示される必要があります。鑑定グレードは `grades` で指定します。取引がない商品は0円で表示せず、検索結果から除外します。

## 配置上の注意

Sites版は確認時点のデータを含む独立した配置です。GitHub Actionsが更新するのはGitHubの `alt-sales-search/dist/data.json` であり、Sites版へは自動反映されません。継続運用にはGitHub Pages版を使ってください。
