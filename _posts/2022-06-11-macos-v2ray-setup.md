---
layout: post
title: macOS 搭建 V2Ray
date: 2022-06-11 22:45
categories: v2ray
---

## 前言

之所以想要搭建自己的 V2Ray 服务器, 是因为一直以来使用的 SSR 账号服务一天比一天不稳定，遂起意自己搭梯子，经过一番简单的研究之后选定了 V2Ray。

## 什么是 V2Ray

简单理解，V2Ray 是一个用来实现网络交互，处理网络数据的工具，也是 [Project V](https://www.v2ray.com/) 的核心工具，而 Project V 是一个网络环境构建工具集合。

V2Ray 的开发主要使用 Go 语言。

## 准备 VPS

选了简中互联网上呼声较高的 VPS 提供商 [Vultr](https://vultr.com)，创建账号登陆后进入 Products 标签页，点击右侧蓝色 + 号即可选购服务器（PS: 看到线上的教程说点击活动链接注册可冲10刀送100刀，也许是活动过期了，总之我没拿到赠额。）：

- **Choose Server**：选择 Cloud Compute（云计算）
- **CPU & Storage Technology**：要最便宜的就选 Regular Performance（普通性能）
- **Server Location**：机房位置离得越近延迟越短，但拿到被 ban 的 IP 的机率也更大
- **Server Image**：第一项 **Operating System**（操作系统）选了 Centos8 Stream ×64+，其余项非必需
- **Server Size**：服务器大小，最便宜的每月5刀
- **Add Auto Backups**：是否自动备份，每月收取服务器费用的1/5
- 剩下几项 **Additional Features**（附加功能）、**SSH Keys**（SSH 密钥）、**Server Hostname & Label**（服务器主机名 & 标签）都可以空着

全部选好之后点击右下方 Deploy New 创建服务器实例，过程需要等待几分钟，实例创建完成后，即可进入详情页查看服务器 IP 、账号密码和其余详情。

此时先试 IP 能否 ping 通，再通过[在线工具](http://port.ping.pe/)测试是否被 TCP 阻断，如果美国地区连接正常，国内地区连接失败，说明遇到了 TCP 阻断。如遇问题可删除实例，重新创建。

## 配置 V2Ray

### 一键配置

拿到可用的服务器 IP 和账号密码后，通过 SSH 连接服务器，开始配置 V2Ray。

以 macOS 为例，在终端执行：

```shell
ssh -l username serveraddress # ssh -l 后输入服务器账号和 IP
```

再按提示输入密码，执行连接，如果多次提示连接失败，可删除服务器新建一个再试。

连接成功后执行网友提供的[一键 V2Ray 脚本](https://raw.githubusercontent.com/xyz690/v2ray/master/install.sh)：

```shell
bash <(curl -s -L https://raw.githubusercontent.com/xyz690/v2ray/master/go.sh)
```

显示以下信息代表配置成功，可按提示生成 url 或二维码，配置客户端时使用：

[![v2ray-config-success](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/v2ray-config-success.jpg)](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/v2ray-config-success.jpg)

刚才执行的脚本自动安装了 [BBR 加速](https://cloud.google.com/blog/products/networking/tcp-bbr-congestion-control-comes-to-gcp-your-internet-just-got-faster)，可执行以下命令查看，有返回则代表 BBR 运行成功：

```shell
lsmod | grep bbr
```

全部完成后输入 `exit` 退出服务器即可。

### V2Ray 命令

可使用以下命令管理 V2Ray，或直接输入 v2ray 获取帮助：

```shell
v2ray info # 查看 V2Ray 配置信息
v2ray config # 修改 V2Ray 配置
v2ray link # 生成 V2Ray 配置文件链接
v2ray infolink # 生成 V2Ray 配置信息链接
v2ray qr # 生成 V2Ray 配置二维码链接
v2ray ss # 修改 Shadowsocks 配置
v2ray ssinfo # 查看 Shadowsocks 配置信息
v2ray ssqr # 生成 Shadowsocks 配置二维码链接
v2ray status # 查看 V2Ray 运行状态
v2ray start # 启动 V2Ray
v2ray stop # 停止 V2Ray
v2ray restart # 重启 V2Ray
v2ray log # 查看 V2Ray 运行日志
v2ray update # 更新 V2Ray
v2ray update.sh # 更新 V2Ray 管理脚本
v2ray uninstall # 卸载 V2Ray
```

## 使用 V2Ray 客户端

### 获取安装

获取 macOS V2Ray 客户端：[https://github.com/Cenmrev/V2RayX/releases](https://github.com/Cenmrev/V2RayX/releases)

### 添加服务器配置

安装成功后，点击顶部栏图标，选择 Configure 进入配置界面，即可手填或导入配置：

[![v2ray-client-config](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/v2ray-client-config.jpg)](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/v2ray-client-config.jpg)

最省事的导入方法选 “Import from standard share links”，把之前生成的 vmess url 拷贝粘贴进去确认即可，有机率会导入失败，可以多试几次。

[![v2ray-client-config-import](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/v2ray-client-config-import.jpg)](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/v2ray-client-config-import.jpg)

成功后可在 Server 选项中看到刚才添加的配置，此时选择偏好的代理模式，点击 Load core 连接后即可畅游互联网。

### 代理模式

有3种代理模式可选：

- **PAC mode**：Proxy auto-config，根据配置文件来确定当前连接是否需要代理，可自行按需编辑。
- **Global mode**：全局模式，所有连接都走代理，一些国内站点的访问速度会受影响。
- **Manual mode**：手动模式，不配置系统级代理，通常配合浏览器插件（例如 [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?utm_source=chrome-ntp-icon) ）或其他软件配置需要的代理模式。

## 增补

服务器搭建不到24小时就看到警告提示 ***“There were 331 failed login attempts since the last successful login.”***，搜索得知这是端口号为22的 VPS 经常遇到的情况，于是做了一点加固，在服务器上安装了 [fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page)，对多次连接失败的 IP 禁止其之后的连接：

```shell
dnf install epel-release
dnf install fail2ban
echo '
[sshd] 
enabled = true
' > /etc/fail2ban/jail.local
systemctl restart fail2ban
```

## References

- [2022最新V2Ray搭建图文教程，V2Ray一键搭建脚本](https://www.itblogcn.com/article/406.html)
- [十分钟搭建，史上最全梯子教程](https://fileem.com/how-can-the-shadowsocket-ladder-not-be-used-2-5-knives-a-month-try-to-build-a-ladder-with-v2ray-ten-minutes-to-build-the-most-complete-ladder-tutorial-in-history)
- [How To Setup Your Own v2ray on a Virtual Server](https://privacymelon.com/v2ray-setup-guide/)
- [Using SSH from Mac OS X](https://ist.njit.edu/using-SSH-from-Mac-OS-X)
- [V2Ray 配置指南](https://guide.v2fly.org/)
- [终端设置代理](https://www.clloz.com/programming/assorted/2020/09/15/terminal-proxy-configure/)
- [SSH: There were X failed login attempts since the last successful login.](https://clients.websavers.ca/whmcs/knowledgebase/298/SSH-There-were-X-failed-login-attempts-since-the-last-successful-login..html)