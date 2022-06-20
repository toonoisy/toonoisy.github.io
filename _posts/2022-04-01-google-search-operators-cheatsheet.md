---
layout: post
title: Google Search Operators Cheatsheet
date: 2022-04-01 19:04
---

| Operator      | Description                                                  | Example                                                      | State |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----- |
| “search term” | Force an exact-match search. Use this to refine results for ambiguous searches, or to exclude synonyms when searching for single words. | **[“steve jobs”](https://www.google.com/search?&q="steve+jobs")** | ⎷     |
| OR            | Search for X or Y. This will return results related to X or Y, or both. <br />**Note**: The pipe (\|) operator can also be used in place of “OR.” | **[jobs OR gates](https://www.google.com/search?&q=jobs+OR+gates)** / **[jobs \| gates](https://www.google.com/search?&q=jobs+%7C+gates)** | ⎷     |
| AND           | Search for X *and* Y. This will return only results related to both X *and* Y. <br />**Note:** It doesn’t really make much difference for regular searches, as Google defaults to “AND” anyway. But it’s very useful when paired with other operators. | **[jobs AND gates](https://www.google.com/search?&q=jobs+AND+gates)** | ⎷     |
| -             | Exclude a term or phrase. In our example, any pages returned will be related to jobs but *not* Apple (the company). | **[jobs ‑apple](https://www.google.com/search?q=jobs+-apple)** | ⎷     |
| *             | Acts as a wildcard and will match any word or phrase.        | **[steve \* apple](https://www.google.com/search?q="steve+\*+apple)** | ⎷     |
| ( )           | Group multiple terms or search operators to control how the search is executed. | **[(ipad OR iphone) apple](https://www.google.com/search?q=(ipad+OR+iphone)+apple)** | ⎷     |
| $             | Search for prices. Also works for Euro (€), but not GBP (£)  | **[ipad $329](https://www.google.com/search?q=ipad+%24329)** | ⎷     |
| define:       | A dictionary built into Google, basically. This will display the meaning of a word in a card-like result in the SERPs. | **[define:entrepreneur](https://www.google.com/search?q=define%3Aentrepreneur)** | ⎷     |
| cache:        | Returns the most recent cached version of a web page (providing the page is indexed, of course). | **[cache:apple.com](http://webcache.googleusercontent.com/search?q=cache%3Aapple.com)** | ⎷     |
| filetype:     | Restrict results to those of a certain filetype. E.g., PDF, DOCX, TXT, PPT, etc. <br />**Note:** The “ext:” operator can also be used—the results are identical. | **[apple filetype:pdf](https://www.google.com/search?q=apple+filetype%3Apdf)** / **[apple ext:pdf](https://www.google.com/search?q=apple+ext%3Apdf)** | ⎷     |
| site:         | Limit results to those from a specific website.              | **[site:apple.com](https://www.google.com/search?q=site%3Aapple.com)** | ⎷     |
| related:      | Find sites related to a given domain.                        | **[related:apple.com](https://www.google.com/search?q=related%3Aapple.com)** | ⎷     |
| intitle:      | Find pages with a certain word (or words) in the title. In our example, any results containing the word “apple” in the title tag will be returned. | **[intitle:apple](https://www.google.com/search?q=intitle%3Aapple)** | ⎷     |
| allintitle:   | Similar to “intitle,” but only results containing *all* of the specified words in the title tag will be returned. | **[allintitle:apple iphone](https://www.google.com/search?q=allintitle%3Aapple+iphone)** | ⎷     |
| inurl:        | Find pages with a certain word (or words) in the URL. For this example, any results containing the word “apple” in the URL will be returned. | **[inurl:apple](https://www.google.com/search?q=inurl%3Aapple)** | ⎷     |
| allinurl:     | Similar to “inurl,” but only results containing *all* of the specified words in the URL will be returned. | **[allinurl:apple iphone](https://www.google.com/search?q=allinurl%3Aapple+iphone)** | ⎷     |
| intext:       | Find pages containing a certain word (or words) somewhere in the content. For this example, any results containing the word “apple” in the page content will be returned. | **[intext:apple](https://www.google.com/search?q=intext%3Aapple)** | ⎷     |
| allintext:    | Similar to “intext,” but only results containing *all* of the specified words somewhere on the page will be returned. | **[allintext:apple iphone](https://www.google.com/search?q=allintext%3Aapple+iphone)** | ⎷     |
| AROUND(X)     | Proximity search. Find pages containing two words or phrases within X words of each other. For this example, the words “apple” and “iphone” must be present in the content and no further than four words apart. | **[apple AROUND(4) iphone](https://www.google.com/search?q=apple+AROUND(4))** | ⎷     |
| weather:      | Find the weather for a specific location. This is displayed in a weather snippet, but it also returns results from other “weather” websites. | **[weather:san francisco](https://www.google.com/search?q=weather%3Asan+francisco)** | ⎷     |
| stocks:       | See stock information (i.e., price, etc.) for a specific ticker. | **[stocks:aapl](https://www.google.com/search?q=stocks%3Aaapl)** | ⎷     |
| map:          | Force Google to show map results for a locational search.    | **[map:silicon valley](https://www.google.com/search?q=map%3Asilicon+valley)** | ⎷     |
| movie:        | Find information about a specific movie. Also finds movie showtimes if the movie is currently showing near you. | **[movie:steve jobs](https://www.google.com/search?q=movie%3Asteve+jobs)** | ⎷     |
| in            | Convert one unit to another. Works with currencies, weights, temperatures, etc. | **[$329 in GBP](https://www.google.com/search?q=%24329+in+GBP)** | ⎷     |
| source:       | Find news results from a certain source in Google News.      | **[apple source:the_verge](https://www.google.com/search?q=apple+source%3Athe_verge&tbm=nws)** | ⎷     |
| _             | Not exactly a search operator, but acts as a wildcard for Google Autocomplete. | **[apple CEO _ jobs](https://www.google.com/search?q=apple+CEO+_+jobs)** | ⎷     |
| #..#          | Search for a range of numbers. In the example below, searches related to “WWDC videos” are returned for the years 2010–2014, but not for 2015 and beyond. | **[wwdc video 2010..2014](https://www.google.com/search?q=wwdc+video+2010..2014)** | ?     |
| inanchor:     | Find pages that are being linked to with specific anchor text. For this example, any results with inbound links containing either “apple” or “iphone” in the anchor text will be returned. | **[inanchor:apple iphone](https://www.google.com/search?q=inanchor%3Aapple+iphone)** | ?     |
| allinanchor:  | Similar to “inanchor,” but only results containing *all* of the specified words in the inbound anchor text will be returned. | **[allinanchor:apple iphone](https://www.google.com/search?q=allinanchor%3Aapple+iphone)** | ?     |
| blogurl:      | Find blog URLs under a specific domain. This was used in Google blog search, but I’ve found it does return some results in regular search.<br />**SIDENOTE**: Google blog search discontinued in 2011 | **[blogurl:microsoft.com](https://www.google.com/search?q=blogurl%3Amicrosoft.com)** | ?     |
| loc:placename | Find results from a given area. <br />**SIDENOTE**: Not officially deprecated, but results are inconsistent. | **[loc:”san francisco” apple](https://www.google.com/search?q=loc%3A"san+francisco"+apple)** | ?     |
| location:     | Find news from a certain location in Google News.<br />**SIDENOTE**: Not officially deprecated, but results are inconsistent. | **[loc:”san francisco” apple](https://www.google.com/search?q=loc%3A"san+francisco"+apple)** | ?     |



**Source:** **[Google Search Operators: The Complete List (42 Advanced Operators)](https://ahrefs.com/blog/google-advanced-search-operators/)**

