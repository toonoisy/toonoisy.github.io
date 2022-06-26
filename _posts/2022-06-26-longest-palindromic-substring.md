---
layout: post
title: Leetcode 5. Longest Palindromic Substring
date: 2022-06-26 19:53
categories: leetcoding
---

> [#5](https://leetcode.com/problems/longest-palindromic-substring/)
>
> Given a string `s`, return *the longest palindromic substring* in `s`.
>
> 
>
> **Example 1:**
>
> ```
> Input: s = "babad"
> Output: "bab"
> Explanation: "aba" is also a valid answer.
> ```
>
> **Example 2:**
>
> ```
> Input: s = "cbbd"
> Output: "bb"
> ```
>
> 
>
> **Constraints:**
>
> - `1 <= s.length <= 1000`
> - `s` consist of only digits and English letters.
>



```js
/**
 * @param {string} s
 * @return {string}
 */
// Time Complexity: O(n^2)
const longestPalindrome = function(s) {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    /*
      palindrome with odd length centers around 1 char, while even length centers around 2
      e.g.: 'aba', the center is 'b'
            'abba', the center is 'bb'
    */
    const oddStr = findLongestPalindrome(s, i, i);
    const evenStr = findLongestPalindrome(s, i, i+1);
    const longest = oddStr.length > evenStr.length ? oddStr : evenStr;
    res = longest.length > res.length ? longest : res;
  }
  return res;

  function findLongestPalindrome (s, l, r) {
    // expand around center
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    // once the expander breaks, return the last result found
    return s.slice(l+1, r);
  }
};
```

