// index.html から分割したメインスクリプト（classic script。関数はグローバルのまま）。
    const DEFAULT_LOGO = createSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="160" viewBox="0 0 600 160">
            <rect width="600" height="160" rx="18" fill="#ffffff"/>
            <path d="M40 80h74M486 80h74" stroke="#d9ad4a" stroke-width="5"/>
            <text x="300" y="68" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="#111827" letter-spacing="6">SHOP</text>
            <text x="300" y="112" text-anchor="middle" font-family="Arial,sans-serif" font-size="40" font-weight="900" fill="#e60020" letter-spacing="2">LOGO</text>
        </svg>
    `);

    const NO_IMAGE = createSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop stop-color="#eef1f5"/>
                    <stop offset="1" stop-color="#d7dce5"/>
                </linearGradient>
            </defs>
            <rect width="400" height="560" rx="24" fill="url(#g)"/>
            <rect x="42" y="42" width="316" height="476" rx="18" fill="none" stroke="#d9ad4a" stroke-width="6"/>
            <text x="200" y="270" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="900" fill="#697386">NO IMAGE</text>
        </svg>
    `);

    const LOADING_IMAGE = createSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
            <rect width="400" height="560" rx="24" fill="#eef1f5"/>
            <circle cx="200" cy="250" r="46" fill="none" stroke="#d9ad4a" stroke-width="9" stroke-dasharray="95 195"/>
            <text x="200" y="335" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="900" fill="#697386">LOADING</text>
        </svg>
    `);

    const DESIGN_CATEGORIES = [{"id":"geometry","label":"幾何学・シャープ"},{"id":"luxury","label":"ラグジュアリー"},{"id":"japanese","label":"和風・伝統"},{"id":"editorial","label":"雑誌・エディトリアル"},{"id":"pop","label":"ポップ・セール"},{"id":"nature","label":"自然・ボタニカル"},{"id":"digital","label":"デジタル・未来"},{"id":"monthly","label":"月別の季節"},{"id":"event","label":"イベント"}];
    const GENERATED_THEME_DEFINITIONS = [{"id":"geo_grid","label":"格子設計","category":"geometry","family":"geometry","motif":"01","bg":"#f1f4f6","header":"#263b50","accent":"#7192a9","accent2":"#d2e1ea","price":"#a92336","dark":false},{"id":"geo_arch","label":"アーチ構成","category":"geometry","family":"geometry","motif":"02","bg":"#f2eff8","header":"#372a5a","accent":"#9782c2","accent2":"#e2d8f1","price":"#653f91","dark":false},{"id":"geo_rail","label":"サイドレール","category":"geometry","family":"geometry","motif":"03","bg":"#edf4f6","header":"#174b65","accent":"#438da6","accent2":"#cce8ec","price":"#a53832","dark":false},{"id":"geo_step","label":"ステップライン","category":"geometry","family":"geometry","motif":"04","bg":"#f7f0e8","header":"#67452f","accent":"#cd8754","accent2":"#f0d6b8","price":"#9a3d24","dark":false},{"id":"geo_cross","label":"クロスフレーム","category":"geometry","family":"geometry","motif":"05","bg":"#eef1f8","header":"#293a68","accent":"#7385bd","accent2":"#d8dff2","price":"#3d4e8b","dark":false},{"id":"geo_portal","label":"ポータル","category":"geometry","family":"geometry","motif":"06","bg":"#eff5f1","header":"#285144","accent":"#68a18c","accent2":"#d2e8dc","price":"#315c4b","dark":false},{"id":"geo_cut","label":"カットコーナー","category":"geometry","family":"geometry","motif":"07","bg":"#f7f2e9","header":"#5b4a31","accent":"#b38e4f","accent2":"#e8d9b0","price":"#805d28","dark":false},{"id":"geo_axis","label":"センター軸","category":"geometry","family":"geometry","motif":"08","bg":"#f2f2f0","header":"#353535","accent":"#8b8b82","accent2":"#dddcd4","price":"#a52c2c","dark":false},{"id":"geo_mosaic","label":"モザイク","category":"geometry","family":"geometry","motif":"09","bg":"#edf5f4","header":"#244d4c","accent":"#57a59d","accent2":"#c7e5de","price":"#226762","dark":false},{"id":"lux_blackgold","label":"黒曜ゴールド","category":"luxury","family":"luxury","motif":"01","bg":"#111317","header":"#201e1b","accent":"#c7a45a","accent2":"#f0dfad","price":"#a3212d","dark":true},{"id":"lux_royal","label":"ロイヤルブルー","category":"luxury","family":"luxury","motif":"02","bg":"#101b35","header":"#172d54","accent":"#b6a0ed","accent2":"#e4dcf8","price":"#294c9a","dark":true},{"id":"lux_emerald","label":"エメラルド箔","category":"luxury","family":"luxury","motif":"03","bg":"#10251f","header":"#173b30","accent":"#b9ca7a","accent2":"#e6edbf","price":"#176650","dark":true},{"id":"lux_burgundy","label":"バーガンディ","category":"luxury","family":"luxury","motif":"04","bg":"#2a151d","header":"#48202f","accent":"#d09a6a","accent2":"#eddbc1","price":"#a22d48","dark":true},{"id":"lux_sapphire","label":"サファイアケース","category":"luxury","family":"luxury","motif":"05","bg":"#112434","header":"#173e5d","accent":"#7ab9ce","accent2":"#d3e9ec","price":"#176488","dark":true},{"id":"lux_rose","label":"ローズゴールド","category":"luxury","family":"luxury","motif":"06","bg":"#311b22","header":"#532632","accent":"#dc9a9c","accent2":"#f1d4c8","price":"#a23e54","dark":true},{"id":"lux_amber","label":"琥珀","category":"luxury","family":"luxury","motif":"07","bg":"#251c10","header":"#49331a","accent":"#d7a53e","accent2":"#f1dc9b","price":"#956016","dark":true},{"id":"lux_silver","label":"銀箔","category":"luxury","family":"luxury","motif":"08","bg":"#242a31","header":"#39434d","accent":"#c3cbd1","accent2":"#eef0ee","price":"#526472","dark":true},{"id":"lux_violet","label":"アメジスト","category":"luxury","family":"luxury","motif":"09","bg":"#211831","header":"#38234e","accent":"#bf9bdd","accent2":"#eddcf2","price":"#713a92","dark":true},{"id":"jp_washi","label":"和紙・墨","category":"japanese","family":"japanese","motif":"01","bg":"#f2eadb","header":"#34302a","accent":"#9e8054","accent2":"#e4d2ac","price":"#77312d","dark":false},{"id":"jp_sakura","label":"桜吹雪","category":"japanese","family":"japanese","motif":"02","bg":"#fff1f2","header":"#7b2638","accent":"#d76c83","accent2":"#f6cfda","price":"#a32b4d","dark":false},{"id":"jp_seigaiha","label":"青海波","category":"japanese","family":"japanese","motif":"03","bg":"#eef5f5","header":"#153f50","accent":"#43899a","accent2":"#cbe3e5","price":"#164f6c","dark":false},{"id":"jp_momiji","label":"紅葉","category":"japanese","family":"japanese","motif":"04","bg":"#f5eee2","header":"#59362b","accent":"#c46b38","accent2":"#edd0a1","price":"#943d24","dark":false},{"id":"jp_fuji","label":"藤棚","category":"japanese","family":"japanese","motif":"05","bg":"#f1eff8","header":"#453769","accent":"#9280b5","accent2":"#ddd4ef","price":"#65518e","dark":false},{"id":"jp_matcha","label":"抹茶","category":"japanese","family":"japanese","motif":"06","bg":"#eef1e5","header":"#3e4a2d","accent":"#8e9c55","accent2":"#d9e1bc","price":"#4e632f","dark":false},{"id":"jp_hanabi","label":"花火","category":"japanese","family":"japanese","motif":"07","bg":"#181b31","header":"#262d53","accent":"#e08b58","accent2":"#f1c995","price":"#b1343c","dark":true},{"id":"jp_shippou","label":"七宝","category":"japanese","family":"japanese","motif":"08","bg":"#f5f0e6","header":"#5a352b","accent":"#bf9d5e","accent2":"#e9d8ad","price":"#9d3531","dark":false},{"id":"jp_kinako","label":"金襴","category":"japanese","family":"japanese","motif":"09","bg":"#eee6d4","header":"#403522","accent":"#b59347","accent2":"#ddca8e","price":"#754027","dark":false},{"id":"ed_newspaper","label":"新聞活字","category":"editorial","family":"editorial","motif":"01","bg":"#f4f1e8","header":"#252525","accent":"#696761","accent2":"#d8d5ca","price":"#a52b30","dark":false},{"id":"ed_magazine","label":"ファッション誌","category":"editorial","family":"editorial","motif":"02","bg":"#f7f0eb","header":"#47272c","accent":"#b57872","accent2":"#e9d4ce","price":"#8f263d","dark":false},{"id":"ed_archive","label":"アーカイブ","category":"editorial","family":"editorial","motif":"03","bg":"#eee9de","header":"#343b43","accent":"#7d8c91","accent2":"#d5d9d5","price":"#5b3940","dark":false},{"id":"ed_catalog","label":"商品カタログ","category":"editorial","family":"editorial","motif":"04","bg":"#f0f2f3","header":"#253c52","accent":"#6c879d","accent2":"#d1dce4","price":"#b4352d","dark":false},{"id":"ed_gallery","label":"ギャラリー","category":"editorial","family":"editorial","motif":"05","bg":"#f7f5ef","header":"#1e252c","accent":"#ae8c5c","accent2":"#ded2b5","price":"#79363b","dark":false},{"id":"ed_poster","label":"タイポポスター","category":"editorial","family":"editorial","motif":"06","bg":"#f5ede8","header":"#8d2c2b","accent":"#d47a4e","accent2":"#efcfad","price":"#2b3038","dark":false},{"id":"ed_blueprint","label":"設計図","category":"editorial","family":"editorial","motif":"07","bg":"#eaf0f3","header":"#254665","accent":"#5b92b5","accent2":"#d2e1e9","price":"#a63331","dark":false},{"id":"ed_modernist","label":"モダニスト","category":"editorial","family":"editorial","motif":"08","bg":"#efefeb","header":"#252525","accent":"#df4b36","accent2":"#e9b146","price":"#252525","dark":false},{"id":"ed_book","label":"ブックカバー","category":"editorial","family":"editorial","motif":"09","bg":"#f1eadb","header":"#543c31","accent":"#a88961","accent2":"#dfcfad","price":"#7c2f36","dark":false},{"id":"pop_burst","label":"バースト","category":"pop","family":"pop","motif":"01","bg":"#fff4dc","header":"#aa2f32","accent":"#f1bb36","accent2":"#ffdf80","price":"#bd1e2d","dark":false},{"id":"pop_candy","label":"キャンディ","category":"pop","family":"pop","motif":"02","bg":"#fff0f4","header":"#b13164","accent":"#eb82b0","accent2":"#f7d4e2","price":"#95234c","dark":false},{"id":"pop_festival","label":"フェス","category":"pop","family":"pop","motif":"03","bg":"#fff1e4","header":"#c94424","accent":"#f2a334","accent2":"#ffe09a","price":"#a52b26","dark":false},{"id":"pop_sticker","label":"ステッカー","category":"pop","family":"pop","motif":"04","bg":"#f6f1ff","header":"#54378a","accent":"#a66be1","accent2":"#e3d1fb","price":"#7136a4","dark":false},{"id":"pop_soda","label":"ソーダ","category":"pop","family":"pop","motif":"05","bg":"#e9f8fb","header":"#14728a","accent":"#3bb9c8","accent2":"#c8f0ea","price":"#145d8b","dark":false},{"id":"pop_lemon","label":"レモンスカッシュ","category":"pop","family":"pop","motif":"06","bg":"#fbf8df","header":"#35451e","accent":"#aecb35","accent2":"#e8f39d","price":"#436719","dark":false},{"id":"pop_chocolate","label":"チョコレート","category":"pop","family":"pop","motif":"07","bg":"#f6eee8","header":"#583429","accent":"#c98255","accent2":"#edc89f","price":"#893628","dark":false},{"id":"pop_toy","label":"トイボックス","category":"pop","family":"pop","motif":"08","bg":"#f2f6fc","header":"#2f54a0","accent":"#e55d67","accent2":"#f1c348","price":"#293c7b","dark":false},{"id":"pop_lime","label":"ライムパンチ","category":"pop","family":"pop","motif":"09","bg":"#eff8e5","header":"#31552a","accent":"#76b83e","accent2":"#d6ee8f","price":"#3c6b27","dark":false},{"id":"nat_forest","label":"森の小径","category":"nature","family":"nature","motif":"01","bg":"#edf2e7","header":"#38503a","accent":"#78945c","accent2":"#d5e1b9","price":"#405f3e","dark":false},{"id":"nat_botanical","label":"ボタニカル","category":"nature","family":"nature","motif":"02","bg":"#f4f1e6","header":"#475a45","accent":"#7e9e76","accent2":"#dce8cf","price":"#576d47","dark":false},{"id":"nat_ocean","label":"深海","category":"nature","family":"nature","motif":"03","bg":"#e7f1f1","header":"#164a58","accent":"#318b91","accent2":"#c4e4df","price":"#135f73","dark":false},{"id":"nat_desert","label":"砂丘","category":"nature","family":"nature","motif":"04","bg":"#f4ead8","header":"#725436","accent":"#c49a5b","accent2":"#ecd9ae","price":"#936027","dark":false},{"id":"nat_herb","label":"ハーブガーデン","category":"nature","family":"nature","motif":"05","bg":"#eef4ec","header":"#426254","accent":"#6ca18a","accent2":"#d2e7d8","price":"#346b58","dark":false},{"id":"nat_sky","label":"高原の空","category":"nature","family":"nature","motif":"06","bg":"#edf4f7","header":"#375c70","accent":"#7fa8b8","accent2":"#d4e5e8","price":"#3e7187","dark":false},{"id":"nat_wood","label":"木目","category":"nature","family":"nature","motif":"07","bg":"#f1e9db","header":"#553b2e","accent":"#a87951","accent2":"#dfc6a5","price":"#79432e","dark":false},{"id":"nat_marine","label":"サンゴ礁","category":"nature","family":"nature","motif":"08","bg":"#e9f5f3","header":"#165c61","accent":"#43a695","accent2":"#c5e6d8","price":"#c34f3d","dark":false},{"id":"nat_moon","label":"月夜の森","category":"nature","family":"nature","motif":"09","bg":"#14221d","header":"#243a2d","accent":"#9ab17b","accent2":"#d4dfad","price":"#71531f","dark":true},{"id":"dig_terminal","label":"ターミナル","category":"digital","family":"digital","motif":"01","bg":"#10171b","header":"#202c31","accent":"#49b69a","accent2":"#b8e4ca","price":"#247c66","dark":true},{"id":"dig_matrix","label":"マトリクス","category":"digital","family":"digital","motif":"02","bg":"#0d1a1d","header":"#102d2c","accent":"#48c789","accent2":"#a8f1bc","price":"#176d55","dark":true},{"id":"dig_synthwave","label":"シンセウェーブ","category":"digital","family":"digital","motif":"03","bg":"#17142c","header":"#29204c","accent":"#d35da8","accent2":"#f7b85d","price":"#6943a8","dark":true},{"id":"dig_arcade","label":"アーケード","category":"digital","family":"digital","motif":"04","bg":"#111a32","header":"#20345d","accent":"#47a9e7","accent2":"#ffe36b","price":"#315eb7","dark":true},{"id":"dig_circuit","label":"サーキット","category":"digital","family":"digital","motif":"05","bg":"#111b28","header":"#1e3348","accent":"#42bfd0","accent2":"#c2eff2","price":"#126d8a","dark":true},{"id":"dig_hologram","label":"ホログラム","category":"digital","family":"digital","motif":"06","bg":"#18202d","header":"#2a3847","accent":"#8ad5dd","accent2":"#e4c7f5","price":"#3b728c","dark":true},{"id":"dig_glitch","label":"グリッチ","category":"digital","family":"digital","motif":"07","bg":"#1e1323","header":"#35203a","accent":"#e35a70","accent2":"#f1c04e","price":"#8b2c72","dark":true},{"id":"dig_space","label":"スペース","category":"digital","family":"digital","motif":"08","bg":"#10152a","header":"#202d50","accent":"#8f83dc","accent2":"#d8d4ff","price":"#5041a2","dark":true},{"id":"dig_tech","label":"テックラボ","category":"digital","family":"digital","motif":"09","bg":"#101d24","header":"#1e3a45","accent":"#55b9a6","accent2":"#d6ed80","price":"#176d70","dark":true},{"id":"cal_jan_snow","label":"1月｜雪あそび","category":"monthly","family":"seasonal","motif":"01","ornament":"snowflake","bg":"#f0f5fa","header":"#365574","accent":"#92b7d4","accent2":"#dceaf4","price":"#426b91","dark":false},{"id":"cal_feb_heart","label":"2月｜ハート","category":"monthly","family":"seasonal","motif":"02","ornament":"heart","bg":"#fff0f3","header":"#963f59","accent":"#e58aa1","accent2":"#f9d8e0","price":"#bf3654","dark":false},{"id":"cal_mar_plum","label":"3月｜梅と春風","category":"monthly","family":"seasonal","motif":"03","ornament":"plum","bg":"#fbf2ea","header":"#7a463d","accent":"#ce8b69","accent2":"#efdcce","price":"#a9503c","dark":false},{"id":"cal_apr_sakura","label":"4月｜桜","category":"monthly","family":"seasonal","motif":"04","ornament":"sakura","bg":"#fff1f5","header":"#91445d","accent":"#df91aa","accent2":"#f7d9e2","price":"#b23759","dark":false},{"id":"cal_may_carp","label":"5月｜こいのぼり","category":"monthly","family":"seasonal","motif":"05","ornament":"carp","bg":"#eff7f7","header":"#285a69","accent":"#57a8ae","accent2":"#d0e9e4","price":"#267080","dark":false},{"id":"cal_jun_hydrangea","label":"6月｜あじさい","category":"monthly","family":"seasonal","motif":"06","ornament":"hydrangea","bg":"#f1f0fa","header":"#4e4b7b","accent":"#9693ce","accent2":"#dddaf1","price":"#655eaa","dark":false},{"id":"cal_jul_tanabata","label":"7月｜七夕","category":"monthly","family":"seasonal","motif":"07","ornament":"tanabata","bg":"#edf3fb","header":"#303f72","accent":"#7b91d3","accent2":"#d9e2fa","price":"#495ca2","dark":false},{"id":"cal_aug_sun","label":"8月｜ひまわり","category":"monthly","family":"seasonal","motif":"08","ornament":"sunflower","bg":"#fff6df","header":"#7d5b21","accent":"#e3ad35","accent2":"#f7e6ac","price":"#ad6d16","dark":false},{"id":"cal_sep_moon","label":"9月｜お月見","category":"monthly","family":"seasonal","motif":"09","ornament":"moon","bg":"#f0eff8","header":"#45426c","accent":"#a69cd4","accent2":"#e5def5","price":"#67558f","dark":false},{"id":"cal_oct_leaf","label":"10月｜秋の実り","category":"monthly","family":"seasonal","motif":"10","ornament":"leaf","bg":"#f6eee3","header":"#704631","accent":"#be7950","accent2":"#ebd2ae","price":"#9a4d2c","dark":false},{"id":"cal_nov_ginkgo","label":"11月｜紅葉","category":"monthly","family":"seasonal","motif":"11","ornament":"maple","bg":"#f5eee4","header":"#71402e","accent":"#c17b42","accent2":"#e7c99b","price":"#a34d32","dark":false},{"id":"cal_dec_snow","label":"12月｜冬支度","category":"monthly","family":"seasonal","motif":"12","ornament":"snowglobe","bg":"#edf4f7","header":"#345065","accent":"#8ab2c7","accent2":"#d9eaf0","price":"#3f7187","dark":false},{"id":"cal_event_newyear","label":"お正月｜門松と梅","category":"event","family":"seasonal","motif":"13","ornament":"kadomatsu","bg":"#f7f0e4","header":"#7b292d","accent":"#c69b46","accent2":"#ead7a2","price":"#ac282e","dark":false},{"id":"cal_event_valentine","label":"バレンタイン｜チョコとハート","category":"event","family":"seasonal","motif":"14","ornament":"chocolate","bg":"#fff0f3","header":"#89384e","accent":"#da7893","accent2":"#f5d3dd","price":"#b72f50","dark":false},{"id":"cal_event_hinamatsuri","label":"ひな祭り｜おひなさま","category":"event","family":"seasonal","motif":"15","ornament":"hina","bg":"#fbf0f3","header":"#83495e","accent":"#d492aa","accent2":"#f1dce1","price":"#ad4866","dark":false},{"id":"cal_event_whiteday","label":"ホワイトデー｜リボン","category":"event","family":"seasonal","motif":"16","ornament":"ribbon","bg":"#f0f7fa","header":"#477080","accent":"#8cb8c8","accent2":"#d9eaf0","price":"#487b91","dark":false},{"id":"cal_event_easter","label":"イースター｜たまご","category":"event","family":"seasonal","motif":"17","ornament":"easter","bg":"#f5f1fb","header":"#66518a","accent":"#ba9bd6","accent2":"#e9dcf2","price":"#7a5ca2","dark":false},{"id":"cal_event_childrens","label":"こどもの日｜かぶと","category":"event","family":"seasonal","motif":"18","ornament":"kabuto","bg":"#eff6f4","header":"#365f52","accent":"#80ad8b","accent2":"#dbead8","price":"#477652","dark":false},{"id":"cal_event_tanabata","label":"七夕｜星まつり","category":"event","family":"seasonal","motif":"19","ornament":"tanabata","bg":"#eef1fb","header":"#313f78","accent":"#778fd2","accent2":"#dae2fb","price":"#4e62a8","dark":false},{"id":"cal_event_matsuri","label":"夏祭り｜花火","category":"event","family":"seasonal","motif":"20","ornament":"fireworks","bg":"#f4eff7","header":"#56345f","accent":"#bd75a7","accent2":"#ead8eb","price":"#8b477d","dark":false},{"id":"cal_event_keiro","label":"敬老の日｜菊","category":"event","family":"seasonal","motif":"21","ornament":"chrysanthemum","bg":"#f4f1e8","header":"#5e6241","accent":"#a2a45d","accent2":"#e7e3bd","price":"#747536","dark":false},{"id":"cal_event_tsukimi","label":"十五夜｜月とうさぎ","category":"event","family":"seasonal","motif":"22","ornament":"rabbitmoon","bg":"#f1eff7","header":"#47436d","accent":"#a29bcc","accent2":"#e4def2","price":"#67558f","dark":false},{"id":"cal_event_halloween","label":"ハロウィン｜かぼちゃ","category":"event","family":"seasonal","motif":"23","ornament":"pumpkin","bg":"#f3edf7","header":"#493353","accent":"#d58a3a","accent2":"#efcf8a","price":"#85406e","dark":false},{"id":"cal_event_christmas","label":"クリスマス｜ツリー","category":"event","family":"seasonal","motif":"24","ornament":"tree","bg":"#eef4ee","header":"#2e5744","accent":"#b64d4f","accent2":"#d9ddb0","price":"#9b303b","dark":false}];
    const GENERATED_THEME_BY_ID = new Map(
        GENERATED_THEME_DEFINITIONS.map(theme => [theme.id, theme])
    );

    const THEMES = [
        "market", "trust", "clearblue", "slateclean", "highcontrast",
        "editorial", "ivoryclean", "sageclean", "coralclean",
        "signal", "wa", "ticket", "alert", "soft", "cyber", "scoreboard",
        "midnight", "tropical", "plum", "copper", "mintpop", "berry", "forestnight", "carbon", "skyline", "vintage", "cherry", "royalblue",
        ...GENERATED_THEME_DEFINITIONS.map(theme => `design_${theme.id}`)
    ];
    const LAYOUTS = {
        portrait_10x6: {
            orientation: "portrait",
            cols: 10,
            rows: 6,
            maxPerPage: 60
        },
        landscape_15x4: {
            orientation: "landscape",
            cols: 15,
            rows: 4,
            maxPerPage: 60
        },
        portrait_6x5: {
            orientation: "portrait",
            cols: 6,
            rows: 5,
            maxPerPage: 30
        },
        landscape_10x3: {
            orientation: "landscape",
            cols: 10,
            rows: 3,
            maxPerPage: 30
        }
    };
    const LEGACY_LAYOUT_MAP = {
        portrait_7x9: "portrait_10x6",
        landscape_9x7: "landscape_15x4"
    };
    const TITLE_STYLES = [
        "power", "gold", "outline", "royal", "ribbon",
        "underline", "neon", "stamp", "dual", "elegant"
    ];
    const TITLE_FONT_OPTIONS = {
        gothic:
            '"Noto Sans JP","Yu Gothic",Meiryo,sans-serif',
        standard:
            '"Zen Kaku Gothic New","Noto Sans JP","Yu Gothic",Meiryo,sans-serif',
        rounded:
            '"M PLUS Rounded 1c","Noto Sans JP","Yu Gothic",Meiryo,sans-serif',
        mincho:
            '"Noto Serif JP","Yu Mincho","Hiragino Mincho ProN",serif',
        condensed:
            'Oswald,"Noto Sans JP","Arial Narrow",sans-serif',
        elegant:
            '"Zen Kaku Gothic New","Noto Sans JP","Yu Gothic",sans-serif'
    };
    const DEFAULT_TITLE_CUSTOM = {
        color: "#ffffff",
        font: "gothic",
        size: 76,
        outlineColor: "#111827",
        outlineWidth: 2
    };
    const DEFAULT_WATERMARK_SETTINGS = {
        enabled: false,
        pattern: "grid",
        size: 145,
        opacity: 16
    };
    const DARK_WATERMARK_THEMES = new Set([
        "signal", "alert", "cyber", "scoreboard",
        "midnight", "forestnight", "carbon",
        ...GENERATED_THEME_DEFINITIONS.filter(theme => theme.dark).map(theme => `design_${theme.id}`)
    ]);
    const WATERMARK_PATTERN_OPTIONS = ["grid", "diagonal"];
    const DEFAULT_CARD_TEXT_CUSTOM = { nameScale: 100, typeScale: 100 };
    const DEFAULT_PRICE_CUSTOM = {
        scale: 100,
        colorMode: "theme",
        color: "#ffffff",
        primaryLabel: "状態A",
        secondaryLabel: "状態A-"
    };
    const DUAL_PRICE_PRIMARY_SCALE = 1;
    const DUAL_PRICE_SECONDARY_SCALE = 1;
    const LARGE_PRICE_THEMES = new Set([
        "signal", "trust", "market", "alert", "editorial",
        "wa", "cyber", "soft", "ticket", "scoreboard",
        "clearblue", "ivoryclean", "sageclean",
        "coralclean", "slateclean", "highcontrast",
        "midnight", "tropical", "plum", "copper", "mintpop", "berry", "forestnight", "carbon", "skyline", "vintage", "cherry", "royalblue",
        ...GENERATED_THEME_DEFINITIONS.map(theme => `design_${theme.id}`)
    ]);
    const LEGACY_THEME_MAP = {
        luxury: "signal",
        fire: "alert",
        royal: "trust",
        clean: "market",
        neon: "cyber",
        sakura: "soft",
        forest: "editorial",
        pop: "scoreboard",
        retro: "ticket",
        hologram: "market",
        mono: "market",
        ocean: "trust",
        sunset: "alert",
        mint: "market",
        lavender: "soft",
        ice: "trust",
        chocolate: "editorial",
        japan: "wa",
        galaxy: "cyber",
        lime: "scoreboard",
        brandwatermark: "clearblue",
        "design_sea_spring": "design_cal_jan_snow",
        "design_sea_sakura": "design_cal_apr_sakura",
        "design_sea_summer": "design_cal_aug_sun",
        "design_sea_matsuri": "design_cal_event_matsuri",
        "design_sea_autumn": "design_cal_nov_ginkgo",
        "design_sea_halloween": "design_cal_event_halloween",
        "design_sea_winter": "design_cal_dec_snow",
        "design_sea_xmas": "design_cal_event_christmas",
        "design_sea_newyear": "design_cal_event_newyear"
    };
    const PAGE_SPLIT_MODES = ["fill", "group_pack", "group_page"];
    const SORT_MODES = ["group_csv", "csv_all", "price_desc", "price_asc", "name"];
    const SINGLE_DESIGNS = [
        "blackgold", "redimpact", "royal", "clean", "cyber",
        "sakura", "retro", "pop", "emerald", "mono"
    ];
    const LEGACY_SINGLE_DESIGN_MAP = {
        chrome: "clean",
        sunset: "redimpact"
    };
    const SINGLE_SIZES = ["square", "portrait", "landscape"];
    const MAX_SINGLE_ITEMS_PER_IMAGE = 30;
    const DEFAULT_SINGLE_HEADLINE_SCALE = 100;
    const DEFAULT_SINGLE_NAME_SCALE = 100;
    const DEFAULT_SINGLE_PRICE_SCALE = 100;
    const DEFAULT_SINGLE_PRICE_COLOR_MODE = "theme";
    const DEFAULT_SINGLE_PRICE_COLOR = "#ffffff";
    const DEFAULT_SINGLE_PRIMARY_PRICE_LABEL = "状態A";
    const DEFAULT_SINGLE_SECONDARY_PRICE_LABEL = "状態A-";
    const SINGLE_LOGO_ALIGNMENTS = ["left", "center", "right"];
    const DEFAULT_SINGLE_LOGO_ALIGNMENT = "center";
    const TEMPLATE_STORAGE_KEY = "kaitori_named_templates_v1";
    const SINGLE_SETTINGS_STORAGE_KEY = "kaitori_single_ad_settings_v1";
    const SINGLE_TEMPLATE_STORAGE_KEY = "kaitori_single_named_templates_v1";
    const PANEL_LAYOUT_BREAKPOINT = 1320;
    const PANEL_LAYOUT_MIN_WIDTH = 440;
    const PANEL_LAYOUT_MAX_WIDTH = 900;
    const PANEL_LAYOUT_MIN_PREVIEW_WIDTH = 520;
    const PANEL_LAYOUT_CHROME_WIDTH = 32;
    const PANEL_LAYOUT_CONFIGS = Object.freeze({
        buylist: Object.freeze({
            label: "買取表",
            rootId: "buylistMakerView",
            controlId: "buylistControl",
            resizerId: "buylistLayoutResizer",
            storageKey: "kaitori_buylist_layout_width_v1",
            defaultWidth: 590,
            fitPreview: () => fitPreviewPages()
        }),
        single: Object.freeze({
            label: "単品告知",
            rootId: "singleMakerView",
            controlId: "singleControl",
            resizerId: "singleLayoutResizer",
            storageKey: "kaitori_single_layout_width_v1",
            defaultWidth: 590,
            fitPreview: () => fitSinglePreviews()
        }),
        xpost: Object.freeze({
            label: "X投稿文",
            rootId: "xPostMakerView",
            controlId: "xPostControl",
            resizerId: "xPostLayoutResizer",
            storageKey: "kaitori_xpost_layout_width_v1",
            defaultWidth: 590,
            fitPreview: () => {}
        })
    });
    const X_POST_TEMPLATE_STORAGE_KEY = "kaitori_xpost_templates_v1";
    const X_POST_TEMPLATE_EDITOR_STORAGE_KEY =
        "kaitori_xpost_template_editor_v1";
    const CSV_SNAPSHOT_STORAGE_KEY = "kaitori_previous_csv_snapshot_v1";
    const OFFICIAL_BASELINES_STORAGE_KEY =
        "kaitori_official_price_baselines_v1";
    const OFFICIAL_BASELINE_HISTORY_LIMIT = 3;
    const OFFICIAL_BASELINE_LEGACY_OWNER_KEY =
        "kaitori_official_baseline_legacy_owner_v1";
    const OFFICIAL_CATEGORY_STORAGE_KEY =
        "kaitori_official_baseline_category_v1";
    const OFFICIAL_OPERATOR_STORAGE_KEY =
        "kaitori_official_baseline_operator_v1";
    const PRICE_CHANGE_DISPLAY_STORAGE_KEY =
        "kaitori_price_change_display_v1";
    const WORKING_DRAFT_STORAGE_KEY = "kaitori_working_draft_v1";
    const STORE_REGISTRY_KEY = "kaitori_store_registry_v1";
    const ACTIVE_STORE_KEY = "kaitori_active_store_v1";
    const SHARED_SYNC_API_URL_STORAGE_KEY =
        "kaitori_shared_sync_api_url_v1";
    const SHARED_SYNC_EMBEDDED_URL_STORAGE_KEY =
        "kaitori_shared_sync_embedded_url_v1";
    const SHARED_SYNC_META_STORAGE_KEY =
        "kaitori_shared_sync_meta_v1";
    const SHARED_SYNC_CLIENT_ID_STORAGE_KEY =
        "kaitori_shared_sync_client_id_v1";
    const SHARED_SYNC_APP_ID = "kaitori-table-generator";
    const SHARED_SYNC_SCHEMA_VERSION = 1;
    const SHARED_SYNC_PUSH_DELAY = 1100;
    const SHARED_SYNC_REQUEST_TIMEOUT = 12000;
    const CARD_EDITOR_PAGE_SIZE = 100;
    const SINGLE_PICKER_PAGE_SIZE = 80;
    const MAX_CARD_EDIT_HISTORY = 30;
    const IMAGE_FETCH_TIMEOUT = 9000;
    const IMAGE_LOAD_CONCURRENCY = 8;
    const MAX_IMAGE_BLOB_SIZE = 12 * 1024 * 1024;
    const OFFICIAL_BASELINE_CATEGORIES = {
        psa: "PSA",
        box: "BOX",
        sotai: "素体",
        other: "その他"
    };
    const PRICE_CHANGE_DISPLAY_MODES = ["all", "up_new", "off"];
    const STORE_DATA_KEYS = [
        "kaitori_title",
        "kaitori_disclaimer",
        "kaitori_logo",
        "kaitori_layout",
        "kaitori_theme",
        "kaitori_title_style",
        "kaitori_title_color",
        "kaitori_title_font",
        "kaitori_title_size",
        "kaitori_title_outline_color",
        "kaitori_title_outline_width",
        "kaitori_price_scale",
        "kaitori_price_color_mode",
        "kaitori_price_color",
        "kaitori_price_primary_label",
        "kaitori_price_secondary_label",
        "kaitori_card_name_display",
        "kaitori_page_split",
        "kaitori_sort_order",
        PRICE_CHANGE_DISPLAY_STORAGE_KEY,
        OFFICIAL_BASELINES_STORAGE_KEY,
        OFFICIAL_CATEGORY_STORAGE_KEY,
        OFFICIAL_OPERATOR_STORAGE_KEY,
        TEMPLATE_STORAGE_KEY,
        SINGLE_SETTINGS_STORAGE_KEY,
        SINGLE_TEMPLATE_STORAGE_KEY,
        X_POST_TEMPLATE_STORAGE_KEY,
        X_POST_TEMPLATE_EDITOR_STORAGE_KEY,
        CSV_SNAPSHOT_STORAGE_KEY,
        WORKING_DRAFT_STORAGE_KEY
    ];
    const SHARED_STORE_DATA_KEYS = STORE_DATA_KEYS.filter(
        baseKey =>
            baseKey !== CSV_SNAPSHOT_STORAGE_KEY &&
            baseKey !== WORKING_DRAFT_STORAGE_KEY &&
            baseKey !== OFFICIAL_CATEGORY_STORAGE_KEY &&
            baseKey !== OFFICIAL_OPERATOR_STORAGE_KEY
    );
    const SHARED_STORE_DATA_KEY_SET = new Set(SHARED_STORE_DATA_KEYS);
    const JSON_STORE_DATA_KEYS = new Set([
        TEMPLATE_STORAGE_KEY,
        SINGLE_SETTINGS_STORAGE_KEY,
        SINGLE_TEMPLATE_STORAGE_KEY,
        X_POST_TEMPLATE_STORAGE_KEY,
        X_POST_TEMPLATE_EDITOR_STORAGE_KEY,
        CSV_SNAPSHOT_STORAGE_KEY,
        OFFICIAL_BASELINES_STORAGE_KEY,
        WORKING_DRAFT_STORAGE_KEY
    ]);
    const hasOwn = (object, property) =>
        Object.prototype.hasOwnProperty.call(object, property);
    const EMBEDDED_SHARED_SYNC_API_URL = String(
        document.querySelector(
            'meta[name="kaitori-shared-sync-api-url"]'
        )?.content || ""
    ).trim();
    const EMBEDDED_SHARED_SYNC_TOKEN = String(
        document.querySelector(
            'meta[name="kaitori-shared-sync-token"]'
        )?.content || ""
    ).trim();

    let sharedSyncReady = false;
    let sharedSyncApplyingRemote = false;
    let sharedSyncInteractionEnabled = false;
    let sharedSyncPushInFlight = false;
    let sharedSyncPushQueued = false;
    let sharedSyncPushTimer = null;
    let sharedSyncInitializationPromise = null;
    let sharedSyncRemoteVersion = 0;
    let sharedSyncLastCheckAt = 0;
    let sharedSyncReloadScheduled = false;
    const panelLayoutStates = {
        buylist: { preferredWidth: 590, fitFrame: 0 },
        single: { preferredWidth: 590, fitFrame: 0 },
        xpost: { preferredWidth: 590, fitFrame: 0 }
    };

    function normalizeSharedSyncApiUrl(value) {
        const rawValue = String(value || "").trim();
        if (!rawValue) return "";
        try {
            const url = new URL(rawValue);
            if (url.protocol !== "https:" && url.protocol !== "http:") {
                return "";
            }
            return url.toString();
        } catch (error) {
            return "";
        }
    }

    function getSharedSyncConfig() {
        let storedApiUrl = localStorage.getItem(
            SHARED_SYNC_API_URL_STORAGE_KEY
        );
        const normalizedEmbeddedApiUrl =
            normalizeSharedSyncApiUrl(EMBEDDED_SHARED_SYNC_API_URL);
        const lastEmbeddedApiUrl = normalizeSharedSyncApiUrl(
            localStorage.getItem(
                SHARED_SYNC_EMBEDDED_URL_STORAGE_KEY
            )
        );

        if (
            normalizedEmbeddedApiUrl &&
            normalizedEmbeddedApiUrl !== lastEmbeddedApiUrl
        ) {
            storedApiUrl = normalizedEmbeddedApiUrl;
            localStorage.setItem(
                SHARED_SYNC_API_URL_STORAGE_KEY,
                normalizedEmbeddedApiUrl
            );
            localStorage.setItem(
                SHARED_SYNC_EMBEDDED_URL_STORAGE_KEY,
                normalizedEmbeddedApiUrl
            );
        }

        const apiUrl = normalizeSharedSyncApiUrl(
            storedApiUrl === null
                ? normalizedEmbeddedApiUrl
                : storedApiUrl
        );
        return {
            apiUrl,
            token: EMBEDDED_SHARED_SYNC_TOKEN
        };
    }

    function isSharedSyncConfigured(config = getSharedSyncConfig()) {
        return Boolean(config.apiUrl && config.token);
    }

    function setSharedSyncStatus(state, detail = "") {
        const status = document.getElementById("sharedSyncStatus");
        if (!status) return;
        const labels = {
            off: "共有同期：設定待ち",
            checking: "共有同期：確認中",
            pending: "共有同期：変更あり",
            saving: "共有同期：保存中",
            synced: "共有同期：最新",
            error: "共有同期：接続エラー"
        };
        status.dataset.state = hasOwn(labels, state) ? state : "off";
        status.textContent = labels[status.dataset.state];
        status.title = detail || {
            off: "共有同期の接続先がまだ設定されていません",
            checking: "共有設定の更新を確認しています",
            pending: "端末内の変更を共有先へ保存します",
            saving: "共有設定を保存しています",
            synced: "この端末には最新の共有設定が反映されています",
            error: "共有先へ接続できません。端末内の設定は引き続き使用できます"
        }[status.dataset.state];
    }

    function readSharedSyncMeta() {
        try {
            const parsed = JSON.parse(
                localStorage.getItem(SHARED_SYNC_META_STORAGE_KEY) || "null"
            );
            if (parsed && typeof parsed === "object") {
                return {
                    version: Math.max(0, Number(parsed.version) || 0),
                    pending: Boolean(parsed.pending),
                    updatedAt: String(parsed.updatedAt || ""),
                    localChangedAt: String(parsed.localChangedAt || ""),
                    lastMutationId: String(parsed.lastMutationId || "")
                };
            }
        } catch (error) {
            // 壊れた同期情報は初期値へ戻す
        }
        return {
            version: 0,
            pending: false,
            updatedAt: "",
            localChangedAt: "",
            lastMutationId: ""
        };
    }

    function writeSharedSyncMeta(meta) {
        localStorage.setItem(
            SHARED_SYNC_META_STORAGE_KEY,
            JSON.stringify({
                version: Math.max(0, Number(meta.version) || 0),
                pending: Boolean(meta.pending),
                updatedAt: String(meta.updatedAt || ""),
                localChangedAt: String(meta.localChangedAt || ""),
                lastMutationId: String(meta.lastMutationId || "")
            })
        );
    }

    function getSharedSyncClientId() {
        let clientId = localStorage.getItem(
            SHARED_SYNC_CLIENT_ID_STORAGE_KEY
        );
        if (!clientId) {
            clientId =
                `client_${Date.now().toString(36)}_` +
                Math.random().toString(36).slice(2, 10);
            localStorage.setItem(
                SHARED_SYNC_CLIENT_ID_STORAGE_KEY,
                clientId
            );
        }
        return clientId;
    }

    function collectSharedSettingsState() {
        const registry = getStoreRegistry();
        const stores = {};

        Object.keys(registry.stores).forEach(storeId => {
            const data = {};
            SHARED_STORE_DATA_KEYS.forEach(baseKey => {
                const rawValue = localStorage.getItem(
                    scopedStorageKey(baseKey, storeId)
                );
                if (rawValue !== null) {
                    data[baseKey] = rawValue;
                }
            });
            stores[storeId] = { data };
        });

        return {
            app: SHARED_SYNC_APP_ID,
            schemaVersion: SHARED_SYNC_SCHEMA_VERSION,
            generatedAt: new Date().toISOString(),
            registry: {
                version: 1,
                legacyMigrated: true,
                stores: registry.stores
            },
            stores
        };
    }

    function normalizeSharedSettingsState(state) {
        if (
            !state ||
            state.app !== SHARED_SYNC_APP_ID ||
            Number(state.schemaVersion) !== SHARED_SYNC_SCHEMA_VERSION ||
            !state.registry ||
            !state.registry.stores ||
            typeof state.registry.stores !== "object"
        ) {
            throw new Error("共有設定の形式が正しくありません。");
        }

        const registryStores = Object.create(null);
        const storePayloads = Object.create(null);
        const sourcePayloads =
            state.stores && typeof state.stores === "object"
                ? state.stores
                : {};

        Object.entries(state.registry.stores)
            .slice(0, 100)
            .forEach(([storeId, store]) => {
                if (
                    !/^[A-Za-z0-9_-]{1,120}$/.test(storeId) ||
                    ["__proto__", "prototype", "constructor"].includes(storeId)
                ) {
                    return;
                }

                const safeStore =
                    store && typeof store === "object" ? store : {};
                registryStores[storeId] = {
                    name: String(safeStore.name || "名称未設定店舗").slice(0, 60),
                    createdAt: String(
                        safeStore.createdAt || new Date().toISOString()
                    ),
                    updatedAt: String(safeStore.updatedAt || ""),
                    importedAt: String(safeStore.importedAt || "")
                };

                const sourceData =
                    sourcePayloads[storeId]?.data &&
                    typeof sourcePayloads[storeId].data === "object"
                        ? sourcePayloads[storeId].data
                        : {};
                const data = {};
                SHARED_STORE_DATA_KEYS.forEach(baseKey => {
                    if (hasOwn(sourceData, baseKey)) {
                        data[baseKey] = String(sourceData[baseKey] ?? "");
                    }
                });
                storePayloads[storeId] = { data };
            });

        if (Object.keys(registryStores).length === 0) {
            throw new Error("共有設定に店舗情報がありません。");
        }

        return {
            registry: {
                version: 1,
                legacyMigrated: true,
                stores: registryStores
            },
            stores: storePayloads
        };
    }

    function applySharedSettingsState(state, remoteMeta = {}) {
        const normalized = normalizeSharedSettingsState(state);
        const previousRegistry = getStoreRegistry();
        const previousActiveStoreId =
            localStorage.getItem(ACTIVE_STORE_KEY);
        const nextStoreIds = Object.keys(normalized.registry.stores);
        const allStoreIds = new Set([
            ...Object.keys(previousRegistry.stores || {}),
            ...nextStoreIds
        ]);
        let mergedLocalOfficialHistory = false;

        sharedSyncApplyingRemote = true;
        try {
            allStoreIds.forEach(storeId => {
                const remoteStore = normalized.stores[storeId];
                SHARED_STORE_DATA_KEYS.forEach(baseKey => {
                    const storageKey = scopedStorageKey(baseKey, storeId);
                    const localValue = localStorage.getItem(storageKey);

                    // 正式価格の履歴だけは共有側で丸ごと置換しない。
                    // 古いHTMLや同時操作の端末が持つ履歴とも日付単位で統合し、
                    // 片方にしかない確定日を消さずに共有先へ戻す。
                    if (baseKey === OFFICIAL_BASELINES_STORAGE_KEY) {
                        const remoteValue =
                            remoteStore &&
                            hasOwn(remoteStore.data, baseKey)
                                ? remoteStore.data[baseKey]
                                : "{}";
                        const remoteBaselines = normalizeOfficialBaselines(
                            remoteValue
                        );
                        const mergedBaselines = mergeOfficialBaselines(
                            localValue || "{}",
                            remoteValue
                        );
                        const mergedValue = JSON.stringify(mergedBaselines);
                        const normalizedRemoteValue = JSON.stringify(
                            remoteBaselines
                        );

                        if (countOfficialBaselineRecords(mergedBaselines) > 0) {
                            localStorage.setItem(storageKey, mergedValue);
                        } else {
                            localStorage.removeItem(storageKey);
                        }
                        if (mergedValue !== normalizedRemoteValue) {
                            mergedLocalOfficialHistory = true;
                        }
                        return;
                    }

                    if (
                        remoteStore &&
                        hasOwn(remoteStore.data, baseKey)
                    ) {
                        localStorage.setItem(
                            storageKey,
                            remoteStore.data[baseKey]
                        );
                    } else {
                        localStorage.removeItem(storageKey);
                    }
                });
            });

            localStorage.setItem(
                STORE_REGISTRY_KEY,
                JSON.stringify(normalized.registry)
            );
            const nextActiveStoreId =
                previousActiveStoreId &&
                hasOwn(
                    normalized.registry.stores,
                    previousActiveStoreId
                )
                    ? previousActiveStoreId
                    : nextStoreIds[0];
            localStorage.setItem(ACTIVE_STORE_KEY, nextActiveStoreId);
            activeStoreId = nextActiveStoreId;

            sharedSyncRemoteVersion = Math.max(
                0,
                Number(remoteMeta.version) || 0
            );
            writeSharedSyncMeta({
                version: sharedSyncRemoteVersion,
                pending: mergedLocalOfficialHistory,
                updatedAt: remoteMeta.updatedAt || "",
                localChangedAt: mergedLocalOfficialHistory
                    ? new Date().toISOString()
                    : "",
                lastMutationId: remoteMeta.mutationId || ""
            });
        } finally {
            sharedSyncApplyingRemote = false;
        }
    }

    function requestSharedSyncJsonp(parameters = {}) {
        const config = getSharedSyncConfig();
        if (!isSharedSyncConfigured(config)) {
            return Promise.reject(
                new Error("共有同期の接続先が設定されていません。")
            );
        }

        return new Promise((resolve, reject) => {
            const callbackName =
                `__kaitoriSharedSync_${Date.now()}_` +
                Math.random().toString(36).slice(2, 9);
            const script = document.createElement("script");
            let settled = false;

            const cleanup = () => {
                window.clearTimeout(timeoutId);
                delete window[callbackName];
                script.remove();
            };
            const finish = (handler, value) => {
                if (settled) return;
                settled = true;
                cleanup();
                handler(value);
            };

            window[callbackName] = payload => {
                if (!payload || payload.ok !== true) {
                    finish(
                        reject,
                        new Error(
                            payload?.message ||
                            "共有設定を取得できませんでした。"
                        )
                    );
                    return;
                }
                finish(resolve, payload);
            };

            script.onerror = () => {
                finish(
                    reject,
                    new Error("共有先へ接続できませんでした。")
                );
            };
            const timeoutId = window.setTimeout(() => {
                finish(
                    reject,
                    new Error("共有先からの応答がタイムアウトしました。")
                );
            }, SHARED_SYNC_REQUEST_TIMEOUT);

            const url = new URL(config.apiUrl);
            url.searchParams.set("action", parameters.action || "load");
            url.searchParams.set("token", config.token);
            url.searchParams.set("callback", callbackName);
            url.searchParams.set("_", String(Date.now()));
            Object.entries(parameters).forEach(([key, value]) => {
                if (key === "action" || value === undefined || value === null) {
                    return;
                }
                url.searchParams.set(key, String(value));
            });
            script.async = true;
            script.referrerPolicy = "no-referrer";
            script.src = url.toString();
            document.head.appendChild(script);
        });
    }

    function loadSharedSettingsRemote() {
        return requestSharedSyncJsonp({ action: "load" });
    }

    async function submitSharedSettingsRemote({
        state,
        baseVersion,
        mutationId
    }) {
        const config = getSharedSyncConfig();
        const body = new URLSearchParams();
        body.set("action", "save");
        body.set("token", config.token);
        body.set("baseVersion", String(baseVersion));
        body.set("mutationId", mutationId);
        body.set("payload", JSON.stringify(state));

        await fetch(config.apiUrl, {
            method: "POST",
            mode: "no-cors",
            cache: "no-store",
            credentials: "include",
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body
        });
    }

    function waitForSharedSync(milliseconds) {
        return new Promise(resolve => {
            window.setTimeout(resolve, milliseconds);
        });
    }

    async function confirmSharedSettingsMutation(
        mutationId,
        baseVersion
    ) {
        let lastResponse = null;
        let lastError = null;
        for (const delay of [350, 850, 1600]) {
            await waitForSharedSync(delay);
            try {
                lastResponse = await loadSharedSettingsRemote();
                if (
                    lastResponse.mutationId === mutationId ||
                    Number(lastResponse.version) > Number(baseVersion)
                ) {
                    return lastResponse;
                }
            } catch (error) {
                lastError = error;
            }
        }
        if (lastResponse) return lastResponse;
        throw lastError || new Error("共有設定の保存を確認できませんでした。");
    }

    function acceptSharedSettingsRemote(response, message) {
        if (!response?.found || !response.state) {
            throw new Error("共有設定の内容を取得できませんでした。");
        }
        applySharedSettingsState(response.state, response);
        const historyMergePending = readSharedSyncMeta().pending;
        setSharedSyncStatus(
            historyMergePending ? "pending" : "synced",
            historyMergePending
                ? "端末と共有先の確定履歴を統合しました。共有先へ反映します"
                : message || "他の端末で更新された共有設定を反映しました"
        );

        if (window.__KAITORI_DISABLE_SHARED_SYNC_RELOAD__) {
            return;
        }
        sharedSyncReloadScheduled = true;
        window.setTimeout(() => window.location.reload(), 80);
    }

    function scheduleSharedSettingsPush() {
        if (
            sharedSyncApplyingRemote ||
            !sharedSyncInteractionEnabled
        ) {
            return;
        }

        const meta = readSharedSyncMeta();
        writeSharedSyncMeta({
            ...meta,
            version: sharedSyncRemoteVersion || meta.version,
            pending: true,
            localChangedAt: new Date().toISOString()
        });

        if (!isSharedSyncConfigured()) {
            setSharedSyncStatus(
                "off",
                "設定はこの端末へ保存されています。接続先を設定すると自動同期が始まります"
            );
            return;
        }

        setSharedSyncStatus("pending");
        window.clearTimeout(sharedSyncPushTimer);
        if (!sharedSyncReady || sharedSyncPushInFlight) {
            sharedSyncPushQueued = true;
            return;
        }
        sharedSyncPushTimer = window.setTimeout(
            () => pushSharedSettingsNow(),
            SHARED_SYNC_PUSH_DELAY
        );
    }

    async function pushSharedSettingsNow({ force = false } = {}) {
        if (!isSharedSyncConfigured()) {
            setSharedSyncStatus("off");
            return false;
        }
        if (sharedSyncPushInFlight) {
            sharedSyncPushQueued = true;
            return false;
        }
        if (!sharedSyncReady) {
            sharedSyncPushQueued = true;
            return false;
        }

        const meta = readSharedSyncMeta();
        if (!force && !meta.pending) {
            setSharedSyncStatus("synced");
            return true;
        }

        window.clearTimeout(sharedSyncPushTimer);
        sharedSyncPushInFlight = true;
        sharedSyncPushQueued = false;
        const baseVersion = sharedSyncRemoteVersion;
        const mutationId =
            `${getSharedSyncClientId()}_${Date.now().toString(36)}_` +
            Math.random().toString(36).slice(2, 8);
        const state = collectSharedSettingsState();
        setSharedSyncStatus("saving");

        try {
            await submitSharedSettingsRemote({
                state,
                baseVersion,
                mutationId
            });
            const confirmed = await confirmSharedSettingsMutation(
                mutationId,
                baseVersion
            );

            if (confirmed.mutationId === mutationId) {
                sharedSyncRemoteVersion = Math.max(
                    0,
                    Number(confirmed.version) || 0
                );
                writeSharedSyncMeta({
                    version: sharedSyncRemoteVersion,
                    pending: false,
                    updatedAt: confirmed.updatedAt || "",
                    localChangedAt: "",
                    lastMutationId: mutationId
                });
                setSharedSyncStatus(
                    "synced",
                    confirmed.updatedAt
                        ? `共有設定を保存しました：${new Date(
                            confirmed.updatedAt
                        ).toLocaleString("ja-JP")}`
                        : "共有設定を保存しました"
                );
                return true;
            }

            if (
                confirmed.found &&
                Number(confirmed.version) > Number(baseVersion)
            ) {
                acceptSharedSettingsRemote(
                    confirmed,
                    "同時に更新された別端末の設定を反映しました"
                );
                return false;
            }
            throw new Error("共有設定の保存を確認できませんでした。");
        } catch (error) {
            console.warn("共有設定を保存できませんでした。", error);
            writeSharedSyncMeta({
                ...readSharedSyncMeta(),
                version: sharedSyncRemoteVersion,
                pending: true
            });
            setSharedSyncStatus("error", error.message || String(error));
            return false;
        } finally {
            sharedSyncPushInFlight = false;
            if (
                sharedSyncPushQueued &&
                !sharedSyncReloadScheduled &&
                sharedSyncReady
            ) {
                sharedSyncPushQueued = false;
                sharedSyncPushTimer = window.setTimeout(
                    () => pushSharedSettingsNow(),
                    120
                );
            }
        }
    }

    async function initializeSharedSettingsSync(force = false) {
        if (!isSharedSyncConfigured()) {
            sharedSyncReady = false;
            setSharedSyncStatus("off");
            return false;
        }
        if (sharedSyncInitializationPromise && !force) {
            return sharedSyncInitializationPromise;
        }

        sharedSyncInitializationPromise = (async () => {
            sharedSyncReady = false;
            setSharedSyncStatus("checking");
            try {
                const remote = await loadSharedSettingsRemote();
                const meta = readSharedSyncMeta();

                if (remote.found && remote.state) {
                    sharedSyncRemoteVersion = Math.max(
                        0,
                        Number(remote.version) || 0
                    );
                    if (
                        meta.pending &&
                        Number(meta.version) === sharedSyncRemoteVersion
                    ) {
                        sharedSyncReady = true;
                        return await pushSharedSettingsNow({ force: true });
                    }

                    if (
                        Number(meta.version) !== sharedSyncRemoteVersion ||
                        meta.pending
                    ) {
                        acceptSharedSettingsRemote(
                            remote,
                            "最新の共有設定をこの端末へ反映しました"
                        );
                        return true;
                    }

                    sharedSyncReady = true;
                    setSharedSyncStatus(
                        "synced",
                        remote.updatedAt
                            ? `最終更新：${new Date(
                                remote.updatedAt
                            ).toLocaleString("ja-JP")}`
                            : "最新の共有設定です"
                    );
                    if (sharedSyncPushQueued) {
                        return await pushSharedSettingsNow();
                    }
                    return true;
                }

                sharedSyncRemoteVersion = 0;
                sharedSyncReady = true;
                writeSharedSyncMeta({
                    ...meta,
                    version: 0,
                    pending: true,
                    localChangedAt:
                        meta.localChangedAt || new Date().toISOString()
                });
                return await pushSharedSettingsNow({ force: true });
            } catch (error) {
                console.warn("共有設定を取得できませんでした。", error);
                sharedSyncReady = false;
                setSharedSyncStatus("error", error.message || String(error));
                return false;
            }
        })();

        try {
            return await sharedSyncInitializationPromise;
        } finally {
            sharedSyncInitializationPromise = null;
        }
    }

    async function checkSharedSettingsUpdates(force = false) {
        if (!isSharedSyncConfigured() || sharedSyncReloadScheduled) return;
        const now = Date.now();
        if (!force && now - sharedSyncLastCheckAt < 2500) return;
        sharedSyncLastCheckAt = now;

        if (!sharedSyncReady) {
            await initializeSharedSettingsSync();
            return;
        }
        if (sharedSyncPushInFlight) return;
        if (readSharedSyncMeta().pending) {
            await pushSharedSettingsNow();
            return;
        }

        setSharedSyncStatus("checking");
        try {
            const remote = await loadSharedSettingsRemote();
            if (
                remote.found &&
                Number(remote.version) !== sharedSyncRemoteVersion
            ) {
                acceptSharedSettingsRemote(
                    remote,
                    "他の端末で更新された共有設定を反映しました"
                );
                return;
            }
            if (!remote.found) {
                sharedSyncRemoteVersion = 0;
                writeSharedSyncMeta({
                    ...readSharedSyncMeta(),
                    version: 0,
                    pending: true
                });
                await pushSharedSettingsNow({ force: true });
                return;
            }
            setSharedSyncStatus(
                "synced",
                remote.updatedAt
                    ? `最終更新：${new Date(
                        remote.updatedAt
                    ).toLocaleString("ja-JP")}`
                    : "最新の共有設定です"
            );
        } catch (error) {
            console.warn("共有設定の更新確認に失敗しました。", error);
            setSharedSyncStatus("error", error.message || String(error));
        }
    }

    async function configureSharedSettingsSync() {
        const currentConfig = getSharedSyncConfig();
        const input = window.prompt(
            "GASのウェブアプリURL（末尾が /exec のURL）を入力してください。\n空欄でこの端末の共有同期を停止します。",
            currentConfig.apiUrl
        );
        if (input === null) return;

        const trimmed = String(input).trim();
        if (!trimmed) {
            localStorage.setItem(SHARED_SYNC_API_URL_STORAGE_KEY, "");
            sharedSyncReady = false;
            window.clearTimeout(sharedSyncPushTimer);
            setSharedSyncStatus(
                "off",
                "共有同期を停止しました。設定はこの端末へ引き続き保存されます"
            );
            return;
        }

        const normalizedUrl = normalizeSharedSyncApiUrl(trimmed);
        if (!normalizedUrl || !/\/exec(?:\?|$)/.test(normalizedUrl)) {
            alert("GASをウェブアプリとしてデプロイした、末尾が /exec のURLを入力してください。");
            return;
        }

        const changed = normalizedUrl !== currentConfig.apiUrl;
        localStorage.setItem(
            SHARED_SYNC_API_URL_STORAGE_KEY,
            normalizedUrl
        );
        if (changed) {
            writeSharedSyncMeta({
                version: 0,
                pending: true,
                updatedAt: "",
                localChangedAt: new Date().toISOString(),
                lastMutationId: ""
            });
        }
        sharedSyncReady = false;
        sharedSyncReloadScheduled = false;
        await initializeSharedSettingsSync(true);
    }

    function makeStoreId() {
        return `store_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    function getStoreRegistry() {
        try {
            const parsed = JSON.parse(localStorage.getItem(STORE_REGISTRY_KEY) || "null");
            if (parsed && parsed.stores && typeof parsed.stores === "object") {
                return parsed;
            }
        } catch (error) {
            // 壊れた管理情報は下記の初期値へ戻す
        }
        return {
            version: 1,
            legacyMigrated: false,
            stores: {
                main: {
                    name: "メイン店舗",
                    createdAt: new Date().toISOString()
                }
            }
        };
    }

    function saveStoreRegistry(registry) {
        const serialized = JSON.stringify(registry);
        if (localStorage.getItem(STORE_REGISTRY_KEY) === serialized) {
            return;
        }
        localStorage.setItem(STORE_REGISTRY_KEY, serialized);
        scheduleSharedSettingsPush();
    }

    function scopedStorageKey(baseKey, storeId) {
        return `${baseKey}__store_${storeId}`;
    }

    function removeLogosFromTemplateJson(rawValue) {
        let logoCandidate = "";
        let changed = false;
        try {
            const templates = JSON.parse(rawValue || "{}");
            if (!templates || typeof templates !== "object" || Array.isArray(templates)) {
                return { value: "{}", logoCandidate, changed: true };
            }
            Object.values(templates).forEach(template => {
                if (!template || typeof template !== "object") return;
                if (!logoCandidate && typeof template.logo === "string") {
                    logoCandidate = template.logo;
                }
                if (hasOwn(template, "logo")) {
                    delete template.logo;
                    changed = true;
                }
            });
            return {
                value: JSON.stringify(templates),
                logoCandidate,
                changed
            };
        } catch (error) {
            return { value: "{}", logoCandidate, changed: true };
        }
    }

    function migrateLegacyStoreData(registry, storeId) {
        if (registry.legacyMigrated) return;

        let sharedLogo = localStorage.getItem("kaitori_logo") || "";
        STORE_DATA_KEYS.forEach(baseKey => {
            const legacyValue = localStorage.getItem(baseKey);
            if (legacyValue === null) return;

            let value = legacyValue;
            if (
                baseKey === TEMPLATE_STORAGE_KEY ||
                baseKey === SINGLE_TEMPLATE_STORAGE_KEY
            ) {
                const sanitized = removeLogosFromTemplateJson(legacyValue);
                value = sanitized.value;
                if (!sharedLogo && sanitized.logoCandidate) {
                    sharedLogo = sanitized.logoCandidate;
                }
            }
            localStorage.setItem(scopedStorageKey(baseKey, storeId), value);
        });

        if (sharedLogo) {
            localStorage.setItem(
                scopedStorageKey("kaitori_logo", storeId),
                sharedLogo
            );
        }
        registry.legacyMigrated = true;
        saveStoreRegistry(registry);
    }

    function initializeStoreProfiles() {
        const registry = getStoreRegistry();
        const storeIds = Object.keys(registry.stores);
        if (storeIds.length === 0) {
            registry.stores.main = {
                name: "メイン店舗",
                createdAt: new Date().toISOString()
            };
        }

        let storeId = localStorage.getItem(ACTIVE_STORE_KEY);
        if (!storeId || !hasOwn(registry.stores, storeId)) {
            storeId = Object.keys(registry.stores)[0];
            localStorage.setItem(ACTIVE_STORE_KEY, storeId);
        }

        migrateLegacyStoreData(registry, storeId);
        saveStoreRegistry(registry);
        return storeId;
    }

    let activeStoreId = initializeStoreProfiles();

    function getScopedItem(baseKey) {
        return localStorage.getItem(scopedStorageKey(baseKey, activeStoreId));
    }

    function setScopedItem(baseKey, value) {
        const storageKey = scopedStorageKey(baseKey, activeStoreId);
        const serialized = String(value);
        if (localStorage.getItem(storageKey) === serialized) {
            return;
        }
        localStorage.setItem(storageKey, serialized);
        if (SHARED_STORE_DATA_KEY_SET.has(baseKey)) {
            scheduleSharedSettingsPush();
        }
    }

    function renderStoreProfileSelect() {
        const select = document.getElementById("storeProfileSelect");
        if (!select) return;

        const registry = getStoreRegistry();
        select.innerHTML = "";
        Object.entries(registry.stores)
            .sort(([, a], [, b]) =>
                String(a.name).localeCompare(String(b.name), "ja", {
                    numeric: true,
                    sensitivity: "base"
                })
            )
            .forEach(([storeId, store]) => {
                const option = document.createElement("option");
                option.value = storeId;
                option.textContent = store.name || "名称未設定店舗";
                select.appendChild(option);
            });
        select.value = activeStoreId;
    }

    function persistCurrentStoreState() {
        if (!document.getElementById("titleInput")) return;
        saveWorkingDraftNow();
        saveSingleSettings();
        setScopedItem("kaitori_logo", logoDataUrl);
    }

    function switchStoreProfile(storeId) {
        const registry = getStoreRegistry();
        if (!hasOwn(registry.stores, storeId) || storeId === activeStoreId) {
            return;
        }
        persistCurrentStoreState();
        localStorage.setItem(ACTIVE_STORE_KEY, storeId);
        window.location.reload();
    }

    function createStoreProfile() {
        const input = document.getElementById("newStoreNameInput");
        const name = String(input.value || "").trim().slice(0, 60);
        if (!name) {
            alert("新しい店舗名を入力してください。");
            input.focus();
            return;
        }

        persistCurrentStoreState();
        const registry = getStoreRegistry();
        const storeId = makeStoreId();
        registry.stores[storeId] = {
            name,
            createdAt: new Date().toISOString()
        };
        saveStoreRegistry(registry);
        localStorage.setItem(ACTIVE_STORE_KEY, storeId);
        window.location.reload();
    }

    function renameStoreProfile() {
        const input = document.getElementById("newStoreNameInput");
        const name = String(input.value || "").trim().slice(0, 60);
        if (!name) {
            alert("変更後の店舗名を入力してください。");
            input.focus();
            return;
        }

        const registry = getStoreRegistry();
        if (!registry.stores[activeStoreId]) return;
        registry.stores[activeStoreId].name = name;
        registry.stores[activeStoreId].updatedAt = new Date().toISOString();
        saveStoreRegistry(registry);
        input.value = "";
        renderStoreProfileSelect();
        alert(`店舗名を「${name}」へ変更しました。`);
    }

    function deleteStoreProfile() {
        const registry = getStoreRegistry();
        const storeIds = Object.keys(registry.stores);
        if (storeIds.length <= 1) {
            alert("最後の1店舗は削除できません。");
            return;
        }

        const storeName = registry.stores[activeStoreId]?.name || "この店舗";
        if (!confirm(`店舗「${storeName}」と店舗専用設定を削除しますか？`)) {
            return;
        }

        STORE_DATA_KEYS.forEach(baseKey => {
            localStorage.removeItem(scopedStorageKey(baseKey, activeStoreId));
        });
        delete registry.stores[activeStoreId];
        saveStoreRegistry(registry);
        localStorage.setItem(ACTIVE_STORE_KEY, Object.keys(registry.stores)[0]);
        window.location.reload();
    }

    let logoDataUrl = DEFAULT_LOGO;
    let globalCardData = [];
    let imageLoadPromise = Promise.resolve();
    let imageLoadingTask = null;
    let imageLoadGeneration = 0;
    let workspaceAutosaveTimer = null;
    let cardEditRenderTimer = null;
    let csvReadGeneration = 0;
    let lastSelectedCsvFile = null;
    let activeExportTask = "";
    let isRestoringWorkspace = false;
    let cardEditorPage = 1;
    let singlePickerPage = 1;
    let cardEditHistory = [];
    let csvImportReportState = createEmptyCsvImportReport();
    let csvDiffResults = {
        hasBaseline: false,
        previousSavedAt: "",
        targetDate: "",
        comparisonDate: "",
        category: "psa",
        priceUp: [],
        priceDown: [],
        newItems: [],
        strengthened: [],
        all: []
    };
    const imagePromiseCache = new Map();
    const selectedSingleCardIds = new Set();
    let singleSelectionOrder = [];
    let csvAnomalyState = createEmptyCsvAnomalyState();

    function createSvgDataUrl(svg) {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // 共有同期などの外部由来の値でHTML属性・CSSのurl()を壊されないよう、
    // 画像のデータURL（base64またはURLエンコード形式）だけを許可する。
    function sanitizeImageDataUrl(value, fallback = "") {
        const text = String(value || "");
        return /^data:image\/[a-z0-9.+-]+(?:;[a-z0-9=._-]+)*,[^"<>\\\s`]*$/i.test(text)
            ? text
            : fallback;
    }

    function pageNumberText(number) {
        return String(number).padStart(2, "0");
    }

    function isNumericGroupValue(value) {
        const normalized = String(value ?? "")
            .trim()
            .replace(/[０-９]/g, digit =>
                String.fromCharCode(digit.charCodeAt(0) - 0xFEE0)
            )
            .replace(/[＋－．]/g, character => ({
                "＋": "+",
                "－": "-",
                "．": "."
            })[character]);

        return /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(normalized);
    }

    function getGroupLabelFontSize(value) {
        const visualUnits = Array.from(String(value ?? "")).reduce(
            (total, character) => {
                if (/\s/.test(character)) return total + 0.35;
                if (/[A-Za-z0-9]/.test(character)) return total + 0.62;
                return total + 1;
            },
            0
        );
        const lineCount = visualUnits > 3.4 ? 2 : 1;
        const calculated = Math.floor((72 * lineCount) / Math.max(visualUnits, 1));
        const maximum = lineCount === 2 ? 28 : 36;
        return Math.min(maximum, Math.max(10, calculated));
    }

    function getPageEmblemContent(pageCards, pageNumber, splitMode) {
        const group = String(pageCards[0]?.group ?? "").trim();
        const useGroupLabel =
            splitMode === "group_page" &&
            group !== "" &&
            !isNumericGroupValue(group);

        if (useGroupLabel) {
            return {
                text: group,
                isGroupLabel: true,
                fontSize: getGroupLabelFontSize(group)
            };
        }

        return {
            text: pageNumberText(pageNumber),
            isGroupLabel: false,
            fontSize: null
        };
    }

    function normalizeTheme(theme) {
        if (THEMES.includes(theme)) return theme;
        if (typeof theme === "string" && theme.startsWith("theme100_")) {
            return "design_geo_grid";
        }
        return LEGACY_THEME_MAP[theme] || "signal";
    }

    function normalizeLayout(layout) {
        if (hasOwn(LAYOUTS, layout)) return layout;
        return LEGACY_LAYOUT_MAP[layout] || "portrait_10x6";
    }

    function getSelectedLayoutConfig() {
        return LAYOUTS[
            normalizeLayout(document.getElementById("layoutSelect")?.value)
        ];
    }

    function normalizeTitleStyle(style) {
        return TITLE_STYLES.includes(style) ? style : "power";
    }

    function normalizeHexColor(value, fallback) {
        const color = String(value || "").trim().toLowerCase();
        return /^#[0-9a-f]{6}$/.test(color) ? color : fallback;
    }

    function clampTitleNumber(value, min, max, fallback) {
        const number = Number(value);
        return Number.isFinite(number)
            ? Math.min(max, Math.max(min, Math.round(number)))
            : fallback;
    }

    function normalizeEditablePriceLabel(value, fallback) {
        if (typeof value !== "string") return fallback;
        return value.replace(/\s+/g, " ").trim().slice(0, 12);
    }

    function normalizeTitleCustomization(settings = {}) {
        const font = hasOwn(TITLE_FONT_OPTIONS, settings.font)
            ? settings.font
            : DEFAULT_TITLE_CUSTOM.font;
        return {
            color: normalizeHexColor(
                settings.color,
                DEFAULT_TITLE_CUSTOM.color
            ),
            font,
            size: clampTitleNumber(
                settings.size,
                36,
                110,
                DEFAULT_TITLE_CUSTOM.size
            ),
            outlineColor: normalizeHexColor(
                settings.outlineColor,
                DEFAULT_TITLE_CUSTOM.outlineColor
            ),
            outlineWidth: clampTitleNumber(
                settings.outlineWidth,
                0,
                5,
                DEFAULT_TITLE_CUSTOM.outlineWidth
            )
        };
    }

    function collectTitleCustomization() {
        return normalizeTitleCustomization({
            color: document.getElementById("titleColorInput")?.value,
            font: document.getElementById("titleFontSelect")?.value,
            size: document.getElementById("titleSizeInput")?.value,
            outlineColor: document.getElementById("titleOutlineColorInput")?.value,
            outlineWidth: document.getElementById("titleOutlineWidthSelect")?.value
        });
    }

    function applyTitleCustomizationSettings(settings = {}) {
        const normalized = normalizeTitleCustomization(settings);
        document.getElementById("titleColorInput").value = normalized.color;
        document.getElementById("titleFontSelect").value = normalized.font;
        document.getElementById("titleSizeRange").value = String(normalized.size);
        document.getElementById("titleSizeInput").value = String(normalized.size);
        document.getElementById("titleOutlineColorInput").value =
            normalized.outlineColor;
        document.getElementById("titleOutlineWidthSelect").value =
            String(normalized.outlineWidth);
    }

    function saveTitleCustomization(settings = collectTitleCustomization()) {
        setScopedItem("kaitori_title_color", settings.color);
        setScopedItem("kaitori_title_font", settings.font);
        setScopedItem("kaitori_title_size", String(settings.size));
        setScopedItem("kaitori_title_outline_color", settings.outlineColor);
        setScopedItem("kaitori_title_outline_width", String(settings.outlineWidth));
    }

    function normalizeCardTextCustomization(settings = {}) {
        return {
            nameScale: clampTitleNumber(settings.nameScale, 50, 160, 100),
            typeScale: clampTitleNumber(settings.typeScale, 50, 160, 100)
        };
    }

    function collectCardTextCustomization() {
        return normalizeCardTextCustomization({
            nameScale: document.getElementById("cardNameSizeInput")?.value,
            typeScale: document.getElementById("cardTypeSizeInput")?.value
        });
    }

    function applyCardTextCustomizationSettings(settings = {}) {
        const normalized = normalizeCardTextCustomization(settings);
        [["cardNameSize", normalized.nameScale], ["cardTypeSize", normalized.typeScale]]
            .forEach(([prefix, value]) => {
                document.getElementById(`${prefix}Range`).value = String(value);
                document.getElementById(`${prefix}Input`).value = String(value);
                document.getElementById(`${prefix}Output`).textContent = `${value}%`;
            });
    }

    function saveCardTextCustomization(settings = collectCardTextCustomization()) {
        setScopedItem("kaitori_card_text_custom", JSON.stringify(settings));
    }

    function applyCardTextCustomization(root = document, settings = collectCardTextCustomization()) {
        const normalized = normalizeCardTextCustomization(settings);
        getExportAreas(root).forEach(page => {
            page.querySelectorAll(".card-name").forEach(element => {
                const size = 9 * normalized.nameScale / 100;
                element.style.setProperty("font-size", `${size}px`, "important");
                element.style.setProperty("min-height", `${Math.max(13, size * 1.2)}px`, "important");
            });
            page.querySelectorAll(".card-grade").forEach(element => {
                element.style.setProperty("font-size", `${10 * normalized.typeScale / 100}px`, "important");
            });
        });
    }

    function normalizePriceCustomization(settings = {}) {
        return {
            scale: clampTitleNumber(
                settings.scale,
                30,
                140,
                DEFAULT_PRICE_CUSTOM.scale
            ),
            colorMode:
                settings.colorMode === "custom" ? "custom" : "theme",
            color: normalizeHexColor(
                settings.color,
                DEFAULT_PRICE_CUSTOM.color
            ),
            primaryLabel: normalizeEditablePriceLabel(
                settings.primaryLabel,
                DEFAULT_PRICE_CUSTOM.primaryLabel
            ),
            secondaryLabel: normalizeEditablePriceLabel(
                settings.secondaryLabel,
                DEFAULT_PRICE_CUSTOM.secondaryLabel
            )
        };
    }

    function collectPriceCustomization() {
        return normalizePriceCustomization({
            scale: document.getElementById("priceSizeInput")?.value,
            colorMode: document.getElementById("priceColorModeSelect")?.value,
            color: document.getElementById("priceColorInput")?.value,
            primaryLabel:
                document.getElementById("pricePrimaryLabelInput")?.value,
            secondaryLabel:
                document.getElementById("priceSecondaryLabelInput")?.value
        });
    }

    function applyPriceCustomizationSettings(settings = {}) {
        const normalized = normalizePriceCustomization(settings);
        document.getElementById("priceSizeRange").value =
            String(normalized.scale);
        document.getElementById("priceSizeInput").value =
            String(normalized.scale);
        document.getElementById("priceSizeOutput").textContent =
            `${normalized.scale}%`;
        document.getElementById("priceColorModeSelect").value =
            normalized.colorMode;
        const colorInput = document.getElementById("priceColorInput");
        colorInput.value = normalized.color;
        colorInput.disabled = normalized.colorMode !== "custom";
        document.getElementById("pricePrimaryLabelInput").value =
            normalized.primaryLabel;
        document.getElementById("priceSecondaryLabelInput").value =
            normalized.secondaryLabel;
    }

    function savePriceCustomization(
        settings = collectPriceCustomization()
    ) {
        setScopedItem("kaitori_price_scale", String(settings.scale));
        setScopedItem("kaitori_price_color_mode", settings.colorMode);
        setScopedItem("kaitori_price_color", settings.color);
        setScopedItem(
            "kaitori_price_primary_label",
            settings.primaryLabel
        );
        setScopedItem(
            "kaitori_price_secondary_label",
            settings.secondaryLabel
        );
    }

    function getExportAreas(root = document) {
        if (root === document) {
            return Array.from(
                document.querySelectorAll("#pagesContainer .exportArea")
            );
        }
        if (root instanceof Element && root.matches(".exportArea")) {
            return [root];
        }
        return Array.from(root.querySelectorAll(".exportArea"));
    }

    function getBuylistPriceBaseSize(page) {
        const theme = normalizeTheme(page?.dataset?.theme);
        const layout = String(page?.dataset?.layout || "");
        if (layout === "portrait_6x5") return 24;
        if (layout === "landscape_10x3") return 22;
        if (layout === "portrait_10x6") {
            return LARGE_PRICE_THEMES.has(theme) ? 20 : 19;
        }
        if (layout === "landscape_15x4") return 17;
        return page?.classList?.contains("portrait") &&
            LARGE_PRICE_THEMES.has(theme)
            ? 20
            : 18;
    }

    function getBuylistPriceTextSize(page, priceText, scale) {
        const baseSize = getBuylistPriceBaseSize(page) * scale / 100;
        const row = priceText?.closest?.(".card-price-row");
        if (!row) return baseSize;
        return baseSize * (
            row.classList.contains("card-price-row-minus")
                ? DUAL_PRICE_SECONDARY_SCALE
                : DUAL_PRICE_PRIMARY_SCALE
        );
    }

    function applyPriceCustomization(
        root = document,
        settings = collectPriceCustomization()
    ) {
        const normalized = normalizePriceCustomization(settings);
        getExportAreas(root).forEach(page => {
            page.dataset.priceScale = String(normalized.scale);
            page.dataset.priceColorMode = normalized.colorMode;
            page.dataset.priceColor = normalized.color;
            page.querySelectorAll(
                ".card-price-row-primary .card-price-grade-label"
            ).forEach(label => {
                label.textContent = normalized.primaryLabel;
            });
            page.querySelectorAll(
                ".card-price-row-minus .card-price-grade-label"
            ).forEach(label => {
                label.textContent = normalized.secondaryLabel;
            });
            page.querySelectorAll(".card-price-stack").forEach(stack => {
                const prices = Array.from(
                    stack.querySelectorAll(".card-price-text")
                ).map(price => price.textContent || "");
                const primaryDescription =
                    normalized.primaryLabel || "通常価格";
                const secondaryDescription =
                    normalized.secondaryLabel || "状態A-価格";
                stack.setAttribute(
                    "aria-label",
                    `${primaryDescription} ${prices[0] || ""}、` +
                    `${secondaryDescription} ${prices[1] || ""}`
                );
            });
            page.querySelectorAll(".card-price-text").forEach(price => {
                const fontSize = getBuylistPriceTextSize(
                    page,
                    price,
                    normalized.scale
                );
                price.style.setProperty(
                    "font-size",
                    `${fontSize.toFixed(2)}px`,
                    "important"
                );
                if (normalized.colorMode === "custom") {
                    price.style.setProperty(
                        "color",
                        normalized.color,
                        "important"
                    );
                } else {
                    price.style.removeProperty("color");
                }
            });
        });

        if (
            root === document ||
            root === document.getElementById("pagesContainer")
        ) {
            syncQuickPricePreview();
        }
    }

    function applyTitleElementStyle(title, settings, size = settings.size) {
        const fontStack = TITLE_FONT_OPTIONS[settings.font];
        title.style.setProperty("color", settings.color, "important");
        title.style.setProperty("font-family", fontStack, "important");
        title.style.setProperty("font-size", `${size}px`, "important");
        title.style.setProperty("font-weight", "900", "important");
        title.style.setProperty(
            "-webkit-text-stroke",
            `${settings.outlineWidth}px ${settings.outlineColor}`,
            "important"
        );
        title.style.setProperty("paint-order", "stroke fill", "important");
        title.style.setProperty("text-shadow", "none", "important");
    }

    function applyTitleCustomization(root = document) {
        const settings = collectTitleCustomization();
        const fontStack = TITLE_FONT_OPTIONS[settings.font];

        getExportAreas(root).forEach(page => {
            page.dataset.titleCustom = "true";
            page.style.setProperty("--custom-title-color", settings.color);
            page.style.setProperty("--custom-title-font", fontStack);
            page.style.setProperty("--custom-title-size", `${settings.size}px`);
            page.style.setProperty(
                "--custom-title-outline-color",
                settings.outlineColor
            );
            page.style.setProperty(
                "--custom-title-outline-width",
                `${settings.outlineWidth}px`
            );
            page.querySelectorAll(".title-text").forEach(title => {
                applyTitleElementStyle(title, settings);
            });
        });

        if (
            root === document ||
            root === document.getElementById("pagesContainer")
        ) {
            syncQuickHeaderPreview();
        }
    }

    function scrollToFullPreview() {
        document.getElementById("pagesContainer")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function syncQuickHeaderPreview() {
        const viewport = document.getElementById("quickHeaderPreviewViewport");
        const sourcePage = document.querySelector(
            "#pagesContainer .exportArea"
        );
        const sourceHeader = sourcePage?.querySelector(".header-area");
        if (!viewport || !sourcePage || !sourceHeader) return;

        const orientation = sourcePage.classList.contains("landscape")
            ? "landscape"
            : "portrait";
        const naturalWidth = orientation === "landscape" ? 2000 : 1414;
        const stage = document.createElement("div");
        stage.className =
            `exportArea ${orientation} quick-header-preview-stage`;
        stage.dataset.theme = sourcePage.dataset.theme || getSelectedTheme();
        stage.dataset.titleStyle =
            sourcePage.dataset.titleStyle || getSelectedTitleStyle();
        stage.dataset.titleCustom = "true";
        stage.style.width = `${naturalWidth}px`;
        stage.style.height = "220px";
        stage.style.padding = "28px 34px 0";

        [
            "--custom-title-color",
            "--custom-title-font",
            "--custom-title-size",
            "--custom-title-outline-color",
            "--custom-title-outline-width"
        ].forEach(propertyName => {
            const value = sourcePage.style.getPropertyValue(propertyName);
            if (value) stage.style.setProperty(propertyName, value);
        });

        const headerClone = sourceHeader.cloneNode(true);
        stage.appendChild(headerClone);
        viewport.replaceChildren(stage);

        requestAnimationFrame(() => {
            const availableWidth = Math.max(0, viewport.clientWidth - 12);
            if (!availableWidth) return;

            const scale = Math.min(1, availableWidth / naturalWidth);
            const displayedWidth = naturalWidth * scale;
            const naturalHeight =
                28 + (headerClone.offsetHeight || 148) + 10;
            stage.style.left =
                `${Math.max(6, (viewport.clientWidth - displayedWidth) / 2)}px`;
            stage.style.transform = `scale(${scale})`;
            viewport.style.height =
                `${Math.ceil(naturalHeight * scale + 12)}px`;
        });
    }

    function syncQuickPricePreview() {
        const viewport = document.getElementById("quickPricePreviewViewport");
        if (!viewport) return;

        const sourcePage = document.querySelector(
            "#pagesContainer .exportArea"
        );
        const sourcePrice = sourcePage?.querySelector(
            ".card-price-container"
        );
        const theme = sourcePage?.dataset.theme || getSelectedTheme();
        const orientation = sourcePage?.classList.contains("landscape")
            ? "landscape"
            : getSelectedLayoutConfig().orientation;
        const settings = collectPriceCustomization();
        const stage = document.createElement("div");
        stage.className =
            `exportArea ${orientation} quick-price-preview-stage`;
        stage.dataset.theme = theme;
        stage.dataset.priceScale = String(settings.scale);
        stage.dataset.priceColorMode = settings.colorMode;
        stage.dataset.priceColor = settings.color;

        const priceContainer = sourcePrice
            ? sourcePrice.cloneNode(true)
            : document.createElement("div");
        if (!sourcePrice) {
            priceContainer.className = "card-price-container";
            const priceText = document.createElement("span");
            priceText.className = "card-price-text";
            const firstVisibleCard = globalCardData.find(card => !card.hidden);
            priceText.textContent = firstVisibleCard?.price || "¥12,000";
            priceContainer.appendChild(priceText);
        }

        priceContainer.removeAttribute("style");
        priceContainer.querySelectorAll(".card-price-text").forEach(priceText => {
            priceText.removeAttribute("style");
            const fontSize = getBuylistPriceTextSize(
                stage,
                priceText,
                settings.scale
            );
            priceText.style.setProperty(
                "font-size",
                `${fontSize.toFixed(2)}px`,
                "important"
            );
            if (settings.colorMode === "custom") {
                priceText.style.setProperty(
                    "color",
                    settings.color,
                    "important"
                );
            }
        });

        stage.appendChild(priceContainer);
        viewport.replaceChildren(stage);

        requestAnimationFrame(() => adjustTextSize(stage));
    }

    function normalizeSingleDesign(design) {
        if (SINGLE_DESIGNS.includes(design)) return design;
        return LEGACY_SINGLE_DESIGN_MAP[design] || "blackgold";
    }

    function normalizeSingleLogoAlignment(alignment) {
        return SINGLE_LOGO_ALIGNMENTS.includes(alignment)
            ? alignment
            : DEFAULT_SINGLE_LOGO_ALIGNMENT;
    }

    function collectSingleSettings() {
        const design = document.getElementById("singleDesignSelect")?.value;
        const size = document.getElementById("singleSizeSelect")?.value;
        const itemsPerImage = Math.min(
            MAX_SINGLE_ITEMS_PER_IMAGE,
            Math.max(1, Number(document.getElementById("singleItemsPerImageSelect")?.value) || 1)
        );
        const headlineScale = clampTitleNumber(
            document.getElementById("singleHeadlineSizeInput")?.value,
            60,
            160,
            DEFAULT_SINGLE_HEADLINE_SCALE
        );
        const nameScale = clampTitleNumber(
            document.getElementById("singleNameSizeInput")?.value,
            60,
            160,
            DEFAULT_SINGLE_NAME_SCALE
        );
        const priceScale = clampTitleNumber(
            document.getElementById("singlePriceSizeInput")?.value,
            60,
            160,
            DEFAULT_SINGLE_PRICE_SCALE
        );
        const priceColorMode =
            document.getElementById("singlePriceColorModeSelect")?.value ===
            "custom"
                ? "custom"
                : DEFAULT_SINGLE_PRICE_COLOR_MODE;
        const priceColor = normalizeHexColor(
            document.getElementById("singlePriceColorInput")?.value,
            DEFAULT_SINGLE_PRICE_COLOR
        );
        return {
            design: normalizeSingleDesign(design),
            size: SINGLE_SIZES.includes(size) ? size : "square",
            itemsPerImage,
            logoAlign: normalizeSingleLogoAlignment(
                document.getElementById("singleLogoAlignSelect")?.value
            ),
            headline: document.getElementById("singleHeadlineInput")?.value ?? "強化買取中",
            headlineScale,
            nameScale,
            priceScale,
            priceColorMode,
            priceColor,
            priceLabel: document.getElementById("singlePriceLabelInput")?.value ?? "買取価格",
            primaryPriceLabel: normalizeEditablePriceLabel(
                document.getElementById(
                    "singlePrimaryPriceLabelInput"
                )?.value,
                DEFAULT_SINGLE_PRIMARY_PRICE_LABEL
            ),
            secondaryPriceLabel: normalizeEditablePriceLabel(
                document.getElementById(
                    "singleSecondaryPriceLabelInput"
                )?.value,
                DEFAULT_SINGLE_SECONDARY_PRICE_LABEL
            ),
            nameDisplay:
                document.getElementById(
                    "singleCardNameDisplaySelect"
                )?.value === "hide"
                    ? "hide"
                    : "show",
            gradeDisplay:
                document.getElementById("singleGradeDisplaySelect")?.value === "hide"
                    ? "hide"
                    : "show"
        };
    }

    function applySingleSettings(settings = {}) {
        document.getElementById("singleDesignSelect").value =
            normalizeSingleDesign(settings.design);
        if (SINGLE_SIZES.includes(settings.size)) {
            document.getElementById("singleSizeSelect").value = settings.size;
        }
        document.getElementById("singleItemsPerImageSelect").value =
            String(Math.min(MAX_SINGLE_ITEMS_PER_IMAGE, Math.max(1, Number(settings.itemsPerImage) || 1)));
        document.getElementById("singleLogoAlignSelect").value =
            normalizeSingleLogoAlignment(settings.logoAlign);
        if (typeof settings.headline === "string") {
            document.getElementById("singleHeadlineInput").value = settings.headline;
        }
        const headlineScale = clampTitleNumber(
            settings.headlineScale,
            60,
            160,
            DEFAULT_SINGLE_HEADLINE_SCALE
        );
        document.getElementById("singleHeadlineSizeRange").value =
            String(headlineScale);
        document.getElementById("singleHeadlineSizeInput").value =
            String(headlineScale);
        document.getElementById("singleHeadlineSizeOutput").textContent =
            `${headlineScale}%`;
        const nameScale = clampTitleNumber(
            settings.nameScale,
            60,
            160,
            DEFAULT_SINGLE_NAME_SCALE
        );
        document.getElementById("singleNameSizeRange").value =
            String(nameScale);
        document.getElementById("singleNameSizeInput").value =
            String(nameScale);
        document.getElementById("singleNameSizeOutput").textContent =
            `${nameScale}%`;
        const priceScale = clampTitleNumber(
            settings.priceScale,
            60,
            160,
            DEFAULT_SINGLE_PRICE_SCALE
        );
        document.getElementById("singlePriceSizeRange").value =
            String(priceScale);
        document.getElementById("singlePriceSizeInput").value =
            String(priceScale);
        document.getElementById("singlePriceSizeOutput").textContent =
            `${priceScale}%`;
        const priceColorMode =
            settings.priceColorMode === "custom"
                ? "custom"
                : DEFAULT_SINGLE_PRICE_COLOR_MODE;
        const priceColor = normalizeHexColor(
            settings.priceColor,
            DEFAULT_SINGLE_PRICE_COLOR
        );
        document.getElementById("singlePriceColorModeSelect").value =
            priceColorMode;
        const priceColorInput =
            document.getElementById("singlePriceColorInput");
        priceColorInput.value = priceColor;
        priceColorInput.disabled = priceColorMode !== "custom";
        if (typeof settings.priceLabel === "string") {
            document.getElementById("singlePriceLabelInput").value = settings.priceLabel;
        }
        document.getElementById("singlePrimaryPriceLabelInput").value =
            normalizeEditablePriceLabel(
                settings.primaryPriceLabel,
                DEFAULT_SINGLE_PRIMARY_PRICE_LABEL
            );
        document.getElementById("singleSecondaryPriceLabelInput").value =
            normalizeEditablePriceLabel(
                settings.secondaryPriceLabel,
                DEFAULT_SINGLE_SECONDARY_PRICE_LABEL
            );
        document.getElementById("singleCardNameDisplaySelect").value =
            settings.nameDisplay === "hide" ? "hide" : "show";
        document.getElementById("singleGradeDisplaySelect").value =
            settings.gradeDisplay === "hide" ? "hide" : "show";
    }

    function saveSingleSettings() {
        try {
            setScopedItem(
                SINGLE_SETTINGS_STORAGE_KEY,
                JSON.stringify(collectSingleSettings())
            );
        } catch (error) {
            // 保存できない環境でも作成機能は継続する
        }
    }

    function getSingleNamedTemplates() {
        try {
            const parsed = JSON.parse(
                getScopedItem(SINGLE_TEMPLATE_STORAGE_KEY) || "{}"
            );
            return parsed && typeof parsed === "object" && !Array.isArray(parsed)
                ? parsed
                : {};
        } catch (error) {
            return {};
        }
    }

    function refreshSingleTemplateSelect(selectedName = "") {
        const select = document.getElementById("singleTemplateSelect");
        const templates = getSingleNamedTemplates();
        const names = Object.keys(templates).sort((a, b) =>
            a.localeCompare(b, "ja", { numeric: true, sensitivity: "base" })
        );

        select.innerHTML = '<option value="">テンプレートを選択</option>';
        names.forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });

        if (selectedName && hasOwn(templates, selectedName)) {
            select.value = selectedName;
        }
    }

    function saveSingleNamedTemplate() {
        const nameInput = document.getElementById("singleTemplateNameInput");
        const templateSelect = document.getElementById("singleTemplateSelect");
        const name = (nameInput.value.trim() || templateSelect.value).slice(0, 80);

        if (!name) {
            alert("テンプレート名を入力してください。");
            nameInput.focus();
            return;
        }

        const templates = getSingleNamedTemplates();
        if (
            hasOwn(templates, name) &&
            !confirm(`テンプレート「${name}」を現在の設定で上書きしますか？`)
        ) {
            return;
        }

        templates[name] = {
            ...collectSingleSettings(),
            savedAt: new Date().toISOString()
        };

        try {
            setScopedItem(
                SINGLE_TEMPLATE_STORAGE_KEY,
                JSON.stringify(templates)
            );
            saveSingleSettings();
            refreshSingleTemplateSelect(name);
            nameInput.value = name;
            alert(`テンプレート「${name}」を保存しました。`);
        } catch (error) {
            alert("保存容量を超えました。ロゴ画像を小さくしてからお試しください。");
        }
    }

    function loadSingleNamedTemplate() {
        const name = document.getElementById("singleTemplateSelect").value;
        if (!name) {
            alert("適用するテンプレートを選択してください。");
            return;
        }

        const templates = getSingleNamedTemplates();
        const settings = templates[name];
        if (!settings) {
            alert("選択したテンプレートが見つかりませんでした。");
            refreshSingleTemplateSelect();
            return;
        }

        applySingleSettings(settings);
        saveSingleSettings();
        document.getElementById("singleTemplateNameInput").value = name;
        renderSingleAdPreviews();
        alert(`テンプレート「${name}」を適用しました。`);
    }

    function deleteSingleNamedTemplate() {
        const select = document.getElementById("singleTemplateSelect");
        const name = select.value;
        if (!name) {
            alert("削除するテンプレートを選択してください。");
            return;
        }
        if (!confirm(`テンプレート「${name}」を削除しますか？`)) return;

        const templates = getSingleNamedTemplates();
        delete templates[name];
        setScopedItem(
            SINGLE_TEMPLATE_STORAGE_KEY,
            JSON.stringify(templates)
        );
        document.getElementById("singleTemplateNameInput").value = "";
        refreshSingleTemplateSelect();
        alert(`テンプレート「${name}」を削除しました。`);
    }

    function getPanelLayoutConfig(layoutName) {
        return PANEL_LAYOUT_CONFIGS[layoutName] || null;
    }

    function getPanelLayoutWidthBounds(layoutName) {
        const config = getPanelLayoutConfig(layoutName);
        const root = config
            ? document.getElementById(config.rootId)
            : null;
        const rootWidth = root?.getBoundingClientRect().width || 0;
        const availableMaximum = rootWidth > 0
            ? Math.floor(
                rootWidth -
                PANEL_LAYOUT_MIN_PREVIEW_WIDTH -
                PANEL_LAYOUT_CHROME_WIDTH
            )
            : PANEL_LAYOUT_MAX_WIDTH;

        return {
            min: PANEL_LAYOUT_MIN_WIDTH,
            max: Math.max(
                PANEL_LAYOUT_MIN_WIDTH,
                Math.min(PANEL_LAYOUT_MAX_WIDTH, availableMaximum)
            )
        };
    }

    function schedulePanelLayoutFit(layoutName) {
        const config = getPanelLayoutConfig(layoutName);
        const state = panelLayoutStates[layoutName];
        if (!config || !state) return;

        cancelAnimationFrame(state.fitFrame);
        state.fitFrame = requestAnimationFrame(() => {
            config.fitPreview();
            state.fitFrame = 0;
        });
    }

    function renderPanelLayoutWidth(layoutName) {
        const config = getPanelLayoutConfig(layoutName);
        const state = panelLayoutStates[layoutName];
        if (!config || !state) return;

        const root = document.getElementById(config.rootId);
        const resizer = document.getElementById(config.resizerId);
        if (!root || !resizer) return;

        const bounds = getPanelLayoutWidthBounds(layoutName);
        const appliedWidth = Math.min(
            bounds.max,
            Math.max(bounds.min, state.preferredWidth)
        );

        root.style.setProperty(
            "--panel-control-width",
            `${Math.round(appliedWidth)}px`
        );
        resizer.setAttribute("aria-valuemin", String(bounds.min));
        resizer.setAttribute("aria-valuemax", String(bounds.max));
        resizer.setAttribute("aria-valuenow", String(Math.round(appliedWidth)));
        resizer.setAttribute(
            "aria-valuetext",
            `${config.label}の設定欄 ${Math.round(appliedWidth)}ピクセル`
        );
        schedulePanelLayoutFit(layoutName);
    }

    function setPanelControlWidth(layoutName, value, persist = false) {
        const config = getPanelLayoutConfig(layoutName);
        const state = panelLayoutStates[layoutName];
        const numericValue = Number(value);
        if (!config || !state || !Number.isFinite(numericValue)) return;

        const bounds = getPanelLayoutWidthBounds(layoutName);
        state.preferredWidth = Math.min(
            bounds.max,
            Math.max(bounds.min, numericValue)
        );
        renderPanelLayoutWidth(layoutName);

        if (persist) {
            try {
                localStorage.setItem(
                    config.storageKey,
                    String(Math.round(state.preferredWidth))
                );
            } catch (error) {
                console.warn(
                    `${config.label}画面の幅設定を保存できませんでした。`,
                    error
                );
            }
        }
    }

    function syncPanelLayoutWidth(layoutName) {
        const config = getPanelLayoutConfig(layoutName);
        const root = config
            ? document.getElementById(config.rootId)
            : null;
        if (
            !config ||
            !root ||
            root.classList.contains("view-hidden") ||
            !window.matchMedia(
                `(min-width: ${PANEL_LAYOUT_BREAKPOINT}px)`
            ).matches
        ) {
            return;
        }
        renderPanelLayoutWidth(layoutName);
    }

    function initializePanelLayoutResizer(layoutName) {
        const config = getPanelLayoutConfig(layoutName);
        const state = panelLayoutStates[layoutName];
        if (!config || !state) return;

        const control = document.getElementById(config.controlId);
        const resizer = document.getElementById(config.resizerId);
        if (!control || !resizer) return;

        state.preferredWidth = config.defaultWidth;
        try {
            const savedWidth = Number(localStorage.getItem(config.storageKey));
            if (Number.isFinite(savedWidth) && savedWidth > 0) {
                state.preferredWidth = Math.min(
                    PANEL_LAYOUT_MAX_WIDTH,
                    Math.max(PANEL_LAYOUT_MIN_WIDTH, savedWidth)
                );
            }
        } catch (error) {
            console.warn(
                `${config.label}画面の幅設定を読み込めませんでした。`,
                error
            );
        }
        renderPanelLayoutWidth(layoutName);

        let dragState = null;

        resizer.addEventListener("pointerdown", event => {
            if (
                event.button !== 0 ||
                !window.matchMedia(
                    `(min-width: ${PANEL_LAYOUT_BREAKPOINT}px)`
                ).matches
            ) {
                return;
            }

            event.preventDefault();
            dragState = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startWidth: control.getBoundingClientRect().width
            };
            resizer.setPointerCapture(event.pointerId);
            document.documentElement.classList.add(
                "is-resizing-panel-layout"
            );
        });

        resizer.addEventListener("pointermove", event => {
            if (!dragState || event.pointerId !== dragState.pointerId) return;
            event.preventDefault();
            setPanelControlWidth(
                layoutName,
                dragState.startWidth + event.clientX - dragState.startX,
                false
            );
        });

        const finishDrag = event => {
            if (!dragState || event.pointerId !== dragState.pointerId) return;
            if (resizer.hasPointerCapture(event.pointerId)) {
                resizer.releasePointerCapture(event.pointerId);
            }
            dragState = null;
            document.documentElement.classList.remove(
                "is-resizing-panel-layout"
            );
            setPanelControlWidth(layoutName, state.preferredWidth, true);
        };

        resizer.addEventListener("pointerup", finishDrag);
        resizer.addEventListener("pointercancel", finishDrag);

        resizer.addEventListener("keydown", event => {
            if (!window.matchMedia(
                `(min-width: ${PANEL_LAYOUT_BREAKPOINT}px)`
            ).matches) {
                return;
            }

            const currentWidth = control.getBoundingClientRect().width;
            const step = event.shiftKey ? 48 : 24;
            let nextWidth = null;
            if (event.key === "ArrowLeft") nextWidth = currentWidth - step;
            if (event.key === "ArrowRight") nextWidth = currentWidth + step;
            if (event.key === "Home") nextWidth = config.defaultWidth;
            if (event.key === "End") {
                nextWidth = getPanelLayoutWidthBounds(layoutName).max;
            }
            if (nextWidth === null) return;

            event.preventDefault();
            setPanelControlWidth(layoutName, nextWidth, true);
        });

        resizer.addEventListener("dblclick", event => {
            event.preventDefault();
            setPanelControlWidth(layoutName, config.defaultWidth, true);
        });
    }

    function initializePanelLayoutResizers() {
        Object.keys(PANEL_LAYOUT_CONFIGS).forEach(
            initializePanelLayoutResizer
        );
    }

    function switchAppView(view) {
        const isBuylist = view === "buylist";
        const isSingle = view === "single";
        const isXPost = view === "xpost";
        document.body.dataset.appView = view;
        document.getElementById("buylistMakerView").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("buylistControl").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("pagesContainer").classList.toggle("view-hidden", !isBuylist);
        document.getElementById("singleMakerView").classList.toggle("view-hidden", !isSingle);
        document.getElementById("xPostMakerView").classList.toggle("view-hidden", !isXPost);
        document.getElementById("buylistTabButton").classList.toggle("is-active", isBuylist);
        document.getElementById("singleTabButton").classList.toggle("is-active", isSingle);
        document.getElementById("xPostTabButton").classList.toggle("is-active", isXPost);
        document.getElementById("buylistTabButton").setAttribute("aria-selected", String(isBuylist));
        document.getElementById("singleTabButton").setAttribute("aria-selected", String(isSingle));
        document.getElementById("xPostTabButton").setAttribute("aria-selected", String(isXPost));

        requestAnimationFrame(() => {
            if (isSingle) {
                syncPanelLayoutWidth("single");
                fitSinglePreviews();
            } else if (isBuylist) {
                syncPanelLayoutWidth("buylist");
                fitPreviewPages();
            } else if (isXPost) {
                syncPanelLayoutWidth("xpost");
                if (!syncDefaultXPostTemplateForCategory()) {
                    syncSingleXPostDraft(false);
                }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        populateGeneratedThemeOptions();
        isRestoringWorkspace = true;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        document.getElementById("dateInput").value = `${yyyy}-${mm}-${dd}`;
        initializePanelLayoutResizers();

        const savedTitle = getScopedItem("kaitori_title");
        const savedDisclaimer = getScopedItem("kaitori_disclaimer");
        const savedLogo = getScopedItem("kaitori_logo");
        const savedLayout = getScopedItem("kaitori_layout");
        const savedTheme = getScopedItem("kaitori_theme");
        const savedWatermarkEnabled = getScopedItem("kaitori_watermark_enabled");
        const savedWatermarkPattern = getScopedItem("kaitori_watermark_pattern");
        const savedWatermarkSize = getScopedItem("kaitori_watermark_size");
        const savedWatermarkOpacity = getScopedItem("kaitori_watermark_opacity");
        const savedTitleStyle = getScopedItem("kaitori_title_style");
        const savedTitleColor = getScopedItem("kaitori_title_color");
        const savedTitleFont = getScopedItem("kaitori_title_font");
        const savedTitleSize = getScopedItem("kaitori_title_size");
        const savedTitleOutlineColor = getScopedItem("kaitori_title_outline_color");
        const savedTitleOutlineWidth = getScopedItem("kaitori_title_outline_width");
        let savedCardTextCustom = {};
        try {
            savedCardTextCustom = JSON.parse(getScopedItem("kaitori_card_text_custom") || "{}");
        } catch (error) {
            savedCardTextCustom = {};
        }
        const savedPriceScale = getScopedItem("kaitori_price_scale");
        const savedPriceColorMode =
            getScopedItem("kaitori_price_color_mode");
        const savedPriceColor = getScopedItem("kaitori_price_color");
        const savedPricePrimaryLabel =
            getScopedItem("kaitori_price_primary_label");
        const savedPriceSecondaryLabel =
            getScopedItem("kaitori_price_secondary_label");
        const savedCardNameDisplay = getScopedItem("kaitori_card_name_display");
        const savedPageSplit = getScopedItem("kaitori_page_split");
        const savedSortOrder = getScopedItem("kaitori_sort_order");

        if (savedTitle) document.getElementById("titleInput").value = savedTitle;
        if (savedDisclaimer) document.getElementById("disclaimerInput").value = savedDisclaimer;
        if (savedLogo) logoDataUrl = sanitizeImageDataUrl(savedLogo, DEFAULT_LOGO);
        document.getElementById("themeSelect").value = normalizeTheme(savedTheme);
        applyWatermarkSettings({
            enabled: savedWatermarkEnabled === "true",
            pattern: savedWatermarkPattern,
            size: savedWatermarkSize,
            opacity: savedWatermarkOpacity
        }, false);
        renderThemePickerGallery();
        document.getElementById("titleStyleSelect").value =
            normalizeTitleStyle(savedTitleStyle);
        applyTitleCustomizationSettings({
            color: savedTitleColor || DEFAULT_TITLE_CUSTOM.color,
            font: savedTitleFont || DEFAULT_TITLE_CUSTOM.font,
            size: savedTitleSize || DEFAULT_TITLE_CUSTOM.size,
            outlineColor:
                savedTitleOutlineColor || DEFAULT_TITLE_CUSTOM.outlineColor,
            outlineWidth:
                savedTitleOutlineWidth ?? DEFAULT_TITLE_CUSTOM.outlineWidth
        });
        applyCardTextCustomizationSettings(savedCardTextCustom);
        applyPriceCustomizationSettings({
            scale: savedPriceScale ?? DEFAULT_PRICE_CUSTOM.scale,
            colorMode:
                savedPriceColorMode ?? DEFAULT_PRICE_CUSTOM.colorMode,
            color: savedPriceColor ?? DEFAULT_PRICE_CUSTOM.color,
            primaryLabel:
                savedPricePrimaryLabel ??
                DEFAULT_PRICE_CUSTOM.primaryLabel,
            secondaryLabel:
                savedPriceSecondaryLabel ??
                DEFAULT_PRICE_CUSTOM.secondaryLabel
        });
        if (savedLayout) {
            document.getElementById("layoutSelect").value =
                normalizeLayout(savedLayout);
        }
        if (savedCardNameDisplay === "show" || savedCardNameDisplay === "hide") {
            document.getElementById("cardNameDisplaySelect").value = savedCardNameDisplay;
        }
        if (PAGE_SPLIT_MODES.includes(savedPageSplit)) {
            document.getElementById("pageSplitSelect").value = savedPageSplit;
        }
        if (SORT_MODES.includes(savedSortOrder)) {
            document.getElementById("sortOrderSelect").value = savedSortOrder;
        }
        try {
            applySingleSettings(
                JSON.parse(getScopedItem(SINGLE_SETTINGS_STORAGE_KEY) || "{}")
            );
        } catch (error) {
            applySingleSettings({});
        }

        renderStoreProfileSelect();
        refreshTemplateSelect();
        refreshSingleTemplateSelect();
        refreshXPostTemplateSelect();
        restoreXPostTemplateEditorState();
        recoverOfficialBaselineStorage();
        initializeOfficialBaselineControls();
        const restoredDraft = restoreWorkingDraft();
        if (restoredDraft) {
            updateCsvFileSelectionStatus(
                "restored",
                "",
                globalCardData.length
            );
            computeOfficialPriceDifferences(globalCardData, {
                autoSelect: false
            });
            renderPages();
        } else {
            updateAllPages();
        }
        updateCsvDiffPanel();
        renderCardEditor();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        updateXPostSelectionPreview();
        updateXPostTemplateStatus();
        updateSingleXPostCount();
        syncSingleXPostDraft(false);
        isRestoringWorkspace = false;
        setSaveState(
            "saved",
            restoredDraft ? "前回の作業を復元しました" : "保存済み"
        );
        requestAnimationFrame(fitPreviewPages);
        sharedSyncInteractionEnabled = true;
        initializeSharedSettingsSync().finally(() => {
            updateOfficialBaselinePanel();
        });
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            checkSharedSettingsUpdates();
        }
    });
    window.addEventListener("focus", () => {
        checkSharedSettingsUpdates();
    });
    window.addEventListener("online", () => {
        checkSharedSettingsUpdates(true);
    });

    document.getElementById("officialBaselineCategorySelect")
        .addEventListener("change", handleOfficialCategoryChange);
    document.getElementById("priceChangeDisplaySelect")
        .addEventListener("change", handlePriceChangeDisplayChange);
    document.getElementById("officialBaselineOperatorInput")
        .addEventListener("input", event => {
            setScopedItem(
                OFFICIAL_OPERATOR_STORAGE_KEY,
                String(event.target.value || "").trim().slice(0, 40)
            );
            updateOfficialBaselinePanel();
        });

    function getNamedTemplates() {
        try {
            const parsed = JSON.parse(getScopedItem(TEMPLATE_STORAGE_KEY) || "{}");
            return parsed && typeof parsed === "object" && !Array.isArray(parsed)
                ? parsed
                : {};
        } catch (error) {
            return {};
        }
    }

    function collectCurrentTemplateSettings() {
        return {
            title: document.getElementById("titleInput").value,
            disclaimer: document.getElementById("disclaimerInput").value,
            layout: document.getElementById("layoutSelect").value,
            theme: getSelectedTheme(),
            titleStyle: getSelectedTitleStyle(),
            titleCustom: collectTitleCustomization(),
            cardTextCustom: collectCardTextCustomization(),
            priceCustom: collectPriceCustomization(),
            cardNameDisplay: getCardNameDisplay(),
            pageSplit: getPageSplitMode(),
            sortOrder: getSortOrder(),
            priceChangeDisplay: getSelectedPriceChangeDisplayMode(),
            watermark: getWatermarkSettings(),
            savedAt: new Date().toISOString()
        };
    }

    function saveLastUsedSettings(settings) {
        setScopedItem("kaitori_title", settings.title);
        setScopedItem("kaitori_disclaimer", settings.disclaimer);
        setScopedItem("kaitori_logo", logoDataUrl);
        setScopedItem("kaitori_layout", settings.layout);
        setScopedItem("kaitori_theme", settings.theme);
        const watermark = normalizeWatermarkSettings(settings.watermark || {});
        setScopedItem("kaitori_watermark_enabled", String(watermark.enabled));
        setScopedItem("kaitori_watermark_pattern", watermark.pattern);
        setScopedItem("kaitori_watermark_size", String(watermark.size));
        setScopedItem("kaitori_watermark_opacity", String(watermark.opacity));
        setScopedItem("kaitori_title_style", settings.titleStyle);
        saveTitleCustomization(
            normalizeTitleCustomization(settings.titleCustom || {})
        );
        const cardTextCustom = normalizeCardTextCustomization(
            settings.cardTextCustom || collectCardTextCustomization()
        );
        applyCardTextCustomizationSettings(cardTextCustom);
        saveCardTextCustomization(cardTextCustom);
        applyCardTextCustomization(document, cardTextCustom);
        savePriceCustomization(
            normalizePriceCustomization(settings.priceCustom || {})
        );
        setScopedItem("kaitori_card_name_display", settings.cardNameDisplay);
        setScopedItem("kaitori_page_split", settings.pageSplit);
        setScopedItem("kaitori_sort_order", settings.sortOrder);
        setScopedItem(
            PRICE_CHANGE_DISPLAY_STORAGE_KEY,
            normalizePriceChangeDisplayMode(settings.priceChangeDisplay)
        );
    }

    function setSaveState(state, message) {
        const indicator = document.getElementById("saveStateIndicator");
        if (!indicator) return;
        indicator.dataset.state = state;
        indicator.textContent = message;
    }

    function serializeCardForDraft(card) {
        return {
            id: Number(card.id),
            originalIndex: Number(card.originalIndex),
            group: String(card.group || ""),
            status: String(card.status || ""),
            productId: String(card.productId || ""),
            name: String(card.name || ""),
            type: String(card.type || ""),
            price: String(card.price || ""),
            aMinusPrice: String(card.aMinusPrice || ""),
            imgUrl: String(card.imgUrl || ""),
            hidden: Boolean(card.hidden)
        };
    }

    function saveWorkingDraftNow(message = "自動保存済み") {
        if (isRestoringWorkspace) return;
        try {
            const settings = collectCurrentTemplateSettings();
            saveLastUsedSettings(settings);
            const draft = {
                version: 1,
                savedAt: new Date().toISOString(),
                settings,
                cards: globalCardData.map(serializeCardForDraft),
                selectedSingleCardIds: Array.from(selectedSingleCardIds),
                singleSelectionOrder: [...singleSelectionOrder]
            };
            setScopedItem(WORKING_DRAFT_STORAGE_KEY, JSON.stringify(draft));
            setSaveState("saved", message);
        } catch (error) {
            console.error(error);
            setSaveState("dirty", "自動保存に失敗");
        }
    }

    function scheduleWorkspaceAutosave(message = "自動保存済み") {
        if (isRestoringWorkspace) return;
        setSaveState("dirty", "未保存の変更");
        clearTimeout(workspaceAutosaveTimer);
        workspaceAutosaveTimer = setTimeout(
            () => saveWorkingDraftNow(message),
            350
        );
    }

    function restoreWorkingDraft() {
        try {
            const draft = JSON.parse(
                getScopedItem(WORKING_DRAFT_STORAGE_KEY) || "null"
            );
            if (!draft || !Array.isArray(draft.cards)) return false;

            // 更新日は前回の作業データから復元せず、起動時に設定した当日の日付を維持する。

            globalCardData = draft.cards.map((card, index) => ({
                id: Number.isFinite(Number(card.id)) ? Number(card.id) : index,
                originalIndex: Number.isFinite(Number(card.originalIndex))
                    ? Number(card.originalIndex)
                    : index,
                group: String(card.group || ""),
                status: String(card.status || ""),
                productId: String(card.productId || ""),
                name: String(card.name || ""),
                type: String(card.type || ""),
                price: String(card.price || ""),
                aMinusPrice: normalizeAMinusPriceForDisplay(card.aMinusPrice),
                imgUrl: String(card.imgUrl || ""),
                hidden: Boolean(card.hidden),
                resolvedImg: null,
                imageState: card.imgUrl ? "pending" : "missing"
            }));

            selectedSingleCardIds.clear();
            (draft.selectedSingleCardIds || []).forEach(cardId => {
                if (globalCardData.some(card => card.id === Number(cardId))) {
                    selectedSingleCardIds.add(Number(cardId));
                }
            });
            singleSelectionOrder = (draft.singleSelectionOrder || [])
                .map(Number)
                .filter(cardId => selectedSingleCardIds.has(cardId));
            csvAnomalyState = createEmptyCsvAnomalyState();
            return globalCardData.length > 0;
        } catch (error) {
            console.warn("作業途中データを復元できませんでした。", error);
            return false;
        }
    }

    function refreshTemplateSelect(selectedName = "") {
        const select = document.getElementById("templateSelect");
        const templates = getNamedTemplates();
        const names = Object.keys(templates).sort((a, b) =>
            a.localeCompare(b, "ja", { numeric: true, sensitivity: "base" })
        );

        select.innerHTML = '<option value="">テンプレートを選択</option>';
        names.forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });

        if (selectedName && hasOwn(templates, selectedName)) {
            select.value = selectedName;
        }
    }

    function saveNamedTemplate() {
        const nameInput = document.getElementById("templateNameInput");
        const templateSelect = document.getElementById("templateSelect");
        const name = (nameInput.value.trim() || templateSelect.value).slice(0, 80);

        if (!name) {
            alert("テンプレート名を入力してください。");
            nameInput.focus();
            return;
        }

        const templates = getNamedTemplates();
        if (
            hasOwn(templates, name) &&
            !confirm(`「${name}」を現在の設定で上書きしますか？`)
        ) {
            return;
        }

        const settings = collectCurrentTemplateSettings();
        templates[name] = settings;

        try {
            setScopedItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
            saveLastUsedSettings(settings);
            refreshTemplateSelect(name);
            nameInput.value = name;
            saveWorkingDraftNow("テンプレート保存済み");
            alert(`テンプレート「${name}」を保存しました。`);
        } catch (error) {
            alert("保存容量を超えました。大きいロゴ画像を使用している場合は、画像を小さくしてお試しください。");
        }
    }

    function loadNamedTemplate() {
        const name = document.getElementById("templateSelect").value;
        if (!name) {
            alert("適用するテンプレートを選択してください。");
            return;
        }

        const templates = getNamedTemplates();
        const settings = templates[name];
        if (!settings) {
            alert("選択したテンプレートが見つかりませんでした。");
            refreshTemplateSelect();
            return;
        }

        document.getElementById("titleInput").value = settings.title ?? "";
        document.getElementById("disclaimerInput").value = settings.disclaimer ?? "";

        if (settings.layout) {
            document.getElementById("layoutSelect").value =
                normalizeLayout(settings.layout);
        }
        document.getElementById("themeSelect").value = normalizeTheme(settings.theme);
        applyWatermarkSettings(settings.watermark || {}, false);
        renderThemePickerGallery();
        document.getElementById("titleStyleSelect").value =
            normalizeTitleStyle(settings.titleStyle);
        applyTitleCustomizationSettings(
            settings.titleCustom || collectTitleCustomization()
        );
        applyCardTextCustomizationSettings(settings.cardTextCustom || DEFAULT_CARD_TEXT_CUSTOM);
        saveCardTextCustomization(collectCardTextCustomization());
        applyCardTextCustomization(document, collectCardTextCustomization());
        applyPriceCustomizationSettings(
            settings.priceCustom || collectPriceCustomization()
        );
        document.getElementById("cardNameDisplaySelect").value =
            settings.cardNameDisplay === "hide" ? "hide" : "show";
        document.getElementById("pageSplitSelect").value =
            PAGE_SPLIT_MODES.includes(settings.pageSplit) ? settings.pageSplit : "fill";
        document.getElementById("sortOrderSelect").value =
            SORT_MODES.includes(settings.sortOrder) ? settings.sortOrder : "group_csv";
        document.getElementById("priceChangeDisplaySelect").value =
            normalizePriceChangeDisplayMode(settings.priceChangeDisplay);
        document.getElementById("templateNameInput").value = name;

        saveLastUsedSettings(collectCurrentTemplateSettings());
        updateAllPages();
        applySelectedLayout();
        saveWorkingDraftNow("テンプレート適用済み");
        alert(`テンプレート「${name}」を適用しました。`);
    }

    function deleteNamedTemplate() {
        const select = document.getElementById("templateSelect");
        const name = select.value;
        if (!name) {
            alert("削除するテンプレートを選択してください。");
            return;
        }
        if (!confirm(`テンプレート「${name}」を削除しますか？`)) return;

        const templates = getNamedTemplates();
        delete templates[name];
        setScopedItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
        document.getElementById("templateNameInput").value = "";
        refreshTemplateSelect();
        alert(`テンプレート「${name}」を削除しました。`);
    }

    function formatDate(dateStr) {
        if (!dateStr) return "----/--/--";
        const [y, m, d] = dateStr.split("-");
        if (y && m && d) return `${y}/${m}/${d}`;
        return dateStr;
    }

    function updateAllPages() {
        const title = document.getElementById("titleInput").value || "高価買取表";
        const dateText = formatDate(document.getElementById("dateInput").value);
        const disclaimerHtml = escapeHtml(document.getElementById("disclaimerInput").value)
            .replace(/\n/g, "<br>");

        document.querySelectorAll(".title-text").forEach(el => {
            el.textContent = title;
        });
        document.querySelectorAll(".date-text").forEach(el => {
            el.textContent = dateText;
        });
        document.querySelectorAll(".disclaimer-text").forEach(el => {
            el.innerHTML = disclaimerHtml;
        });
        document.querySelectorAll(".logo-img, .single-ad-logo").forEach(el => {
            el.src = logoDataUrl;
        });
        applyThemeToPages();
        applyTitleStyleToPages();
        applyCardNameVisibility();
    }

    function populateGeneratedThemeOptions() {
        const select = document.getElementById("themeSelect");
        if (!select) return;
        DESIGN_CATEGORIES.forEach(category => {
            const group = select.querySelector(`optgroup[data-design-category="${category.id}"]`);
            if (!group) return;
            GENERATED_THEME_DEFINITIONS.filter(theme => theme.category === category.id)
                .forEach(theme => {
                    const option = document.createElement("option");
                    option.value = `design_${theme.id}`;
                    option.textContent = theme.label;
                    group.appendChild(option);
                });
        });
    }

    function rgbaFromHex(hex, alpha) {
        const value = String(hex || "#000000").replace("#", "");
        const normalized = value.length === 3 ? value.split("").map(char => char+char).join("") : value;
        const number = Number.parseInt(normalized,16);
        return `rgba(${(number>>16)&255},${(number>>8)&255},${number&255},${alpha})`;
    }

    function generatedPagePattern(theme) {
        const {family,motif,bg,accent,accent2}=theme;
        const index=Number(motif)||1;
        const angle=[28,42,58,72,118,132,148,162,94][(index-1)%9];
        const shade=rgbaFromHex(accent,(family==="digital"||family==="luxury")?0.12:0.07);
        const highlight=rgbaFromHex(accent2,0.11);
        const dots=`radial-gradient(circle,${shade} 1px,transparent 1.8px)`;
        const diagonal=`repeating-linear-gradient(${angle}deg,${shade} 0 2px,transparent 2px 16px)`;
        const cross=`linear-gradient(${angle}deg,${highlight} 1px,transparent 1px 22px),linear-gradient(${angle+90}deg,${highlight} 1px,transparent 1px 22px)`;
        const ring=`radial-gradient(circle at ${(index*11)%100}% ${(index*17)%100}%,${highlight} 0 2px,transparent 3px 30px)`;
        const pattern=[diagonal,dots,cross,ring][(index-1)%4],base=`linear-gradient(${bg},${bg})`;
        if(family==="geometry")return `${pattern},${base}`;
        if(family==="luxury")return `radial-gradient(circle at 90% 5%,${highlight},transparent 28%),${pattern},${base}`;
        if(family==="japanese")return `repeating-linear-gradient(90deg,transparent 0 18px,${rgbaFromHex(accent,0.045)} 18px 19px),${ring},${base}`;
        if(family==="editorial")return `linear-gradient(0deg,${rgbaFromHex(accent,0.05)} 1px,transparent 1px 30px),${base}`;
        if(family==="pop")return `conic-gradient(from ${angle}deg at 92% 8%,${highlight},transparent 18%,${shade} 30%,transparent 42%),${base}`;
        if(family==="nature")return `radial-gradient(ellipse at 0% 0%,${highlight},transparent 28%),radial-gradient(ellipse at 100% 100%,${shade},transparent 25%),${base}`;
        if(family==="digital")return `linear-gradient(${shade} 1px,transparent 1px),linear-gradient(90deg,${shade} 1px,transparent 1px),${diagonal},${base}`;
        return `${ring},${diagonal},${base}`;
    }

    function seasonalDecorationSvg(theme) {
        const ink=theme.header, fill=theme.accent, light=theme.accent2;
        const stroke='stroke="'+ink+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
        const circle=(cx,cy,r,color)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+color+'" '+stroke+'/>';
        const petalFlower=(count,color,center)=>Array.from({length:count},(_,i)=>{const a=(Math.PI*2*i/count)-Math.PI/2;return circle((50+27*Math.cos(a)).toFixed(1),(46+27*Math.sin(a)).toFixed(1),14,color)}).join("")+circle(50,46,16,center);
        const motifs={
            snowflake:'<path d="M50 12v76M17 31l66 38M17 69l66-38M42 21l8 8 8-8M42 79l8-8 8 8M18 42l11-1 1-11M71 70l1-11 11-1M18 58l11 1 1 11M71 30l1 11 11 1" '+stroke+' fill="none"/>',
            heart:'<path d="M50 83 18 53C-2 30 23 8 42 27l8 9 8-9c19-19 44 3 24 26Z" fill="'+fill+'" '+stroke+'/><path d="M28 47q8-12 17-3" fill="none" stroke="'+light+'" stroke-width="6" stroke-linecap="round"/>',
            plum:petalFlower(5,light,"#e8ad53"),
            sakura:petalFlower(5,"#f4b8ca","#f2d47a"),
            carp:'<path d="M10 34q30-23 62 0l18 16-18 16q-32 23-62 0 11-16 0-32Z" fill="'+fill+'" '+stroke+'/><path d="M27 39q8 10 0 22M43 35q8 15 0 30M59 34q8 16 0 32" fill="none" stroke="'+light+'" stroke-width="5"/><circle cx="73" cy="47" r="3" fill="'+ink+'"/><path d="M17 50h62" '+stroke+' fill="none"/>',
            hydrangea:Array.from({length:7},(_,i)=>circle(28+(i%3)*22,28+Math.floor(i/3)*20,12,i%2?light:fill)).join("")+circle(50,48,9,"#f4d77c"),
            tanabata:'<path d="M50 12 58 39 86 40 64 57 72 84 50 68 28 84 36 57 14 40 42 39Z" fill="'+light+'" '+stroke+'/><path d="M50 67v26M38 78l12 8 12-8" '+stroke+' fill="none"/>',
            sunflower:petalFlower(12,"#edbd42","#6e9a50"),
            moon:'<path d="M68 14a38 38 0 1 0 18 65A36 36 0 0 1 68 14Z" fill="'+light+'" '+stroke+'/><path d="m30 31 4 10 10 1-8 6 3 10-9-6-9 6 3-10-8-6 10-1Z" fill="#f1d77a" '+stroke+'/>',
            leaf:'<path d="M18 79Q19 24 82 15q-2 57-64 64Z" fill="'+fill+'" '+stroke+'/><path d="M22 77 72 28M37 63l-2-19M51 51l18 1M62 40l-2-14" '+stroke+' fill="none"/>',
            ginkgo:'<path d="M50 86V48M50 54C8 47 15 17 46 34c-4-24 29-29 28-3 23-7 33 18-1 23 7 21-16 28-23 1Z" fill="'+fill+'" '+stroke+'/><path d="M50 51 24 31M50 51l20-23M50 51l23 0" '+stroke+' fill="none"/>',
            snowglobe:'<path d="M27 75a34 34 0 1 1 46 0v7H27Z" fill="'+light+'" '+stroke+'/><path d="M22 82h56v9H22Z" fill="'+fill+'" '+stroke+'/><path d="m50 28 3 8 9 1-7 5 2 8-7-5-7 5 2-8-7-5 9-1Z" fill="#e6bd57"/>',
            kadomatsu:'<path d="m31 13 13 47-16-4ZM50 8l2 53-15-3ZM68 17 57 62l18-8Z" fill="'+fill+'" '+stroke+'/><path d="M22 62h56l-8 25H30Z" fill="'+light+'" '+stroke+'/><path d="M17 87h66" '+stroke+'/>',
            chocolate:'<path d="M18 25h64v54H18Z" fill="'+fill+'" '+stroke+'/><path d="M18 41h64M34 25v16M50 25v16M66 25v16M34 41v18M50 41v18M66 41v18" '+stroke+' fill="none"/><path d="M50 73 36 60c-9-11 4-20 14-10 10-10 23-1 14 10Z" fill="'+light+'" '+stroke+'/>',
            hina:'<circle cx="37" cy="35" r="13" fill="#f4d7bd" '+stroke+'/><circle cx="66" cy="35" r="13" fill="#f4d7bd" '+stroke+'/><path d="M18 81q2-35 19-35t19 35ZM48 81q2-35 18-35t18 35Z" fill="'+fill+'" '+stroke+'/><path d="M29 31h16M58 31h16" '+stroke+'/>',
            ribbon:'<path d="M50 53 22 33 14 72l36-9 36 9-8-39Z" fill="'+light+'" '+stroke+'/><circle cx="50" cy="52" r="14" fill="'+fill+'" '+stroke+'/><path d="M39 63 34 90l16-12 16 12-5-27" fill="'+light+'" '+stroke+'/>',
            easter:'<ellipse cx="50" cy="53" rx="27" ry="35" fill="'+light+'" '+stroke+'/><path d="M24 51q26 16 52 0M32 35q18 10 36 0M38 72q12-8 24 0" fill="none" stroke="'+fill+'" stroke-width="5"/><circle cx="42" cy="48" r="3" fill="'+ink+'"/><circle cx="59" cy="48" r="3" fill="'+ink+'"/>',
            kabuto:'<path d="M18 48q0-34 32-38 32 4 32 38l-14-9-4 17H36l-4-17Z" fill="'+fill+'" '+stroke+'/><path d="M50 12V4M18 48h64M35 58l-7 24h44l-7-24" fill="none" '+stroke+'/>',
            fireworks:'<path d="M50 48V10M50 48l28-27M50 48h40M50 48l28 27M50 48v40M50 48 22 76M50 48H10M50 48 22 20" '+stroke+'/><circle cx="50" cy="48" r="10" fill="'+light+'" '+stroke+'/><circle cx="20" cy="82" r="4" fill="'+fill+'"/><circle cx="80" cy="12" r="4" fill="'+light+'"/>',
            chrysanthemum:petalFlower(12,light,fill),
            rabbitmoon:'<circle cx="59" cy="41" r="31" fill="'+light+'" '+stroke+'/><path d="M22 83q4-27 25-27t26 27ZM37 57 32 18q0-9 8-5l8 39M54 51l8-38q3-8 9-2l-10 48" fill="#fff" '+stroke+'/><circle cx="39" cy="74" r="2" fill="'+ink+'"/><circle cx="60" cy="74" r="2" fill="'+ink+'"/>',
            pumpkin:'<path d="M50 25q-28-17-36 15-8 39 36 42 44-3 36-42-8-32-36-15Z" fill="'+fill+'" '+stroke+'/><path d="M47 24q-1-14 9-18" '+stroke+' fill="none"/><path d="m31 48 12 8-13 7M69 48l-12 8 13 7M42 68q8-9 16 0" fill="#fff1bc" '+stroke+'/>',
            tree:'<path d="m50 10 31 32H65l22 23H62l17 19H21l17-19H13l22-23H19Z" fill="'+fill+'" '+stroke+'/><path d="M45 72h10v19H45Z" fill="#8f6040" '+stroke+'/><circle cx="50" cy="38" r="4" fill="'+light+'"/><circle cx="37" cy="54" r="4" fill="'+light+'"/><circle cx="64" cy="56" r="4" fill="#d87d76"/>'
        };
        return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">'+(motifs[theme.ornament]||petalFlower(5,light,fill))+'</svg>';
    }

    function applyGeneratedThemeAppearance(element, themeId) {
        if (!element) return;
        const theme=GENERATED_THEME_BY_ID.get(String(themeId).replace(/^design_/,""));
        if(!theme){
            ["--generated-page-image","--generated-page-size","--generated-header-image","--generated-header-radius","--generated-card-radius","--generated-emblem-radius","--generated-header-shadow","--generated-card-shadow","--generated-emblem-bg","--generated-emblem-shadow"].forEach(p=>element.style.removeProperty(p));
            ["background-image","background-size","background-color","color","border-color"].forEach(p=>element.style.removeProperty(p));
            delete element.dataset.themeFamily;delete element.dataset.themeMotif;element.querySelector(":scope > .seasonal-illustration")?.remove();return;
        }
        const {family,motif,bg,header,accent,accent2,price,dark}=theme;
        const n=(Number(motif)-1)%9;
        const cardRadii=["2px","6px","12px","0","16px","4px","9px","3px","14px"];
        const headerRadii=["2px 14px 2px 14px","8px","4px","0","18px 18px 3px 3px","3px","12px 3px 12px 3px","2px","14px 4px"];
        const emblemRadii=["50%","4px","999px","2px","8px","0","50% 50% 4px 4px","14px","3px"];
        const headerImage=family==="editorial"
            ? `linear-gradient(90deg,${header} 0 92%,${accent} 92% 100%)`
            : family==="japanese"
                ? `linear-gradient(100deg,${header},${rgbaFromHex(header,0.92)})`
                : family==="pop"
                    ? `linear-gradient(115deg,${header},${accent} 65%,${header})`
                    : family==="digital"
                        ? `linear-gradient(110deg,${header},${accent} 50%,${header})`
                        : `linear-gradient(110deg,${header},${rgbaFromHex(accent,0.75)} 52%,${header})`;
        const vars={
            "--buy-bg":bg,"--buy-panel":header,"--buy-card":"#ffffff","--buy-ink":dark?"#18212b":"#252b32",
            "--buy-accent":accent,"--buy-accent-2":accent2,"--buy-price":price,"--buy-note":"#f9faf8","--buy-border":accent,
            "--v4-bg":bg,"--v4-header":header,"--v4-header-text":"#ffffff","--v4-card":"#ffffff","--v4-ink":dark?"#18212b":"#252b32",
            "--v4-muted":"#56616b","--v4-image":"#f7f8f6","--v4-accent":accent,"--v4-accent-2":accent2,"--v4-border":accent,
            "--v4-price":price,"--v4-price-text":"#ffffff","--v4-footer":header,"--v4-footer-text":"#f9faf8",
            "--price-surface":price,"--price-ink":"#ffffff","--price-border":accent2,
            "--generated-page-image":generatedPagePattern(theme),"--generated-page-size":family==="digital"?"20px 20px,20px 20px,auto":"auto",
            "--generated-header-image":headerImage,"--generated-card-radius":family==="editorial"?"0":cardRadii[n],
            "--generated-header-radius":headerRadii[n],"--generated-emblem-radius":emblemRadii[n],
            "--generated-header-shadow":family==="luxury"?`inset 0 -2px 0 ${accent2}`:"0 3px 8px rgba(0,0,0,.12)",
            "--generated-card-shadow":family==="editorial"?"none":family==="pop"?`3px 3px 0 ${accent2}`:"0 2px 8px rgba(20,30,40,.10)",
            "--generated-emblem-bg":family==="pop"?accent2:header,
            "--generated-emblem-shadow":family==="luxury"?`0 0 0 2px ${bg},0 0 0 3px ${accent2}`:"none"
        };
        Object.entries(vars).forEach(([key,value])=>element.style.setProperty(key,value));
        /* Keep the generated palette visible above legacy theme defaults. */
        element.style.setProperty("background-color",bg,"important");
        element.style.setProperty("background-image",generatedPagePattern(theme),"important");
        element.style.setProperty("color",dark?"#ffffff":"#252b32","important");
        element.style.setProperty("border-color",accent,"important");
        element.dataset.themeFamily=family;element.dataset.themeMotif=motif;
        let illustration=element.querySelector(":scope > .seasonal-illustration");
        if(theme.category==="monthly"||theme.category==="event"){
            if(!illustration){illustration=document.createElement("div");illustration.className="seasonal-illustration";illustration.setAttribute("aria-hidden","true");element.appendChild(illustration);}
            illustration.innerHTML=seasonalDecorationSvg(theme);
            illustration.dataset.ornament=theme.ornament;
        }else illustration?.remove();
    }

    function renderThemePickerGallery() {
        const gallery=document.getElementById("themePickerGallery");
        const select=document.getElementById("themeSelect");
        if(!gallery||!select)return;
        gallery.innerHTML="";
        Array.from(select.querySelectorAll("optgroup")).forEach(group=>{
            const options=Array.from(group.querySelectorAll("option"));
            if(!options.length)return;
            const category=document.createElement("details");
            category.className="theme-picker-category";
            const activeOption=options.find(option=>option.value===select.value);
            category.open=Boolean(activeOption);
            const heading=document.createElement("summary");
            heading.className="theme-picker-category-title";
            heading.textContent=group.label;
            if(activeOption){const current=document.createElement("span");current.className="theme-picker-category-current";current.textContent=activeOption.textContent.trim();heading.appendChild(current);}
            const grid=document.createElement("div");grid.className="theme-picker-option-grid";
            const buildCards=()=>{
                if(grid.dataset.built==="true")return;
                options.forEach(option=>{
                    const theme=option.value;
                    const button=document.createElement("button");button.type="button";button.className="theme-picker-option";button.dataset.theme=theme;
                    button.setAttribute("aria-pressed",String(select.value===theme));button.setAttribute("aria-label",option.textContent.trim()+"を選択");
                    const preview=document.createElement("div");preview.className="theme-picker-preview-sheet exportArea";preview.dataset.theme=theme;
                    preview.innerHTML='<div class="header-area"><span class="theme-picker-preview-logo">TCK</span><strong class="theme-picker-preview-title">高価買取表</strong><span>01</span></div><div class="card-grid">'+
                        ['ピカチュウ','リザードン','ミュウ'].map((name,index)=>'<div class="card-item"><div class="theme-picker-art card-img-container">CARD</div><div class="card-name">'+name+'</div><div class="card-price-container"><span class="card-price-text">'+['¥12,000','¥8,500','¥4,200'][index]+'</span></div></div>').join('')+'</div><div class="footer-area"></div>';
                    applyGeneratedThemeAppearance(preview,theme);
                    const watermarkSettings=getWatermarkSettings();
                    if(watermarkSettings.enabled&&logoDataUrl){
                        const watermark=document.createElement("div");watermark.className="theme-picker-watermark";
                        watermark.classList.toggle("is-diagonal",watermarkSettings.pattern==="diagonal");
                        watermark.setAttribute("aria-hidden","true");watermark.style.backgroundImage='url("'+logoDataUrl+'")';
                        watermark.style.setProperty("--watermark-size",(watermarkSettings.size/3)+"px");
                        watermark.style.setProperty("--watermark-opacity",String(getWatermarkOpacity(theme,watermarkSettings.opacity)));preview.prepend(watermark);
                    }
                    const name=document.createElement("span");name.className="theme-picker-option-name";name.textContent=option.textContent.trim();
                    button.append(preview,name);
                    button.addEventListener("click",()=>{if(select.value!==theme){select.value=theme;select.dispatchEvent(new Event("change",{bubbles:true}));}else{renderThemePickerGallery();}});
                    grid.appendChild(button);
                });
                grid.dataset.built="true";
            };
            category.addEventListener("toggle",()=>{if(category.open)buildCards();});
            category.append(heading,grid);gallery.appendChild(category);if(category.open)buildCards();
        });
    }
    function getSelectedTheme() {
        const theme = document.getElementById("themeSelect").value;
        return normalizeTheme(theme);
    }

    function normalizeWatermarkSettings(settings = {}) {
        return {
            enabled: typeof settings.enabled === "boolean"
                ? settings.enabled
                : DEFAULT_WATERMARK_SETTINGS.enabled,
            pattern: WATERMARK_PATTERN_OPTIONS.includes(settings.pattern)
                ? settings.pattern
                : DEFAULT_WATERMARK_SETTINGS.pattern,
            size: clampTitleNumber(
                settings.size,
                60,
                320,
                DEFAULT_WATERMARK_SETTINGS.size
            ),
            opacity: clampTitleNumber(
                settings.opacity,
                3,
                40,
                DEFAULT_WATERMARK_SETTINGS.opacity
            )
        };
    }

    function getWatermarkSettings() {
        return normalizeWatermarkSettings({
            enabled: document.getElementById("watermarkEnabledInput")?.checked,
            pattern: document.getElementById("watermarkPatternSelect")?.value,
            size: document.getElementById("watermarkSizeInput")?.value,
            opacity: document.getElementById("watermarkOpacityInput")?.value
        });
    }

    function applyWatermarkSettings(settings = {}, updatePages = true) {
        const normalized = normalizeWatermarkSettings(settings);
        const enabledInput = document.getElementById("watermarkEnabledInput");
        const patternSelect = document.getElementById("watermarkPatternSelect");
        const sizeInput = document.getElementById("watermarkSizeInput");
        const opacityInput = document.getElementById("watermarkOpacityInput");
        if (enabledInput) enabledInput.checked = normalized.enabled;
        if (patternSelect) patternSelect.value = normalized.pattern;
        if (sizeInput) sizeInput.value = String(normalized.size);
        if (opacityInput) opacityInput.value = String(normalized.opacity);
        const output = document.getElementById("watermarkSizeOutput");
        if (output) output.textContent = `${normalized.size}px`;
        const opacityOutput = document.getElementById("watermarkOpacityOutput");
        if (opacityOutput) opacityOutput.textContent = `${normalized.opacity}%`;
        if (updatePages) applyWatermarkToPages();
    }

    function getWatermarkOpacity(theme, opacity) {
        const multiplier = DARK_WATERMARK_THEMES.has(theme) ? 1.4 : 1;
        return Math.min(0.48, opacity / 100 * multiplier);
    }

    function applyBrandWatermarkPattern(page, settings = getWatermarkSettings()) {
        if (!page) return;
        const normalized = normalizeWatermarkSettings(settings);
        let pattern = page.querySelector(".brand-watermark-pattern");
        if (!normalized.enabled || !logoDataUrl) {
            pattern?.remove();
            return;
        }
        if (!pattern) {
            pattern = document.createElement("div");
            pattern.className = "brand-watermark-pattern";
            pattern.setAttribute("aria-hidden", "true");
            page.prepend(pattern);
        }
        pattern.classList.toggle("is-diagonal", normalized.pattern === "diagonal");
        pattern.style.backgroundImage = `url("${logoDataUrl}")`;
        pattern.style.setProperty("--watermark-size", `${normalized.size}px`);
        pattern.style.setProperty(
            "--watermark-opacity",
            String(getWatermarkOpacity(page.dataset.theme, normalized.opacity))
        );
    }

    function updateThemeGalleryWatermarks(settings = getWatermarkSettings()) {
        document.querySelectorAll("#themePickerGallery .theme-picker-preview-sheet").forEach(preview=>{
            let watermark=preview.querySelector(".theme-picker-watermark");
            if(!settings.enabled||!logoDataUrl){watermark?.remove();return;}
            if(!watermark){watermark=document.createElement("div");watermark.className="theme-picker-watermark";watermark.setAttribute("aria-hidden","true");preview.prepend(watermark);}
            watermark.classList.toggle("is-diagonal",settings.pattern==="diagonal");watermark.style.backgroundImage='url("'+logoDataUrl+'")';
            watermark.style.setProperty("--watermark-size",(settings.size/3)+"px");
            watermark.style.setProperty("--watermark-opacity",String(getWatermarkOpacity(preview.dataset.theme,settings.opacity)));
        });
    }
    function applyWatermarkToPages() {
        const settings = getWatermarkSettings();
        updateThemeGalleryWatermarks(settings);
        document.querySelectorAll("#pagesContainer .exportArea").forEach(page => {
            applyBrandWatermarkPattern(page, settings);
        });
    }

    function applyThemeToPages() {
        renderThemePickerGallery();
        const theme = getSelectedTheme();
        document.querySelectorAll("#pagesContainer .exportArea").forEach(page => {
            page.dataset.theme = theme;
            applyGeneratedThemeAppearance(page, theme);
            applyBrandWatermarkPattern(page);
        });
        applyPriceCustomization();
        applyCardTextCustomization();
        requestAnimationFrame(() => adjustTextSize());
        syncQuickHeaderPreview();
    }

    function getSelectedTitleStyle() {
        return normalizeTitleStyle(
            document.getElementById("titleStyleSelect").value
        );
    }

    function applyTitleStyleToPages() {
        const style = getSelectedTitleStyle();
        document.querySelectorAll("#pagesContainer .exportArea").forEach(page => {
            page.dataset.titleStyle = style;
        });
        applyTitleCustomization();
        requestAnimationFrame(() => adjustTitleSizes());
    }

    function getCardNameDisplay() {
        return document.getElementById("cardNameDisplaySelect").value === "hide"
            ? "hide"
            : "show";
    }

    function getPageSplitMode() {
        const mode = document.getElementById("pageSplitSelect").value;
        return PAGE_SPLIT_MODES.includes(mode) ? mode : "fill";
    }

    function getSortOrder() {
        const order = document.getElementById("sortOrderSelect").value;
        return SORT_MODES.includes(order) ? order : "group_csv";
    }

    function applyCardNameVisibility() {
        const hideCardNames = getCardNameDisplay() === "hide";
        document.querySelectorAll("#pagesContainer .exportArea").forEach(page => {
            page.classList.toggle("hide-card-names", hideCardNames);
        });
    }

    function fitPreviewPages() {
        const container = document.getElementById("pagesContainer");
        if (!container) return;

        const containerStyle = getComputedStyle(container);
        const horizontalPadding =
            parseFloat(containerStyle.paddingLeft) +
            parseFloat(containerStyle.paddingRight);
        const availableWidth = Math.max(280, container.clientWidth - horizontalPadding - 4);

        container.querySelectorAll(".preview-page").forEach(shell => {
            const page = shell.querySelector(".exportArea");
            if (!page) return;

            const naturalWidth = page.offsetWidth;
            const naturalHeight = page.offsetHeight;
            if (!naturalWidth || !naturalHeight) return;

            const scale = Math.min(1, availableWidth / naturalWidth);
            page.dataset.previewScale = String(scale);
            page.style.transform = `scale(${scale})`;
            shell.style.width = `${Math.floor(naturalWidth * scale)}px`;
            shell.style.height = `${Math.floor(naturalHeight * scale)}px`;
        });
    }

    document.getElementById("titleInput").addEventListener("input", () => {
        updateAllPages();
        scheduleWorkspaceAutosave();
    });
    document.getElementById("disclaimerInput").addEventListener("input", () => {
        updateAllPages();
        scheduleWorkspaceAutosave();
    });
    document.getElementById("dateInput").addEventListener("change", () => {
        computeOfficialPriceDifferences(globalCardData, {
            autoSelect: false
        });
        updateAllPages();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    });
    document.getElementById("themeSelect").addEventListener("change", () => {
        applyThemeToPages();
        scheduleWorkspaceAutosave();
    });
    const updateWatermark = () => {
        applyWatermarkToPages();
        scheduleWorkspaceAutosave();
    };
    document.getElementById("watermarkEnabledInput")
        .addEventListener("change", updateWatermark);
    document.getElementById("watermarkPatternSelect")
        .addEventListener("change", updateWatermark);
    document.getElementById("watermarkSizeInput")
        .addEventListener("input", event => {
            document.getElementById("watermarkSizeOutput").textContent =
                `${event.target.value}px`;
            updateWatermark();
        });
    document.getElementById("watermarkOpacityInput")
        .addEventListener("input", event => {
            document.getElementById("watermarkOpacityOutput").textContent =
                `${event.target.value}%`;
            updateWatermark();
        });
    const updateTitleCustomization = () => {
        const settings = collectTitleCustomization();
        applyTitleCustomizationSettings(settings);
        saveTitleCustomization(settings);
        applyTitleCustomization();
        requestAnimationFrame(() => adjustTitleSizes());
        scheduleWorkspaceAutosave();
    };

    document.getElementById("titleSizeRange").addEventListener("input", event => {
        document.getElementById("titleSizeInput").value = event.target.value;
        updateTitleCustomization();
    });
    document.getElementById("titleSizeInput").addEventListener("input", event => {
        const rawSize = Number(event.target.value);
        if (!Number.isFinite(rawSize) || rawSize < 36 || rawSize > 110) return;
        document.getElementById("titleSizeRange").value =
            String(Math.round(rawSize));
        updateTitleCustomization();
    });
    document.getElementById("titleSizeInput").addEventListener("change", event => {
        const normalizedSize = clampTitleNumber(
            event.target.value,
            36,
            110,
            DEFAULT_TITLE_CUSTOM.size
        );
        event.target.value = String(normalizedSize);
        document.getElementById("titleSizeRange").value = String(normalizedSize);
        updateTitleCustomization();
    });
    [
        "titleColorInput",
        "titleFontSelect",
        "titleOutlineColorInput",
        "titleOutlineWidthSelect"
    ].forEach(id => {
        document.getElementById(id).addEventListener("input", updateTitleCustomization);
        document.getElementById(id).addEventListener("change", updateTitleCustomization);
    });

    const updatePriceCustomization = () => {
        const settings = collectPriceCustomization();
        applyPriceCustomizationSettings(settings);
        savePriceCustomization(settings);
        applyPriceCustomization(document, settings);
        requestAnimationFrame(() => adjustTextSize());
        scheduleWorkspaceAutosave();
    };

    document.getElementById("priceSizeRange").addEventListener("input", event => {
        document.getElementById("priceSizeInput").value = event.target.value;
        updatePriceCustomization();
    });
    document.getElementById("priceSizeInput").addEventListener("input", event => {
        const value = Number(event.target.value);
        if (!Number.isFinite(value) || value < 30 || value > 140) return;
        document.getElementById("priceSizeRange").value =
            String(Math.round(value));
        updatePriceCustomization();
    });
    document.getElementById("priceSizeInput").addEventListener("change", event => {
        const normalized = clampTitleNumber(
            event.target.value,
            30,
            140,
            DEFAULT_PRICE_CUSTOM.scale
        );
        event.target.value = String(normalized);
        document.getElementById("priceSizeRange").value = String(normalized);
        updatePriceCustomization();
    });
    const updateCardTextCustomization = () => {
        const settings = collectCardTextCustomization();
        applyCardTextCustomizationSettings(settings);
        saveCardTextCustomization(settings);
        applyCardTextCustomization(document, settings);
        scheduleWorkspaceAutosave();
    };
    ["cardNameSize", "cardTypeSize"].forEach(prefix => {
        document.getElementById(`${prefix}Range`).addEventListener("input", event => {
            document.getElementById(`${prefix}Input`).value = event.target.value;
            updateCardTextCustomization();
        });
        document.getElementById(`${prefix}Input`).addEventListener("input", event => {
            const value = Number(event.target.value);
            if (!Number.isFinite(value) || value < 50 || value > 160) return;
            document.getElementById(`${prefix}Range`).value = String(Math.round(value));
            updateCardTextCustomization();
        });
        document.getElementById(`${prefix}Input`).addEventListener("change", event => {
            const normalized = clampTitleNumber(event.target.value, 50, 160, 100);
            event.target.value = String(normalized);
            document.getElementById(`${prefix}Range`).value = String(normalized);
            updateCardTextCustomization();
        });
    });

    document.getElementById("priceColorModeSelect")
        .addEventListener("change", updatePriceCustomization);
    document.getElementById("priceColorInput")
        .addEventListener("input", updatePriceCustomization);
    [
        "pricePrimaryLabelInput",
        "priceSecondaryLabelInput"
    ].forEach(id => {
        document.getElementById(id)
            .addEventListener("input", updatePriceCustomization);
    });

    document.getElementById("cardNameDisplaySelect")
        .addEventListener("change", () => {
            renderPages();
            scheduleWorkspaceAutosave();
        });
    document.getElementById("pageSplitSelect").addEventListener("change", () => {
        if (globalCardData.length > 0) renderPages();
        scheduleWorkspaceAutosave();
    });
    document.getElementById("sortOrderSelect").addEventListener("change", () => {
        if (globalCardData.length > 0) renderPages();
        scheduleWorkspaceAutosave();
    });
    document.getElementById("cardEditorSearchInput")
        .addEventListener("input", () => {
            cardEditorPage = 1;
            renderCardEditor();
        });

    document.getElementById("singleSearchInput")
        .addEventListener("input", () => {
            singlePickerPage = 1;
            renderSingleCardPicker();
        });

    document.getElementById("singleStatusFilterSelect")
        .addEventListener("change", () => {
            singlePickerPage = 1;
            renderSingleCardPicker();
        });

    [
        "singleHeadlineInput",
        "singlePriceLabelInput",
        "singlePrimaryPriceLabelInput",
        "singleSecondaryPriceLabelInput"
    ].forEach(id => {
        document.getElementById(id).addEventListener("input", () => {
            saveSingleSettings();
            renderSingleAdPreviews();
        });
    });

    const SINGLE_SCALE_CONTROLS = {
        headline: {
            rangeId: "singleHeadlineSizeRange",
            inputId: "singleHeadlineSizeInput",
            outputId: "singleHeadlineSizeOutput",
            fallback: DEFAULT_SINGLE_HEADLINE_SCALE
        },
        name: {
            rangeId: "singleNameSizeRange",
            inputId: "singleNameSizeInput",
            outputId: "singleNameSizeOutput",
            fallback: DEFAULT_SINGLE_NAME_SCALE
        },
        price: {
            rangeId: "singlePriceSizeRange",
            inputId: "singlePriceSizeInput",
            outputId: "singlePriceSizeOutput",
            fallback: DEFAULT_SINGLE_PRICE_SCALE
        }
    };

    const updateSingleScale = (control, value) => {
        const config = SINGLE_SCALE_CONTROLS[control];
        if (!config) return;
        const normalizedScale = clampTitleNumber(
            value,
            60,
            160,
            config.fallback
        );
        document.getElementById(config.rangeId).value =
            String(normalizedScale);
        document.getElementById(config.inputId).value =
            String(normalizedScale);
        document.getElementById(config.outputId).textContent =
            `${normalizedScale}%`;
        saveSingleSettings();
        const settings = collectSingleSettings();
        const preview = document.getElementById("singlePreviewContainer");
        applySingleHeadlineSizes(preview, settings);
        requestAnimationFrame(() => {
            adjustSingleAdPriceSizes(preview);
            updateSingleAdLayoutStatus(preview);
            fitSinglePreviews();
        });
    };

    Object.entries(SINGLE_SCALE_CONTROLS).forEach(([control, config]) => {
        document.getElementById(config.rangeId)
            .addEventListener("input", event => {
                updateSingleScale(control, event.target.value);
            });
        document.getElementById(config.inputId)
            .addEventListener("input", event => {
                const value = Number(event.target.value);
                if (!Number.isFinite(value) || value < 60 || value > 160) {
                    return;
                }
                updateSingleScale(control, value);
            });
        document.getElementById(config.inputId)
            .addEventListener("change", event => {
                updateSingleScale(control, event.target.value);
            });
    });

    const updateSinglePriceColor = () => {
        const settings = collectSingleSettings();
        document.getElementById("singlePriceColorInput").disabled =
            settings.priceColorMode !== "custom";
        saveSingleSettings();
        const preview = document.getElementById("singlePreviewContainer");
        applySingleHeadlineSizes(preview, settings);
        requestAnimationFrame(() => {
            adjustSingleAdPriceSizes(preview);
            updateSingleAdLayoutStatus(preview);
        });
    };

    document.getElementById("singlePriceColorModeSelect")
        .addEventListener("change", updateSinglePriceColor);
    document.getElementById("singlePriceColorInput")
        .addEventListener("input", updateSinglePriceColor);

    [
        "singleSizeSelect",
        "singleDesignSelect",
        "singleCardNameDisplaySelect",
        "singleGradeDisplaySelect",
        "singleItemsPerImageSelect",
        "singleLogoAlignSelect"
    ].forEach(id => {
        document.getElementById(id).addEventListener("change", () => {
            saveSingleSettings();
            renderSingleAdPreviews();
        });
    });

    function applySelectedLayout() {
        if (globalCardData.length > 0) {
            renderPages();
            return;
        }

        const layoutConfig = getSelectedLayoutConfig();
        const previewArea = document.querySelector(
            "#pagesContainer .exportArea"
        );
        const grid = previewArea?.querySelector(".card-grid");
        if (!previewArea || !grid) return;

        previewArea.classList.remove("portrait", "landscape");
        previewArea.classList.add(layoutConfig.orientation);
        grid.style.gridTemplateColumns =
            `repeat(${layoutConfig.cols}, 1fr)`;
        grid.style.gridTemplateRows =
            `repeat(${layoutConfig.rows}, 1fr)`;

        syncQuickHeaderPreview();
        requestAnimationFrame(fitPreviewPages);
    }

    document.getElementById("layoutSelect").addEventListener("change", () => {
        applySelectedLayout();
        scheduleWorkspaceAutosave();
    });

    document.getElementById("logoInput").addEventListener("change", async event => {
        await handleLogoUpload(event.target.files[0]);
        event.target.value = "";
    });

    document.getElementById("singleLogoInput").addEventListener("change", async event => {
        await handleLogoUpload(event.target.files[0]);
        event.target.value = "";
    });

    function updateCsvFileSelectionStatus(
        state = "idle",
        fileName = "",
        itemCount = 0
    ) {
        const safeName = String(fileName || "").trim();
        const count = Math.max(0, Number(itemCount) || 0);
        let message = "CSVはまだ読み込まれていません";

        if (state === "loading") {
            message = `読み込み中：${safeName || "CSVファイル"}`;
        } else if (state === "loaded") {
            message =
                `読み込み済み：${safeName || "CSVファイル"}` +
                `（${count.toLocaleString("ja-JP")}件）`;
        } else if (state === "restored") {
            message =
                "前回の作業データを復元済み" +
                `（${count.toLocaleString("ja-JP")}件）`;
        } else if (state === "error") {
            message =
                `読み込み失敗：${safeName || "CSVファイル"}`;
        }

        ["csvFileStatus", "singleCsvFileStatus"].forEach(id => {
            const status = document.getElementById(id);
            if (!status) return;
            status.dataset.state = state;
            status.textContent = message;
            status.title = safeName || message;
        });
    }

    function readFileAsTextFallback(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(String(event.target?.result || ""));
            reader.onerror = () => reject(
                reader.error || new Error("CSVファイルを読み込めませんでした。")
            );
            reader.readAsText(file);
        });
    }

    async function readCsvFileText(file) {
        if (
            typeof file?.arrayBuffer !== "function" ||
            typeof TextDecoder !== "function"
        ) {
            return readFileAsTextFallback(file);
        }

        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        if (bytes[0] === 0xff && bytes[1] === 0xfe) {
            return new TextDecoder("utf-16le").decode(bytes.subarray(2));
        }
        if (bytes[0] === 0xfe && bytes[1] === 0xff) {
            return new TextDecoder("utf-16be").decode(bytes.subarray(2));
        }
        if (
            bytes[0] === 0xef &&
            bytes[1] === 0xbb &&
            bytes[2] === 0xbf
        ) {
            return new TextDecoder("utf-8").decode(bytes.subarray(3));
        }

        try {
            return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        } catch (utf8Error) {
            try {
                return new TextDecoder("shift_jis", { fatal: true }).decode(bytes);
            } catch (shiftJisError) {
                throw new Error(
                    "文字コードを判別できませんでした。UTF-8またはShift_JISのCSVを選択してください。"
                );
            }
        }
    }

    function updateCsvReadControls(isLoading = false) {
        ["csvReloadButton", "singleCsvReloadButton"].forEach(id => {
            const button = document.getElementById(id);
            if (!button) return;
            button.disabled = isLoading || !lastSelectedCsvFile;
            button.textContent = isLoading
                ? "読み込み中…"
                : "同じCSVを再読込";
        });
        ["csvChooseButton", "singleCsvChooseButton"].forEach(id => {
            const button = document.getElementById(id);
            if (!button) return;
            button.disabled = isLoading;
        });
    }

    function openCsvFilePicker(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;
        // 選択値だけを直前に解除することで、同じファイルも再選択できる。
        // キャンセル時は作業データと独自のファイル名表示をそのまま残す。
        input.value = "";
        input.click();
    }

    function reloadLastSelectedCsvFile() {
        if (!lastSelectedCsvFile) {
            alert("先にCSVファイルを選択してください。");
            return;
        }
        readSelectedCsvFile(lastSelectedCsvFile);
    }

    async function readSelectedCsvFile(file) {
        if (!file) return;
        const readGeneration = ++csvReadGeneration;
        lastSelectedCsvFile = file;
        updateCsvReadControls(true);
        updateCsvFileSelectionStatus("loading", file.name);
        try {
            const text = await readCsvFileText(file);
            if (readGeneration !== csvReadGeneration) return;
            parseCSV(text, file.name);
        } catch (error) {
            if (readGeneration !== csvReadGeneration) return;
            console.error("CSVファイルの読み込みに失敗しました。", error);
            updateCsvFileSelectionStatus("error", file.name);
            alert(
                `CSVファイル「${file.name}」を読み込めませんでした。\n` +
                (error?.message || "ファイルの内容を確認してください。")
            );
        } finally {
            if (readGeneration === csvReadGeneration) {
                updateCsvReadControls(false);
            }
        }
    }

    ["csvInput", "singleCsvInput"].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener("change", event => {
            readSelectedCsvFile(event.currentTarget.files?.[0]);
        });
    });

    function downloadSampleCsv() {
        const headers = [
            "掲載状況",
            "掲載グループ",
            "カード名",
            "種別",
            "買取金額",
            "状態A-",
            "画像リンク"
        ];
        const csvText = `\uFEFF${headers.join(",")}\r\n`;
        const blob = new Blob([csvText], {
            type: "text/csv;charset=utf-8"
        });
        downloadBlob(blob, "買取表_CSVテンプレート.csv");
    }

    function parseCSVRows(text) {
        const rows = [];
        let row = [];
        let inQuotes = false;
        let value = "";
        const source = String(text ?? "");

        for (let i = 0; i < source.length; i++) {
            const char = source[i];
            if (char === '"' && inQuotes && source[i + 1] === '"') {
                value += '"';
                i++;
            } else if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
                row.push(value);
                value = "";
            } else if ((char === "\n" || char === "\r") && !inQuotes) {
                if (char === "\r" && source[i + 1] === "\n") i++;
                row.push(value);
                rows.push(row);
                row = [];
                value = "";
            } else {
                value += char;
            }
        }

        if (value || row.length > 0) {
            row.push(value);
            rows.push(row);
        }
        return rows;
    }

    function createEmptyCsvImportReport(sourceName = "") {
        return {
            sourceName: String(sourceName || ""),
            totalRows: 0,
            accepted: 0,
            excluded: 0,
            errorMessage: "",
            exclusions: {
                notPublished: 0,
                missingGroup: 0,
                missingPrice: 0
            },
            warnings: {
                missingName: 0,
                missingImage: 0,
                aMinusHigher: 0,
                duplicateRows: 0
            },
            samples: []
        };
    }

    function createEmptyCsvAnomalyState(sourceName = "") {
        return {
            sourceName: String(sourceName || ""),
            zeroPrice: [],
            suddenPrice: [],
            aMinusHigher: [],
            missingImage: [],
            imageError: []
        };
    }

    function formatAnomalyCardLabel(card) {
        const name = String(card?.name || "カード名なし").trim() || "カード名なし";
        const type = String(card?.type || "").trim();
        return type ? `${name} ${type}` : name;
    }

    function isSuddenPriceChange(card) {
        const previous = Number(card?.previousPrice || 0);
        const current = parsePriceNumber(card?.price);
        if (!(previous > 0) || !(current > 0)) return false;
        const absoluteDifference = Math.abs(current - previous);
        if (absoluteDifference < 1000) return false;
        const ratio = current / previous;
        return ratio >= 3 || ratio <= (1 / 3);
    }

    function refreshCsvAnomalyChecks() {
        const preservedZeroPrice = Array.isArray(csvAnomalyState?.zeroPrice)
            ? csvAnomalyState.zeroPrice
            : [];
        const sourceName = csvAnomalyState?.sourceName || csvImportReportState?.sourceName || "";
        const next = createEmptyCsvAnomalyState(sourceName);
        next.zeroPrice = preservedZeroPrice;

        globalCardData.forEach(card => {
            const current = parsePriceNumber(card.price);
            const aMinus = parsePriceNumber(
                normalizeOptionalAMinusPrice(card.aMinusPrice)
            );
            const label = formatAnomalyCardLabel(card);
            const rowNumber = Number(card.sourceRow || 0);

            if (isSuddenPriceChange(card)) {
                const previous = Number(card.previousPrice || 0);
                const ratio = previous > 0 ? current / previous : 0;
                next.suddenPrice.push({
                    cardId: card.id,
                    rowNumber,
                    message:
                        `${label}：${previous.toLocaleString("ja-JP")}円 → ` +
                        `${current.toLocaleString("ja-JP")}円（約${ratio.toFixed(1)}倍）`
                });
            }

            if (current > 0 && aMinus > current) {
                next.aMinusHigher.push({
                    cardId: card.id,
                    rowNumber,
                    message:
                        `${label}：状態A- ${aMinus.toLocaleString("ja-JP")}円 > ` +
                        `状態A ${current.toLocaleString("ja-JP")}円`
                });
            }

            if (!String(card.imgUrl || "").trim() || card.imageState === "missing") {
                next.missingImage.push({
                    cardId: card.id,
                    rowNumber,
                    message: `${label}：画像リンクがありません`
                });
            } else if (card.imageState === "error") {
                next.imageError.push({
                    cardId: card.id,
                    rowNumber,
                    message: `${label}：画像を取得できませんでした`
                });
            }
        });

        csvAnomalyState = next;
        renderCsvAnomalyReports();
        return next;
    }

    function getCsvAnomalyTotal(state = csvAnomalyState) {
        return [
            state.zeroPrice,
            state.suddenPrice,
            state.aMinusHigher,
            state.missingImage,
            state.imageError
        ].reduce((sum, items) => sum + (Array.isArray(items) ? items.length : 0), 0);
    }

    function renderCsvAnomalyReports(state = csvAnomalyState) {
        const targets = [
            ["buylistAnomalyReport", "buylistAnomalySummary", "buylistAnomalyBody"],
            ["singleAnomalyReport", "singleAnomalySummary", "singleAnomalyBody"]
        ];
        const total = getCsvAnomalyTotal(state);
        const hasData = globalCardData.length > 0 || (state.zeroPrice || []).length > 0;
        const definitions = [
            ["zeroPrice", "0円・価格なし", "is-critical"],
            ["suddenPrice", "前回比の急変", "is-critical"],
            ["aMinusHigher", "状態A- > 状態A", "is-critical"],
            ["missingImage", "画像リンクなし", "is-warning"],
            ["imageError", "画像取得エラー", "is-warning"]
        ];
        const issueHtml = definitions
            .filter(([key]) => (state[key] || []).length > 0)
            .map(([key, label, type]) => `
                <div class="csv-report-issue ${type === "is-critical" ? "is-error" : "is-warning"}">
                    ${escapeHtml(label)}：${(state[key] || []).length.toLocaleString("ja-JP")}件
                </div>
            `).join("") || '<div class="csv-report-issue">要確認項目はありません。</div>';
        const samples = definitions.flatMap(([key, label]) =>
            (state[key] || []).slice(0, 4).map(item => ({
                rowNumber: item.rowNumber,
                message: `${label}｜${item.message}`
            }))
        ).slice(0, 16);
        const sampleHtml = samples.length
            ? `<ol class="csv-report-samples">${samples.map(sample => `
                <li>${sample.rowNumber ? `${sample.rowNumber}行目：` : ""}${escapeHtml(sample.message)}</li>
            `).join("")}</ol>`
            : "";
        const statsHtml = definitions.map(([key, label, type]) => `
            <div class="csv-report-stat ${type}">
                <span>${escapeHtml(label)}</span>
                <strong>${(state[key] || []).length.toLocaleString("ja-JP")}</strong>
            </div>
        `).join("");
        const bodyHtml = `
            <div class="csv-report-stats">${statsHtml}</div>
            <div class="csv-report-issues">${issueHtml}</div>
            ${sampleHtml}
            <div class="csv-diff-meta">
                急変判定：前回正式価格の3倍以上または1/3以下、かつ差額1,000円以上。保存時にも選択商品を再確認します。
            </div>
        `;

        targets.forEach(([panelId, summaryId, bodyId]) => {
            const panel = document.getElementById(panelId);
            const summary = document.getElementById(summaryId);
            const body = document.getElementById(bodyId);
            if (!panel || !summary || !body) return;
            panel.hidden = !hasData;
            panel.dataset.state = total > 0 ? "warning" : "ready";
            panel.open = total > 0;
            summary.textContent = total > 0
                ? `${total.toLocaleString("ja-JP")}件 要確認`
                : "問題なし";
            body.innerHTML = bodyHtml;
        });
    }

    function addCsvReportSample(report, rowNumber, message) {
        if (!report || report.samples.length >= 12) return;
        report.samples.push({
            rowNumber: Math.max(1, Number(rowNumber) || 1),
            message: String(message || "").slice(0, 180)
        });
    }

    function renderCsvImportReport(report = csvImportReportState) {
        const panel = document.getElementById("csvImportReport");
        const title = document.getElementById("csvReportTitle");
        const summary = document.getElementById("csvReportSummaryCounts");
        const body = document.getElementById("csvReportBody");
        if (!panel || !title || !summary || !body || !report) return;

        const warningTotal = Object.values(report.warnings)
            .reduce((sum, count) => sum + Number(count || 0), 0);
        const hasIssues = report.excluded > 0 || warningTotal > 0;
        panel.hidden = false;
        panel.dataset.state = report.errorMessage
            ? "error"
            : hasIssues ? "warning" : "ready";
        panel.open = Boolean(report.errorMessage || hasIssues);
        title.textContent = report.errorMessage
            ? "CSVを読み込めませんでした"
            : "CSV読込結果";
        summary.textContent = report.errorMessage
            ? "要確認"
            : `${report.accepted}/${report.totalRows}件を採用`;

        const issueDefinitions = [
            ["is-error", report.exclusions.notPublished, "非掲載・無効のため除外"],
            ["is-error", report.exclusions.missingGroup, "掲載グループなしで除外"],
            ["is-error", report.exclusions.missingPrice, "価格なし・0円で除外"],
            ["is-warning", report.warnings.missingName, "カード名が空欄"],
            ["is-warning", report.warnings.missingImage, "画像リンクが空欄"],
            ["is-warning", report.warnings.aMinusHigher, "状態A-が状態Aより高い"],
            ["is-warning", report.warnings.duplicateRows, "同一商品と思われる重複行"]
        ].filter(([, count]) => Number(count) > 0);

        const issueHtml = report.errorMessage
            ? `<div class="csv-report-issue is-error">${escapeHtml(report.errorMessage)}</div>`
            : issueDefinitions.length
                ? issueDefinitions.map(([type, count, label]) => `
                    <div class="csv-report-issue ${type}">
                        ${escapeHtml(label)}：${Number(count).toLocaleString("ja-JP")}件
                    </div>
                `).join("")
                : '<div class="csv-report-issue">除外・警告はありません。</div>';

        const sampleHtml = report.samples.length
            ? `<ol class="csv-report-samples">${report.samples.map(sample => `
                <li>${sample.rowNumber}行目：${escapeHtml(sample.message)}</li>
            `).join("")}</ol>`
            : "";
        const sourceLabel = report.sourceName
            ? `<span title="${escapeHtml(report.sourceName)}">${escapeHtml(report.sourceName)}</span>`
            : "<span>読み込んだCSV</span>";

        body.innerHTML = `
            <div class="csv-report-stats">
                <div class="csv-report-stat"><span>対象行</span><strong>${report.totalRows.toLocaleString("ja-JP")}</strong></div>
                <div class="csv-report-stat"><span>採用</span><strong>${report.accepted.toLocaleString("ja-JP")}</strong></div>
                <div class="csv-report-stat"><span>除外</span><strong>${report.excluded.toLocaleString("ja-JP")}</strong></div>
                <div class="csv-report-stat"><span>警告</span><strong>${warningTotal.toLocaleString("ja-JP")}</strong></div>
            </div>
            <div class="csv-report-issues">${issueHtml}</div>
            ${sampleHtml}
            <div class="csv-diff-meta">対象ファイル：${sourceLabel}</div>
        `;
    }

    function normalizeCsvHeaderName(value) {
        return String(value ?? "")
            .normalize("NFKC")
            .replace(/[−‐‑‒–—―﹣ー]/g, "-")
            .replace(/\s+/g, "")
            .toLocaleUpperCase("ja");
    }

    function isStateAMinusHeader(value) {
        const normalized = normalizeCsvHeaderName(value)
            .replace(/[()[\]{}【】「」『』]/g, "");
        return /^(?:状態)?A-(?:(?:買取)?(?:金額|価格))?$/.test(normalized) ||
            normalized === "状態Aマイナス" ||
            normalized === "Aマイナス";
    }

    function normalizeOptionalAMinusPrice(value) {
        const cleaned = String(value ?? "").replace(/"/g, "").trim();
        const compact = cleaned.normalize("NFKC").replace(/\s+/g, "");
        if (
            !compact ||
            /^(?:-|−|―|ー|終了|0円?|[¥￥]0円?)$/.test(compact)
        ) {
            return "";
        }
        return cleaned;
    }

    function normalizeAMinusPriceForDisplay(value) {
        return String(value ?? "").replace(/"/g, "").trim();
    }

    function normalizeDiffKeyPart(value) {
        return String(value ?? "")
            .normalize("NFKC")
            .trim()
            .toLocaleLowerCase("ja");
    }

    function normalizeOfficialCategory(value) {
        return hasOwn(OFFICIAL_BASELINE_CATEGORIES, value)
            ? value
            : "psa";
    }

    function getOfficialCategoryLabel(category = getSelectedOfficialCategory()) {
        return OFFICIAL_BASELINE_CATEGORIES[
            normalizeOfficialCategory(category)
        ];
    }

    function normalizePriceChangeDisplayMode(value) {
        return PRICE_CHANGE_DISPLAY_MODES.includes(value)
            ? value
            : "all";
    }

    function getSelectedOfficialCategory() {
        return normalizeOfficialCategory(
            document.getElementById("officialBaselineCategorySelect")?.value
        );
    }

    function getSelectedPriceChangeDisplayMode() {
        return normalizePriceChangeDisplayMode(
            document.getElementById("priceChangeDisplaySelect")?.value
        );
    }

    function officialCardKey(card) {
        const productId = normalizeDiffKeyPart(card.productId);
        if (productId) return `id:${productId}`;
        return `fields:${[
            card.name,
            card.type,
            card.group
        ].map(normalizeDiffKeyPart).join("||")}`;
    }

    function normalizeOfficialBaselineEntry(entry) {
        if (!entry || typeof entry !== "object") return null;
        const key = String(entry.k ?? entry.key ?? "").slice(0, 800);
        const price = Number(entry.p ?? entry.price);
        if (!key || !Number.isFinite(price) || price <= 0) return null;
        return {
            k: key,
            p: Math.round(price),
            s: Boolean(
                entry.s ?? String(entry.status || "").includes("強化")
            ) ? 1 : 0
        };
    }

    function normalizeOfficialDateValue(value) {
        const text = String(value || "").trim();
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
        if (!match) return "";
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (
            date.getUTCFullYear() !== year ||
            date.getUTCMonth() + 1 !== month ||
            date.getUTCDate() !== day
        ) {
            return "";
        }
        return text;
    }

    function localDateValue(date = new Date()) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    function officialDateFromTimestamp(value) {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "" : localDateValue(date);
    }

    function getOfficialTargetDate() {
        return normalizeOfficialDateValue(
            document.getElementById("dateInput")?.value
        );
    }

    function formatOfficialDateLabel(value, short = false) {
        const normalized = normalizeOfficialDateValue(value);
        if (!normalized) return "日付未設定";
        const [year, month, day] = normalized.split("-").map(Number);
        return short
            ? `${month}/${day}`
            : `${year}/${month}/${day}`;
    }

    function normalizeOfficialBaselineRecord(baseline, fallbackDate = "") {
        if (!baseline || !Array.isArray(baseline.entries)) return null;
        const entryMap = new Map();
        baseline.entries.slice(0, 30000).forEach(rawEntry => {
            const entry = normalizeOfficialBaselineEntry(rawEntry);
            if (entry) entryMap.set(entry.k, entry);
        });
        const entries = Array.from(entryMap.values())
            .sort((a, b) => a.k.localeCompare(b.k));
        if (entries.length === 0) return null;

        const confirmedDate =
            normalizeOfficialDateValue(fallbackDate) ||
            normalizeOfficialDateValue(baseline.confirmedDate) ||
            officialDateFromTimestamp(baseline.confirmedAt) ||
            localDateValue();
        return {
            confirmedAt: String(baseline.confirmedAt || ""),
            confirmedDate,
            confirmedBy: String(baseline.confirmedBy || "").slice(0, 40),
            count: entries.length,
            fingerprint: String(
                baseline.fingerprint || officialEntriesFingerprint(entries)
            ),
            entries
        };
    }

    function officialBaselineRecordTimestamp(record) {
        const timestamp = Date.parse(record?.confirmedAt || "");
        return Number.isFinite(timestamp) ? timestamp : 0;
    }

    function setNewestOfficialBaselineRecord(recordMap, record) {
        if (!record?.confirmedDate) return;
        const existing = recordMap.get(record.confirmedDate);
        if (!existing) {
            recordMap.set(record.confirmedDate, record);
            return;
        }

        const existingTime = officialBaselineRecordTimestamp(existing);
        const nextTime = officialBaselineRecordTimestamp(record);
        if (nextTime > existingTime) {
            recordMap.set(record.confirmedDate, record);
            return;
        }
        if (nextTime < existingTime) return;

        // 同じ確定時刻、または時刻情報がない旧データ同士では、後から
        // 読み込んだ側を採用する。旧形式からの移行時にもデータを落とさない。
        recordMap.set(record.confirmedDate, record);
    }

    function collectOfficialBaselineCategorySources(source, category) {
        if (!source || typeof source !== "object") return [];
        const label = OFFICIAL_BASELINE_CATEGORIES[category];
        const aliases = [
            category,
            label,
            String(label || "").toLocaleLowerCase("ja")
        ];
        const containers = [
            source,
            source.baselines,
            source.data?.categories,
            source.categories
        ].filter(
            container =>
                container &&
                typeof container === "object" &&
                !Array.isArray(container)
        );
        const results = [];
        containers.forEach(container => {
            aliases.forEach(alias => {
                if (alias && hasOwn(container, alias)) {
                    results.push(container[alias]);
                }
            });
        });
        return results;
    }

    function appendOfficialBaselineRecords(recordMap, categorySource) {
        if (!categorySource || typeof categorySource !== "object") return;

        const appendRecord = (rawRecord, fallbackDate = "") => {
            const record = normalizeOfficialBaselineRecord(
                rawRecord,
                fallbackDate
            );
            if (record) setNewestOfficialBaselineRecord(recordMap, record);
        };

        if (Array.isArray(categorySource)) {
            categorySource.forEach(rawRecord => appendRecord(rawRecord));
            return;
        }

        [
            categorySource.records,
            categorySource.dates,
            categorySource.history,
            categorySource.snapshots
        ].forEach(collection => {
            if (Array.isArray(collection)) {
                collection.forEach(rawRecord => appendRecord(rawRecord));
                return;
            }
            if (collection && typeof collection === "object") {
                Object.entries(collection).forEach(([dateKey, rawRecord]) => {
                    appendRecord(rawRecord, dateKey);
                });
            }
        });

        // 旧形式（区分ごとに確定データを1件だけ保存）も引き継ぐ。
        if (Array.isArray(categorySource.entries)) {
            appendRecord(categorySource);
        }
    }

    function normalizeOfficialBaselines(value) {
        let source = value;
        if (typeof value === "string") {
            try {
                source = JSON.parse(value || "{}");
            } catch (error) {
                source = {};
            }
        }
        const categories = {};

        Object.keys(OFFICIAL_BASELINE_CATEGORIES).forEach(category => {
            const recordMap = new Map();
            collectOfficialBaselineCategorySources(source, category)
                .forEach(categorySource => {
                    appendOfficialBaselineRecords(recordMap, categorySource);
                });

            if (recordMap.size === 0) return;
            const records = {};
            Array.from(recordMap.keys()).sort().forEach(dateKey => {
                records[dateKey] = recordMap.get(dateKey);
            });
            categories[category] = { records };
        });

        return trimOfficialBaselineHistory({ version: 2, categories });
    }

    function mergeOfficialBaselines(...values) {
        const categoryMaps = Object.fromEntries(
            Object.keys(OFFICIAL_BASELINE_CATEGORIES)
                .map(category => [category, new Map()])
        );

        values.forEach(value => {
            const normalized = normalizeOfficialBaselines(value);
            Object.keys(OFFICIAL_BASELINE_CATEGORIES).forEach(category => {
                const records = normalized.categories[category]?.records || {};
                Object.values(records).forEach(record => {
                    setNewestOfficialBaselineRecord(
                        categoryMaps[category],
                        record
                    );
                });
            });
        });

        const categories = {};
        Object.entries(categoryMaps).forEach(([category, recordMap]) => {
            if (recordMap.size === 0) return;
            const records = {};
            Array.from(recordMap.keys()).sort().forEach(dateKey => {
                records[dateKey] = recordMap.get(dateKey);
            });
            categories[category] = { records };
        });
        return trimOfficialBaselineHistory({ version: 2, categories });
    }

    function trimOfficialBaselineHistory(
        baselines,
        limit = OFFICIAL_BASELINE_HISTORY_LIMIT
    ) {
        const safeLimit = Math.max(1, Number(limit) || 1);
        const normalized = baselines && typeof baselines === "object"
            ? baselines
            : { version: 2, categories: {} };
        if (!normalized.categories || typeof normalized.categories !== "object") {
            normalized.categories = {};
        }

        Object.keys(OFFICIAL_BASELINE_CATEGORIES).forEach(category => {
            const categoryData = normalized.categories[category];
            const records =
                categoryData?.records && typeof categoryData.records === "object"
                    ? categoryData.records
                    : {};
            const keepDates = Object.keys(records)
                .filter(Boolean)
                .sort((a, b) => b.localeCompare(a))
                .slice(0, safeLimit);
            const trimmedRecords = {};
            keepDates.forEach(dateValue => {
                trimmedRecords[dateValue] = records[dateValue];
            });
            normalized.categories[category] = { records: trimmedRecords };
        });

        normalized.version = 2;
        return normalized;
    }

    function countOfficialBaselineRecords(baselines) {
        return Object.keys(OFFICIAL_BASELINE_CATEGORIES).reduce(
            (total, category) =>
                total + Object.keys(
                    baselines?.categories?.[category]?.records || {}
                ).length,
            0
        );
    }

    function recoverOfficialBaselineStorage() {
        const storageKey = scopedStorageKey(
            OFFICIAL_BASELINES_STORAGE_KEY,
            activeStoreId
        );
        const scopedValue = localStorage.getItem(storageKey);
        const legacyValue = localStorage.getItem(
            OFFICIAL_BASELINES_STORAGE_KEY
        );
        const legacyOwner = localStorage.getItem(
            OFFICIAL_BASELINE_LEGACY_OWNER_KEY
        );
        const legacyBaselines = normalizeOfficialBaselines(
            legacyValue || "{}"
        );
        const hasLegacyRecords =
            countOfficialBaselineRecords(legacyBaselines) > 0;
        const canUseLegacy =
            !legacyOwner || legacyOwner === activeStoreId;
        const recovered = mergeOfficialBaselines(
            canUseLegacy ? legacyBaselines : {},
            scopedValue || "{}"
        );
        if (countOfficialBaselineRecords(recovered) === 0) return false;

        const serialized = JSON.stringify(recovered);
        if (scopedValue === serialized) {
            if (hasLegacyRecords && !legacyOwner) {
                localStorage.setItem(
                    OFFICIAL_BASELINE_LEGACY_OWNER_KEY,
                    activeStoreId
                );
            }
            return false;
        }
        try {
            localStorage.setItem(storageKey, serialized);
            if (hasLegacyRecords && canUseLegacy) {
                localStorage.setItem(
                    OFFICIAL_BASELINE_LEGACY_OWNER_KEY,
                    activeStoreId
                );
            }
            const meta = readSharedSyncMeta();
            writeSharedSyncMeta({
                ...meta,
                pending: true,
                localChangedAt: new Date().toISOString()
            });
            return true;
        } catch (error) {
            console.warn("確定履歴の移行保存に失敗しました。", error);
            return false;
        }
    }

    function getOfficialBaselines() {
        const legacyOwner = localStorage.getItem(
            OFFICIAL_BASELINE_LEGACY_OWNER_KEY
        );
        const includeLegacy =
            !legacyOwner || legacyOwner === activeStoreId;
        return mergeOfficialBaselines(
            includeLegacy
                ? localStorage.getItem(OFFICIAL_BASELINES_STORAGE_KEY) || "{}"
                : "{}",
            getScopedItem(OFFICIAL_BASELINES_STORAGE_KEY) || "{}"
        );
    }

    function getOfficialRecordsForCategory(
        category,
        baselines = getOfficialBaselines()
    ) {
        return baselines.categories[
            normalizeOfficialCategory(category)
        ]?.records || {};
    }

    function getOfficialBaselineForDate(
        category,
        targetDate,
        baselines = getOfficialBaselines()
    ) {
        const normalizedDate = normalizeOfficialDateValue(targetDate);
        if (!normalizedDate) return null;
        return getOfficialRecordsForCategory(category, baselines)[
            normalizedDate
        ] || null;
    }

    function getOfficialComparisonBaselineForDate(
        category,
        targetDate,
        baselines = getOfficialBaselines()
    ) {
        const normalizedDate = normalizeOfficialDateValue(targetDate);
        if (!normalizedDate) return null;
        const records = getOfficialRecordsForCategory(category, baselines);
        const previousDate = Object.keys(records)
            .filter(dateKey => dateKey < normalizedDate)
            .sort()
            .pop();
        return previousDate ? records[previousDate] : null;
    }

    function selectOfficialBaselineHistoryDate(dateValue) {
        const normalizedDate = normalizeOfficialDateValue(dateValue);
        const dateInput = document.getElementById("dateInput");
        if (!normalizedDate || !dateInput) return;
        dateInput.value = normalizedDate;
        dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function renderOfficialBaselineHistory(
        category = getSelectedOfficialCategory(),
        targetDate = getOfficialTargetDate(),
        baselines = getOfficialBaselines()
    ) {
        const list = document.getElementById(
            "officialBaselineHistoryList"
        );
        if (!list) return;

        const records = getOfficialRecordsForCategory(
            category,
            baselines
        );
        const dates = Object.keys(records).sort().reverse();
        list.replaceChildren();

        if (dates.length === 0) {
            const empty = document.createElement("span");
            empty.className = "official-baseline-history-empty";
            empty.textContent =
                `${getOfficialCategoryLabel(category)}の確定履歴はありません`;
            list.appendChild(empty);
            return;
        }

        dates.forEach((dateValue, index) => {
            const record = records[dateValue];
            const button = document.createElement("button");
            button.type = "button";
            button.className = "official-baseline-history-chip";
            button.classList.toggle(
                "is-selected",
                dateValue === targetDate
            );
            const dateLabel = document.createElement("span");
            dateLabel.textContent = formatOfficialDateLabel(dateValue, true);
            const countLabel = document.createElement("small");
            countLabel.textContent =
                `${Number(record.count || record.entries?.length || 0)
                    .toLocaleString("ja-JP")}件`;
            button.append(dateLabel, countLabel);
            button.title =
                `${getOfficialCategoryLabel(category)} ` +
                `${formatOfficialDateLabel(dateValue)}分｜` +
                `確定操作 ${formatOfficialBaselineTime(record.confirmedAt)}` +
                (record.confirmedBy ? `｜担当 ${record.confirmedBy}` : "") +
                (index === 0 ? "｜最新の確定日" : "");
            button.addEventListener("click", () => {
                selectOfficialBaselineHistoryDate(dateValue);
            });
            list.appendChild(button);
        });
    }

    function createOfficialBaselineEntries(cards) {
        const entryMap = new Map();
        cards.forEach(card => {
            const price = parsePriceNumber(card.price);
            const key = officialCardKey(card);
            if (!key || !Number.isFinite(price) || price <= 0) return;
            entryMap.set(key, {
                k: key,
                p: Math.round(price),
                s: String(card.status || "").includes("強化") ? 1 : 0
            });
        });
        return Array.from(entryMap.values())
            .sort((a, b) => a.k.localeCompare(b.k));
    }

    function officialEntriesFingerprint(entries) {
        let hash = 2166136261;
        entries.forEach(entry => {
            const value = `${entry.k}:${entry.p}:${entry.s}|`;
            for (let index = 0; index < value.length; index++) {
                hash ^= value.charCodeAt(index);
                hash = Math.imul(hash, 16777619);
            }
        });
        return `${entries.length}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }

    function currentOfficialFingerprint() {
        return officialEntriesFingerprint(
            createOfficialBaselineEntries(globalCardData)
        );
    }

    function resetCardPriceChange(card) {
        card.previousPrice = null;
        card.previousPriceDate = "";
        card.priceDelta = 0;
        card.priceChangeType = "same";
    }

    function computeOfficialPriceDifferences(
        cards,
        { autoSelect = false, statusMessage = "" } = {}
    ) {
        const category = getSelectedOfficialCategory();
        const targetDate = getOfficialTargetDate();
        const baselines = getOfficialBaselines();
        const baseline = getOfficialComparisonBaselineForDate(
            category,
            targetDate,
            baselines
        );
        cards.forEach(resetCardPriceChange);

        if (!baseline) {
            csvDiffResults = {
                hasBaseline: false,
                previousSavedAt: "",
                targetDate,
                comparisonDate: "",
                category,
                baselineCount: 0,
                priceUp: [],
                priceDown: [],
                newItems: [],
                strengthened: [],
                all: []
            };
            updateCsvDiffPanel(statusMessage);
            updateOfficialBaselinePanel();
            refreshCsvAnomalyChecks();
            return csvDiffResults;
        }

        const previousMap = new Map(
            baseline.entries.map(entry => [entry.k, entry])
        );
        const priceUp = [];
        const priceDown = [];
        const newItems = [];
        const strengthened = [];

        cards.forEach(card => {
            const currentPrice = parsePriceNumber(card.price);
            if (!Number.isFinite(currentPrice) || currentPrice <= 0) return;
            const oldCard = previousMap.get(officialCardKey(card));
            if (!oldCard) {
                card.priceChangeType = "new";
                newItems.push(card.id);
                return;
            }

            card.previousPrice = Number(oldCard.p);
            card.previousPriceDate = baseline.confirmedDate || "";
            const difference = Math.round(currentPrice - Number(oldCard.p));
            card.priceDelta = difference;
            if (difference > 0) {
                card.priceChangeType = "up";
                priceUp.push(card.id);
            } else if (difference < 0) {
                card.priceChangeType = "down";
                priceDown.push(card.id);
            }

            const isStrengthened = String(card.status || "").includes("強化");
            if (isStrengthened && !Boolean(oldCard.s)) {
                strengthened.push(card.id);
            }
        });

        const all = [...new Set([
            ...priceUp,
            ...priceDown,
            ...newItems,
            ...strengthened
        ])];
        csvDiffResults = {
            hasBaseline: true,
            previousSavedAt: baseline.confirmedAt || "",
            targetDate,
            comparisonDate: baseline.confirmedDate || "",
            category,
            baselineCount: baseline.count || baseline.entries.length,
            confirmedBy: baseline.confirmedBy || "",
            priceUp,
            priceDown,
            newItems,
            strengthened,
            all
        };

        if (autoSelect) {
            [...new Set([...priceUp, ...newItems, ...strengthened])]
                .forEach(cardId => selectedSingleCardIds.add(cardId));
        }
        updateCsvDiffPanel(statusMessage);
        updateOfficialBaselinePanel();
        refreshCsvAnomalyChecks();
        return csvDiffResults;
    }

    function formatOfficialBaselineTime(value) {
        const date = new Date(value);
        return Number.isNaN(date.getTime())
            ? "日時不明"
            : date.toLocaleString("ja-JP");
    }

    function getOfficialConfirmButtonText(
        targetDate,
        mode = "confirm"
    ) {
        const dateLabel = formatOfficialDateLabel(targetDate, true);
        if (!normalizeOfficialDateValue(targetDate)) {
            return "設定日分として確定";
        }
        if (mode === "confirmed") return `${dateLabel}分は確定済み`;
        if (mode === "overwrite") return `${dateLabel}分を上書き`;
        return `${dateLabel}分として確定`;
    }

    function updateOfficialBaselinePanel() {
        const status = document.getElementById("officialBaselineStatus");
        const button = document.getElementById("confirmOfficialBaselineButton");
        if (!status || !button) return;

        const category = getSelectedOfficialCategory();
        const categoryLabel = getOfficialCategoryLabel(category);
        const targetDate = getOfficialTargetDate();
        const targetDateLabel = formatOfficialDateLabel(targetDate);
        const baselines = getOfficialBaselines();
        const targetBaseline = getOfficialBaselineForDate(
            category,
            targetDate,
            baselines
        );
        const comparisonBaseline = getOfficialComparisonBaselineForDate(
            category,
            targetDate,
            baselines
        );
        renderOfficialBaselineHistory(
            category,
            targetDate,
            baselines
        );
        const sharedConfigured = isSharedSyncConfigured();

        if (!targetDate) {
            status.dataset.state = "blocked";
            status.textContent =
                "買取表の「更新日」を設定してください。確定日にはこの日付を使用します。";
            button.disabled = true;
            button.textContent = "設定日分として確定";
            return;
        }

        if (sharedConfigured && !sharedSyncReady) {
            status.dataset.state = "blocked";
            status.textContent =
                `${categoryLabel}・${targetDateLabel}分：` +
                "共有されている正式価格を確認中です。" +
                "確認が終わるまで確定できません。";
            button.disabled = true;
            button.textContent = "共有価格を確認中";
            return;
        }

        if (globalCardData.length === 0) {
            status.dataset.state = targetBaseline ? "ready" : "idle";
            status.textContent = targetBaseline
                ? `${categoryLabel}｜${targetDateLabel}分は確定済み｜` +
                    `${targetBaseline.count.toLocaleString("ja-JP")}商品｜` +
                    `確定操作 ${formatOfficialBaselineTime(
                        targetBaseline.confirmedAt
                    )}` +
                    (targetBaseline.confirmedBy
                        ? `｜担当 ${targetBaseline.confirmedBy}`
                        : "")
                : `${categoryLabel}｜${targetDateLabel}分は未確定` +
                    (comparisonBaseline
                        ? `｜比較元 ${formatOfficialDateLabel(
                            comparisonBaseline.confirmedDate
                        )}分`
                        : "｜それ以前の確定データなし") +
                    "｜CSVを読み込んでください";
            button.disabled = true;
            button.textContent = getOfficialConfirmButtonText(
                targetDate,
                targetBaseline ? "confirmed" : "confirm"
            );
            return;
        }

        const currentFingerprint = currentOfficialFingerprint();
        const matchesCurrent = Boolean(
            targetBaseline &&
            targetBaseline.fingerprint === currentFingerprint
        );
        const syncNote = sharedConfigured ? "全端末共有" : "この端末のみ";
        const sharedSavePending = Boolean(
            sharedConfigured && readSharedSyncMeta().pending
        );

        if (matchesCurrent && sharedSavePending) {
            status.dataset.state = "blocked";
            status.textContent =
                `${categoryLabel}・${targetDateLabel}分はこの端末で確定済みですが、` +
                "共有保存が完了していません。接続を確認して再試行してください。";
            button.disabled = false;
            button.textContent = "共有保存を再試行";
            return;
        }

        if (matchesCurrent) {
            status.dataset.state = "ready";
            status.textContent =
                `${categoryLabel}｜${targetDateLabel}分は確定済み｜` +
                `${targetBaseline.count.toLocaleString("ja-JP")}商品｜` +
                `確定操作 ${formatOfficialBaselineTime(
                    targetBaseline.confirmedAt
                )}` +
                (targetBaseline.confirmedBy
                    ? `｜担当 ${targetBaseline.confirmedBy}`
                    : "") +
                `｜${syncNote}`;
            button.disabled = true;
            button.textContent = getOfficialConfirmButtonText(
                targetDate,
                "confirmed"
            );
            return;
        }

        status.dataset.state = "changed";
        status.textContent =
            `${categoryLabel}｜${targetDateLabel}分` +
            (targetBaseline ? "を上書きします" : "は未確定") +
            (comparisonBaseline
                ? `｜比較元 ${formatOfficialDateLabel(
                    comparisonBaseline.confirmedDate
                )}分・${comparisonBaseline.count.toLocaleString("ja-JP")}商品`
                : "｜それ以前の確定データなし") +
            `｜現在 ${globalCardData.length.toLocaleString("ja-JP")}商品｜${syncNote}`;
        button.disabled = false;
        button.textContent = getOfficialConfirmButtonText(
            targetDate,
            targetBaseline ? "overwrite" : "confirm"
        );
    }

    function initializeOfficialBaselineControls() {
        const categorySelect = document.getElementById(
            "officialBaselineCategorySelect"
        );
        const displaySelect = document.getElementById(
            "priceChangeDisplaySelect"
        );
        const operatorInput = document.getElementById(
            "officialBaselineOperatorInput"
        );
        categorySelect.value = normalizeOfficialCategory(
            getScopedItem(OFFICIAL_CATEGORY_STORAGE_KEY)
        );
        displaySelect.value = normalizePriceChangeDisplayMode(
            getScopedItem(PRICE_CHANGE_DISPLAY_STORAGE_KEY)
        );
        operatorInput.value = String(
            getScopedItem(OFFICIAL_OPERATOR_STORAGE_KEY) || ""
        ).slice(0, 40);
        computeOfficialPriceDifferences(globalCardData, {
            autoSelect: false
        });
    }

    function handleOfficialCategoryChange() {
        const category = getSelectedOfficialCategory();
        setScopedItem(OFFICIAL_CATEGORY_STORAGE_KEY, category);
        selectedSingleCardIds.clear();
        computeOfficialPriceDifferences(globalCardData, { autoSelect: true });
        renderCardEditor();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        if (globalCardData.length > 0) renderPages();
        scheduleWorkspaceAutosave("比較区分を保存しました");
        if (document.getElementById("xPostMakerView") &&
            !document.getElementById("xPostMakerView").classList.contains("view-hidden")) {
            if (!syncDefaultXPostTemplateForCategory()) {
                syncSingleXPostDraft(false);
            }
        }
    }

    function handlePriceChangeDisplayChange() {
        const mode = getSelectedPriceChangeDisplayMode();
        setScopedItem(PRICE_CHANGE_DISPLAY_STORAGE_KEY, mode);
        if (globalCardData.length > 0) renderPages();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave("前回比の表示設定を保存しました");
    }

    async function confirmOfficialBaseline() {
        if (globalCardData.length === 0) {
            alert("先にCSVを読み込んでください。");
            return;
        }

        const targetDate = getOfficialTargetDate();
        if (!targetDate) {
            alert("買取表の「更新日」を設定してください。");
            document.getElementById("dateInput")?.focus();
            return;
        }

        const category = getSelectedOfficialCategory();
        const categoryLabel = getOfficialCategoryLabel(category);
        const targetDateLabel = formatOfficialDateLabel(targetDate);
        const operatorInput = document.getElementById(
            "officialBaselineOperatorInput"
        );
        const operator = String(operatorInput?.value || "").trim().slice(0, 40);
        setScopedItem(OFFICIAL_OPERATOR_STORAGE_KEY, operator);
        const baselineBeforeSync = getOfficialBaselineForDate(
            category,
            targetDate
        );
        const retryingSharedSave = Boolean(
            isSharedSyncConfigured() &&
            baselineBeforeSync &&
            baselineBeforeSync.fingerprint === currentOfficialFingerprint() &&
            readSharedSyncMeta().pending
        );

        if (isSharedSyncConfigured()) {
            if (!sharedSyncReady) {
                alert("共有されている正式価格の確認中です。少し待ってからもう一度お試しください。");
                return;
            }
            await checkSharedSettingsUpdates(true);
            if (sharedSyncReloadScheduled) {
                alert("別の端末による最新更新を反映します。再読み込み後に、もう一度確定してください。");
                return;
            }
            if (retryingSharedSave) {
                const retrySucceeded = !readSharedSyncMeta().pending;
                updateOfficialBaselinePanel();
                alert(
                    retrySucceeded
                        ? `${categoryLabel}・${targetDateLabel}分の共有保存を確認しました。`
                        : "共有保存を確認できませんでした。接続を確認して、もう一度お試しください。"
                );
                return;
            }
        }

        const baselines = getOfficialBaselines();
        const existing = getOfficialBaselineForDate(
            category,
            targetDate,
            baselines
        );
        const comparisonBaseline = getOfficialComparisonBaselineForDate(
            category,
            targetDate,
            baselines
        );
        const entries = createOfficialBaselineEntries(globalCardData);
        if (entries.length === 0) {
            alert("正式価格として保存できる有効な商品がありません。");
            return;
        }

        const existingText = existing
            ? `\n${targetDateLabel}分の現在の確定：` +
                `${formatOfficialBaselineTime(existing.confirmedAt)}` +
                `／${existing.count.toLocaleString("ja-JP")}商品` +
                (existing.confirmedBy ? `／担当 ${existing.confirmedBy}` : "")
            : `\n${targetDateLabel}分を新規登録します。`;
        const comparisonText = comparisonBaseline
            ? `\n前回比の比較元：${formatOfficialDateLabel(
                comparisonBaseline.confirmedDate
            )}分`
            : "\n前回比の比較元：なし";
        if (!confirm(
            `${categoryLabel}の${targetDateLabel}分として、CSVの採用商品 ` +
            `${entries.length.toLocaleString("ja-JP")}件を` +
            `${existing ? "上書き" : "確定"}しますか？` +
            `${existingText}${comparisonText}\n\n` +
            "ほかの日付・区分の正式価格は変更されません。"
        )) {
            return;
        }

        const now = new Date();
        const baseline = {
            confirmedAt: now.toISOString(),
            confirmedDate: targetDate,
            confirmedBy: operator,
            count: entries.length,
            fingerprint: officialEntriesFingerprint(entries),
            entries
        };
        if (!baselines.categories[category]) {
            baselines.categories[category] = { records: {} };
        }
        baselines.categories[category].records[targetDate] = baseline;
        trimOfficialBaselineHistory(baselines);

        try {
            setScopedItem(
                OFFICIAL_BASELINES_STORAGE_KEY,
                JSON.stringify(baselines)
            );
        } catch (error) {
            alert("正式価格の保存容量を超えました。商品件数をご確認ください。");
            return;
        }

        let sharedSaved = true;
        if (isSharedSyncConfigured()) {
            sharedSaved = await pushSharedSettingsNow({ force: true });
        }
        updateOfficialBaselinePanel();
        updateCsvDiffPanel(
            `${categoryLabel}の${targetDateLabel}分を` +
            `${existing ? "上書き" : "確定"}しました。` +
            "現在表示中の前回比は、画像保存のためそのまま維持しています"
        );
        alert(
            sharedSaved
                ? `${categoryLabel}の${targetDateLabel}分を` +
                    `${existing ? "上書き" : "確定"}しました。\n` +
                    "ほかの日付・区分は変更していません。"
                : `${categoryLabel}の${targetDateLabel}分はこの端末へ保存しましたが、` +
                    "共有保存を確認できませんでした。\n" +
                    "接続復旧後にもう一度お試しください。"
        );
    }

    function getPriceChangePresentation(card) {
        const mode = getSelectedPriceChangeDisplayMode();
        const type = String(card?.priceChangeType || "same");
        if (mode === "off" || type === "same") return null;
        if (mode === "up_new" && type === "down") return null;
        if (type === "new") {
            return {
                type: "new",
                text: "NEW",
                title: "前回の正式確定価格にはなかった新規商品"
            };
        }
        const difference = Math.abs(Number(card.priceDelta) || 0);
        if (!difference || !["up", "down"].includes(type)) return null;
        const sign = type === "up" ? "＋" : "－";
        const previousDateLabel = card.previousPriceDate
            ? `${formatOfficialDateLabel(card.previousPriceDate)}分 `
            : "前回 ";
        return {
            type,
            text: `${sign}${difference.toLocaleString("ja-JP")}円`,
            title:
                `${previousDateLabel}` +
                `${Number(card.previousPrice || 0).toLocaleString("ja-JP")}円 ` +
                `→ 今回 ${parsePriceNumber(card.price).toLocaleString("ja-JP")}円`
        };
    }

    function renderPriceChangeBadge(card) {
        const presentation = getPriceChangePresentation(card);
        if (!presentation) return "";
        return `<span class="price-change-badge is-${presentation.type}" ` +
            `title="${escapeHtml(presentation.title)}">` +
            `${escapeHtml(presentation.text)}</span>`;
    }

    function updateCsvDiffPanel(statusMessage = "") {
        const status = document.getElementById("csvDiffStatus");
        const meta = document.getElementById("csvDiffMeta");
        const countMap = {
            diffPriceUpCount: csvDiffResults.priceUp.length,
            diffPriceDownCount: csvDiffResults.priceDown.length,
            diffNewCount: csvDiffResults.newItems.length,
            diffStrengthenedCount: csvDiffResults.strengthened.length,
            diffAllCount: csvDiffResults.all.length
        };
        Object.entries(countMap).forEach(([id, count]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = String(count);
        });

        if (status) {
            const categoryLabel = getOfficialCategoryLabel(
                csvDiffResults.category
            );
            const targetDateLabel = formatOfficialDateLabel(
                csvDiffResults.targetDate || getOfficialTargetDate()
            );
            status.textContent = statusMessage || (
                csvDiffResults.hasBaseline
                    ? `${categoryLabel}｜${targetDateLabel}分を` +
                        `${formatOfficialDateLabel(
                            csvDiffResults.comparisonDate
                        )}分と比較中`
                    : `${categoryLabel}｜${targetDateLabel}分より前の` +
                        "確定データはありません"
            );
        }

        if (meta) {
            if (csvDiffResults.previousSavedAt) {
                meta.textContent =
                    `${getOfficialCategoryLabel(csvDiffResults.category)}｜` +
                    `比較元 ${formatOfficialDateLabel(
                        csvDiffResults.comparisonDate
                    )}分｜確定操作 ${formatOfficialBaselineTime(
                        csvDiffResults.previousSavedAt
                    )}｜${Number(csvDiffResults.baselineCount || 0)
                        .toLocaleString("ja-JP")}商品` +
                    (csvDiffResults.confirmedBy
                        ? `｜担当 ${csvDiffResults.confirmedBy}`
                        : "") +
                    "｜商品ID、またはカード名・種別・掲載グループで照合";
            } else {
                meta.textContent =
                    `${getOfficialCategoryLabel(csvDiffResults.category)}｜` +
                    `${formatOfficialDateLabel(
                        csvDiffResults.targetDate || getOfficialTargetDate()
                    )}分より前に確定された価格が、前回比の比較元になります`;
            }
        }
    }

    function selectCsvDiffCards(kind) {
        const ids = Array.isArray(csvDiffResults[kind])
            ? csvDiffResults[kind]
            : [];
        if (ids.length === 0) {
            alert("この条件に該当する変更商品はありません。");
            return;
        }
        selectedSingleCardIds.clear();
        singleSelectionOrder = ids.map(Number);
        singleSelectionOrder.forEach(cardId =>
            selectedSingleCardIds.add(cardId)
        );
        document.getElementById("singleSearchInput").value = "";
        singlePickerPage = 1;
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    function getPriceUpRanking(mode = "amount") {
        const candidates = (csvDiffResults.priceUp || [])
            .map(cardId => getCardById(cardId))
            .filter(card => card && Number(card.priceDelta) > 0)
            .map(card => ({
                card,
                amount: Number(card.priceDelta) || 0,
                rate: Number(card.previousPrice) > 0
                    ? (Number(card.priceDelta) / Number(card.previousPrice)) * 100
                    : 0
            }));

        candidates.sort((a, b) => {
            const primary = mode === "rate"
                ? b.rate - a.rate
                : b.amount - a.amount;
            if (primary !== 0) return primary;
            const secondary = mode === "rate"
                ? b.amount - a.amount
                : b.rate - a.rate;
            if (secondary !== 0) return secondary;
            return a.card.originalIndex - b.card.originalIndex;
        });
        return candidates;
    }

    function selectPriceUpTop10(mode = "amount") {
        const ranking = getPriceUpRanking(mode).slice(0, 10);
        if (ranking.length === 0) {
            alert("値上がりした商品がありません。");
            return;
        }
        selectedSingleCardIds.clear();
        singleSelectionOrder = ranking.map(item => Number(item.card.id));
        singleSelectionOrder.forEach(cardId => selectedSingleCardIds.add(cardId));
        document.getElementById("singleSearchInput").value = "";
        singlePickerPage = 1;
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave(
            mode === "rate"
                ? "値上がり率TOPを選択しました"
                : "値上がり額TOPを選択しました"
        );
    }

    function parseCSV(text, sourceName = "") {
        const cleanText = String(text).replace(/^\uFEFF/, "");
        const rows = parseCSVRows(cleanText);
        globalCardData = [];
        selectedSingleCardIds.clear();
        singleSelectionOrder = [];
        csvAnomalyState = createEmptyCsvAnomalyState(sourceName);
        renderCsvAnomalyReports();
        imagePromiseCache.clear();
        imageLoadGeneration++;
        imageLoadingTask = null;
        cardEditorPage = 1;
        singlePickerPage = 1;
        cardEditHistory = [];
        updateUndoButtonState();
        csvImportReportState = createEmptyCsvImportReport(sourceName);
        updateImageStatus();
        renderSingleCardPicker();
        renderSingleAdPreviews();

        let headerIndex = -1;
        const headerColumns = [];
        const coreKeywords = [
            "カード名", "商品名", "強化買取金額", "買取金額",
            "掲載状況", "掲載グループ", "画像リンク", "画像URL",
            "状態A-", "商品ID", "商品コード"
        ].map(normalizeCsvHeaderName);

        for (let i = 0; i < Math.min(rows.length, 15); i++) {
            const parts = rows[i].map(part => String(part).trim());
            if (!parts.some(Boolean)) continue;
            const matchCount = parts.filter(part =>
                coreKeywords.some(keyword =>
                    normalizeCsvHeaderName(part).includes(keyword)
                )
            ).length;

            if (matchCount >= 2) {
                headerIndex = i;
                parts.forEach((columnName, index) => {
                    if (columnName) {
                        headerColumns.push({
                            name: columnName,
                            normalizedName: normalizeCsvHeaderName(columnName),
                            index
                        });
                    }
                });
                break;
            }
        }

        if (headerIndex === -1) {
            csvImportReportState.totalRows = rows.filter(row =>
                row.some(value => String(value || "").trim())
            ).length;
            csvImportReportState.excluded = csvImportReportState.totalRows;
            csvImportReportState.errorMessage =
                "カード名・買取金額などの有効なヘッダー項目を確認できませんでした。";
            updateCsvFileSelectionStatus("error", sourceName);
            renderCsvImportReport();
            renderNoData();
            alert("CSV内に有効なヘッダー項目（カード名・買取金額など）が見つかりませんでした。");
            return;
        }

        function getValueByKeywords(
            parts,
            keywords,
            columnFilter = () => true
        ) {
            for (const keyword of keywords) {
                const normalizedKeyword = normalizeCsvHeaderName(keyword);
                for (const column of headerColumns) {
                    if (
                        columnFilter(column.name) &&
                        column.normalizedName.includes(normalizedKeyword)
                    ) {
                        const index = column.index;
                        return index < parts.length ? String(parts[index]).trim() : "";
                    }
                }
            }
            return "";
        }

        function getValueByHeaderMatcher(parts, matcher) {
            for (const column of headerColumns) {
                if (!matcher(column.name)) continue;
                const index = column.index;
                return index < parts.length
                    ? String(parts[index]).trim()
                    : "";
            }
            return "";
        }

        for (let i = headerIndex + 1; i < rows.length; i++) {
            const parts = rows[i];
            if (!parts.some(value => String(value || "").trim())) continue;
            const rowNumber = i + 1;
            csvImportReportState.totalRows++;
            const status = getValueByKeywords(parts, ["掲載状況", "状況", "ステータス", "掲載"]);
            const group = getValueByKeywords(parts, ["掲載グループ", "グループ", "カテゴリ", "分類"]);
            const productId = getValueByKeywords(parts, [
                "商品ID", "商品コード", "管理番号", "管理ID", "JANコード", "JAN"
            ]);
            const name = getValueByKeywords(parts, ["カード名", "商品名", "タイトル", "品名"]);
            const type = getValueByKeywords(parts, ["種別", "型番", "グレード", "タイプ", "区分"]);
            const imgUrl = getValueByKeywords(parts, ["画像リンク", "画像URL", "画像", "Image"]);
            let price = getValueByKeywords(
                parts,
                ["強化買取金額", "買取金額", "買取価格", "金額", "価格"],
                columnName => !isStateAMinusHeader(columnName)
            );
            const aMinusPrice = normalizeAMinusPriceForDisplay(
                getValueByHeaderMatcher(parts, isStateAMinusHeader)
            );

            price = price.replace(/"/g, "").trim();

            if (status.includes("無効") || status.includes("非掲載")) {
                csvImportReportState.exclusions.notPublished++;
                csvImportReportState.excluded++;
                addCsvReportSample(
                    csvImportReportState,
                    rowNumber,
                    `${name || "カード名なし"}：掲載状況が「${status}」`
                );
                continue;
            }
            if (!group || group === "NaN") {
                csvImportReportState.exclusions.missingGroup++;
                csvImportReportState.excluded++;
                addCsvReportSample(
                    csvImportReportState,
                    rowNumber,
                    `${name || "カード名なし"}：掲載グループが空欄`
                );
                continue;
            }
            const compactPrice = price.normalize("NFKC").replace(/[,\s]/g, "");
            if (
                !compactPrice ||
                /^(?:-|−|―|ー|終了|0円?|[¥￥]0円?)$/.test(compactPrice)
            ) {
                csvImportReportState.exclusions.missingPrice++;
                csvImportReportState.excluded++;
                csvAnomalyState.zeroPrice.push({
                    cardId: null,
                    rowNumber,
                    message: `${name || "カード名なし"}：買取価格が「${price || "空欄"}」のため除外`
                });
                addCsvReportSample(
                    csvImportReportState,
                    rowNumber,
                    `${name || "カード名なし"}：買取価格が「${price || "空欄"}」`
                );
                continue;
            }

            if (!name) {
                csvImportReportState.warnings.missingName++;
                addCsvReportSample(
                    csvImportReportState,
                    rowNumber,
                    "カード名が空欄のまま採用"
                );
            }
            if (!imgUrl) {
                csvImportReportState.warnings.missingImage++;
            }
            const numericPrice = parsePriceNumber(price);
            const numericAMinusPrice = parsePriceNumber(aMinusPrice);
            if (
                numericPrice > 0 &&
                numericAMinusPrice > numericPrice
            ) {
                csvImportReportState.warnings.aMinusHigher++;
                addCsvReportSample(
                    csvImportReportState,
                    rowNumber,
                    `${name || "カード名なし"}：状態A-（${aMinusPrice}）が状態A（${price}）より高い`
                );
            }

            globalCardData.push({
                id: globalCardData.length,
                originalIndex: globalCardData.length,
                sourceRow: rowNumber,
                group,
                status,
                productId,
                name,
                type,
                price,
                aMinusPrice,
                imgUrl,
                hidden: false,
                resolvedImg: null,
                imageState: imgUrl ? "pending" : "missing"
            });
        }

        const duplicateMap = new Map();
        globalCardData.forEach(card => {
            if (!String(card.name || "").trim()) return;
            const key = officialCardKey(card);
            if (!duplicateMap.has(key)) duplicateMap.set(key, []);
            duplicateMap.get(key).push(card);
        });
        duplicateMap.forEach(cards => {
            if (cards.length < 2) return;
            csvImportReportState.warnings.duplicateRows += cards.length - 1;
            addCsvReportSample(
                csvImportReportState,
                cards[1].sourceRow,
                `${cards[0].name}：同じ掲載グループ・種別の商品が${cards.length}行あります`
            );
        });

        csvImportReportState.accepted = globalCardData.length;
        updateCsvFileSelectionStatus(
            "loaded",
            sourceName,
            globalCardData.length
        );
        renderCsvImportReport();

        computeOfficialPriceDifferences(globalCardData, {
            autoSelect: true
        });
        updateImageStatus();
        renderCardEditor();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        if (globalCardData.length > 0) {
            renderPages();
        } else {
            renderNoData();
        }
        scheduleWorkspaceAutosave();
    }

    function getCardById(cardId) {
        return globalCardData.find(card => card.id === Number(cardId));
    }

    function updatePaginationControls(prefix, currentPage, totalPages) {
        const container = document.getElementById(`${prefix}Pagination`);
        const previousButton = document.getElementById(`${prefix}PrevButton`);
        const nextButton = document.getElementById(`${prefix}NextButton`);
        const status = document.getElementById(`${prefix}PageStatus`);
        if (!container || !previousButton || !nextButton || !status) return;

        const normalizedTotal = Math.max(1, Number(totalPages) || 1);
        const normalizedCurrent = Math.min(
            normalizedTotal,
            Math.max(1, Number(currentPage) || 1)
        );
        container.hidden = normalizedTotal <= 1;
        previousButton.disabled = normalizedCurrent <= 1;
        nextButton.disabled = normalizedCurrent >= normalizedTotal;
        status.textContent =
            `${normalizedCurrent.toLocaleString("ja-JP")} / ` +
            `${normalizedTotal.toLocaleString("ja-JP")}ページ`;
    }

    function getFilteredCardEditorCards() {
        const query = String(
            document.getElementById("cardEditorSearchInput")?.value || ""
        ).trim().toLocaleLowerCase("ja");
        return [...globalCardData]
            .sort((a, b) => a.originalIndex - b.originalIndex)
            .filter(card => {
                if (!query) return true;
                return [
                    card.name,
                    card.group,
                    card.type,
                    card.price,
                    card.aMinusPrice,
                    card.productId
                ].some(value =>
                    String(value || "")
                        .toLocaleLowerCase("ja")
                        .includes(query)
                );
            });
    }

    function changeCardEditorPage(direction) {
        const cards = getFilteredCardEditorCards();
        const totalPages = Math.max(
            1,
            Math.ceil(cards.length / CARD_EDITOR_PAGE_SIZE)
        );
        cardEditorPage = Math.min(
            totalPages,
            Math.max(1, cardEditorPage + Number(direction || 0))
        );
        renderCardEditor();
        document.getElementById("cardEditorPanel")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function changeSinglePickerPage(direction) {
        const cards = getFilteredSingleCards();
        const totalPages = Math.max(
            1,
            Math.ceil(cards.length / SINGLE_PICKER_PAGE_SIZE)
        );
        singlePickerPage = Math.min(
            totalPages,
            Math.max(1, singlePickerPage + Number(direction || 0))
        );
        renderSingleCardPicker();
        document.getElementById("singlePickerPagination")?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    function updateUndoButtonState() {
        const button = document.getElementById("undoCardEditButton");
        if (!button) return;
        button.disabled = cardEditHistory.length === 0;
        button.title = cardEditHistory.length
            ? `${cardEditHistory.length}件前まで編集を戻せます`
            : "元に戻せる商品編集はありません";
    }

    function rememberCardEdit(label, cardIds) {
        const idSet = new Set(
            (Array.isArray(cardIds) ? cardIds : [cardIds])
                .map(Number)
                .filter(Number.isFinite)
        );
        const changedCards = globalCardData
            .filter(card => idSet.has(Number(card.id)))
            .map(serializeCardForDraft);
        if (changedCards.length === 0) return;
        cardEditHistory.push({
            label: String(label || "商品編集"),
            cards: changedCards
        });
        if (cardEditHistory.length > MAX_CARD_EDIT_HISTORY) {
            cardEditHistory.shift();
        }
        updateUndoButtonState();
    }

    function restoreCardEditSnapshot(snapshot) {
        const cardLookup = new Map(
            globalCardData.map(card => [Number(card.id), card])
        );
        (snapshot.cards || []).forEach(previousCard => {
            const card = cardLookup.get(Number(previousCard.id));
            if (!card) return;
            card.originalIndex = Number.isFinite(Number(previousCard.originalIndex))
                ? Number(previousCard.originalIndex)
                : card.originalIndex;
            card.group = String(previousCard.group || "");
            card.status = String(previousCard.status || "");
            card.name = String(previousCard.name || "");
            card.type = String(previousCard.type || "");
            card.price = String(previousCard.price || "");
            card.aMinusPrice = normalizeAMinusPriceForDisplay(
                previousCard.aMinusPrice
            );
            card.hidden = Boolean(previousCard.hidden);
        });
    }

    function undoLastCardEdit() {
        const snapshot = cardEditHistory.pop();
        if (!snapshot) return;
        restoreCardEditSnapshot(snapshot);
        updateUndoButtonState();
        computeOfficialPriceDifferences(globalCardData, {
            autoSelect: false
        });
        renderCardEditor();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        if (globalCardData.some(card => !card.hidden)) {
            renderPages();
        } else {
            renderNoData();
        }
        saveWorkingDraftNow(`${snapshot.label}を元に戻しました`);
    }

    function renderCardEditor() {
        const list = document.getElementById("cardEditorList");
        const count = document.getElementById("cardEditorCount");
        if (!list || !count) return;

        const visibleCount = globalCardData.filter(card => !card.hidden).length;

        if (globalCardData.length === 0) {
            count.textContent = "CSV未読込";
            list.innerHTML =
                '<div class="card-editor-empty">CSVを読み込むと商品を編集できます</div>';
            updatePaginationControls("cardEditor", 1, 1);
            return;
        }

        const filteredCards = getFilteredCardEditorCards();
        const totalPages = Math.max(
            1,
            Math.ceil(filteredCards.length / CARD_EDITOR_PAGE_SIZE)
        );
        cardEditorPage = Math.min(totalPages, Math.max(1, cardEditorPage));
        const pageStart = (cardEditorPage - 1) * CARD_EDITOR_PAGE_SIZE;
        const cards = filteredCards.slice(
            pageStart,
            pageStart + CARD_EDITOR_PAGE_SIZE
        );
        count.textContent =
            `表示 ${visibleCount} / 全${globalCardData.length}件` +
            (filteredCards.length !== globalCardData.length
                ? `｜検索結果 ${filteredCards.length}件`
                : "");
        updatePaginationControls(
            "cardEditor",
            cardEditorPage,
            totalPages
        );

        if (filteredCards.length === 0) {
            list.innerHTML =
                '<div class="card-editor-empty">検索条件に一致する商品がありません</div>';
            return;
        }

        list.innerHTML = cards.map(card => {
            const id = Number(card.id);
            const imageSource = card.resolvedImg || LOADING_IMAGE;
            const imageUrl = escapeHtml(card.imgUrl || "");
            const name = escapeHtml(card.name || "");
            const group = escapeHtml(card.group || "");
            const type = escapeHtml(card.type || "");
            const price = escapeHtml(card.price || "");
            const aMinusPrice = escapeHtml(card.aMinusPrice || "");
            const strengthened = String(card.status || "").includes("強化");
            return `
                <div class="card-editor-row${card.hidden ? " is-hidden" : ""}">
                    <img
                        class="card-editor-thumb dynamic-img"
                        src="${imageSource}"
                        data-url="${imageUrl}"
                        data-card-id="${id}"
                        alt=""
                        crossorigin="anonymous"
                    >
                    <input
                        class="editor-name"
                        type="text"
                        value="${name}"
                        aria-label="カード名"
                        onchange="updateCardField(${id}, 'name', this.value)"
                    >
                    <input
                        class="editor-group"
                        type="text"
                        value="${group}"
                        aria-label="掲載グループ"
                        onchange="updateCardField(${id}, 'group', this.value)"
                    >
                    <input
                        class="editor-type"
                        type="text"
                        value="${type}"
                        aria-label="種別"
                        onchange="updateCardField(${id}, 'type', this.value)"
                    >
                    <input
                        class="editor-price"
                        type="text"
                        value="${price}"
                        placeholder="状態A"
                        aria-label="状態A価格"
                        onchange="updateCardField(${id}, 'price', this.value)"
                    >
                    <input
                        class="editor-a-minus-price"
                        type="text"
                        value="${aMinusPrice}"
                        placeholder="状態A-"
                        aria-label="状態A-価格"
                        onchange="updateCardField(${id}, 'aMinusPrice', this.value)"
                    >
                    <label class="card-editor-check">
                        <input
                            type="checkbox"
                            ${strengthened ? "checked" : ""}
                            onchange="toggleCardStrengthened(${id}, this.checked)"
                        >
                        強化買取
                    </label>
                    <label class="card-editor-check">
                        <input
                            type="checkbox"
                            ${card.hidden ? "" : "checked"}
                            onchange="toggleCardVisibility(${id}, this.checked)"
                        >
                        表示
                    </label>
                    <div class="card-editor-order">
                        <button
                            type="button"
                            title="同じ掲載グループ内で上へ"
                            onclick="moveCardWithinGroup(${id}, -1)"
                        >↑</button>
                        <button
                            type="button"
                            title="同じ掲載グループ内で下へ"
                            onclick="moveCardWithinGroup(${id}, 1)"
                        >↓</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    function refreshOutputsAfterCardEdit(
        renderEditorToo = false,
        recomputeOfficialDiff = false
    ) {
        clearTimeout(cardEditRenderTimer);
        cardEditRenderTimer = null;
        if (recomputeOfficialDiff) {
            computeOfficialPriceDifferences(globalCardData, {
                autoSelect: false
            });
        } else {
            updateOfficialBaselinePanel();
        }
        if (renderEditorToo) renderCardEditor();
        if (globalCardData.some(card => !card.hidden)) {
            renderPages();
        } else {
            renderNoData();
        }
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    function updateCardField(cardId, field, value) {
        const card = getCardById(cardId);
        if (
            !card ||
            !["name", "group", "type", "price", "aMinusPrice"].includes(field)
        ) {
            return;
        }
        const nextValue = String(value || "").trim();
        if (String(card[field] || "") === nextValue) return;
        const fieldLabels = {
            name: "カード名の変更",
            group: "掲載グループの変更",
            type: "種別の変更",
            price: "状態A価格の変更",
            aMinusPrice: "状態A-価格の変更"
        };
        rememberCardEdit(
            fieldLabels[field] || "商品データの変更",
            card.id
        );
        card[field] = nextValue;
        refreshOutputsAfterCardEdit(false, true);
    }

    function toggleCardStrengthened(cardId, strengthened) {
        const card = getCardById(cardId);
        if (!card) return;
        const currentlyStrengthened = String(card.status || "").includes("強化");
        if (currentlyStrengthened === Boolean(strengthened)) return;
        rememberCardEdit("強化買取設定の変更", card.id);
        const withoutStrengthened = String(card.status || "")
            .replace(/強化買取/g, "")
            .replace(/強化/g, "")
            .trim();
        card.status = strengthened
            ? [withoutStrengthened, "強化"].filter(Boolean).join(" ")
            : withoutStrengthened;
        refreshOutputsAfterCardEdit(true, true);
    }

    function toggleCardVisibility(cardId, visible) {
        const card = getCardById(cardId);
        if (!card) return;
        if (card.hidden === !Boolean(visible)) return;
        rememberCardEdit("商品の表示設定変更", card.id);
        card.hidden = !visible;
        refreshOutputsAfterCardEdit(true);
    }

    function moveCardWithinGroup(cardId, direction) {
        const card = getCardById(cardId);
        if (!card) return;
        const groupCards = globalCardData
            .filter(item => item.group === card.group)
            .sort((a, b) => a.originalIndex - b.originalIndex);
        const index = groupCards.findIndex(item => item.id === card.id);
        const swapIndex = index + Number(direction);
        if (index < 0 || swapIndex < 0 || swapIndex >= groupCards.length) return;

        const other = groupCards[swapIndex];
        rememberCardEdit("商品の並び替え", [card.id, other.id]);
        const currentOrder = card.originalIndex;
        card.originalIndex = other.originalIndex;
        other.originalIndex = currentOrder;
        renderCardEditor();
        refreshOutputsAfterCardEdit(false);
    }

    function showAllCardsInBuylist() {
        const hiddenCardIds = globalCardData
            .filter(card => card.hidden)
            .map(card => card.id);
        if (hiddenCardIds.length === 0) return;
        rememberCardEdit("全商品の再表示", hiddenCardIds);
        globalCardData.forEach(card => {
            card.hidden = false;
        });
        renderCardEditor();
        refreshOutputsAfterCardEdit(false);
    }

    function renderNoData() {
        const layoutConfig = getSelectedLayoutConfig();
        const orientation = layoutConfig.orientation;
        const theme = getSelectedTheme();
        const titleStyle = getSelectedTitleStyle();
        const cardNameClass = getCardNameDisplay() === "hide" ? " hide-card-names" : "";
        document.getElementById("pagesContainer").innerHTML = `
            <div class="preview-page">
                <div
                    class="exportArea ${orientation}${cardNameClass}"
                    data-theme="${theme}"
                    data-title-style="${titleStyle}"
                >
                    <div class="empty-state">
                        <strong>NO VALID DATA</strong>
                        <span>有効なデータが見つかりませんでした</span>
                    </div>
                </div>
            </div>
        `;
        applyTitleCustomization(document.getElementById("pagesContainer"));
        requestAnimationFrame(fitPreviewPages);
    }

    function refreshSingleStatusFilterOptions() {
        const select = document.getElementById("singleStatusFilterSelect");
        if (!select) return;
        const currentValue = select.value || "all";
        const fixedStatuses = new Set(["強化", "超強化", "掲載"]);
        const statuses = Array.from(
            new Set(
                globalCardData
                    .map(card => String(card.status || "").trim())
                    .filter(status => status && !fixedStatuses.has(status))
            )
        ).sort((a,b) => a.localeCompare(b, "ja", {numeric:true, sensitivity:"base"}));
        const options = [
            ["all", "掲載状況：すべて"],
            ["strengthened", "強化"],
            ["super-strengthened", "超強化"],
            ["listed", "掲載"],
            ...statuses.map(status => [`status:${status}`, `掲載「${status}」だけ`])
        ];
        if (globalCardData.some(card => !String(card.status || "").trim())) options.push(["status:","掲載状況：空欄だけ"]);
        select.innerHTML = "";
        options.forEach(([value,label]) => { const option = document.createElement("option"); option.value = value; option.textContent = label; select.appendChild(option); });
        select.value = options.some(([value]) => value === currentValue) ? currentValue : "all";
    }

    function getFilteredSingleCards() {
        const query = String(document.getElementById("singleSearchInput")?.value || "").trim().toLocaleLowerCase("ja");
        const statusFilter = String(document.getElementById("singleStatusFilterSelect")?.value || "all");
        return globalCardData.filter(card => {
            const status = String(card.status || "").trim();
            const matchesStatus = statusFilter === "all" ? true : statusFilter === "strengthened" ? status === "強化" : statusFilter === "super-strengthened" ? status === "超強化" : statusFilter === "listed" ? status === "掲載" : statusFilter.startsWith("status:") ? status === statusFilter.slice(7) : true;
            if (!matchesStatus) return false;
            if (!query) return true;
            return [card.name, card.type, card.group, card.status, card.price, card.aMinusPrice, card.productId].some(value => String(value || "").toLocaleLowerCase("ja").includes(query));
        });
    }

    function renderSingleCardPicker() {
        const picker = document.getElementById("singleCardPicker");
        const count = document.getElementById("singleSelectionCount");
        if (!picker || !count) return;

        refreshSingleStatusFilterOptions();
        const filteredCards = getFilteredSingleCards();
        count.textContent =
            `${selectedSingleCardIds.size}件選択中` +
            (globalCardData.length ? `｜全${globalCardData.length}件` : "") +
            (filteredCards.length !== globalCardData.length
                ? `｜検索結果${filteredCards.length}件`
                : "");
        updateXPostSelectionPreview();

        if (globalCardData.length === 0) {
            picker.innerHTML =
                '<div class="single-empty-picker">CSVを読み込むと商品を選択できます</div>';
            updatePaginationControls("singlePicker", 1, 1);
            return;
        }

        if (filteredCards.length === 0) {
            picker.innerHTML =
                '<div class="single-empty-picker">検索条件に一致する商品がありません</div>';
            updatePaginationControls("singlePicker", 1, 1);
            return;
        }

        const totalPages = Math.max(
            1,
            Math.ceil(filteredCards.length / SINGLE_PICKER_PAGE_SIZE)
        );
        singlePickerPage = Math.min(totalPages, Math.max(1, singlePickerPage));
        const pageStart = (singlePickerPage - 1) * SINGLE_PICKER_PAGE_SIZE;
        const cards = filteredCards.slice(
            pageStart,
            pageStart + SINGLE_PICKER_PAGE_SIZE
        );
        updatePaginationControls(
            "singlePicker",
            singlePickerPage,
            totalPages
        );

        picker.innerHTML = cards.map(card => {
            const selected = selectedSingleCardIds.has(card.id);
            const imageSource = card.resolvedImg || LOADING_IMAGE;
            const name = escapeHtml(card.name || "カード名なし");
            const type = escapeHtml(card.type || "");
            const group = escapeHtml(card.group || "");
            const price = escapeHtml(card.price || "");
            const imageUrl = escapeHtml(card.imgUrl || "");
            const priceChangeBadge = renderPriceChangeBadge(card);

            return `
                <label
                    class="single-picker-item${selected ? " is-selected" : ""}"
                    data-visible-card-id="${card.id}"
                >
                    <input
                        type="checkbox"
                        ${selected ? "checked" : ""}
                        onchange="toggleSingleCardSelection(${card.id}, this.checked)"
                    >
                    <img
                        class="single-picker-thumb dynamic-img"
                        src="${imageSource}"
                        data-url="${imageUrl}"
                        data-card-id="${card.id}"
                        alt="${name}"
                        crossorigin="anonymous"
                    >
                        <span class="single-picker-copy">
                            <span class="single-picker-name">${name}</span>
                            <span class="single-picker-meta">${group}${type ? `｜${type}` : ""}</span>
                            <span class="single-picker-price-line">
                                <span class="single-picker-price">${price}</span>
                                ${priceChangeBadge}
                            </span>
                        </span>
                </label>
            `;
        }).join("");

        if (globalCardData.some(card => !card.resolvedImg && card.imgUrl)) {
            imageLoadPromise = queueMissingImagesLoad();
        }
    }

    function toggleSingleCardSelection(cardId, checked) {
        singleSelectionOrder = [];
        if (checked) {
            selectedSingleCardIds.add(Number(cardId));
        } else {
            selectedSingleCardIds.delete(Number(cardId));
        }
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    function selectVisibleSingleCards() {
        singleSelectionOrder = [];
        getFilteredSingleCards().forEach(card => selectedSingleCardIds.add(card.id));
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    function clearSingleSelection() {
        selectedSingleCardIds.clear();
        singleSelectionOrder = [];
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    function invertVisibleSingleCards() {
        singleSelectionOrder = [];
        getFilteredSingleCards().forEach(card => {
            if (selectedSingleCardIds.has(card.id)) {
                selectedSingleCardIds.delete(card.id);
            } else {
                selectedSingleCardIds.add(card.id);
            }
        });
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    function getSelectedSingleCards() {
        const orderMap = new Map(
            singleSelectionOrder.map((cardId, index) => [Number(cardId), index])
        );
        return globalCardData
            .filter(card => selectedSingleCardIds.has(card.id))
            .sort((a, b) => {
                const aRank = orderMap.has(Number(a.id))
                    ? orderMap.get(Number(a.id))
                    : Number.POSITIVE_INFINITY;
                const bRank = orderMap.has(Number(b.id))
                    ? orderMap.get(Number(b.id))
                    : Number.POSITIVE_INFINITY;
                if (aRank !== bRank) return aRank - bRank;
                return a.originalIndex - b.originalIndex;
            });
    }


    const X_POST_TEMPLATE_KIND_LABELS = {
        psa: "PSA用",
        box: "BOX用",
        sotai: "素体用",
        other: "その他・汎用"
    };

    function normalizeXPostTemplateKind(kind) {
        const normalized = String(kind || "").trim().toLowerCase();
        if (hasOwn(X_POST_TEMPLATE_KIND_LABELS, normalized)) {
            return normalized;
        }
        // 旧版テンプレート種別は汎用として残す
        if (["price_up", "new_items", "standard"].includes(normalized)) {
            return "other";
        }
        return "other";
    }

    function createDefaultXPostTemplates() {
        return {
            "PSA用｜伸ばしやすい標準": {
                kind: "psa",
                body: `🔥ポケモンカード PSA10 買取価格更新🔥

{更新日}｜PSA10 強化買取

{商品一覧}

PSA10のお持ち込みお待ちしております！
買取価格は相場・在庫状況により変動する場合がございます。

{ハッシュタグ}`
            },
            "BOX用｜伸ばしやすい標準": {
                kind: "box",
                body: `📦ポケモンカード BOX 買取価格更新📦

{更新日}｜未開封BOX 買取

{商品一覧}

BOXのお持ち込みお待ちしております！
買取価格は相場・在庫状況により変動する場合がございます。

{ハッシュタグ}`
            },
            "素体用｜伸ばしやすい標準": {
                kind: "sotai",
                body: `🔥ポケモンカード シングル買取価格更新🔥

{更新日}｜SAR・SR・ARなど強化買取

{商品一覧}

気になるカードがございましたら、ぜひお持ち込みください！
買取価格は相場・在庫状況により変動する場合がございます。

{ハッシュタグ}`
            }
        };
    }

    function getDefaultXPostTemplateName(kind) {
        const normalizedKind = normalizeXPostTemplateKind(kind);
        return Object.entries(createDefaultXPostTemplates())
            .find(([, template]) =>
                normalizeXPostTemplateKind(template.kind) === normalizedKind
            )?.[0] || "";
    }

    function isDefaultXPostTemplateName(name) {
        return hasOwn(createDefaultXPostTemplates(), name);
    }

    function getXPostTemplates() {
        let templates = {};
        try {
            templates = JSON.parse(
                getScopedItem(X_POST_TEMPLATE_STORAGE_KEY) || "{}"
            );
        } catch (error) {
            templates = {};
        }
        if (!templates || typeof templates !== "object") {
            templates = {};
        }

        // アップデート後も既存のユーザーテンプレートを残しつつ、
        // PSA / BOX / 素体の標準テンプレートを必ず追加する。
        const defaults = createDefaultXPostTemplates();
        let changed = false;
        Object.entries(defaults).forEach(([name, template]) => {
            if (!hasOwn(templates, name)) {
                templates[name] = template;
                changed = true;
            }
        });
        if (changed || !getScopedItem(X_POST_TEMPLATE_STORAGE_KEY)) {
            setScopedItem(
                X_POST_TEMPLATE_STORAGE_KEY,
                JSON.stringify(templates)
            );
        }
        return templates;
    }

    function captureXPostTemplateEditorState() {
        return {
            name: String(document.getElementById("xPostTemplateNameInput")?.value || "").trim(),
            kind: normalizeXPostTemplateKind(document.getElementById("xPostTemplateKindSelect")?.value),
            body: String(document.getElementById("xPostTemplateBody")?.value || "")
        };
    }

    function persistXPostTemplateEditorState() {
        setScopedItem(
            X_POST_TEMPLATE_EDITOR_STORAGE_KEY,
            JSON.stringify(captureXPostTemplateEditorState())
        );
        updateXPostTemplateStatus();
    }

    function applyXPostTemplateEditorState(template, templateName = "") {
        const nameInput = document.getElementById("xPostTemplateNameInput");
        const kindSelect = document.getElementById("xPostTemplateKindSelect");
        const bodyInput = document.getElementById("xPostTemplateBody");
        if (nameInput) nameInput.value = templateName || "";
        if (kindSelect) kindSelect.value = normalizeXPostTemplateKind(template?.kind);
        if (bodyInput) bodyInput.value = String(template?.body || "");
        persistXPostTemplateEditorState();
    }

    function restoreXPostTemplateEditorState() {
        let saved = null;
        try {
            saved = JSON.parse(getScopedItem(X_POST_TEMPLATE_EDITOR_STORAGE_KEY) || "null");
        } catch (error) {
            saved = null;
        }
        if (saved && (saved.body || saved.name || saved.kind)) {
            applyXPostTemplateEditorState(saved, saved.name || "");
            return;
        }
        const templates = getXPostTemplates();
        const targetKind = detectXPostTemplateKind();
        const preferredEntry = Object.entries(templates).find(([, template]) =>
            normalizeXPostTemplateKind(template.kind) === targetKind
        ) || Object.entries(templates)[0];
        if (preferredEntry) {
            const [preferredName, preferredTemplate] = preferredEntry;
            applyXPostTemplateEditorState(preferredTemplate, preferredName);
        }
    }

    function refreshXPostTemplateSelect(selectedName = "") {
        const select = document.getElementById("xPostTemplateSelect");
        if (!select) return;
        const templates = getXPostTemplates();
        const currentValue = selectedName || select.value || "";
        select.innerHTML = '<option value="">テンプレートを選択</option>';
        Object.entries(templates).forEach(([name, template]) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = `【${X_POST_TEMPLATE_KIND_LABELS[normalizeXPostTemplateKind(template.kind)]}】${name}`;
            select.appendChild(option);
        });
        if (currentValue && hasOwn(templates, currentValue)) {
            select.value = currentValue;
        }
        updateXPostTemplateStatus();
    }

    function saveXPostNamedTemplate() {
        const state = captureXPostTemplateEditorState();
        const name = state.name;
        if (!name) {
            alert("テンプレート名を入力してください。");
            document.getElementById("xPostTemplateNameInput")?.focus();
            return;
        }
        if (!state.body.trim()) {
            alert("テンプレート本文を入力してください。");
            document.getElementById("xPostTemplateBody")?.focus();
            return;
        }
        const templates = getXPostTemplates();
        templates[name] = { kind: state.kind, body: state.body, updatedAt: new Date().toISOString() };
        setScopedItem(X_POST_TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
        refreshXPostTemplateSelect(name);
        persistXPostTemplateEditorState();
        syncSingleXPostDraft(true);
        alert(`テンプレート「${name}」を保存しました。`);
    }

    function loadXPostNamedTemplate() {
        const name = document.getElementById("xPostTemplateSelect")?.value || "";
        if (!name) {
            alert("読み込むテンプレートを選択してください。");
            return;
        }
        const templates = getXPostTemplates();
        if (!hasOwn(templates, name)) {
            alert("選択したテンプレートが見つかりません。");
            refreshXPostTemplateSelect();
            return;
        }
        applyXPostTemplateEditorState(templates[name], name);
        refreshXPostTemplateSelect(name);
        syncSingleXPostDraft(true);
    }

    function deleteXPostNamedTemplate() {
        const select = document.getElementById("xPostTemplateSelect");
        const name = select?.value || String(document.getElementById("xPostTemplateNameInput")?.value || "").trim();
        if (!name) {
            alert("削除するテンプレートを選択してください。");
            return;
        }
        const templates = getXPostTemplates();
        if (!hasOwn(templates, name)) {
            alert("選択したテンプレートが見つかりません。");
            return;
        }
        if (isDefaultXPostTemplateName(name)) {
            alert(
                "標準テンプレートは削除できません。内容を変更して別名で保存できます。"
            );
            return;
        }
        if (!confirm(`テンプレート「${name}」を削除しますか？`)) return;
        delete templates[name];
        setScopedItem(X_POST_TEMPLATE_STORAGE_KEY, JSON.stringify(templates));
        setScopedItem(X_POST_TEMPLATE_EDITOR_STORAGE_KEY, "{}");
        refreshXPostTemplateSelect();
        applyRecommendedXPostTemplate();
        alert(`テンプレート「${name}」を削除しました。`);
    }

    function detectXPostTemplateKind() {
        const category = String(
            document.getElementById("officialBaselineCategorySelect")?.value || ""
        ).trim().toLowerCase();
        return hasOwn(X_POST_TEMPLATE_KIND_LABELS, category)
            ? category
            : "other";
    }

    function applyRecommendedXPostTemplate() {
        const kind = detectXPostTemplateKind();
        const templates = getXPostTemplates();
        const entries = Object.entries(templates);
        const defaultName = getDefaultXPostTemplateName(kind);
        const target = defaultName && hasOwn(templates, defaultName)
            ? [defaultName, templates[defaultName]]
            : entries.find(([, template]) =>
            normalizeXPostTemplateKind(template.kind) === kind
        ) || entries.find(([, template]) =>
            normalizeXPostTemplateKind(template.kind) === "other"
        ) || entries[0];
        if (!target) {
            alert("使えるテンプレートがありません。");
            return;
        }
        const [name, template] = target;
        applyXPostTemplateEditorState(template, name);
        refreshXPostTemplateSelect(name);
        syncSingleXPostDraft(true);
    }

    function syncDefaultXPostTemplateForCategory() {
        const currentName = String(
            document.getElementById("xPostTemplateNameInput")?.value || ""
        ).trim();
        if (currentName && !isDefaultXPostTemplateName(currentName)) {
            return false;
        }

        const kind = detectXPostTemplateKind();
        const defaultName = getDefaultXPostTemplateName(kind);
        const templates = getXPostTemplates();
        if (!defaultName || !hasOwn(templates, defaultName)) return false;
        if (currentName === defaultName) return false;

        applyXPostTemplateEditorState(templates[defaultName], defaultName);
        refreshXPostTemplateSelect(defaultName);
        syncSingleXPostDraft(true);
        return true;
    }

    function handleXPostTemplateEditorInput() {
        persistXPostTemplateEditorState();
        syncSingleXPostDraft(true);
    }

    function insertXPostToken(token) {
        const textarea = document.getElementById("xPostTemplateBody");
        if (!textarea) return;
        const start = textarea.selectionStart ?? textarea.value.length;
        const end = textarea.selectionEnd ?? start;
        textarea.setRangeText(token, start, end, "end");
        textarea.focus();
        handleXPostTemplateEditorInput();
    }

    function updateXPostTemplateStatus() {
        const currentName = document.getElementById("xPostTemplateNameInput")?.value?.trim() || "";
        const label = document.getElementById("xPostCurrentTemplateName");
        if (label) label.textContent = currentName || "未保存テンプレート";
    }

    function buildXPostTokenContext(cards = getSelectedSingleCards()) {
        const firstCard = cards[0] || {};
        const firstLabel = cards.length > 1 ? `${formatAnomalyCardLabel(firstCard)} ほか${cards.length - 1}商品` : formatAnomalyCardLabel(firstCard) || "";
        const firstCurrent = parsePriceNumber(firstCard.price);
        const firstPrevious = Number(firstCard.previousPrice) || 0;
        const rawDelta = Number(firstCard.priceDelta) || 0;
        const absDelta = Math.abs(rawDelta);
        const rate = firstPrevious > 0 && absDelta > 0 ? `${((absDelta / firstPrevious) * 100).toFixed(1)}%` : "";
        const dateValue = document.getElementById("dateInput")?.value || "";
        const categoryValue = document.getElementById("officialBaselineCategorySelect")?.value || "";
        const categoryLabel = OFFICIAL_BASELINE_CATEGORIES[categoryValue] || "";
        const kind = detectXPostTemplateKind();
        const headingMap = {
            psa: "🔥ポケモンカード PSA10 買取価格更新🔥",
            box: "📦ポケモンカード BOX 買取価格更新📦",
            sotai: "🔥ポケモンカード シングル買取価格更新🔥",
            other: "🔥ポケモンカード 買取価格更新🔥"
        };
        const hashtagMap = {
            psa: "#ポケカ #PSA10",
            box: "#ポケカ #ポケモンカード",
            sotai: "#ポケカ #ポケモンカード",
            other: "#ポケカ #ポケモンカード"
        };
        const heading = headingMap[kind] || headingMap.other;
        return {
            見出し: heading,
            商品一覧: cards.map(buildSingleXPostItemLine).join("\n"),
            商品名: firstLabel,
            グレード: String(firstCard.type || ""),
            現在価格: firstCurrent > 0 ? `${firstCurrent.toLocaleString("ja-JP")}円` : formatXPostPrice(firstCard.price),
            前回価格: firstPrevious > 0 ? `${firstPrevious.toLocaleString("ja-JP")}円` : "",
            差額: absDelta > 0 ? `${rawDelta > 0 ? "＋" : rawDelta < 0 ? "－" : ""}${absDelta.toLocaleString("ja-JP")}円` : "",
            差額率: rate,
            更新日: dateValue ? formatOfficialDateLabel(dateValue, true) : "",
            更新情報: dateValue ? `${formatOfficialDateLabel(dateValue, true)}更新` : "",
            カテゴリ: categoryLabel,
            商品数: String(cards.length),
            ハッシュタグ: hashtagMap[kind] || hashtagMap.other
        };
    }

    function renderXPostTemplate(templateBody, context) {
        return String(templateBody || "")
            .replace(/\{([^{}]+)\}/g, (match, tokenName) => {
                const key = String(tokenName || "").trim();
                return hasOwn(context, key) ? String(context[key] || "") : "";
            })
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    }

    function updateXPostSelectionPreview() {
        const count = document.getElementById("xPostSelectedCount");
        const kind = document.getElementById("xPostDetectedKind");
        const list = document.getElementById("xPostSelectedItemsPreview");
        const cards = getSelectedSingleCards();
        if (count) count.textContent = `${cards.length.toLocaleString("ja-JP")}件`;
        if (kind) kind.textContent = X_POST_TEMPLATE_KIND_LABELS[detectXPostTemplateKind()] || "その他・汎用";
        if (!list) return;
        if (!cards.length) {
            list.innerHTML = '<div class="x-post-selected-empty">単品告知画像で商品を選択してください。</div>';
            return;
        }
        list.innerHTML = cards.map(card => {
            const label = escapeHtml(formatAnomalyCardLabel(card));
            const priceLine = escapeHtml(buildSingleXPostItemLine(card).replace(/^・/, ""));
            return `<div class="x-post-selected-item"><strong>${label}</strong><span>${priceLine}</span></div>`;
        }).join("");
    }

    function formatXPostPrice(value) {
        const number = parsePriceNumber(value);
        return number > 0
            ? `${number.toLocaleString("ja-JP")}円`
            : String(value || "").trim();
    }

    function buildSingleXPostItemLine(card) {
        const label = formatAnomalyCardLabel(card);
        const current = parsePriceNumber(card.price);
        if (card.priceChangeType === "up" && Number(card.previousPrice) > 0) {
            const previous = Number(card.previousPrice);
            const delta = Math.max(0, current - previous);
            return `・${label} ${previous.toLocaleString("ja-JP")}円→` +
                `${current.toLocaleString("ja-JP")}円（＋${delta.toLocaleString("ja-JP")}円）`;
        }
        if (card.priceChangeType === "new") {
            return `・${label} ${formatXPostPrice(card.price)}【NEW】`;
        }
        return `・${label} ${formatXPostPrice(card.price)}`;
    }

    function buildSingleXPostText() {
        const cards = getSelectedSingleCards();
        if (cards.length === 0) return "";
        const templateBody = String(document.getElementById("xPostTemplateBody")?.value || "").trim();
        const context = buildXPostTokenContext(cards);
        if (templateBody) {
            return renderXPostTemplate(templateBody, context);
        }
        return renderXPostTemplate(
            `{見出し}

{商品一覧}

{更新情報}
{ハッシュタグ}`,
            context
        );
    }

    function updateSingleXPostCount() {
        const textarea = document.getElementById("singleXPostText");
        const status = document.getElementById("singleXPostStatus");
        const countLabel = document.getElementById("xPostCharacterCount");
        if (!textarea || !status) return;
        const length = textarea.value.length;
        const suffix = length > 280 ? "｜280文字超" : "";
        status.textContent = `${length.toLocaleString("ja-JP")}文字${suffix}`;
        if (countLabel) countLabel.textContent = `${length.toLocaleString("ja-JP")}文字`;
    }

    function getSingleXPostSignature() {
        const contextSignature = [
            document.getElementById("dateInput")?.value || "",
            document.getElementById("officialBaselineCategorySelect")?.value || "",
            document.getElementById("xPostTemplateKindSelect")?.value || "",
            document.getElementById("xPostTemplateNameInput")?.value || "",
            document.getElementById("xPostTemplateBody")?.value || ""
        ].join(":" );
        const cardSignature = getSelectedSingleCards().map(card => [
            card.id,
            card.name,
            card.type,
            card.price,
            card.previousPrice,
            card.priceDelta,
            card.priceChangeType
        ].join(":" )).join("|");
        return `${contextSignature}::${cardSignature}`;
    }

    function syncSingleXPostDraft(force = false) {
        const textarea = document.getElementById("singleXPostText");
        updateXPostSelectionPreview();
        updateXPostTemplateStatus();
        if (!textarea) return;
        const signature = getSingleXPostSignature();
        if (!force && textarea.dataset.selectionSignature === signature) {
            updateSingleXPostCount();
            return;
        }
        textarea.value = buildSingleXPostText();
        textarea.dataset.selectionSignature = signature;
        updateSingleXPostCount();
    }

    async function copySingleXPost() {
        const textarea = document.getElementById("singleXPostText");
        if (!textarea) return;
        if (!textarea.value.trim()) {
            syncSingleXPostDraft(true);
        }
        const textValue = textarea.value.trim();
        if (!textValue) {
            alert("X投稿文を作る商品を選択してください。");
            return;
        }
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(textValue);
            } else {
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
            }
            const status = document.getElementById("singleXPostStatus");
            if (status) status.textContent = `${textValue.length.toLocaleString("ja-JP")}文字｜コピーしました`;
        } catch (error) {
            console.error(error);
            textarea.focus();
            textarea.select();
            alert("自動コピーできなかったため、投稿文を選択しました。Ctrl/Cmd+Cでコピーしてください。");
        }
    }

    function normalizeSinglePriceDisplay(price) {
        const text = String(price || "").trim();
        if (!text) return "";
        if (/[¥￥円]/.test(text)) return text;
        const number = parsePriceNumber(text);
        return number > 0 ? `¥${number.toLocaleString("ja-JP")}` : text;
    }

    function renderSinglePriceMarkup(card, settings) {
        const priceText = normalizeSinglePriceDisplay(card.price);
        const aMinusPriceText = normalizeSinglePriceDisplay(
            normalizeAMinusPriceForDisplay(card.aMinusPrice)
        );
        const price = escapeHtml(priceText);
        const priceLabel = escapeHtml(settings.priceLabel);
        const priceChangeBadge = renderPriceChangeBadge(card);
        const priceLabelMarkup = `
            <div class="single-ad-price-label${priceChangeBadge ? " has-price-change" : ""}">
                <span>${priceLabel}</span>
                ${priceChangeBadge}
            </div>
        `;

        if (!aMinusPriceText) {
            return `
                ${priceLabelMarkup}
                <div class="single-ad-price">
                    <span class="single-ad-price-value">${price}</span>
                </div>
            `;
        }

        const primaryLabelText = normalizeEditablePriceLabel(
            settings.primaryPriceLabel,
            DEFAULT_SINGLE_PRIMARY_PRICE_LABEL
        );
        const secondaryLabelText = normalizeEditablePriceLabel(
            settings.secondaryPriceLabel,
            DEFAULT_SINGLE_SECONDARY_PRICE_LABEL
        );
        const primaryLabel = escapeHtml(primaryLabelText);
        const secondaryLabel = escapeHtml(secondaryLabelText);
        const aMinusPrice = escapeHtml(aMinusPriceText);
        const ariaLabel = escapeHtml(
            `${primaryLabelText || "通常価格"} ${priceText}、` +
            `${secondaryLabelText || "状態A-価格"} ${aMinusPriceText}`
        );

        return `
            ${priceLabelMarkup}
            <div
                class="single-ad-price is-dual"
                aria-label="${ariaLabel}"
            >
                <div class="single-ad-price-row single-ad-price-row-primary">
                    <span
                        class="single-ad-state-label"
                        title="${primaryLabel}"
                    >${primaryLabel}</span>
                    <span class="single-ad-price-value">${price}</span>
                </div>
                <div class="single-ad-price-row single-ad-price-row-minus">
                    <span
                        class="single-ad-state-label"
                        title="${secondaryLabel}"
                    >${secondaryLabel}</span>
                    <span class="single-ad-price-value">${aMinusPrice}</span>
                </div>
            </div>
        `;
    }

    function normalizeBuylistPriceDisplay(price) {
        const text = String(price || "").trim().normalize("NFKC");
        if (!text) return "";
        const numericText = text.replace(/[¥￥円,\s]/g, "");
        if (!/^\d+(?:\.\d+)?$/.test(numericText)) return text;
        const number = Number(numericText);
        return Number.isFinite(number) && number > 0
            ? `¥${number.toLocaleString("ja-JP")}`
            : text;
    }

    function updateWorkflowSummary() {
        const visible = globalCardData.filter(card => !card.hidden).length;
        const layout = getSelectedLayoutConfig();
        const pages = globalCardData.length ? buildPages(layout.maxPerPage).length : 0;
        const imageIssues = globalCardData.filter(card =>
            card.imageState === "error" || card.imageState === "missing"
        ).length;
        const selected = getSelectedSingleCards().length;
        const perImage = Math.min(
            MAX_SINGLE_ITEMS_PER_IMAGE,
            Math.max(1, Number(document.getElementById("singleItemsPerImageSelect")?.value) || 1)
        );
        const values = {
            buylistLoadedCount: `${globalCardData.length}件`,
            buylistVisibleCount: `${visible}件`,
            buylistPageCount: `${pages}枚`,
            buylistImageIssueCount: `${imageIssues}件`,
            singleLoadedCount: `${globalCardData.length}件`,
            singleSelectedSummary: `${selected}件`,
            singlePerPageSummary: `${perImage}商品`,
            singleOutputCount: `${selected ? Math.ceil(selected / perImage) : 0}枚`
        };
        Object.entries(values).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    function singleProductMarkup(card, settings) {
        const name = escapeHtml(card.name || "カード名なし");
        const grade = escapeHtml(card.type || "");
        const gradeHtml =
            settings.gradeDisplay === "show" && grade
                ? `<div class="single-ad-grade">${grade}</div>`
                : "";
        const imageSource = card.resolvedImg || LOADING_IMAGE;
        const imageUrl = escapeHtml(card.imgUrl || "");
        return `
            <div class="single-ad-product-card">
                <div class="single-ad-image-stage">
                    <img
                        class="single-ad-product-image dynamic-img"
                        src="${imageSource}"
                        data-url="${imageUrl}"
                        data-card-id="${card.id}"
                        alt="${name}"
                        crossorigin="anonymous"
                    >
                </div>
                <div class="single-ad-info">
                    <div class="single-ad-card-name">${name}</div>
                    ${gradeHtml}
                    ${renderSinglePriceMarkup(card, settings)}
                </div>
            </div>
        `;
    }

    function getBalancedSingleRowCounts(count, rows, columns) {
        const safeRows = Math.max(1, Number(rows) || 1);
        const safeColumns = Math.max(1, Number(columns) || 1);
        const safeCount = Math.max(1, Number(count) || 1);
        const base = Math.floor(safeCount / safeRows);
        const remainder = safeCount - (base * safeRows);
        const counts = Array(safeRows).fill(base);

        const balancedPriority = {
            1: {0: []},
            2: {0: [], 1: [0]},
            3: {0: [], 1: [1], 2: [0, 2]},
            4: {0: [], 1: [1], 2: [1, 2], 3: [0, 1, 3]},
            5: {0: [], 1: [2], 2: [1, 3], 3: [1, 2, 3], 4: [0, 1, 3, 4]}
        };
        const fallback = Array.from({length: safeRows}, (_, index) => index);
        const priority = balancedPriority[safeRows]?.[remainder] || fallback;
        priority.slice(0, remainder).forEach(index => {
            counts[index] += 1;
        });

        return counts
            .map(value => Math.min(safeColumns, value))
            .filter(value => value > 0);
    }

    function getSingleMultiLayout(size, count) {
        const safeCount = Math.min(
            MAX_SINGLE_ITEMS_PER_IMAGE,
            Math.max(2, Number(count) || 2)
        );
        const normalizedSize = SINGLE_SIZES.includes(size) ? size : "square";

        const layoutMap = {
            portrait: {
                2:[2,1], 3:[3,1], 4:[2,2], 5:[3,2], 6:[3,2],
                7:[4,2], 8:[4,2], 9:[3,3], 10:[4,3], 11:[4,3], 12:[4,3],
                13:[5,3], 14:[5,3], 15:[5,3], 16:[4,4],
                17:[5,4], 18:[5,4], 19:[5,4], 20:[5,4],
                21:[6,4], 22:[6,4], 23:[6,4], 24:[6,4], 25:[5,5],
                26:[6,5], 27:[6,5], 28:[6,5], 29:[6,5], 30:[6,5]
            },
            square: {
                2:[2,1], 3:[3,1], 4:[2,2], 5:[3,2], 6:[3,2],
                7:[4,2], 8:[4,2], 9:[5,2], 10:[5,2],
                11:[4,3], 12:[4,3], 13:[5,3], 14:[5,3], 15:[5,3],
                16:[6,3], 17:[6,3], 18:[6,3], 19:[7,3], 20:[7,3], 21:[7,3],
                22:[6,4], 23:[6,4], 24:[6,4],
                25:[7,4], 26:[7,4], 27:[7,4], 28:[7,4], 29:[8,4], 30:[8,4]
            },
            landscape: {
                2:[2,1], 3:[3,1], 4:[4,1], 5:[5,1],
                6:[3,2], 7:[4,2], 8:[4,2], 9:[5,2], 10:[5,2],
                11:[6,2], 12:[6,2], 13:[7,2], 14:[7,2], 15:[8,2], 16:[8,2],
                17:[6,3], 18:[6,3], 19:[7,3], 20:[7,3], 21:[7,3],
                22:[8,3], 23:[8,3], 24:[8,3],
                25:[9,3], 26:[9,3], 27:[9,3], 28:[10,3], 29:[10,3], 30:[10,3]
            }
        };

        const [columns, rows] = layoutMap[normalizedSize][safeCount];
        const density = safeCount >= 21
            ? "micro"
            : safeCount >= 13
                ? "ultra"
                : safeCount >= 9
                    ? "dense"
                    : safeCount >= 7 || (normalizedSize === "landscape" && safeCount >= 4)
                        ? "compact"
                        : "comfortable";
        const gap = density === "micro"
            ? (columns >= 9 ? 8 : 10)
            : density === "ultra"
                ? (columns >= 7 ? 9 : 11)
                : density === "dense"
                    ? 12
                    : density === "compact"
                        ? 14
                        : 18;
        const rowGap = density === "micro" ? 7 : density === "ultra" ? 9 : gap;
        const totalColumnGap = Math.max(0, columns - 1) * gap;
        const rowCounts = getBalancedSingleRowCounts(safeCount, rows, columns);

        return {
            columns,
            rows,
            rowCounts,
            density,
            gap,
            rowGap,
            cardWidth: `calc((100% - ${totalColumnGap}px) / ${columns})`
        };
    }

    function renderSingleProductRows(cards, settings, layout) {
        const rows = [];
        const rowCounts = Array.isArray(layout.rowCounts) && layout.rowCounts.length
            ? layout.rowCounts
            : [layout.columns];
        let offset = 0;
        rowCounts.forEach(rowCount => {
            if (offset >= cards.length) return;
            rows.push(cards.slice(offset, offset + rowCount));
            offset += rowCount;
        });
        if (offset < cards.length) {
            rows.push(cards.slice(offset));
        }

        return rows.map((row, rowIndex) => `
            <div
                class="single-ad-products-row"
                data-row="${rowIndex + 1}"
                data-items="${row.length}"
            >
                ${row.map(item => singleProductMarkup(item, settings)).join("")}
            </div>
        `).join("");
    }

    function getSingleHeadlineSize(settings, isMulti, density) {
        let baseSize = settings.design === "mono" ? 64 : 57;
        if (isMulti) {
            baseSize = density === "micro" ? 38 : density === "ultra" ? 36 : density === "dense" ? 34 : density === "compact" ? 38 : 42;
            const isDenseLayout = ["dense", "ultra", "micro"].includes(density);
            if (isDenseLayout && settings.size === "square") baseSize *= 1.06;
            if (isDenseLayout && settings.size === "landscape") baseSize *= 1.12;
        }
        const scale = clampTitleNumber(settings.headlineScale, 60, 160, DEFAULT_SINGLE_HEADLINE_SCALE);
        return Math.round(baseSize * scale) / 100;
    }

    function getSingleProductNameSize(settings, isMulti, density, size) {
        let baseSize = size === "portrait" ? 34 : 39;
        if (isMulti) {
            baseSize = density === "micro" ? 10 : density === "ultra" ? 13 : density === "dense" ? 16 : density === "compact" ? 18 : 21;
            if (size === "square" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.03;
            if (size === "landscape" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.05;
        }
        const scale = clampTitleNumber(settings.nameScale, 60, 160, DEFAULT_SINGLE_NAME_SCALE);
        return Math.round(baseSize * scale) / 100;
    }

    function getSinglePriceSize(settings, isMulti, density, size) {
        let baseSize = size === "portrait" ? 61 : settings.design === "redimpact" ? 78 : 72;
        if (isMulti) {
            baseSize = density === "micro" ? 19 : density === "ultra" ? 22 : density === "dense" ? 24 : density === "compact" ? 27 : 31;
            if (size === "square" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.04;
            if (size === "landscape" && ["dense", "ultra", "micro"].includes(density)) baseSize *= 1.08;
        }
        const scale = clampTitleNumber(settings.priceScale, 60, 160, DEFAULT_SINGLE_PRICE_SCALE);
        const hiddenNameBoost = settings.nameDisplay === "hide" ? (isMulti ? (density === "micro" ? 1.16 : density === "ultra" ? 1.18 : density === "dense" ? 1.22 : density === "compact" ? 1.28 : 1.34) : 1.4) : 1;
        return Math.round(baseSize * scale * hiddenNameBoost) / 100;
    }

    function getSingleAdAreas(root = document) {
        if (!root) return [];
        if (root instanceof Element && root.matches(".single-ad")) {
            return [root];
        }
        return Array.from(root.querySelectorAll(".single-ad"));
    }

    function applySingleHeadlineSizes(
        root = document,
        settings = collectSingleSettings()
    ) {
        getSingleAdAreas(root).forEach(area => {
            const areaSettings = {
                ...settings,
                design: normalizeSingleDesign(
                    area.dataset.design || settings.design
                )
            };
            const isMulti = area.classList.contains("is-multi");
            const areaSize = SINGLE_SIZES.find(size =>
                area.classList.contains(`single-${size}`)
            ) || areaSettings.size;
            const headlineSize = getSingleHeadlineSize(
                areaSettings,
                isMulti,
                area.dataset.density
            );
            const nameSize = getSingleProductNameSize(
                areaSettings,
                isMulti,
                area.dataset.density,
                areaSize
            );
            const priceSize = getSinglePriceSize(
                areaSettings,
                isMulti,
                area.dataset.density,
                areaSize
            );
            const headline = area.querySelector(".single-ad-heading h2");

            area.style.setProperty(
                "--single-headline-size",
                `${headlineSize}px`
            );
            area.style.setProperty("--single-name-size", `${nameSize}px`);
            area.style.setProperty("--single-price-size", `${priceSize}px`);
            area.dataset.headlineScale = String(areaSettings.headlineScale);
            area.dataset.headlineSize = String(headlineSize);
            area.dataset.nameScale = String(areaSettings.nameScale);
            area.dataset.nameSize = String(nameSize);
            area.dataset.priceScale = String(areaSettings.priceScale);
            area.dataset.priceSize = String(priceSize);
            area.dataset.priceColorMode =
                areaSettings.priceColorMode === "custom"
                    ? "custom"
                    : "theme";
            area.dataset.priceColor = normalizeHexColor(
                areaSettings.priceColor,
                DEFAULT_SINGLE_PRICE_COLOR
            );
            if (headline) {
                headline.style.setProperty(
                    "font-size",
                    `${headlineSize}px`,
                    "important"
                );
            }
            area.querySelectorAll(".single-ad-card-name").forEach(name => {
                name.style.setProperty(
                    "font-size",
                    `${nameSize}px`,
                    "important"
                );
            });
            area.querySelectorAll(".single-ad-price").forEach(price => {
                price.style.setProperty(
                    "font-size",
                    `${priceSize}px`,
                    "important"
                );
                if (area.dataset.priceColorMode === "custom") {
                    price.style.setProperty(
                        "color",
                        area.dataset.priceColor,
                        "important"
                    );
                } else {
                    price.style.removeProperty("color");
                }
            });
        });
    
        scheduleSingleOneItemOverflowFit(root);
    }

    function renderSingleAdPreviews() {
        const container = document.getElementById("singlePreviewContainer");
        if (!container) return;

        const cards = getSelectedSingleCards();
        updateWorkflowSummary();
        syncSingleXPostDraft(false);
        if (cards.length === 0) {
            container.innerHTML = `
                <div class="single-preview-empty">
                    <strong>商品を選択してください</strong>
                    <span>選択した商品のプレビューが表示されます</span>
                </div>
            `;
            return;
        }

        const settings = collectSingleSettings();
        const dateText = formatDate(document.getElementById("dateInput").value);
        const groups = [];
        for (let i = 0; i < cards.length; i += settings.itemsPerImage) {
            groups.push(cards.slice(i, i + settings.itemsPerImage));
        }

        container.innerHTML = groups.map((group, index) => {
            const card = group[0];
            const isMulti = group.length > 1;
            const name = escapeHtml(card.name || "カード名なし");
            const grade = escapeHtml(card.type || "");
            const gradeHtml = settings.gradeDisplay === "show" && grade
                ? `<div class="single-ad-grade">${grade}</div>` : "";
            const imageSource = card.resolvedImg || LOADING_IMAGE;
            const imageUrl = escapeHtml(card.imgUrl || "");
            const groupHasAMinus = group.some(item =>
                Boolean(normalizeAMinusPriceForDisplay(item.aMinusPrice))
            );
            const multiLayout = isMulti
                ? getSingleMultiLayout(settings.size, group.length)
                : null;
            const headlineSize = getSingleHeadlineSize(
                settings,
                isMulti,
                multiLayout?.density
            );
            const nameSize = getSingleProductNameSize(
                settings,
                isMulti,
                multiLayout?.density,
                settings.size
            );
            const priceSize = getSinglePriceSize(
                settings,
                isMulti,
                multiLayout?.density,
                settings.size
            );
            const productBody = isMulti
                ? `<div
                        class="single-ad-products"
                        style="
                            --multi-gap:${multiLayout.gap}px;
                            --multi-row-gap:${multiLayout.rowGap}px;
                            --multi-rows:${multiLayout.rows};
                            --multi-card-width:${multiLayout.cardWidth};
                        "
                    >
                    ${renderSingleProductRows(group, settings, multiLayout)}
                   </div>`
                : `<div class="single-ad-product">
                    <div class="single-ad-image-stage">
                        <img class="single-ad-product-image dynamic-img"
                            src="${imageSource}" data-url="${imageUrl}"
                            data-card-id="${card.id}" alt="${name}" crossorigin="anonymous">
                    </div>
                    <div class="single-ad-info">
                        <div class="single-ad-card-name">${name}</div>
                        ${gradeHtml}
                        ${renderSinglePriceMarkup(card, settings)}
                    </div>
                   </div>`;

            return `
                <div class="single-preview-shell">
                    <article
                        class="single-ad single-${settings.size}${
                            isMulti ? " is-multi" : ""
                        }${settings.nameDisplay === "hide"
                            ? " hide-card-name"
                            : ""
                        }${groupHasAMinus ? " has-dual-price" : ""}"
                        data-design="${settings.design}"
                        data-logo-align="${settings.logoAlign}"
                        data-name-display="${settings.nameDisplay}"
                        data-single-card-id="${group.map(item => item.id).join(",")}"
                        data-count="${group.length}"
                        data-columns="${multiLayout?.columns || 1}"
                        data-rows="${multiLayout?.rows || 1}"
                        data-density="${multiLayout?.density || "single"}"
                        data-headline-scale="${settings.headlineScale}"
                        data-headline-size="${headlineSize}"
                        data-name-scale="${settings.nameScale}"
                        data-name-size="${nameSize}"
                        data-price-scale="${settings.priceScale}"
                        data-price-size="${priceSize}"
                        data-price-color-mode="${settings.priceColorMode}"
                        data-price-color="${settings.priceColor}"
                        style="
                            --single-headline-size:${headlineSize}px;
                            --single-name-size:${nameSize}px;
                            --single-price-size:${priceSize}px;
                        "
                        id="singleAd_${index + 1}"
                    >
                        <header class="single-ad-header">
                            <div class="single-ad-logo-box">
                                <img class="single-ad-logo" src="${escapeHtml(logoDataUrl)}" alt="ショップロゴ">
                            </div>
                            <div class="single-ad-date">${escapeHtml(dateText)} UPDATED</div>
                        </header>

                        <div class="single-ad-heading">
                            <h2>${escapeHtml(settings.headline)}</h2>
                        </div>

                        ${productBody}
                    </article>
                </div>
            `;
        }).join("");

        applySingleHeadlineSizes(container, settings);
        requestAnimationFrame(() => {
            adjustSingleAdPriceSizes();
            fitSinglePreviews();
            updateSingleAdLayoutStatus(container);
            imageLoadPromise = queueMissingImagesLoad().finally(() => {
                requestAnimationFrame(() => {
                    adjustSingleAdPriceSizes(container);
                    updateSingleAdLayoutStatus(container);
                });
            });
        });
    }

    function getSingleAdLayoutIssues(area) {
        if (!area?.classList?.contains("single-ad")) return [];
        if (!area.classList.contains("is-multi")) return [];
        const tolerance = 3;
        const issues = [];
        const outside = (parent, child) => {
            if (!parent || !child) return false;
            const parentRect = parent.getBoundingClientRect();
            const childRect = child.getBoundingClientRect();
            return (
                childRect.left < parentRect.left - tolerance ||
                childRect.top < parentRect.top - tolerance ||
                childRect.right > parentRect.right + tolerance ||
                childRect.bottom > parentRect.bottom + tolerance
            );
        };
        const products = area.querySelector(".single-ad-products");
        const majorRegions = [
            ["ヘッダー", area.querySelector(".single-ad-header")],
            ["見出し", area.querySelector(".single-ad-heading")],
            ["商品一覧", products]
        ].filter(([, element]) => element);
        majorRegions.forEach(([name, element]) => {
            if (outside(area, element)) issues.push(`${name}が画像外`);
        });
        area.querySelectorAll(".single-ad-products-row").forEach((row, index) => {
            if (outside(area, row)) issues.push(`商品行${index + 1}が画像外`);
            row.querySelectorAll(".single-ad-product-card").forEach((card, cardIndex) => {
                if (outside(row, card)) {
                    issues.push(`商品${index + 1}-${cardIndex + 1}が範囲外`);
                }
                const imageStage = card.querySelector(".single-ad-image-stage");
                const info = card.querySelector(".single-ad-info");
                if (outside(card, imageStage) || outside(card, info)) {
                    issues.push(`商品${index + 1}-${cardIndex + 1}の内容が範囲外`);
                }
            });
        });

        for (let index = 0; index < majorRegions.length - 1; index += 1) {
            const [currentName, current] = majorRegions[index];
            const [nextName, next] = majorRegions[index + 1];
            const currentRect = current.getBoundingClientRect();
            const nextRect = next.getBoundingClientRect();
            if (currentRect.bottom > nextRect.top + tolerance) {
                issues.push(`${currentName}と${nextName}の重なり`);
            }
        }

        const logo = area.querySelector(".single-ad-logo-box");
        const date = area.querySelector(".single-ad-date");
        if (logo && date) {
            const logoRect = logo.getBoundingClientRect();
            const dateRect = date.getBoundingClientRect();
            const overlaps = !(
                logoRect.right <= dateRect.left + tolerance ||
                dateRect.right <= logoRect.left + tolerance ||
                logoRect.bottom <= dateRect.top + tolerance ||
                dateRect.bottom <= logoRect.top + tolerance
            );
            if (overlaps) issues.push("ロゴと日付の重なり");
        }
        return [...new Set(issues)];
    }

    function updateSingleAdLayoutStatus(root = document) {
        getSingleAdAreas(root).forEach(area => {
            const issues = getSingleAdLayoutIssues(area);
            area.dataset.layoutStatus = issues.length ? "error" : "ok";
            area.dataset.layoutIssues = issues.join(",");
        });
    }

    function adjustSingleAdPriceSizes(root = document) {
        root.querySelectorAll(".single-ad-price").forEach(container => {
            const values = Array.from(
                container.querySelectorAll(".single-ad-price-value")
            );
            values.forEach(value => {
                value.style.transform = "none";
            });

            if (container.classList.contains("is-dual")) {
                const rows = Array.from(
                    container.querySelectorAll(".single-ad-price-row")
                );
                const scales = rows.map(row => {
                    const value = row.querySelector(
                        ".single-ad-price-value"
                    );
                    if (!value) return 1;

                    const label = row.querySelector(
                        ".single-ad-state-label"
                    );
                    const availableWidth = Math.max(
                        0,
                        row.clientWidth -
                        (label?.offsetWidth || 0) -
                        12
                    );
                    const availableHeight = Math.max(
                        0,
                        row.clientHeight - 2
                    );
                    const textWidth = value.scrollWidth;
                    const textHeight = value.scrollHeight;
                    if (
                        !availableWidth ||
                        !availableHeight ||
                        !textWidth ||
                        !textHeight
                    ) {
                        return 1;
                    }

                    return Math.min(
                        1,
                        availableWidth / textWidth,
                        availableHeight / textHeight
                    );
                });
                const commonScale = Math.min(1, ...scales);
                if (commonScale < 1) {
                    values.forEach(value => {
                        value.style.transform = `scale(${commonScale})`;
                    });
                }
                return;
            }

            const text = values[0];
            if (!text) return;
            const availableWidth = Math.max(0, container.clientWidth - 36);
            const textWidth = text.scrollWidth;
            if (!availableWidth || !textWidth || textWidth <= availableWidth) return;
            text.style.transformOrigin = "center";
            text.style.transform = `scale(${availableWidth / textWidth})`;
        });
    }

    function fitSinglePreviews() {
        const container = document.getElementById("singlePreviewContainer");
        if (!container || container.classList.contains("view-hidden")) return;

        const style = getComputedStyle(container);
        const availableWidth = Math.max(
            280,
            container.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight) -
            4
        );

        container.querySelectorAll(".single-preview-shell").forEach(shell => {
            const ad = shell.querySelector(".single-ad");
            if (!ad) return;
            const width = ad.offsetWidth;
            const height = ad.offsetHeight;
            if (!width || !height) return;
            const scale = Math.min(1, availableWidth / width);
            ad.style.transform = `scale(${scale})`;
            shell.style.width = `${Math.floor(width * scale)}px`;
            shell.style.height = `${Math.floor(height * scale)}px`;
        });
    }

    function readFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function loadImageElement(source) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = source;
        });
    }

    async function optimizeLogoFile(file) {
        if (!file || !String(file.type || "").startsWith("image/")) {
            throw new Error("画像ファイルを選択してください。");
        }

        const source = await readFileAsDataUrl(file);
        if (
            file.type === "image/svg+xml" &&
            file.size <= 700 * 1024
        ) {
            return source;
        }

        const image = await loadImageElement(source);
        const maxWidth = 1200;
        const maxHeight = 420;
        const scale = Math.min(
            1,
            maxWidth / Math.max(1, image.naturalWidth),
            maxHeight / Math.max(1, image.naturalHeight)
        );
        const width = Math.max(1, Math.round(image.naturalWidth * scale));
        const height = Math.max(1, Math.round(image.naturalHeight * scale));

        if (
            scale === 1 &&
            file.size <= 650 * 1024
        ) {
            return source;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { alpha: true });
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        const webp = canvas.toDataURL("image/webp", 0.9);
        canvas.width = 1;
        canvas.height = 1;
        return webp;
    }

    async function handleLogoUpload(file) {
        if (!file) return;
        try {
            setSaveState("dirty", "ロゴを最適化中");
            logoDataUrl = await optimizeLogoFile(file);
            setScopedItem("kaitori_logo", logoDataUrl);
            updateAllPages();
            renderSingleAdPreviews();
            scheduleWorkspaceAutosave();
        } catch (error) {
            console.error(error);
            alert(`ロゴを読み込めませんでした。\n${error.message || error}`);
        }
    }

    async function fetchWithTimeout(
        url,
        options = {},
        timeout = IMAGE_FETCH_TIMEOUT
    ) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(
            () => controller.abort(),
            Math.max(1000, Number(timeout) || IMAGE_FETCH_TIMEOUT)
        );
        try {
            return await fetch(url, {
                ...options,
                signal: controller.signal
            });
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function isUsableImageBlob(blob) {
        return Boolean(
            blob &&
            blob.size > 0 &&
            blob.size <= MAX_IMAGE_BLOB_SIZE &&
            String(blob.type || "").toLowerCase().includes("image")
        );
    }

    const IMAGE_PROXY_API_URL = String(
        document.querySelector(
            'meta[name="kaitori-image-proxy-api-url"]'
        )?.content || ""
    ).trim();

    // Apps Script（action=image）経由で画像を取得する。
    // 未デプロイ・旧バージョンでdataUrlが返らない場合は空文字を返し、次の手段へ進む。
    function fetchImageViaAppsScript(targetUrl) {
        if (!IMAGE_PROXY_API_URL) return Promise.resolve("");
        return new Promise(resolve => {
            const callbackName =
                `__kaitoriImageProxy_${Date.now()}_` +
                Math.random().toString(36).slice(2, 9);
            const script = document.createElement("script");
            let settled = false;
            const finish = value => {
                if (settled) return;
                settled = true;
                window.clearTimeout(timeoutId);
                // 遅れて届いた応答でエラーにならないよう、コールバックは空関数にしておく。
                window[callbackName] = () => {};
                script.remove();
                resolve(value);
            };
            const timeoutId = window.setTimeout(
                () => finish(""),
                IMAGE_FETCH_TIMEOUT * 2
            );
            window[callbackName] = payload => {
                finish(
                    payload?.ok
                        ? sanitizeImageDataUrl(payload.dataUrl, "")
                        : ""
                );
            };
            script.onerror = () => finish("");
            try {
                const url = new URL(IMAGE_PROXY_API_URL);
                url.searchParams.set("action", "image");
                url.searchParams.set("url", targetUrl);
                url.searchParams.set("callback", callbackName);
                script.async = true;
                script.referrerPolicy = "no-referrer";
                script.src = url.toString();
                document.head.appendChild(script);
            } catch (error) {
                finish("");
            }
        });
    }

    async function fetchImageBase64(imgUrl) {
        if (!imgUrl) return NO_IMAGE;

        let targetUrl = imgUrl;
        if (imgUrl.includes("drive.google.com")) {
            const idMatch =
                imgUrl.match(/[?&]id=([^&]+)/) ||
                imgUrl.match(/\/d\/([^/]+)/);
            if (idMatch?.[1]) {
                targetUrl = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
            }
        }

        try {
            const directResponse = await fetchWithTimeout(targetUrl, {
                mode: "cors",
                cache: "force-cache"
            });
            if (directResponse.ok) {
                const blob = await directResponse.blob();
                if (isUsableImageBlob(blob)) return await blobToBase64(blob);
            }
        } catch (error) {
            // CORS時は下記プロキシへフォールバック
        }

        const viaAppsScript = await fetchImageViaAppsScript(targetUrl);
        if (viaAppsScript) return viaAppsScript;

        // 最後の手段として外部の無料プロキシを試す（停止・仕様変更の可能性あり）。
        const encodedUrl = encodeURIComponent(targetUrl);
        const proxyUrls = [
            `https://wsrv.nl/?url=${encodedUrl}&output=webp&w=500`,
            `https://api.allorigins.win/raw?url=${encodedUrl}`,
            `https://corsproxy.io/?${encodedUrl}`
        ];

        try {
            const blob = await Promise.any(proxyUrls.map(async proxyUrl => {
                const response = await fetchWithTimeout(proxyUrl, {
                    cache: "force-cache"
                });
                if (!response.ok) throw new Error("Fetch failed");
                const imageBlob = await response.blob();
                if (!isUsableImageBlob(imageBlob)) {
                    throw new Error("Not a usable image");
                }
                return imageBlob;
            }));
            return await blobToBase64(blob);
        } catch (error) {
            return NO_IMAGE;
        }
    }

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    function compareGroupNames(groupA, groupB) {
        const normalizeNumbers = value => String(value)
            .replace(/[０-９]/g, digit =>
                String.fromCharCode(digit.charCodeAt(0) - 0xFEE0)
            );

        const textA = normalizeNumbers(groupA);
        const textB = normalizeNumbers(groupB);
        const numberA = textA.match(/\d+(?:\.\d+)?/);
        const numberB = textB.match(/\d+(?:\.\d+)?/);

        if (numberA && numberB) {
            const difference = Number(numberA[0]) - Number(numberB[0]);
            if (difference !== 0) return difference;
        } else if (numberA) {
            return -1;
        } else if (numberB) {
            return 1;
        }

        return textA.localeCompare(textB, "ja", {
            numeric: true,
            sensitivity: "base"
        });
    }

    function parsePriceNumber(price) {
        const normalized = String(price ?? "")
            .replace(/[０-９]/g, digit =>
                String.fromCharCode(digit.charCodeAt(0) - 0xFEE0)
            )
            .replace(/[^\d.-]/g, "");
        const value = Number(normalized);
        return Number.isFinite(value) ? value : 0;
    }

    function sortCards(cards, sortOrder) {
        const sorted = [...cards];

        if (sortOrder === "price_desc") {
            sorted.sort((a, b) =>
                parsePriceNumber(b.price) - parsePriceNumber(a.price) ||
                a.originalIndex - b.originalIndex
            );
        } else if (sortOrder === "price_asc") {
            sorted.sort((a, b) =>
                parsePriceNumber(a.price) - parsePriceNumber(b.price) ||
                a.originalIndex - b.originalIndex
            );
        } else if (sortOrder === "name") {
            sorted.sort((a, b) =>
                String(a.name).localeCompare(String(b.name), "ja", {
                    numeric: true,
                    sensitivity: "base"
                }) || a.originalIndex - b.originalIndex
            );
        } else {
            sorted.sort((a, b) => a.originalIndex - b.originalIndex);
        }

        return sorted;
    }

    function buildPages(maxPerPage) {
        const splitMode = getPageSplitMode();
        const sortOrder = getSortOrder();
        const visibleCards = globalCardData.filter(card => !card.hidden);
        const groupedMap = new Map();
        visibleCards.forEach(card => {
            if (!groupedMap.has(card.group)) groupedMap.set(card.group, []);
            groupedMap.get(card.group).push(card);
        });

        const sortedGroups = Array.from(groupedMap.entries())
            .sort(([groupA], [groupB]) => compareGroupNames(groupA, groupB))
            .map(([group, cards]) => [group, sortCards(cards, sortOrder)]);

        if (splitMode === "fill") {
            let orderedCards;
            if (sortOrder === "group_csv") {
                orderedCards = sortedGroups.flatMap(([, cards]) => cards);
            } else if (sortOrder === "csv_all") {
                orderedCards = sortCards(visibleCards, "csv_all");
            } else {
                orderedCards = sortCards(visibleCards, sortOrder);
            }

            const filledPages = [];
            for (let i = 0; i < orderedCards.length; i += maxPerPage) {
                filledPages.push(orderedCards.slice(i, i + maxPerPage));
            }
            return filledPages;
        }

        const pages = [];
        let currentPage = [];

        if (splitMode === "group_page") {
            for (const [, items] of sortedGroups) {
                for (let i = 0; i < items.length; i += maxPerPage) {
                    pages.push(items.slice(i, i + maxPerPage));
                }
            }
            return pages;
        }

        for (const [, items] of sortedGroups) {
            if (items.length <= maxPerPage && currentPage.length + items.length <= maxPerPage) {
                currentPage = currentPage.concat(items);
                continue;
            }

            if (currentPage.length > 0) {
                pages.push(currentPage);
                currentPage = [];
            }

            for (let i = 0; i < items.length; i += maxPerPage) {
                const chunk = items.slice(i, i + maxPerPage);
                if (chunk.length === maxPerPage) {
                    pages.push(chunk);
                } else {
                    currentPage = chunk;
                }
            }
        }

        if (currentPage.length > 0) pages.push(currentPage);
        return pages;
    }

    function addPreviewPageNavigation(container, pageCount) {
        if (pageCount <= 1) return;

        const currentPage = Math.min(
            pageCount,
            Math.max(1, Number(container.dataset.activePreviewPage) || 1)
        );
        container.dataset.activePreviewPage = String(currentPage);

        const navigation = document.createElement("div");
        navigation.className = "preview-page-navigation";
        navigation.setAttribute("aria-label", "買取表プレビューのページ切替");
        navigation.innerHTML = `
            <button type="button" class="preview-page-nav-button" data-page-step="-1">‹ 前のページ</button>
            <label class="preview-page-nav-label">
                <span>確認するページ</span>
                <select aria-label="確認するページ"></select>
            </label>
            <span class="preview-page-nav-count">全 ${pageCount} ページ</span>
            <button type="button" class="preview-page-nav-button" data-page-step="1">次のページ ›</button>
        `;

        const select = navigation.querySelector("select");
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
            const option = document.createElement("option");
            option.value = String(pageNumber);
            option.textContent = `${pageNumber} ページ目`;
            select.appendChild(option);
        }

        const previousButton = navigation.querySelector('[data-page-step="-1"]');
        const nextButton = navigation.querySelector('[data-page-step="1"]');
        const updateControls = pageNumber => {
            container.dataset.activePreviewPage = String(pageNumber);
            select.value = String(pageNumber);
            previousButton.disabled = pageNumber <= 1;
            nextButton.disabled = pageNumber >= pageCount;
        };
        const goToPage = pageNumber => {
            const targetPage = Math.min(pageCount, Math.max(1, pageNumber));
            updateControls(targetPage);
            container.querySelector(`#exportArea_${targetPage}`)
                ?.closest(".preview-page")
                ?.scrollIntoView({behavior: "smooth", block: "start"});
        };

        updateControls(currentPage);
        previousButton.addEventListener("click", () => goToPage(Number(select.value) - 1));
        nextButton.addEventListener("click", () => goToPage(Number(select.value) + 1));
        select.addEventListener("change", () => goToPage(Number(select.value)));
        container.appendChild(navigation);
    }

    function renderPages() {
        const layoutConfig = getSelectedLayoutConfig();
        const cols = layoutConfig.cols;
        const rows = layoutConfig.rows;
        const orientationClass = layoutConfig.orientation;
        const hideCardNames = getCardNameDisplay() === "hide";
        const selectedTheme = getSelectedTheme();
        const selectedTitleStyle = getSelectedTitleStyle();
        const splitMode = getPageSplitMode();
        const pages = buildPages(layoutConfig.maxPerPage);
        const container = document.getElementById("pagesContainer");

        const title = document.getElementById("titleInput").value || "高価買取表";
        const dateText = formatDate(document.getElementById("dateInput").value);
        const disclaimerHtml = escapeHtml(document.getElementById("disclaimerInput").value)
            .replace(/\n/g, "<br>");
        const priceCustomization = collectPriceCustomization();
        const primaryPriceLabel = escapeHtml(
            priceCustomization.primaryLabel
        );
        const secondaryPriceLabel = escapeHtml(
            priceCustomization.secondaryLabel
        );

        if (pages.length === 0) {
            renderNoData();
            return;
        }

        container.innerHTML = "";
        addPreviewPageNavigation(container, pages.length);

        pages.forEach((pageCards, pageIndex) => {
            const pageNumber = pageIndex + 1;
            const pageHasAMinus = hideCardNames && pageCards.some(card =>
                Boolean(normalizeAMinusPriceForDisplay(card.aMinusPrice))
            );
            const pageEmblem = getPageEmblemContent(
                pageCards,
                pageNumber,
                splitMode
            );
            const pageEmblemAttributes = pageEmblem.isGroupLabel
                ? ` class="is-group-label" style="--group-label-size:${pageEmblem.fontSize}px"`
                : "";
            const pageDiv = document.createElement("div");
            pageDiv.className = `exportArea ${orientationClass}${
                hideCardNames ? " hide-card-names" : ""
            }${
                pageHasAMinus ? " has-dual-price-page" : ""
            }`;
            pageDiv.dataset.theme = selectedTheme;
            applyGeneratedThemeAppearance(pageDiv, selectedTheme);
            pageDiv.dataset.layout = normalizeLayout(
                document.getElementById("layoutSelect")?.value
            );
            pageDiv.dataset.titleStyle = selectedTitleStyle;
            pageDiv.dataset.titleCustom = "true";
            pageDiv.id = `exportArea_${pageNumber}`;

            const cardsHtml = pageCards.map(card => {
                const badgeHtml = card.status.includes("強化")
                    ? '<div class="status-badge">強化買取</div>'
                    : "";
                const imageSource = card.resolvedImg || LOADING_IMAGE;
                const grade = escapeHtml(card.type || "");
                const gradeHtml = grade
                    ? `<span class="card-grade">${grade}</span>`
                    : "";
                const name = escapeHtml(card.name || "");
                const priceText = normalizeBuylistPriceDisplay(card.price);
                const price = escapeHtml(priceText);
                const normalizedAMinusPrice = normalizeAMinusPriceForDisplay(
                    card.aMinusPrice
                );
                const aMinusPriceText = hideCardNames
                    ? normalizeBuylistPriceDisplay(normalizedAMinusPrice)
                    : "";
                const aMinusPrice = escapeHtml(aMinusPriceText);
                const imageUrl = escapeHtml(card.imgUrl);
                const priceChangeBadge = renderPriceChangeBadge(card);
                const dualPriceAria = escapeHtml(
                    `${priceCustomization.primaryLabel || "通常価格"} ` +
                    `${priceText}、` +
                    `${priceCustomization.secondaryLabel || "状態A-価格"} ` +
                    `${aMinusPriceText}`
                );
                const priceHtml = aMinusPrice
                    ? `
                        <div
                            class="card-price-stack"
                            aria-label="${dualPriceAria}"
                        >
                            <div class="card-price-row card-price-row-primary">
                                <span class="card-price-grade-label">${primaryPriceLabel}</span>
                                <span class="card-price-text">${price}</span>
                            </div>
                            <div class="card-price-row card-price-row-minus">
                                <span class="card-price-grade-label">${secondaryPriceLabel}</span>
                                <span class="card-price-text">${aMinusPrice}</span>
                            </div>
                        </div>
                    `
                    : `<span class="card-price-text">${price}</span>`;

                return `
                    <div class="card-item">
                        ${badgeHtml}
                        <div class="card-img-container">
                            <img
                                src="${imageSource}"
                                class="dynamic-img"
                                data-url="${imageUrl}"
                                data-card-id="${card.id}"
                                alt="${name || "Card"}"
                                crossorigin="anonymous"
                            >
                            ${priceChangeBadge}
                        </div>
                        <div class="card-name" title="${name}">${name}</div>
                        <div class="card-meta">${gradeHtml}</div>
                        <div class="card-price-container${aMinusPrice ? " has-a-minus" : ""}">
                            ${priceHtml}
                        </div>
                    </div>
                `;
            }).join("");

            pageDiv.innerHTML = `
                <div class="header-area">
                    <div class="logo-container">
                        <img class="logo-img" src="${escapeHtml(logoDataUrl)}" alt="ショップロゴ">
                    </div>
                    <div class="title-container">
                        <h1 class="title-text">${escapeHtml(title)}</h1>
                    </div>
                    <div class="page-emblem">
                        <strong${pageEmblemAttributes}>${escapeHtml(pageEmblem.text)}</strong>
                    </div>
                </div>

                <div
                    class="card-grid"
                    style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);"
                >
                    ${cardsHtml}
                </div>

                <div class="footer-area">
                    <div class="disclaimer disclaimer-text">${disclaimerHtml}</div>
                    <div class="footer-right">
                        <div class="update-label">PRICE UPDATED</div>
                        <div class="update-date date-text">${dateText}</div>
                        <div class="page-number">${pageNumber} / ${pages.length}</div>
                    </div>
                </div>
            `;

            applyBrandWatermarkPattern(pageDiv);

            const previewShell = document.createElement("div");
            previewShell.className = "preview-page";
            previewShell.appendChild(pageDiv);
            container.appendChild(previewShell);
        });

        applyTitleCustomization(container);
        applyPriceCustomization(container);
        applyCardTextCustomization(container);
        requestAnimationFrame(() => {
            adjustTitleSizes();
            adjustTextSize();
            fitPreviewPages();
            imageLoadPromise = queueMissingImagesLoad();
        });
    }

    function adjustTitleSizes(root = document) {
        const settings = collectTitleCustomization();
        root.querySelectorAll(".title-container").forEach(container => {
            const title = container.querySelector(".title-text");
            if (!title) return;
            applyTitleElementStyle(title, settings);
        });
    }

    function adjustTextSize(root = document) {
        root.querySelectorAll(".card-price-container").forEach(container => {
            const textElements = Array.from(
                container.querySelectorAll(".card-price-text")
            );
            if (textElements.length === 0) return;

            textElements.forEach(textElement => {
                textElement.style.transform = "none";
            });

            if (container.classList.contains("has-a-minus")) {
                const rows = Array.from(
                    container.querySelectorAll(".card-price-row")
                );
                const scales = rows.map(row => {
                    const textElement = row.querySelector(".card-price-text");
                    const label = row.querySelector(".card-price-grade-label");
                    if (!textElement) return 1;

                    const availableWidth = Math.max(
                        0,
                        row.clientWidth - (label?.offsetWidth || 0) - 4
                    );
                    const availableHeight = Math.max(0, row.clientHeight - 2);
                    const textWidth = textElement.scrollWidth;
                    const textHeight = textElement.scrollHeight;
                    if (
                        !availableWidth ||
                        !availableHeight ||
                        !textWidth ||
                        !textHeight
                    ) {
                        return 1;
                    }

                    return Math.min(
                        1,
                        availableWidth / textWidth,
                        availableHeight / textHeight
                    );
                });
                const commonScale = Math.min(1, ...scales);
                if (commonScale < 1) {
                    textElements.forEach(textElement => {
                        textElement.style.transform = `scale(${commonScale})`;
                    });
                }
                return;
            }

            const textElement = textElements[0];
            const availableWidth = Math.max(0, container.clientWidth - 22);
            const availableHeight = Math.max(0, container.clientHeight - 4);
            const textWidth = textElement.scrollWidth;
            const textHeight = textElement.scrollHeight;
            if (!availableWidth || !availableHeight || !textWidth || !textHeight) {
                return;
            }

            const finalScale = Math.min(
                1,
                availableWidth / textWidth,
                availableHeight / textHeight
            );
            if (finalScale < 1) {
                textElement.style.transform = `scale(${finalScale})`;
            }
        });
    }

    function updateImageStatus() {
        const panel = document.getElementById("imageStatusPanel");
        const text = document.getElementById("imageStatusText");
        if (!panel || !text) return;

        const total = globalCardData.length;
        if (total === 0) {
            panel.dataset.state = "idle";
            text.textContent = "CSV読み込み後に、画像の読み込み状況を表示します。";
            const retryButton = document.getElementById("retryFailedImagesButton");
            if (retryButton) retryButton.hidden = true;
            updateWorkflowSummary();
            return;
        }

        const counts = globalCardData.reduce((result, card) => {
            const state = card.imageState || "pending";
            result[state] = (result[state] || 0) + 1;
            return result;
        }, {});

        const loaded = counts.loaded || 0;
        const loading = (counts.loading || 0) + (counts.pending || 0);
        const failed = counts.error || 0;
        const missing = counts.missing || 0;
        const retryButton = document.getElementById("retryFailedImagesButton");

        if (loading > 0) {
            panel.dataset.state = "loading";
        } else if (failed > 0 || missing > 0) {
            panel.dataset.state = "warning";
        } else {
            panel.dataset.state = "ready";
        }

        text.textContent =
            `画像：読み込み済み ${loaded}/${total}件` +
            `｜読み込み中 ${loading}件｜エラー ${failed}件｜画像なし ${missing}件`;
        if (retryButton) retryButton.hidden = failed === 0;
        updateWorkflowSummary();
        refreshCsvAnomalyChecks();
    }

    function syncResolvedImagesInDom() {
        const cardLookup = new Map(
            globalCardData.map(card => [String(card.id), card])
        );
        document.querySelectorAll(".dynamic-img").forEach(imageElement => {
            const card = cardLookup.get(
                String(imageElement.getAttribute("data-card-id") || "")
            );
            if (!card) {
                imageElement.src = NO_IMAGE;
                return;
            }
            if (card.resolvedImg) {
                imageElement.src = card.resolvedImg;
            } else if (!card.imgUrl) {
                imageElement.src = NO_IMAGE;
            }
        });
    }

    function queueMissingImagesLoad() {
        if (imageLoadingTask) {
            imageLoadPromise = imageLoadingTask;
            return imageLoadingTask;
        }

        const generation = imageLoadGeneration;
        let task;
        task = loadMissingImagesFast(generation).finally(() => {
            if (imageLoadingTask === task) imageLoadingTask = null;
            if (generation === imageLoadGeneration) {
                syncResolvedImagesInDom();
                updateImageStatus();
                if (globalCardData.some(card =>
                    card.imageState === "pending"
                )) {
                    queueMissingImagesLoad();
                }
            }
        });
        imageLoadingTask = task;
        imageLoadPromise = task;
        return task;
    }

    async function loadMissingImagesFast(generation = imageLoadGeneration) {
        const cards = globalCardData.filter(card => {
            if (!card.imgUrl) {
                card.resolvedImg = NO_IMAGE;
                card.imageState = "missing";
                return false;
            }
            return !card.resolvedImg && card.imageState !== "error";
        });
        if (generation !== imageLoadGeneration) return;
        updateImageStatus();

        let cursor = 0;
        let completed = 0;
        const worker = async () => {
            while (cursor < cards.length) {
                const index = cursor++;
                const card = cards[index];
                if (!card || generation !== imageLoadGeneration) return;

                const originalUrl = String(card.imgUrl || "");
                card.imageState = "loading";
                if (!imagePromiseCache.has(originalUrl)) {
                    imagePromiseCache.set(
                        originalUrl,
                        fetchImageBase64(originalUrl)
                    );
                }

                let resolvedImage = NO_IMAGE;
                try {
                    resolvedImage =
                        await imagePromiseCache.get(originalUrl) || NO_IMAGE;
                } catch (error) {
                    imagePromiseCache.delete(originalUrl);
                }
                if (generation !== imageLoadGeneration) return;

                card.resolvedImg = resolvedImage;
                card.imageState = resolvedImage === NO_IMAGE
                    ? "error"
                    : "loaded";
                completed++;
                if (
                    completed % IMAGE_LOAD_CONCURRENCY === 0 ||
                    completed === cards.length
                ) {
                    syncResolvedImagesInDom();
                    updateImageStatus();
                    await new Promise(resolve => window.setTimeout(resolve, 0));
                }
            }
        };

        const workerCount = Math.min(
            IMAGE_LOAD_CONCURRENCY,
            Math.max(1, cards.length)
        );
        await Promise.all(
            Array.from({ length: workerCount }, () => worker())
        );
    }

    function retryFailedImages() {
        const failedCards = globalCardData.filter(
            card => card.imageState === "error"
        );
        if (failedCards.length === 0) return;

        failedCards.forEach(card => {
            imagePromiseCache.delete(card.imgUrl);
            card.resolvedImg = null;
            card.imageState = "pending";
        });
        updateImageStatus();
        renderPages();
        renderSingleCardPicker();
        renderSingleAdPreviews();
        scheduleWorkspaceAutosave();
    }

    async function waitForImages(rootElement) {
        const images = Array.from(rootElement.querySelectorAll("img"));
        await Promise.all(images.map(image => {
            if (image.complete) return Promise.resolve();
            return new Promise(resolve => {
                image.onload = resolve;
                image.onerror = resolve;
            });
        }));
    }

    async function ensureImagesReadyForExport() {
        while (globalCardData.some(card =>
            card.imageState === "pending" || card.imageState === "loading"
        )) {
            imageLoadPromise = queueMissingImagesLoad();
            await imageLoadPromise;
        }
        await imageLoadPromise;
    }

    function getPageBackgroundSnapshot(element) {
        const style = getComputedStyle(element);
        return {
            backgroundColor: style.backgroundColor,
            backgroundImage: style.backgroundImage,
            backgroundPosition: style.backgroundPosition,
            backgroundSize: style.backgroundSize,
            backgroundRepeat: style.backgroundRepeat,
            backgroundOrigin: style.backgroundOrigin,
            backgroundClip: style.backgroundClip
        };
    }

    async function renderAreaToCanvas(targetArea) {
        const exportWidth = targetArea.offsetWidth;
        const exportHeight = targetArea.offsetHeight;
        const backgroundSnapshot = getPageBackgroundSnapshot(targetArea);
        const pageBackground = backgroundSnapshot.backgroundColor;

        const exportStage = document.createElement("div");
        exportStage.setAttribute("aria-hidden", "true");
        Object.assign(exportStage.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: `${exportWidth}px`,
            height: `${exportHeight}px`,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: "9998",
            backgroundColor: pageBackground
        });

        const exportClone = targetArea.cloneNode(true);
        exportClone.removeAttribute("id");
        Object.assign(exportClone.style, {
            position: "relative",
            top: "0",
            left: "0",
            width: `${exportWidth}px`,
            height: `${exportHeight}px`,
            margin: "0",
            transform: "none",
            ...backgroundSnapshot
        });

        exportStage.appendChild(exportClone);
        document.body.appendChild(exportStage);

        try {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }
            await waitForImages(exportClone);
            applySingleHeadlineSizes(exportClone);
            adjustTitleSizes(exportClone);
            applyPriceCustomization(exportClone);
            applyCardTextCustomization(exportClone);
            adjustTextSize(exportClone);
            adjustSingleAdPriceSizes(exportClone);
            await new Promise(resolve => setTimeout(resolve, 250));
            updateSingleAdLayoutStatus(exportStage);
            const layoutIssues = getSingleAdLayoutIssues(exportClone);
            if (layoutIssues.length) {
                throw new Error(
                    `レイアウトが画像内に収まりませんでした（${layoutIssues.join("、")}）。`
                );
            }

            return await html2canvas(exportClone, {
                useCORS: true,
                allowTaint: false,
                backgroundColor: pageBackground,
                scale: 2,
                width: exportWidth,
                height: exportHeight,
                windowWidth: exportWidth,
                windowHeight: exportHeight,
                scrollX: 0,
                scrollY: 0,
                logging: false
            });
        } finally {
            exportStage.remove();
        }
    }

    function canvasToBlob(canvas) {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (blob) resolve(blob);
                else reject(new Error("PNGデータを作成できませんでした。"));
            }, "image/png");
        });
    }

    function downloadBlob(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = fileName;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }

    function sanitizeFileName(value) {
        return String(value || "商品")
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 70) || "商品";
    }

    function getExportAnomalyCounts(cards) {
        const cardIds = new Set((cards || []).map(card => Number(card.id)));
        const within = items => (items || []).filter(item =>
            item.cardId !== null && cardIds.has(Number(item.cardId))
        ).length;
        return {
            suddenPrice: within(csvAnomalyState.suddenPrice),
            aMinusHigher: within(csvAnomalyState.aMinusHigher),
            missingImage: within(csvAnomalyState.missingImage),
            imageError: within(csvAnomalyState.imageError)
        };
    }

    function confirmExportAnomalies(cards, targetLabel = "出力対象") {
        refreshCsvAnomalyChecks();
        const counts = getExportAnomalyCounts(cards);
        const issues = [
            [counts.suddenPrice, "前回比の急変"],
            [counts.aMinusHigher, "状態A- > 状態A"],
            [counts.missingImage, "画像リンクなし"],
            [counts.imageError, "画像取得エラー"]
        ].filter(([count]) => count > 0);
        if (issues.length === 0) return true;
        const detail = issues
            .map(([count, label]) => `${label}：${count}件`)
            .join("\n");
        return confirm(
            `${targetLabel}に要確認の商品があります。\n\n${detail}` +
            "\n\n内容を確認せず、このまま保存を続けますか？"
        );
    }

    function setExportControlsBusy(isBusy) {
        document.querySelectorAll("[data-export-action]").forEach(button => {
            button.disabled = isBusy;
            button.setAttribute("aria-busy", String(isBusy));
        });
        document.body.dataset.exportBusy = isBusy ? "true" : "false";
    }

    function beginExportTask(taskLabel) {
        if (activeExportTask) {
            alert(
                `「${activeExportTask}」を処理中です。完了してからもう一度お試しください。`
            );
            return false;
        }
        activeExportTask = String(taskLabel || "保存処理");
        setExportControlsBusy(true);
        return true;
    }

    function finishExportTask() {
        activeExportTask = "";
        setExportControlsBusy(false);
    }

    async function exportToImage() {
        const areas = Array.from(
            document.querySelectorAll("#pagesContainer .exportArea")
        );
        if (areas.length === 0) return;
        if (typeof html2canvas !== "function") {
            alert("画像保存機能を利用できません。ページを再読み込みして、もう一度お試しください。");
            return;
        }
        if (!beginExportTask("買取表PNGの保存")) return;

        const overlay = document.getElementById("loadingOverlay");
        const overlayText = document.getElementById("loadingText");
        overlay.style.display = "flex";

        try {
            overlayText.textContent = "画像の読み込み完了を確認しています...";
            await ensureImagesReadyForExport();
            const exportCards = globalCardData.filter(card => !card.hidden);
            if (!confirmExportAnomalies(exportCards, "買取表の出力対象")) return;

            for (let i = 0; i < areas.length; i++) {
                overlayText.textContent = `${i + 1}枚目を生成中...（${i + 1}/${areas.length}）`;
                const canvas = await renderAreaToCanvas(areas[i]);
                const link = document.createElement("a");
                link.download =
                    `買取表_${document.getElementById("dateInput").value}_${i + 1}枚目.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                canvas.width = 1;
                canvas.height = 1;
                await new Promise(resolve => setTimeout(resolve, 700));
            }
        } catch (error) {
            console.error(error);
            alert(`画像の生成に失敗しました。\n詳細: ${error.message || error}`);
        } finally {
            overlay.style.display = "none";
            overlayText.textContent = "画像を生成中です...";
            finishExportTask();
        }
    }

    async function exportToZip() {
        const areas = Array.from(
            document.querySelectorAll("#pagesContainer .exportArea")
        );
        if (areas.length === 0) return;
        if (typeof html2canvas !== "function" || typeof JSZip !== "function") {
            alert("ZIP保存機能を利用できません。ページを再読み込みして、もう一度お試しください。");
            return;
        }
        if (!beginExportTask("買取表ZIPの保存")) return;

        const overlay = document.getElementById("loadingOverlay");
        const overlayText = document.getElementById("loadingText");
        const dateValue = document.getElementById("dateInput").value;
        overlay.style.display = "flex";

        try {
            overlayText.textContent = "画像の読み込み完了を確認しています...";
            await ensureImagesReadyForExport();
            const exportCards = globalCardData.filter(card => !card.hidden);
            if (!confirmExportAnomalies(exportCards, "買取表の出力対象")) return;

            const zip = new JSZip();
            for (let i = 0; i < areas.length; i++) {
                overlayText.textContent =
                    `ZIP用画像を生成中...（${i + 1}/${areas.length}）`;
                const canvas = await renderAreaToCanvas(areas[i]);
                const blob = await canvasToBlob(canvas);
                zip.file(`買取表_${dateValue}_${i + 1}枚目.png`, blob);
                canvas.width = 1;
                canvas.height = 1;
            }

            overlayText.textContent = "ZIPファイルを作成中...";
            const zipBlob = await zip.generateAsync(
                {
                    type: "blob",
                    compression: "DEFLATE",
                    compressionOptions: { level: 6 }
                },
                metadata => {
                    overlayText.textContent =
                        `ZIPファイルを作成中... ${Math.round(metadata.percent)}%`;
                }
            );

            downloadBlob(zipBlob, `買取表_${dateValue}.zip`);
        } catch (error) {
            console.error(error);
            alert(`ZIPの生成に失敗しました。\n詳細: ${error.message || error}`);
        } finally {
            overlay.style.display = "none";
            overlayText.textContent = "画像を生成中です...";
            finishExportTask();
        }
    }

    async function exportToPdf() {
        const areas = Array.from(
            document.querySelectorAll("#pagesContainer .exportArea")
        );
        if (areas.length === 0) return;

        const JsPdf = window.jspdf?.jsPDF;
        if (typeof html2canvas !== "function" || typeof JsPdf !== "function") {
            alert("PDF保存機能を利用できません。ページを再読み込みして、もう一度お試しください。");
            return;
        }
        if (!beginExportTask("買取表PDFの保存")) return;

        const overlay = document.getElementById("loadingOverlay");
        const overlayText = document.getElementById("loadingText");
        const dateValue = document.getElementById("dateInput").value;
        const orientation = areas[0].classList.contains("landscape")
            ? "landscape"
            : "portrait";
        overlay.style.display = "flex";

        try {
            overlayText.textContent = "画像の読み込み完了を確認しています...";
            await ensureImagesReadyForExport();
            const exportCards = globalCardData.filter(card => !card.hidden);
            if (!confirmExportAnomalies(exportCards, "買取表の出力対象")) return;

            const pdf = new JsPdf({
                orientation,
                unit: "mm",
                format: "a4",
                compress: true
            });

            for (let i = 0; i < areas.length; i++) {
                overlayText.textContent =
                    `PDFを生成中...（${i + 1}/${areas.length}）`;
                const canvas = await renderAreaToCanvas(areas[i]);
                const imageData = canvas.toDataURL("image/jpeg", 0.96);

                if (i > 0) {
                    pdf.addPage("a4", orientation);
                }

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                pdf.addImage(
                    imageData,
                    "JPEG",
                    0,
                    0,
                    pageWidth,
                    pageHeight,
                    undefined,
                    "FAST"
                );

                canvas.width = 1;
                canvas.height = 1;
                await new Promise(resolve => setTimeout(resolve, 80));
            }

            overlayText.textContent = "PDFファイルを保存しています...";
            pdf.save(`買取表_${dateValue}.pdf`);
        } catch (error) {
            console.error(error);
            alert(`PDFの生成に失敗しました。\n詳細: ${error.message || error}`);
        } finally {
            overlay.style.display = "none";
            overlayText.textContent = "画像を生成中です...";
            finishExportTask();
        }
    }

    async function exportSingleImages() {
        const areas = Array.from(
            document.querySelectorAll("#singlePreviewContainer .single-ad")
        );
        if (areas.length === 0) {
            alert("保存する商品を選択してください。");
            return;
        }
        if (typeof html2canvas !== "function") {
            alert("画像保存機能を利用できません。ページを再読み込みして、もう一度お試しください。");
            return;
        }
        if (!beginExportTask("単品告知PNGの保存")) return;

        const overlay = document.getElementById("loadingOverlay");
        const overlayText = document.getElementById("loadingText");
        const dateValue = document.getElementById("dateInput").value;
        overlay.style.display = "flex";

        try {
            overlayText.textContent = "商品画像の読み込み完了を確認しています...";
            await ensureImagesReadyForExport();
            if (!confirmExportAnomalies(getSelectedSingleCards(), "単品告知の選択商品")) return;

            for (let i = 0; i < areas.length; i++) {
                overlayText.textContent =
                    `単品告知画像を生成中...（${i + 1}/${areas.length}）`;
                const canvas = await renderAreaToCanvas(areas[i]);
                const blob = await canvasToBlob(canvas);
                const firstId = String(areas[i].dataset.singleCardId || "").split(",")[0];
                const cardName = sanitizeFileName(getCardById(firstId)?.name);
                downloadBlob(
                    blob,
                    `単品買取_${dateValue}_${String(i + 1).padStart(2, "0")}_${cardName}.png`
                );
                canvas.width = 1;
                canvas.height = 1;
                await new Promise(resolve => setTimeout(resolve, 650));
            }
        } catch (error) {
            console.error(error);
            alert(`単品告知画像の生成に失敗しました。\n詳細: ${error.message || error}`);
        } finally {
            overlay.style.display = "none";
            overlayText.textContent = "画像を生成中です...";
            finishExportTask();
        }
    }

    async function exportSingleZip() {
        const areas = Array.from(
            document.querySelectorAll("#singlePreviewContainer .single-ad")
        );
        if (areas.length === 0) {
            alert("ZIPに保存する商品を選択してください。");
            return;
        }
        if (typeof html2canvas !== "function" || typeof JSZip !== "function") {
            alert("ZIP保存機能を利用できません。ページを再読み込みして、もう一度お試しください。");
            return;
        }
        if (!beginExportTask("単品告知ZIPの保存")) return;

        const overlay = document.getElementById("loadingOverlay");
        const overlayText = document.getElementById("loadingText");
        const dateValue = document.getElementById("dateInput").value;
        overlay.style.display = "flex";

        try {
            overlayText.textContent = "商品画像の読み込み完了を確認しています...";
            await ensureImagesReadyForExport();
            if (!confirmExportAnomalies(getSelectedSingleCards(), "単品告知の選択商品")) return;

            const zip = new JSZip();
            for (let i = 0; i < areas.length; i++) {
                overlayText.textContent =
                    `ZIP用の単品告知画像を生成中...（${i + 1}/${areas.length}）`;
                const canvas = await renderAreaToCanvas(areas[i]);
                const blob = await canvasToBlob(canvas);
                const firstId = String(areas[i].dataset.singleCardId || "").split(",")[0];
                const cardName = sanitizeFileName(getCardById(firstId)?.name);
                zip.file(
                    `単品買取_${String(i + 1).padStart(2, "0")}_${cardName}.png`,
                    blob
                );
                canvas.width = 1;
                canvas.height = 1;
            }

            overlayText.textContent = "ZIPファイルを作成中...";
            const zipBlob = await zip.generateAsync(
                {
                    type: "blob",
                    compression: "DEFLATE",
                    compressionOptions: { level: 6 }
                },
                metadata => {
                    overlayText.textContent =
                        `ZIPファイルを作成中... ${Math.round(metadata.percent)}%`;
                }
            );

            downloadBlob(zipBlob, `単品買取告知_${dateValue}.zip`);
        } catch (error) {
            console.error(error);
            alert(`単品告知ZIPの生成に失敗しました。\n詳細: ${error.message || error}`);
        } finally {
            overlay.style.display = "none";
            overlayText.textContent = "画像を生成中です...";
            finishExportTask();
        }
    }

    window.addEventListener("resize", () => {
        syncPanelLayoutWidth("buylist");
        syncPanelLayoutWidth("single");
        syncPanelLayoutWidth("xpost");
        adjustTitleSizes();
        adjustTextSize();
        fitPreviewPages();
        fitSinglePreviews();
        syncQuickHeaderPreview();
        syncQuickPricePreview();
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            clearTimeout(workspaceAutosaveTimer);
            saveWorkingDraftNow();
        }
    });

    window.addEventListener("beforeunload", () => {
        clearTimeout(workspaceAutosaveTimer);
        saveWorkingDraftNow();
    });
