---
title: "你的 Email 在裸奔"
date: 2026-02-08
tags: ["security","infosec"]
---

因為 [Blogblog 同樂會](https://blogblog.club/party)的關係最近看了很多部落格，我注意到**幾乎全部的 Blog 的 Email 都是明文顯示**，這其實是一個**很常被忽視的資安隱私問題**。

<!-- truncate -->

## 為什麼重要

你的 Email 不只被讀者看到了，**爬蟲也看到了**，你會開始收到垃圾信，甚至會有針對性的釣魚文件。

![](https://img.duckll.tw/email_leak/spam.png)

我之前使用 Hugo 架設 Blog 沒有保護，這是我收到的釣魚信。

## 方法

Email 是明文的情況下，爬蟲只需要 HTML 就可以輕鬆用 regex 抓到 Email。我們的目標很簡單，讓人讀的懂，但要增加爬蟲的成本。

- 使用 `(at)`,`#`,`＠` 代替 `@`
    - 優點: 實現簡單，用純文字看網頁的人也能看懂
    - 缺點: 使用者體驗差，沒辦法點擊連結，複製需要手動修改
    - 強度: 低，爬蟲可能透過簡單的 find/replace 破解
- 使用 css 加入隱藏文字 `display: none;`
    - 優點: 實現簡單，也沒有太多負擔
    - 缺點: 複製可能格式會有問題，但現代瀏覽器比較少見
    - 強度: 中，如果使用 inline css 還是可能直接被 find/replace，建議寫在 custom.css
- 使用圖片替代
    - 優點: 連跑 js 的爬蟲都無法破解
    - 缺點: 使用者體驗差，沒辦法複製、點擊，排版跑掉，製作麻煩
    - 強度: 超高，需要 OCR 辨識，爬蟲幾乎不會實作
- 使用 JavasSript 拼接、解碼
    - 優點: 可實現點擊後才顯示或複製
    - 缺點: 實現稍微複雜一點， nojs 用戶不友善
    - 強度: 高，大部分爬蟲不會跑 JavaScript，主流作法

SSG 大部分都有套件可以解決

- astro: [astro-mail-obfuscation](https://github.com/andreas-brunner/astro-mail-obfuscation) 使用 js
- zola: 部分 theme 的 js 支援
- hugo: template filter `safeHTML` 可以混淆
- docusaurus: [react-obfuscate-email](https://github.com/MauricioRobayo/react-obfuscate-email) 使用 css

如果以上的方法都太複雜，簡單的 base64 就可以做到

```html
<script>
  const encoded = "ZXhhbXBsZUBtYWlsLmNvbQ=="; // example@mail.com
  document.write(`<a href="mailto:${atob(encoded)}">${atob(encoded)}</a>`);
</script>
```

## 驗證

要怎麼確定爬蟲會不會看到你的 Email 呢？

從檔案原始碼檢查之外，我推薦的方法就是瀏覽實際網站，透過開發者工具(F12)在 Network 欄位找到原始 response 的內容，或是直接 wget 網站位置，檢查有沒有明文 Email 存在。

雖然 Email 是公開的資訊，但能防止被爬蟲濫用，減少電子垃圾產生，**保持信箱乾淨才不會錯過讀者的來信喔**。