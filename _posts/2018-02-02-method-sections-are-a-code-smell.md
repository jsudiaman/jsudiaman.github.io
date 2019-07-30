---
layout: post
title: Method 'Sections' Are a Code Smell
---
![](/images/poseidon.jpg)

# The God Object
Once upon a time, while working on [TuneJar](https://github.com/sudiamanj/TuneJar) – a music player written in JavaFX – I had a controller class which resembled the following:

```java
// --------------- File Menu --------------- //
public void quit()            { /* some code */ }
public void addDirectory()    { /* some code */ }
public void importPlaylist()  { /* some code */ }
public void removeDirectory() { /* some code */ }
public void restart()         { /* some code */ }

// --------------- Playback Menu --------------- //
public void play()            { /* some code */ }
public void pause()           { /* some code */ }
public void stop()            { /* some code */ }
public void playPrev()        { /* some code */ }
public void playNext()        { /* some code */ }
public void toggleShuffle()   { /* some code */ }

// --------------- Song Menu --------------- //
/* more methods */

// --------------- Playlist Menu --------------- //
/* more methods */

// --------------- Themes Menu --------------- //
/* more methods */
```

You get the idea. I was using comments to group my methods based on which menu they belonged to. This created a maintenance nightmare as often times I had to `CTRL+F` for the method 'section' I wanted to work on. My controller class was on its way to becoming a [God object](https://en.wikipedia.org/wiki/God_object). How could this be? Java has classes and packages, for crying out loud!

A lot of it has to do with misinterpreting the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle). It is admittedly easy to claim that the "single" responsibility of the controller is to handle user events. Of course, this is much like assigning a single Software Engineer to a core product, justified by saying that their sole responsibility is to develop the product. In both cases, we did not come up with a single responsibility – rather, we mistakenly tried to pass off multiple substantial responsibilities as a single one.

# The GitHub API
Rather than working with TuneJar, let's instead consider a wrapper for the [GitHub API](https://developer.github.com/v3/). We will first establish a base interface for low level HTTP requests:

```java
public interface Requestable {
    public String get(String uri);
    public String post(String uri, String body);
}
```

Yes, a few of the RESTful HTTP methods are missing, not to mention we don't provide a way to get a status code from the response. We'll overlook these issues for the sake of simplicity. With that being said, here's the implementing class:

```java
public class Client implements Requestable {
    @Override public String get(String uri)               { /* implementation */ }
    @Override public String post(String uri, String body) { /* implementation */ }
}
```

The actual implementation of `Client` doesn't really matter. What's more important is where we go from here. How can we design our wrapper to provide abstractions throughout the entire API?

Going back to my anecdotal experience with TuneJar, we would like to avoid turning `Client` into a God object. Stuffing all of the API calls in `Client` is a temptingly simple solution... but it isn't the right one. Think about what would happen if we open sourced this project. How many contributors would be willing to sift through hundreds of API calls in one class? How many **merge conflicts** would we have to deal with?

Consider the entities in GitHub (e.g. Repositories, Issues, Gists). Now for each one, what if we could devise a version of `Client` which has the capability of communicating with said entity? Our situation calls for the decorator pattern (and not inheritance, because [it's evil](https://www.javaworld.com/article/2073649/core-java/why-extends-is-evil.html)):

```java
public class RepoClient implements Requestable {
    /* First, the boilerplate. */
    private final Requestable rq;

    public RepoClient() {
        this.rq = new Client();
    }

    @Override
    public String get(String uri) {
        return rq.get(uri);
    }

    @Override
    public String post(String uri, String body) {
        return rq.post(uri, body);
    }

    /* Additional capabilities! */
    public String getRepo(String owner, String name) {
        return rq.get("https://api.github.com/repos/" + owner + "/" + name);
    }
}
```

Such a separation of concerns is not exclusive to this hypothetical example. Here's a "real world" usage of the [EGit API](https://github.com/eclipse/egit-github/tree/master/org.eclipse.egit.github.core):

```java
GitHubClient client = new GitHubClient();
RepositoryService repoService = new RepositoryService(client);
Repository repo = repoService.getRepository("facebook", "react");
System.out.println(repo.getName() + " is a pretty cool project!");
```

`RepositoryService` acts in the same vein as `RepoClient`, i.e. the underlying `GitHubClient` is used to make lower level calls. This is a great strategy for avoiding the dreaded God object. Isolate the core functionality, then build decorators around it.

By using interfaces, we also have the added benefit of loose coupling. Remember how I said that the implementation of `Client` doesn't really matter? Indeed, we can seamlessly change the internal `Requestable` to whatever implementation we want. We have total freedom to switch from [HttpURLConnection](https://docs.oracle.com/javase/9/docs/api/java/net/HttpURLConnection.html) to [HttpClient](https://hc.apache.org/httpcomponents-client-ga/index.html), for example. We could even use [ProcessBuilder](https://docs.oracle.com/javase/9/docs/api/java/lang/ProcessBuilder.html) to invoke `curl` as far as I'm concerned. (On second thought... please don't do that.)

# Conclusion
Classes are meant for separation of concerns, and comment banners are no substitute. If you ever feel the need to "section off" your class methods, I would strongly urge you to consider refactoring.
