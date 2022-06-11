---
layout: post
title: how this site was built
date: 2022-03-30 01:59
---

Yet another personal site built on Github Pages with jekyll was born. This is an article about how I created this site step by step.

#### Step #1: Create a repository 

Create a public Github repository named username.github.io and clone it to local, which for me is toonoisy.github.io, also as my default domain.

#### Step #2: Install Ruby and Jekyll

- Install Ruby via Homebrew on macOs, or other available methods on [their website](https://www.ruby-lang.org/en/documentation/installation)

  ```shell
  brew install ruby
  ```

- Install Jekyll gem

  ```shell
  gem install jekyll bundler
  ```

#### Step #3: Generate a Jekyll site and build it locally

- Run below at the local repository folder

  ```shell
  jekyll new . --force
  ```

- Build it locally, then go check [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

  ```shell
  bundle exec jekyll serve
  ```

#### Step #4: Add a theme

- Where to find free Jekyll themes

  - [http://jekyllthemes.org/](http://jekyllthemes.org/)

  - [https://jekyll-themes.com/free/](https://jekyll-themes.com/free/)

  - [https://jamstackthemes.dev/#ssg=jekyll](https://jamstackthemes.dev/#ssg=jekyll)

  I made my pick: [http://jekyllthemes.org/themes/no-style-please/](http://jekyllthemes.org/themes/no-style-please/)

- Theme installation and usage

  Follow the author's README.md, it normally explained everything. But still I made a mistake in my *_config.yml* due to careless, which caused deployment failure later: 

  For the line to specify theme name, if it was one of Github Pages' "[supported themes](https://pages.github.com/themes/)", you may type `theme: THEME-NAME`, but for any other themes, you need to type `remote_theme: AUTHOR-NAME/THEME-NAME`, so the correct config for me was `remote_theme: riggraz/no-style-please`, instead of `theme: no-style-please`.

#### Step #5: Time to make content

- Add content on a markdown file named "*YYYY-MM-DD-NAME-OF-POST*", which must contain a YAML frontmatter for example as below

  ```
  layout: post
  title:  type-your-post-title-here
  date: YYYY-MM-DD hh:mm:ss -0000
  categories: your-category-which-is-optional	
  ```

- Add the file to *_posts* folder, rebuild it locally to check the changes

#### Step #6: Build on Github Pages

Add, commit, and push, then leave the rest to Github Pages! Yet things didn't happen as I expected first...

#### Plus Step #7: Troubleshooting

After resolving the cause of deployment failure mentioned above, I was finally able to access my site online, but I noticed that my posts weren't showing up at all.

I checked several relevent issues and answers on Google results, mostly said the problem was with ungitignored folders, for example `vendor`, which was not applicable to my case.

这时候终于想起我的母语来了，于是去中文社区查了一圈，看到有类似经历的人提醒 “Jekyll是不会构建**未来日期**的文章的！”

So I finally realized that ***Jekyll would not build posts with a future date by default***. My VPN stayed connected while I was configuring my project, but I still used my local time and date on post files, therefore my posts were identified as being from the future and excluded from the build.

After using `future: true` in my _config.yml to tell Jekyll to publish future posts, the problem was settled.

