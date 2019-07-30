---
layout: post
title: Don't Make These Design Mistakes
---
![](/images/slip-up.jpg)

Everybody makes mistakes - and yes, that includes the standard library authors. The JDK has plenty of design flaws, some of which are fixed in recent versions, and others that will probably never be fixed (as doing so would break a lot of existing code). Let's discuss a couple of these flaws.

# Optional Operations in Interfaces
In [java.util.Collection](https://docs.oracle.com/javase/9/docs/api/java/util/Collection.html), the [add](https://docs.oracle.com/javase/9/docs/api/java/util/Collection.html#add-E-) method is documented as follows:

> Ensures that this collection contains the specified element (optional operation). Returns `true` if this collection changed as a result of the call. (Returns `false` if this collection does not permit duplicates and already contains the specified element.)
>
> ...
>
> Throws: `UnsupportedOperationException` - if the add operation is not supported by this collection.

Operations like these are optional because the JDK has methods like [Collections.unmodifiableCollection](https://docs.oracle.com/javase/9/docs/api/java/util/Collections.html#unmodifiableCollection-java.util.Collection-), which return immutable collections. Now, given some arbitrary Collection `c`, can you tell me how to determine whether `c` is immutable?

Without any additional context, the only feasible way of doing so is the following:

```java
try {
  c.add("foo");
  System.out.println("c is mutable");
} catch (UnsupportedOperationException e) {
  System.out.println("c is immutable");
}
```

Indeed, collection mutability can only be checked during runtime. Lame, isn't it? As a matter of fact, this design breaks a couple of *SOLID* principles. The *Liskov Substitution Principle* is broken, because by intuition we expect the [add](https://docs.oracle.com/javase/9/docs/api/java/util/Collection.html#add-E-) method to work on any instance of [Collection](https://docs.oracle.com/javase/9/docs/api/java/util/Collection.html). Moreover, the *Interface Segregation Principle* is broken, because immutable collections are being forced to implement methods which aren't actually being used.

There's no such thing as an optional operation. Immutable collections technically do implement these methods - in this case, throwing [UnsupportedOperationException](https://docs.oracle.com/javase/9/docs/api/java/lang/UnsupportedOperationException.html) is their implementation.

So, what would be the proper way of handling immutable collections? Let's take a look at the [IReadOnlyCollection](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlycollection-1?view=netframework-4.7.1) interface from .NET Framework.

> Represents a strongly-typed, read-only collection of elements.

Yes! That is just what we needed. Borrowing a page from .NET's book, let's define interface `ImmutableCollection` as follows:

```java
public interface ImmutableCollection<E> extends Iterable<E> {
  boolean contains(Object o);
  boolean isEmpty();
  // and so on ...
}
```

Then, our standard `Collection` inherits from  `ImmutableCollection` with the addition of mutator methods, like so:

```java
public interface Collection<E> extends ImmutableCollection<E> {
  boolean add(E e);
  void clear();
  // and so on ...
}
```

Now, we make [Collections.unmodifiableCollection](https://docs.oracle.com/javase/9/docs/api/java/util/Collections.html#unmodifiableCollection-java.util.Collection-) return `ImmutableCollection`, and we're done! No more so-called "optional" methods which may or may not work depending on implementation.

# Hiding Useful Information
In [java.io.File](https://docs.oracle.com/javase/9/docs/api/java/io/File.html), the [File#delete](https://docs.oracle.com/javase/9/docs/api/java/io/File.html#delete--) method returns `true` if and only if the file or directory is successfully deleted, and `false` otherwise. When [delete](https://docs.oracle.com/javase/9/docs/api/java/io/File.html#delete--) returns `false`, perhaps it'd be useful to know why that happened. Unfortunately, we only have a little *bit* (clever, huh?) of information to work with.

By the release of Java 7, the library authors addressed this shortcoming with a new and improved  [java.nio.file.Files](https://docs.oracle.com/javase/9/docs/api/java/nio/file/Files.html) API. The Javadoc for [File#delete](https://docs.oracle.com/javase/9/docs/api/java/io/File.html#delete--) now contains the following snippet:

>  Note that the `Files` class defines the delete method to throw an `IOException` when a file cannot be deleted. This is useful for error reporting and to diagnose why a file cannot be deleted.

Throwing exceptions is the preferred way of error reporting. Returning a "flag" such as `true` on success and `false` on error - or even worse, a status code (We are not programming in C!) - is not ideal.

# Conclusion
At the end of the day, most Java developers still wouldn't hesitate to use the [Collection](https://docs.oracle.com/javase/9/docs/api/java/util/Collection.html) interface, design flaws and all. My intent is not to convince anyone to reject existing APIs. Rather, I feel that these mistakes can be learned from in order to promote well-designed APIs going forward.

[Those who cannot remember the past are condemned to repeat it.](https://mitpress.mit.edu/books/life-reason-or-phases-human-progress)
