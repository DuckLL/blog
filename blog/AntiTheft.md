---
title: "從今天開始不再被盜"

date: 2019-08-20T23:57:52+08:00

tags: ["security", "infosec", "2FA"]
draft: false
---

[前一篇文章介紹帳號密碼的管裡](/blog/DidYouForgetYourPassword/)  
如果還沒讀過，建議先回頭閱讀  
下面會分享如何提升帳號的安全性  
讓你遠離帳號盜竊者  
**一樣歡迎轉貼分享**

<!-- truncate -->

# 二階段驗證 (2FA)

**2FA的安全性甚至比密碼還高**  
2FA 顧名思義就是需要兩個不同階段的驗證  
第一階段是你的帳號密碼  
第二階段常見的形式有下列幾種

- 簡訊 OTP
- APP 隨時間產生 6 位數字(TOTP)
- 手機彈出驗證視窗
- 掃描 QRcode
- USB 硬體鎖

當然要用 2FA 的前提是服務商有支援  
現在主流的服務商都會提供這個功能  
而**最常見的形式就是 TOTP**  
這裡推薦兩款 APP 都是非常容易操作

- [Authy](https://play.google.com/store/apps/details?id=com.authy.authy&hl=zh_TW)
  - 優點：雲端備份、換機簡單
  - 缺點：交給第三方託管風險
- [andOTP](https://play.google.com/store/apps/details?id=org.shadowice.flocke.andotp)
  - 優點：不上雲端、加密備份/還原、[開源](https://github.com/andOTP/andOTP)
  - 缺點：需定期手動備份

## 簡易開通教學

[Google 連結](https://myaccount.google.com/signinoptions/two-step-verification)
![Google](https://img.duckll.tw/AntiTheft/google.png)

[Facebook 連結](https://www.facebook.com/security/2fac/settings/)
![Facebook](https://img.duckll.tw/AntiTheft/facebook.png)

設定步驟幾乎大同小異

1. 按下右下角的＋ 選擇拍攝 QRcode
2. 拍攝 QRcode
3. 輸入得到的 TOTP 密碼

最後就會得到類似這樣的畫面  
要使用就點擊來顯示 TOTP 密碼
![1](https://img.duckll.tw/AntiTheft/andotp.png)

# 防盜最高境界

## 信箱+數字

gmail 在帳號後面加上數字，一樣可以收到信  
效果：**使用同一個信箱但不同帳號**

- Facebook: example+91823@gmail.com
- Github: example+14237@gmail.com

使用不同帳號可以有效的避免被撞庫(駭客利用外洩資料登入其他服務)  
有些服務還能**用同一個信箱註冊多個帳號**  
小技巧：  
這個亂數可以透過 keepass 產生  
並且一同記錄在 keepass 帳號或筆記下  
反正帳號也是 keepass 填入  
便利性不減少、安全性加分  
_或是更極端 建立亂數帳號信箱_

## 免洗信箱

如果是一些很不重要的服務  
**不要使用自己的信箱**  
註冊信箱可以使用[yopmail](http://www.yopmail.com/en/)  
這是一個**匿名長久型垃圾信箱服務**  
只要輸入帳號就可以使用  
用 keepass 產生亂數來當作帳號(信箱)使用吧

## 不要用帳號綁定登入(oauth2)

現在很多服務可以透過 Facebook、Google、微信...登入  
這真的很方便，也是目前很多 APP 的趨勢  
但帳號綁定本身就是一個很有風險的事情  
**"如果認證帳號被盜取，以它作為認證的服務都會一同被盜取"**  
如果能不綁定帳號就盡量減少綁定

# 最後

**人往往是造成資安漏洞的主因**  
除了加強各種登入安全機制之外

- 不點擊不明來源
- 不安裝可疑軟體
- 查證訊息的真偽
- 養成良好的使用習慣

才是避免成為下一個被盜受害者最好的方法
