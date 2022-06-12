---
layout: post
title: Github + jsDelivr + PicGo 搭建图床笔记
date: 2022-06-12 19:02
---
## 前言

博客长期经营下去，势必会累计不少博文配图，使用 Github + jsDelivr + PicGo 搭建一个免费图床，不仅可以解决大体积静态资源存储的问题，还优化了网站资源访问速度。

## jsDelivr 介绍

[jsDelivr](https://www.jsdelivr.com/) 是一款免费的开源 CDN 服务，目前支持 npm、GitHub、WordPress 三个站点的资源访问加速，在包括中国大陆以内的全球范围内拥有超过750个节点。

jsDelivr 有多种访问资源的方式，以访问 GitHub 为例：

```js
// 加载任何版本、提交或分支；如果项目使用 npm 的话更推荐使用 npm
https://cdn.jsdelivr.net/gh/user/repo@version/file

// 加载某个具体的版本，如下加载了 jQuery 3.2.1版本
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js

// 使用某个范围内的版本，而非某个特点版本
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2/dist/jquery.min.js
https://cdn.jsdelivr.net/gh/jquery/jquery@3/dist/jquery.min.js

// 忽略版本号，加载最新的资源；在资源频繁更新的生产版本中不应该这样用
https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js

// 在任何 JS/CSS 文件中添加".min "以获取压缩版本，原本没有则自动生成压缩版本
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/src/core.min.js

// 在路径末尾添加“/”可获取目录列表
https://cdn.jsdelivr.net/gh/jquery/jquery/
```

## GitHub 准备工作

### 新建一个仓库

首先创建一个新的公开仓库，专门用来存储图片。

### 生成一个 token

依次点击 GitHub 右上角个人头像 => Settings => Developer settings => Personal access tokens => Generate new token，填写描述：

![gh-new-personal-access-token](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/gh-new-personal-access-token.jpg)

- **Note** 中填写 token 的用途
- **Expiration** 是令牌有效时间，过期前 Github 会发邮件提醒延长有效期
- **Select scopes** 部分仅需勾选 repo，即开放访问仓库的权限

完成后点击最下方 Generate token，即可生成 token。这时候需要把 token 记下来，因为下次访问的时候不会再显示 token 内容。如果 token 丢失，也可以重新生成一个。

## PicGo 配置

### 获取安装

[PicGo](https://github.com/Molunerfinn/PicGo) 是一个用于快速上传图片并获取图片 URL 链接的工具，如果是第一次使用，建议安装最新的稳定版本：[https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0)

### 图床设置

以 macOS 为例，安装成功后**双击**顶部栏图标，然后依次点击 打开详细窗口 => 图床设置 => GitHub 图床，填写配置：

![picgo-gh-config](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/picgo-gh-config.jpg)

- **设定仓库名称**：格式为“GitHub 用户名/仓库名”
- **设定分支名**：如果创建仓库后没有新增或修改分支，那么默认是 main
- **设定 Token**：填写刚才生成的 token
- **指定存储路径**：自定义，非必填
- **设定自定义域名**：填写 jsdelivr 可用的格式即可使用其加速服务，举例“https://cdn.jsdelivr.net/gh/设定的仓库名称”，PicGo 会以此拼接具体的资源路径

保存设置生效后就可以上传图片了，可以直接拖拽文件至顶部栏图标，也可在上传区操作。如果需要，上传前还可以利用[在线工作](https://tinypng.com/)对图片尺寸进行压缩。

上传完成后可以复制需要的链接格式，同时图片也会在相册中显示。这时候访问之前创建的仓库，会看到图片已经上传在其中了（可能存在延迟）。

### 注意事项

- 仓库不可上传同名文件，为了避免重名，可以在 PicGo 设置中开启“上传前重命名”或“时间戳重命名”，两者都会**默认用时间戳重命名**，前者上传前还可以再修改一次
- 在 PicGo 相册中移除图片不会将其从仓库中移除，请使用 git 管理仓库，或直接在仓库中预览该文件并执行删除

## 可选：使用 Releases 管理不同版本的资源

前面提到 jsDelivr 是可以通过不同版本号访问资源的。访问创建的仓库，点击侧边栏的 Releases 即可管理或发表版本。

点击 Draft a new release 创建新的 release，每次发布要使用一个新的 tag：

![gh-publish-new-release](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/gh-publish-new-release.jpg)

有多个 releases 的时候就可以按版本区别资源了，即使有资源后续被删除，也可以通过旧版本号访问。

该方案适合资源频繁更新的项目，如果仅存放几乎不需要更新的静态资源，如此操作反而繁琐。

## References

- [Github+jsDelivr+PicGo 打造稳定快速、高效免费图床](https://blog.csdn.net/qq_36759224/article/details/98058240)
- [免费CDN：jsDelivr+Github 使用方法](https://blog.csdn.net/qq_36759224/article/details/86936453)
- [利用jsDelivr白嫖全球超高速静态资源访问服务！](https://www.bilibili.com/read/cv4297993)
- [How Does a CDN Work?](https://www.cdnetworks.com/web-performance-blog/how-content-delivery-networks-work/)
