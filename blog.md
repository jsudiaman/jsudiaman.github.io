---
layout: default
title: Blog
---

<table>
    {% for post in site.posts %}
        <tr>
            <td class="blog-post-title"><a href="{{ post.url }}">{{ post.title }}</a></td>
            <td><i class="fas fa-calendar-day"></i> {{ post.date | date: site.date_format }}</td>
            <td><i class="fas fa-stopwatch"></i> {{ post.content | number_of_words | divided_by: site.estimated_wpm }} minute read</td>
        </tr>
    {% endfor %}
</table>

<small>Looking for more? Check out my <a href="http://getpocket.com/@158g5d6fpY1f5A282fTb34aT6aA9p1b1593pdiVb8cbzd5E526203w88kD1Zd1cF?src=navbar">Pocket recommendations</a>.</small>
