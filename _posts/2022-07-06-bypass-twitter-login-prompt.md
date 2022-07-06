---
layout: post
title: Bypass Twitter Login Prompts Easily
date: 2022-07-06 20:14
---

Getting sick of Twitter's forced login prompts, meanwhile have no intention to create an account? It's pretty easy to get rid of these annoying popups.

If you are browsing Twitter on desktop using Chrome, simply run below in the console(Ctrl+Option+J on Mac or Ctrl+Shift+J on Windows to open it):

```js
$('html').style.overflow = 'scroll';
$('div[role="dialog"]').style.display = 'none';
```

In this way you may scroll without interrupted popups on your current page, but the code won't survive page refreshes.

So the more convienent way is to use an ad blocking extension, e.g. [Adblock Plus](https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb), to customize the layout and style of a website. 

Navigate to setting - advanced - my filter list to add your custom filters:

```
twitter.com#$#html{ overflow: scroll !important; }
twitter.com##div[role="dialog"]
```

Now as long as your ad blocker is on, you may read tweets just fine without an account.