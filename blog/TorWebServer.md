---
title: "Tor Web Server"

date: 2020-01-18T16:55:13+08:00

tags: ["website", "docker", "tor"]
draft: false
---

## 前言

週末無聊突然有個靈感  
**"如果沒有 IP 或 Domain 要如何快速架設一個公開的 web service"**  
其實這樣的服務不算少  
(內網穿透、DDNS 反連等等)  
但設定起來也沒有這麼簡單  
我的目標很簡單 **"一個 docker 指令完成"**

<!-- truncate -->

## 進入正題

思考了一下決定使用 Tor 來做穿透  
沒錯就是那個 **"暗網的 Tor"**  
架設暗網的 server 其實很簡單  
完全不用對外開 port 也不用 ip  
只要能加入 tor 網站就可以連線  
從另一個專案[micro_web](https://github.com/DuckLL/micro_web)開始改

1. 安裝 tor
1. 設定 torrc
1. 編寫 startup script

就是這麼輕鬆簡單 全部就搞定了  
Github: [tor_web_server](https://github.com/DuckLL/tor_web_server)

## DEMO

Command
![cmd](https://img.duckll.tw/TorWebServer/cmd.png)
Tro Browser
![tor](https://img.duckll.tw/TorWebServer/tor.png)

## 後記

暗網會被稱做暗網 沒有廣為大家使用  
很大一個原因就是 onion 網路需要透過 Tor( Browser) 才能進入  
關於這個問題也很好解決  
現在有不少的 ** Tor2Web** 代理服務  
這邊推薦可以用`.ws`這個代理服務  
(有些 domain 會失敗、可以刪掉 tor 資料夾多換幾次 domain)  
就能輕鬆透過 HTTP 從一般瀏覽器進入
![normal](https://img.duckll.tw/TorWebServer/normal.png)
