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

<small>Looking for more? Check out my <a href="http://getpocket.com/@2cHdWpb7T5f1bg5123Aej68AaNg7TN14823K78g4aoW4ejW46ej1fJ70A57Pl6cH?src=navbar">Pocket recommendations</a>.</small>
