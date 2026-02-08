---
title: "CHWISH: 願望交換平台"

date: 2019-11-24T19:38:06+08:00

tags: ["website", "php", "docker"]
draft: false
---

故事是這樣子的  
大學同學團想要舉辦一個聖誕節活動  
但相信玩過交換禮物的人都知道  
在你看起來超棒的禮物  
可能在別人手中卻是垃圾  
我就提議 **那禮物自己決定不就好了**  
因此我們就決定來交換願望！

<!-- truncate -->

願望交換規則也很簡單  
願望要有三個  
一方面 增加期待感 不知道哪一個會實現  
二方面 可以減少小天使遇到困難的狀況  
其他金額的上限、不能許的願望就是由大家討論出來

交換願望的難處在於  
誰能當任這個裁判  
能保證在不作弊的情況  
完美分配每個人的願望呢

**"身為一個駭客 就該用駭客的方法解決"**  
很簡單 !!自幹!!一個系統出來吧

![demo](https://img.duckll.tw/Chwish/demo.png)
最後的全貌
[github repo](https://github.com/DuckLL/chwish)

# 技術的開端

## 11 / 18

就在答應大家要自幹系統之後  
開始思考系統架構  
用了一個 sukiya 牛丼的時間  
決定用非對稱加密系統來達到公平、安全的效果  
並且以不管是遊戲人數、分配願望、遊戲階段  
都**不需要管理員介入就能自動進行下去的概念去設計**  
程式語言選擇了：PHP  
因為**PHP是世界上最好的語言**

大概有一年沒有寫 web 了  
這一天只做好了登入系統  
為了達到真匿名、真公平  
**連網站管理員都沒辦法偷看**  
**"帳號、密碼都用了bcrypt加密"**  
![mysql](https://img.duckll.tw/Chwish/mysql.png)
並且註冊時邀請碼的機制  
可以有效的防止網站不小心被踢到

## 11 / 19

這一天開始刻前端  
擺脫以往只用 bootstrap 的樣版  
這次選擇了[NES.css](https://nostalgic-css.github.io/NES.css/)當作基底  
NES.css 的特色是**"復古 8bit 遊戲風格"**  
RSA 的部分是借助[JSEncrypt](http://travistidwell.com/jsencrypt/)的力量  
JSEencrypt 非常的方便好用  
不過在過程中也察覺了 RSA 的缺點  
**"RSA2048 能加密的最大長度：84 個 UTF-8"**  
有思考過用[lz-string](https://pieroxy.net/blog/pages/lz-string/index.html)壓縮  
但考慮到壓縮比、穩定度等等問題  
還是決定不壓縮 直接限制願望長度  
最後用[jQuery](https://jquery.com/)來操作 DOM  
~~沒錯我就是這麼老人~~

![day2](https://img.duckll.tw/Chwish/day2.png)

## 11 / 20

這天基礎的功能只剩下

- 儲存大家的公鑰
- 分配公鑰
- 讓所有人取得加密訊息

在分配公鑰的時候  
我決定採用最長鍊機制  
這樣可以防止互相交換  
在當下很簡單了用了隨機生成驗證法  
但在寫這篇文章時 腦袋靈光一動  
發現只要把 shuffle(array)  
照著次序前面傳給後面就可以了！  
~~一定是工作後太久沒寫 code 了~~

因為是自動化的進入分配階段  
如果兩個人同時交出鑰匙  
**"racecondition 就有可能發生"**  
因此用 Transaction 去做保護  
~~自己都佩服自己有注意到這個洞~~

公開密文的問題其實困擾了我很久  
原本想說開一個頁面讓大家都可以進去複製密文  
但發現這樣超蠢的  
而且還破壞了一頁式的體驗  
但突然間遊戲的靈感降臨  
**就決定用開寶箱的方式**  
讓大家可以方便又快速的解密

![day3](https://img.duckll.tw/Chwish/day3.png)

這個寶箱的圖片是從[FLATICON](https://www.flaticon.com)取得的  
免費使用記得要在網站附上來源喔  
~~因為太美直接拿來當 LOGO~~

## 11 / 21

進入了第四天  
功能大致上都完成了  
但 deploy 的時候需要重新設定 DB  
**"讓身為 docker 信仰者的我火了"**  
在開發的初期 我都是使用 [duckll/lnmp](https://github.com/duckll/lnmp) 這個 image  
但 docker 不是這樣用的(以前不懂事)  
決定把一個 container 拆散！

nginx, php 沿用 [duckll/micro_web](https://github.com/DuckLL/micro_web)  
但發現 php:alpine 預設沒有 mysql_pdo  
解決的方法就是直接寫一個 Dockerfile 裝  
mysql 就折騰我很久了  
PHP PDO 不支援 mysql:8 的認證方式  
因此只能使用 mysql:5  
自動匯入要把檔案掛到`/docker-entrypoint-initdb.d`內  
原本從 phpmyadmin dump 出來的 .sql 欄位都有帶 `NOT NULL`屬性  
導致我註冊的 INSERT 失敗 ~~這邊浪費了我超多時間~~

但辛苦是值得的  
學習到一堆有的沒的技術  
也導正了 docker 的使用方式  
**"全部自動化的 deploy 就是舒服～"**

![day4](https://img.duckll.tw/Chwish/day4.png)

## 11 / 22

第五天 公測開始  
沒有密碼學概念的使用者使用起來還是非常困擾呢:))  
因此加入了一些防呆的機制

- 不是你該碰的區域直接 disable
- 自動 reload
- private key 保存提醒

直接把現在的遊戲狀態、階段標示出來
![now](https://img.duckll.tw/Chwish/now.png)
![stage](https://img.duckll.tw/Chwish/stage.png)

# 心得

來說個公測的小插曲  
一開始沒發現 reset 用 get 拿密碼是愚蠢得設計  
公測期間瀏覽器自動把我帶到 reset 附帶密碼 O_O  
**"沒有任何疑問 把所有人的資料都刪了 XDD"**  
現在已經改成 POST 的方式來驗證了

覺得還是要講一下 XD  
CHWISH 要讀作 change wish  
靈感來自 linux 的 chroot

這個禮拜下班的時間都在忙這個  
真的很累 但累得非常開心  
如果喜歡我的創作可以到[github](https://github.com/DuckLL/chwish)給我一個 Star
