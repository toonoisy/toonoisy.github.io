---
layout: post
title: Getting RangeError Maximum call stack size exceeded with Jest
date: 2022-04-14 19:04
---

事情是这样，我周二晚上提交的代码没跑过流水线，查看了日志是在运行 npm run test 的时候出了问题：jest 长时间卡在某个测试用例文件，最终栈溢出报错 `RangeError: Maximum call stack size exceeded`。

以下是我耗时漫长且非常没有技术含量的 debug 过程：

1. 检查最新提交是否存在递归调用的代码 => 否
2. 最新测试用例是否能在本地跑过 => 是
3. 移除我的用例文件再跑一次 => 得到相同的报错

到这一步可以认定问题不是我的代码或者用例造成的，于是：

4. 再次查看日志，找到报错前运行的最后一个用例文件，将其移除再跑一次 => 构建成功

定位到文件了，为什么一早没想到检查报错前运行的最后一个文件呢？？

5. 检查导致报错的用例文件是否能在本地跑过 => 是

非常困惑且至今不解。

6. 检查用例对应的组件代码 => 发现组件在 create() 中调用的 action 函数存在使用 Message.warning() 提示错误信息的场景，用例中刚好涉及了这个场景
7. 检查用例中是否有模拟这个 Message.warning() 方法 => 否

所以修复方案来了：

```
import { Message } from 'element-ui';
Message.warning = jest.fn();
```

8. 重新提交代码 => 构建成功



最后还留下几点疑惑：

- 为什么用例能在本地跑过？
- 为什么出错的用例第一次提交时能够跑过流水线？
- 为什么只有我提交的代码触发了流水线报错？



