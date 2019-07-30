---
layout: post
title: Evil Hangman in Python
---
![](/images/ex-machina.jpg)

# Introduction
Evil Hangman is a [Hangman](https://en.wikipedia.org/wiki/Hangman_(game)) variant in which your opponent tries to "dodge" your guesses by mentally switching the target word. For instance, suppose that you reveal `SMI-E`, having yet to guess `L` or `T`. Moreover, the Hangman is one limb away from completion, so your next guess **must** reveal the answer. Checkmate! You are now guaranteed to lose this game of Evil Hangman. Why? If you guess `L`, then your opponent will claim that the target word was `SMITE`. On the other hand, if you guess `T`, then they'll claim that it was `SMILE`. How evil indeed...

If you're interested in how Evil Hangman works, you should check out the origin of the game – an [assignment by Keith Schwarz of Stanford University](http://nifty.stanford.edu/2011/schwarz-evil-hangman/). Without going into too much detail, the algorithm is as follows:

- Maintain a word bank of possible words to switch to.
- When the player makes a guess, switch to a target word that keeps the bank as large as possible.

For example, let's say that the player guesses `P` on a four letter word. We could switch to the word `FILE`, making the guess incorrect. By going this route, we are now limited to words which do not contain `P`. Alternatively, what if we chose `PILE` and revealed `P---`? Would that give us a greater variety of remaining words? The algorithm examines all possibilities and makes the best decision accordingly.

# My Implementation
For those of you who wish to play Evil Hangman without implementing it yourself, you're in luck! I've made a Python project on repl.it which you are free to use as an example of the finished product. Simply go to [http://repl.it/@SudicodeDotCom/Evil-Hangman](http://repl.it/@SudicodeDotCom/Evil-Hangman) and press the `Run` button to get started.

![repl.it interface](/images/replit.png)

You can also edit `config.py` to make the game easier or harder for yourself. In particular, switching to a larger dictionary will make the game much more challenging – perhaps even impossible in certain situations. The options `reveal_word` and `reveal_word_bank_size` are "cheats" which grant you insights of what your adversary is doing. Use them to get a better idea of how the algorithm works. Of course, the whole point of Evil Hangman is to be fooled into thinking that you are playing regular Hangman. Either of these options will foil the illusion!

# Conclusion
Evil Hangman is an interesting concept, and the assignment is a great way to solidify your understanding of Data Structures & Algorithms. Is the algorithm *optimal*? Not from an adversarial standpoint. However, it's usually good enough to stump most players. (In any case, if you'd like to implement an optimal strategy like [Minimax](https://en.wikipedia.org/wiki/Minimax), then have at it!)
