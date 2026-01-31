---
title: "從今天開始不再忘記密碼"

date: 2019-08-10T23:57:52+08:00

tags: ["security", "infosec"]
draft: false
---

# 寫在前面

想不起來在哪裡看過  
現代人一年花在想密碼、找回密碼的時間是 xx 小時  
相信忘記密碼是大家共同的困擾  
下面會分享帳號密碼管理上 常見的問題及解決的方法  
[另一篇文章則是提升帳號的安全性](/blog/AntiTheft)  
**一樣歡迎轉貼分享**

<!-- truncate -->

# 常見的錯誤

## 弱密碼

弱密碼簡單來說就是你的密碼很爛  
**不是駭客都可以輕鬆猜到你的密碼**  
以下是 2019 弱密碼排行

```txt
1. 123456
2. password
3. 123456789
4. 12345678
5. 12345
6. 111111
7. 1234567
8. sunshine
9. qwerty
10. iloveyou
11. princess
12. admin
13. welcome
14. 666666
15. abc123
16. football
17. 123123
18. monkey
19. 654321
20. !@#$%^&*
21. charlie
22. aa123456
23. donald
24. password1
25. qwerty123
```

在台灣有很多人喜歡注音密碼  
[為什麼「ji32k7au4a83」這組密碼超級熱門？台灣人秒破解國外工程師的困惑](https://buzzorange.com/techorange/2019/03/07/ji32k7au4a83-popular-question/)  
從上文得知**注音密碼不代表安全**  
注音文也存在很多弱密碼

## 一個密碼通殺所有的服務

相信這是**最多人犯的錯誤**  
甚至結合弱密碼

常見用生日、名字、電話當作密碼  
除了容易被猜到之外  
**"最大的問題是: 一組被盜全部被盜"**

資料外洩的新聞層出不窮  
[Have I Been Pwn](https://haveibeenpwned.com/)這個網站  
可以查詢你的帳號是否有出現在外洩的資料中  
如果出現了你使用過的服務，麻煩把這些服務全部的密碼換掉
![pwned](https://img.duckll.tw/DidYouForgetYourPassword/pwned.jpg)
**"另外查密碼的功能 有被蒐集的疑慮 請不要使用"**  
~~雖然查信箱也會被蒐集 但你不查別人幫你查~~

## 把密碼寫在紙上貼在電腦前

直接上案例
[夏威夷的密碼](https://www.businessinsider.com/hawaii-emergency-agency-password-discovered-in-photo-sparks-security-criticism-2018-1)  
![hawaii](https://img.duckll.tw/DidYouForgetYourPassword/hawaii.jpg)
**"你以為貼在桌上只有你看到，但其實不是"**

我認為寫在紙上本身沒有問題  
問題主要有兩點

- 貼在大家都看得到的地方
- 密碼太簡單、太容易被記住

## 把密碼存在一個檔案

我真的看過有人用 Excel 存帳密  
聽起來很棒，但問題在哪裡

- 不小心手殘將檔案整個傳上雲端、傳給其他人
- 不小心手殘把剛剛複製的密碼貼給別人
- 電腦上大多數的軟體都能讀取檔案  
  一個簡單的惡意程式就能偷走檔案

**"總結來說：機密資料使用明文儲存就是一個風險"**

# 帳密的管理

## 密碼管理軟體

簡單來說密碼管理軟體就是  
**"用一個主密碼(Master Key)去存取帳號密碼資料庫"**  
起初我對密碼管理軟體非常排斥  
os: 如果 Master Key 外洩了不就全部外洩了  
但在看過自己外洩的密碼後  
我決定開始使用密碼管理軟體

先來解決剛剛第一個問題  
Q: Master Key 外洩真的會全部外洩嗎  
A: 不會，因為要檔案跟 Master Key 同時外洩才會  
**"這個Master Key只會出現在你的腦袋和電腦記憶體中"**

密碼管理軟體能解決很多問題

- 忘記帳號、密碼
- **"提供每個服務一組獨立、強度極高的密碼"**
- 自動刪除剪貼簿，防止誤貼

[密碼管理軟體並不是絕對的安全](https://www.ithome.com.tw/news/128930)  
**但在正確的使用下仍然能有效的提升整體的安全效益**

比較知名的密碼管理軟體有 1Password, LastPass, Dashlane, KeePass, KeyChain  
而我自己在電腦上是使用[KeePass XC](https://keepassxc.org/download/)  
手機上是使用[Keepass2Android 離線版](https://play.google.com/store/apps/details?id=keepass2android.keepass2android_nonet&hl=zh_TW)

## KeePass XC 簡單教學

KeePass XC 是 KeePass 的跨平台社群維護版本  
我之所以選擇 KeePass XC 有幾個理由  
**免費、開源、跨平台、不上雲端**

### 建立一個新的資料庫

第一次開啟應該是看到這樣的畫面  
點選建立新的資料庫
![create database](https://img.duckll.tw/DidYouForgetYourPassword/1.png)
有腦下一步直到輸入最關鍵的 Master Key  
**千萬要記住這一組密碼**
![enter master key](https://img.duckll.tw/DidYouForgetYourPassword/2.png)
就這麼簡單就建立好了一個屬於你的密碼資料庫

### 建立一組帳號密碼

點選左上角的綠色箭頭金色鑰匙圖案
![create entry](https://img.duckll.tw/DidYouForgetYourPassword/3.png)
就會進入這個稍微複雜的畫面  
紅色區域填入服務的名稱  
橘色區域填入帳號  
點下藍色的按鈕會打開密碼產生器(預設密碼不可見)  
綠色的區域就是密碼產生器  
可以決定密碼的長度、使用的字元  
**"建議設定：長度 32，英文大小寫、數字、符號"**  
注意有些奇怪的網站會限制長度跟不能使用符號  
決定好後按下紫色的套用、OK  
這樣就建立好一組帳號密碼了
![set entry](https://img.duckll.tw/DidYouForgetYourPassword/4.png)
建立好帳號密碼後  
關閉視窗選擇資料庫儲存位置
![save database](https://img.duckll.tw/DidYouForgetYourPassword/5.png)

### 使用帳號密碼

每次打開 KeePass 都需要輸入你的 Master Key
![enter master key](https://img.duckll.tw/DidYouForgetYourPassword/6.png)
解鎖後就可以用滑鼠選擇你需要的複製的服務欄位  
這邊推薦使用快速鍵

- Ctrl+B 複製帳號
- Ctrl+C 複製密碼

![copy and past](https://img.duckll.tw/DidYouForgetYourPassword/7.png)
最後貼到你的登入欄位中

## 密碼檔案的管理

現在最重要的帳號密碼都存進這個檔案了  
那如何管理這份檔案就是下一個問題  
這邊給出幾個備份的建議

- **"至少三份備份(電腦、手機、硬碟)"**
- **"至少一個異地備援"**
- 不上雲端

關於 Master Key  
如果你真的有健忘症  
用紙筆寫下 Master Key  
**保存好在你的保險箱內**  
**千萬不要存在電腦上**

# 最後

或許有一天我們不再使用帳號密碼來認證  
但 在那一天到來之前  
**好好守護你的帳號密碼吧！**

延伸閱讀：[從今天開始不再被盜](/blog/AntiTheft)
