---
layout: post
title: How This Site Was Built
date: 2022-03-30 01:59
---

Yet another personal site built on GitHub Pages with jekyll was born. This is an article about how I created this site step by step.

#### Step #1: Create a repository 

Create a public GitHub repository named username.github.io and clone it to local, which for me is toonoisy.github.io, also as my default domain.

#### Step #2: Install Ruby and Jekyll

- Install Ruby via Homebrew on macOS, or other available methods on [their website](https://www.ruby-lang.org/en/documentation/installation)

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

  Follow the author's README.md, it normally explained everything. But still I made a careless mistake in my *_config.yml*, which caused deployment failure later: 

  For the line to specify theme name, if it was one of GitHub Pages' "[supported themes](https://pages.GitHub.com/themes/)", you may type `theme: THEME-NAME`, but for any other themes, you need to use `remote_theme: AUTHOR-NAME/THEME-NAME`, so the correct config for me was `remote_theme: riggraz/no-style-please`, instead of `theme: no-style-please`.

#### Step #5: Time to make content

- Add content on a markdown file named "*YYYY-MM-DD-NAME-OF-POST*", which must contain a YAML frontmatter for example as below

  ```
  layout: post
  title:  type-your-post-title-here
  date: YYYY-MM-DD hh:mm:ss -0000
  categories: your-category-which-is-optional	
  ```

- Add the file to *_posts* folder, rebuild it locally to check the changes

#### Step #6: Build on GitHub Pages

Add, commit, and push, then leave the rest to GitHub Pages! Yet things didn't happen as I expected first...

#### Plus Step #7: Troubleshooting

After sorting out the deployment failure mentioned above, I was finally able to access my site online, but with my posts weren't showing up at all.

I checked several relevent issues and answers on Google, mostly said the problem was with un-gitignored folders, for example *vendor*, which was not applicable to my case.

Eventually I realized that ***Jekyll would not build future dated posts by default***. My VPN stayed on during the whole process, but I was using my local time and date on the posts, therefore they were considered to be future dated and excluded from the build.

After adding `future: true` in my *_config.yml* to allow future posts, the problem was solved.

