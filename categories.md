---
layout: default
permalink: /categories/
title: categories
---

<div>
{%-include back_link.html-%}

<h1>{{ page.title }}</h1>

{% assign categories_sorted = site.categories | sort %}
{% for category in categories_sorted %}
  <ul class="category-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <h2 id="#{{ category_name | slugize }}"></h2>
    <p></p>

    <li class="category-head">{{ category_name }}</li>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <ul class="category-item">
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></li>
    </ul>
    {% endfor %}
  </ul>
{% endfor %}
</div>