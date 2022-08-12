---
layout: post
title: Bypass Twitter Login Prompts
date: 2022-07-06 20:14
categories: ad_filters
---

Getting sick of Twitter's forced login prompts, meanwhile having no intention to create an account? It's pretty easy to get rid of these annoying popups.

If you are browsing Twitter on desktop using Chrome, simply run below in the console (Command+Option+J on Mac or Ctrl+Shift+J on Windows to open it):

```js
$('html').style.overflow = 'scroll';
$('.css-1dbjc4n.r-1awozwy.r-1kihuf0.r-18u37iz.r-1pi2tsx.r-1777fci.r-1pjcn9w.r-xr3zp9.r-1xcajam.r-ipm5af.r-g6jmlv').style.display = 'none';
```

In this way you may scroll without interrupted popups on your current page, but the code won't survive page refreshes.

So the more convienent way is to use an [ad blocking extension](https://chrome.google.com/webstore/search/ad%20blocking?_category=extensions) to always apply your customization.

Add to your ad blocker below filter rules:

```
twitter.com#$#html{ overflow: scroll !important; }
twitter.com##.css-1dbjc4n.r-1awozwy.r-1kihuf0.r-18u37iz.r-1pi2tsx.r-1777fci.r-1pjcn9w.r-xr3zp9.r-1xcajam.r-ipm5af.r-g6jmlv
```

Now as long as your blocker is on, you may read tweets just fine without an account.