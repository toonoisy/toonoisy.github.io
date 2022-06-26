---
layout: post
title: Leetcode 45. Jump Game II
date: 2022-06-26 12:40
categories: leetcoding
---

> [#45](https://leetcode.com/problems/jump-game-ii/)
>
> Given an array of non-negative integers `nums`, you are initially positioned at the first index of the array.
>
> Each element in the array represents your maximum jump length at that position.
>
> Your goal is to reach the last index in the minimum number of jumps.
>
>  You can assume that you can always reach the last index.
>
> 
>
> **Example 1:**
> 
> ```
> Input: nums = [2,3,1,1,4]
> Output: 2
>Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
> ```
>
> **Example 2:**
> 
> ```
> Input: nums = [2,3,0,1,4]
>Output: 2
>  ```
>
> 
>
> **Constraints:**
> 
>- `1 <= nums.length <= 104`
> - `0 <= nums[i] <= 1000`
>



```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// Time Complexity: O(n)
const jump = function(nums) {
  let count = 0;
  // init cur position as 0 to start the 1st iteration, count will be at least 1 unless nums only contains one element
  let cur = 0;
  let next = 0;
  // set i < nums.length - 1 to prevent iteration when we already at the last position
  for (let i = 0; i < nums.length - 1; i++) {
    // max position to reach
    next = Math.max(nums[i] + i, next); 
    // need to move further, time to jump & add count
    if (cur === i) { 
      cur = next;
      count++;
    }
  }
  return count;
};
```

