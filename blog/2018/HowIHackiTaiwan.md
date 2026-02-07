---
title: "看我如何得到iTaiwan帳號密碼 "

date: 2018-02-09T00:00:00+08:00

tags: ["security", "wifi"]
draft: false
---

**"先說結論就是\"不要使用公共 Wifi\""**  
以下實驗均為學術研究用途 如自行使用 後過自負

<!-- truncate -->

## 前言

有一晚我窩在北門臥客的房內  
電腦雖然收得到 Wi-Fi 卻無法上網  
而且這個現象在大廳不會發生  
打開 WiFi 掃描儀 看到四個相同 SSID 的訊號  
而這個最強的訊號就是讓我沒辦法上網的原因  
立馬回報這個問題給他們  
最後協助他們修復了那台有問題的 AP  
還得到了一張免費住宿卷(結果被我放到過期)

去年的 AIS3 Mentor 計畫要想題目  
我就在我腦海把這個東西挖了出來  
"相同 SSID 蓋台 DoS 攻擊的防禦"  
這是一個連網裝置連線設計的 feature  
在出現相同 SSID 的情況下  
裝置會選擇訊號最強的進行連線  
不管裝置是否已經連線  
想到的解決方法是記憶 MAC  
但攻擊者也可以偽造 MAC  
這個題目就被我擱置了

看到 TDOH conf 的徵稿  
這個題目又被我挖出來了  
把題目的重點改成釣魚  
但 Wifi 釣魚其實行之有年  
究竟能玩出什麼新花樣呢

要釣就要釣最大條的  
**"iTaiwan 免費無線上網服務熱點數量在全台已逾 8700 處，註冊人數超過 460 萬人"**  
要使用 iTaiwan 要先註冊帳號密碼  
帳號是使用者手機  
密碼是使用者自訂  
連上 iTaiwan 會跳出登入視窗  
這樣的機制稱之為 **Captive Portal**  
Captive Portal 運作的原理大致如下
![Captive Portal](https://img.duckll.tw/HowIHackiTaiwan/cp.png)
手機連上 Wifi 會測試網路的可用性  
而不同 OS 有不同的測試路徑

- Android: http://connectivitycheck.android.com/generate_204
- Apple: http://captive.apple.com/hotspot-detect.html
- Windows: http://www.msftconnecttest.com/connecttest.txt

根據這些測試連線的 response status  
手機就可以知道 Captive Portal 的存在  
並且重新導向到登入的頁面  
這東西太有意思了！  
**我開始研究了"Captive Portal 釣魚"(以下簡稱 CP 釣魚)**

## 正文

CP 釣魚有許多的優點

1. 信任的 Wifi 名稱，裝置會自動連線
2. 自動跳出登入視窗，降低使用者的懷疑
3. 獲取登入帳號密碼，手機也是很重要的個資，許多人帳號密碼在不同網站是重複的
4. 不用提供網路服務，劣質、低成本

要實作 CP 釣魚有幾個重點

1. 一個同名的 Wifi 熱點
2. 自動跳出登入畫面
3. 一個與原登入頁面相似的釣魚頁面
4. 將輸入的資料傳入到我的資料庫

而我使用的硬體設備有

1. RPi2
2. TL-WN722N(v2)

![rpi](https://img.duckll.tw/HowIHackiTaiwan/rpi.jpg)

### 1. 一個同名的 Wifi 熱點

~~這個太簡單了 應該大家都做得到~~
~~打開手機熱點編輯一下熱點名稱就好了~~

我在 RPi2 使用 hostapd 這個套件來管理我的 Wifi 名稱  
當然這個 Wifi 的 SSID 就是"iTaiwan"

### 2. 自動跳出登入畫面

在了解每個 OS 的 Captive Portal 機制  
且大部分的裝置預設會採用分享器提供的 DNS 設定  
我決定採用 dnsmasq 來做 DNS hijacking  
將所有的 DNS 請求都解析到我的裝置上

### 3. 一個與原登入頁面相似的釣魚頁面

我使用 HTTracker 來將 iTaiwan 的登入頁面砍回來  
再將登入的表單修改成傳入我的處理頁面


![true](https://img.duckll.tw/HowIHackiTaiwan/true.jpg)
這個是真實畫面

![false](https://img.duckll.tw/HowIHackiTaiwan/false.jpg)
這是假畫面


### 4. 將輸入的資料傳入到我的資料庫

最後我的處理頁面會將使用者的輸入儲存到資料庫中

### 5. 讓他看起來更像

利用剛剛的 DNS hijacking  
我讓他的網址與原本的 iTaiwan 一模一樣


![like](https://img.duckll.tw/HowIHackiTaiwan/like.jpg)


並且每次都只會導引到失敗頁面  
因為跳轉的太快 在 fail.php sleep(3)  
最後就變成了這樣

![sleep3](https://img.duckll.tw/HowIHackiTaiwan/sleep3.gif)


**"受害者以為登入失敗 還會嘗試其他組密碼呢 XD"**

## 進階利用

以上的釣魚都是利用人心的弱點  
接下來利用裝置才是重點！  
在更改 iTaiwan 頁面的時候我注意到了一個功能  
沒錯就是**記住我**  
關鍵的程式碼如下

```js
function cookie_check(login_form, key) {
  var frm = login_form;
  var remember = login_form.remember;
  var autologin = login_form.autologin;
  var autologin_set = getCookie("Autologin");
  var type;

  if ((type = getCookie("TYPE")) !== null) {
    if (type == "TPE") {
      login_form.type[1].checked = true;
    } else if (type == "NTPC") {
      login_form.type[0].checked = true;
      return;
    } else if (type == "TANet") {
      login_form.type[2].checked = true;
    } else if (type == "iTainan") {
      login_form.type[3].checked = true;
    } else {
      login_form.type[0].checked = true;
    }
  }

  if (getCookie("ID") !== null) {
    login_form.clt_user.value = Aes.Ctr.decrypt(getCookie("ID"), key, 256);
    if (autologin_set == "1") {
      autologin.checked = true;
    } else {
      remember.checked = true;
    }
  }

  if (getCookie("Serial") !== null) {
    login_form.clt_pass.value = Aes.Ctr.decrypt(getCookie("Serial"), key, 256);
  }

  if (getCookie("Autologin") == "1") {
    if (login_form.onsubmit()) {
      login_form.submit();
    }
  }
}
```

"記住我"使用了 cookie 來加密儲存使用者的帳號密碼  
在我仔細研究後發現 key 的產生方式與裝置的 MAC address 有關  
攻擊者可以利用真實網站送出不同的 MAC address 得到不同的 key
![hash](https://img.duckll.tw/HowIHackiTaiwan/hash.png)
一個 Wifi 熱點能輕鬆得到裝置的 MAC address  
而 DNS hijacking 後的網址的吻合性  
也能輕鬆拿到瀏覽器內同網域下的 Cookie  
**"有了 Cookie，有了 MAC address，不用使用者互動拿到帳號密碼"**  
簡單來說 只要手機曾經使用過"記住我"  
連上釣魚 Wifi 跳出登入視窗 帳號密碼就送出了  
而且不少裝置在關閉螢幕下也能跳出登入視窗  
使用者根本無法察覺 因為這一切都是預設動作  
DEMO 影片(以下實驗均為學術研究用途)

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/3iEremscQ98"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

## 後記

最後我把這個漏洞回報給 [HITCON ZeroDay](https://zeroday.hitcon.org/vulnerability/ZD-2017-00906)

- 2017/10/19 提交漏洞
- 2017/10/21 審核通過
- 2017/12/07 修復完畢
- 2018/02/01 公開漏洞

修復的方式就是在 cookie 加上 secure flag  
讓沒有憑證的釣魚頁面無法存取 cookie  
但這樣的攻擊只是冰山一角  
**"防禦 CP 釣魚最好的方法就是\"不要使用公共 Wifi\""**
