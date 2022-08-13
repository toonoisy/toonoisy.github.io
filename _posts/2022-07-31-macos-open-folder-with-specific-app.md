---
layout: post
title: Open Folder With Specific App on Mac
date: 2022-07-31 21:59
categories: macos
---

## Automator Workflow

Assuming we would like to right click any folder on macOS Finder to open it with a specific app, say Visual Studio Code, let's see how the Automator application could help.

Spotlight search "Automator.app", once opened it,

- choose "Quick Action" > "Utilities" > "Run Shell Script"
- select workflow receives current "folders" in "Finder.app"
- set pass input "as arguments"
- insert below script, and finally Ctrl+S to save it

```shell
for f in "$@"
do
	open -a "Visual Studio Code" "$f"
done
```

[![quick-action-open-with-code](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/quick-action-open-with-code.png)](https://cdn.jsdelivr.net/gh/toonoisy/asset-hosting/img/quick-action-open-with-code.png)

Now get back to Finder > right click a folder > choose "Quick Actions", then we can see the item we just created appears on the menu, give it a go.

## Automation With AppleScript

Here's another amazing solution I found on GitHub: [open-folder-with-vs-code](https://github.com/hamxiaoz/open-folder-with-vs-code), which leverages AppleScript app created by Script Editor, go check it.

