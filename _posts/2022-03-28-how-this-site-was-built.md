---
layout: post
title: How This Site Was Built (revised)
date: 2022-03-30 01:59 +0800
categories: [notes, lang:en]
---

Yet another personal site built on GitHub Pages with jekyll was born. This is an article about how I created this site step by step.

## Step #1: Create a repository 

Create a public GitHub repository named *username.github.io* and clone it to local, which for me is *[toonoisy.github.io](https://toonoisy.github.io/)*, also as my default domain.

## Step #2: Install Ruby and Jekyll

- Install Ruby via Homebrew on macOS, or other available methods on [their website](https://www.ruby-lang.org/en/documentation/installation)

  ```shell
  brew install ruby
  ```

- Install Jekyll gem

  ```shell
  gem install jekyll bundler
  ```

## Step #3: Generate a Jekyll site and build it locally

- Run below at the local repository folder

  ```shell
  jekyll new . --force
  ```

- Build it locally, then go check [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

  ```shell
  bundle exec jekyll serve
  ```

## Step #4: Add a theme

- Where to find free Jekyll themes

  - [http://jekyllthemes.org/](http://jekyllthemes.org/)
  - [https://jekyll-themes.com/free/](https://jekyll-themes.com/free/)
  - [https://jamstackthemes.dev/#ssg=jekyll](https://jamstackthemes.dev/#ssg=jekyll)

  I made my pick: [http://jekyllthemes.org/themes/no-style-please/](http://jekyllthemes.org/themes/no-style-please/)

- Follow the author's `README.md` for theme installation and usage

  *NOTE: if you are using one of GitHub Pages' "[supported themes](https://pages.GitHub.com/themes/)", simply add `theme: THEME-NAME` in your `_config.yml`, but for any other themes, you need to use `remote_theme: AUTHOR-NAME/THEME-NAME`. For example the correct config for me should be `remote_theme: riggraz/no-style-please`, instead of `theme: no-style-please`.*


## Step #5: Time to make content

- Add content on a markdown file named "*YYYY-MM-DD-NAME-OF-POST*", which must contain a YAML frontmatter for example as below

  ```
  layout: post
  title:  type-your-post-title-here
  date: YYYY-MM-DD hh:mm:ss +/-TTTT
  categories: your-category-which-is-optional	
  ```

  *NOTE: for the date of your posts, stick to the format `date: YYYY-MM-DD hh:mm:ss +/-TTTT`. **Do not forget to specify your timezone** or you will get "-0000" by default. If your local time zone is ahead of that, Jekyll may assume your posts are dated in the future, and therefore not publish them until the time.*

- Add the file to `_posts` folder, rebuild it locally to check the changes

## Step #6: Build on GitHub Pages

Add, commit, and push, then leave the rest to GitHub Pages.

