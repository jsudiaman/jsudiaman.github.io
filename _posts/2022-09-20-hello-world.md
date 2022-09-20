---
layout: default
title: "Hello, World!"
---

If you are reading this post, it means that my blog is currently up and running! Hooray! 🎉

As an introductory blog post, I figured it would be appropriate to document exactly how this blog is setup. If you're curious, the source code is publicly available on my [GitHub repository](https://github.com/sudiamanj/sudiamanj.github.io).

## Framework and Hosting

The blogging framework I chose was [Jekyll](https://jekyllrb.com/). Having no GUI and being entirely CLI based, the learning curve might seem daunting at first. However, the documentation is fairly straightforward to follow, especially if you are familiar with Ruby. The main advantage of using Jekyll is that it is a **static site generator**, i.e. there is no need for a backend to store the blog posts. More importantly, this means that it can be hosted on [GitHub Pages](https://pages.github.com/), free of charge! This saves me money to help feed my caffeine addiction. :)

One more thing you might notice is that there are no CI/CD configuration files stored on the repo. GitHub Pages are built with Jekyll by default, so all you need is the front matter and GitHub handles the build process for you.

## Theming

I built a minimal theme based on [Tacit](https://yegor256.github.io/tacit/) and [Font Awesome](https://fontawesome.com/). It's not available as a Ruby gem, but most of the "guts" are in [\_layouts/default.html](https://github.com/sudiamanj/sudiamanj.github.io/blob/5561d8932934ae6684fc4de17eb9472f88088751/_layouts/default.html).

## Comments

Currently, there is no ability to leave comments on a blog post. Being a static site generator, Jekyll is unable to implement this functionality out of the box. However, I will consider integrating something like [Disqus](https://disqus.com/) in the future!
