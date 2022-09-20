---
layout: default
---

<ul>
  {% for post in site.posts %}
    <li>
      {{ post.date | date: "%b %-d, %Y" }}: <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
