---
layout: post
title: Leetcode 3. Longest Substring Without Repeating Characters
date: 2022-06-25 20:41
categories: leetcoding
---
> [#3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
>
>  Given a string `s`, find the length of the **longest substring** without repeating characters.
>
> 
>
> **Example 1:**
> 
> ```
> Input: s = "abcabcbb"
> Output: 3
>Explanation: The answer is "abc", with the length of 3.
> ```
>
> **Example 2:**
> 
> ```
> Input: s = "bbbbb"
> Output: 1
>Explanation: The answer is "b", with the length of 1.
> ```
>
> **Example 3:**
> 
> ```
> Input: s = "pwwkew"
> Output: 3
> Explanation: The answer is "wke", with the length of 3.
>Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
>  ```
>
> 
>
> **Constraints:**
> 
>- `0 <= s.length <= 5 * 104`
> - `s` consists of English letters, digits, symbols and spaces.
>



```js
/**
* @param {string} s
* @return {number}
*/
// Time Complexity: O(n)
const lengthOfLongestSubstring = function(s) {
  let max = 0;
  const chars = [];
  for (let i = 0; i < s.length; i++) {
    const charIdx = chars.indexOf(s[i]);
    // once a repeated char appears, clear it along with the chars added before
    if (charIdx !== -1) {
      chars.splice(0, charIdx +1);
    }

    // a while loop can do the same trick but costs a bit longer runtime
    // while (chars.includes(s[i])) {
    //   chars.shift();
    // }

    // add or re-add a char
    chars.push(s[i]);
    // always keep the max length
    max = Math.max(max, chars.length);
  }
  return max;
};
```

