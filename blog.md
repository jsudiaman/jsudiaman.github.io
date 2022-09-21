---
layout: default
title: Blog
---

<table>
    {% for post in site.posts %}
        <tr>
            <td><a href="{{ post.url }}">{{ post.title }}</a></td>
            <td><i class="fas fa-calendar-day"></i> {{ post.date | date: site.date_format }}</td>
            <td><i class="fas fa-stopwatch"></i> {{ post.content | number_of_words | divided_by: site.estimated_wpm }} minute read</td>
        </tr>
    {% endfor %}
</table>
