---
layout: post
title: Jekyll 站点的时区
date: 2022-11-24 00:13 +0800
categories: [notes, lang:zh]
---

这个站刚发布的时候遇到过一个问题：在本地能正常显示的文章，部署线上却无迹可寻。

研究了老半天之后才发现，是文章日期格式不对，`YYYY-MM-DD hh:mm:ss` 丢了末尾的时区 `+/-TTTT`，Jekyll 基于全球标准时间（-0000）将我写的东八区时间（+0800）视为了未来时间，而 Jekyll 默认是不会构建未来日期的文章的。

今天读了一个名叫 Rustam Mehmandarov 的博主的[博文](https://mehmandarov.com/jekyll-content-on-time/)之后，才发现果然不止我遇到过这样的窘境。Rustam 在他的博文中解释得非常清楚，还附带提到了可以在 `_config.yml` 中配置全局时区 `timezone`，[官方文档](https://jekyllrb.com/docs/configuration/options/)有详细介绍并给出了有效值的参考[链接](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。

经测试这个值的权重高于日期格式中的时区。

