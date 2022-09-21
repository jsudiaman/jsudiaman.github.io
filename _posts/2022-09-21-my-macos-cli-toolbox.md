---
layout: default
title: "Bootstrapping the macOS CLI"
---

I consider myself to be a fairly heavy CLI user. Not to say that I edit everything through Vim and use cURL to browse the web, of course. But I do think that it's worth spending some time to improve upon the stock terminal application. Here's how my prompt currently looks:

![iTerm2 Prompt](/assets/iTerm2.png)

Not too shabby! Here's how I was able to accomplish this.

## Homebrew

[Homebrew](https://brew.sh/) describes itself as "The Missing Package Manager for macOS", and I believe that's the best way to put it. In case you're unfamiliar with how package managers in Linux work, they provide a standardized way to install (or uninstall) pretty much anything that you need. It's also generally safer to download things via Homebrew, as it performs integrity checks on any package you install.

## iTerm2

iTerm2 has a wide variety of [features](https://iterm2.com/features.html). Split Panes is the one I use most often by far. I also like how it automatically copies highlighted text. This may seem superfluous, but my muscle memory has ingrained this operation to the point where I forget that I need to actually use <kbd>Command-C</kbd> on those rare occasions that I'm using vanilla Terminal.

## Powerline

[Powerline](https://powerline.readthedocs.io) is the cherry on top that lets me visualize the current working directory, as well as the current branch if I'm currently inside a Git or Mercurial repo. Being technically a Vim plugin (with bindings for bash/zsh/etc), the setup process is somewhat underdocumented, but I'll go over the basic steps.

```
# Install the powerline-status package from pip.
python3 -m pip install --user powerline-status

# Load the Powerline bindings for zsh on startup.
# For other shell prompts such as bash, see https://powerline.readthedocs.io/en/master/usage/shell-prompts.html
echo ". $(python3 -m site --user-base)/lib/python/site-packages/powerline/bindings/zsh/powerline.zsh" >> ~/.zshrc

# Install Powerline fonts.
git clone https://github.com/powerline/fonts.git
./fonts/install.sh
```

The last step is to update your iTerm2 preferences to use the Powerline fonts. (If you don't, you will see the status bar with some funky looking symbols instead of those nice visual indicators!)

![iTerm2 Preferences](/assets/iTerm2Prefs.png)

## Dracula

[Dracula](https://draculatheme.com/iterm) is the theme I use for iTerm. It's not at all required for Powerline, but that's how to get it to look like the screenshot.

## Honorable Mentions

That's basically it as far as bootstrapping goes, but of course, there's a multitude of other helpful tools out there. Feel free to comment with suggestions of your own!

- [thefuck](https://github.com/nvbn/thefuck) - Started off as a joke, but it can actually be quite useful. It's autocorrect for console commands.
- [Visual Studio Code](https://code.visualstudio.com/) - Technically not a CLI application, but it does add a useful `code [path]` command which can be used to open a file or folder in VS Code. Great for those of us who aren't Vim ninjas.
