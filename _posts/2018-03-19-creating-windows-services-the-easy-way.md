---
layout: post
title: Creating Windows Services – The Easy Way!
---
![](/images/windows.png)

So you've built an application which needs to run as a Windows Service. Most likely it's a web service running on Windows Server, or maybe it's some sort of background task. In any case, there are a few ways to go about creating your own Windows Service.

If you prefer to stick with Microsoft products, you can either use the [.NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/windows-services/how-to-create-windows-services) or [srvany](https://support.microsoft.com/en-us/help/137890/how-to-create-a-user-defined-service). But please note that I would highly suggest avoiding `srvany`, especially in production. (Last release was fifteen years ago... yikes!)

However, the .NET Framework is usually too low level when all we need is a simple command to start the service. Yet our only abstraction is a piece of abandonware. That sucks. Fortunately, FOSS rides to the rescue with [NSSM](https://nssm.cc), the Non-Sucking Service Manager!

# Installing NSSM
Installation is a breeze. If you have [Chocolatey](https://chocolatey.org), you can install *nssm* using `choco install nssm`. Otherwise, you can [download it](https://nssm.cc/download) and then add the directory containing `nssm.exe` to your `PATH`.

# Creating a Service
For this example, we are going to run a minimal web server using [Ruby](https://www.ruby-lang.org) and [Sinatra](http://sinatrarb.com). The code is as follows:

```ruby
# app.rb
require 'sinatra'

get '/' do
  logger.info 'We have a visitor'
  '<h1>Hello world!</h1>'
end
```

Using the command line, we would normally fire up this server using `ruby app.rb`. So how do we service-ify this process?

According to the [syntax](https://nssm.cc/commands) for installing new services, we can create a service which executes the command that starts our web server. To do so, run the following command *as an administrator*:

```powershell
nssm install MyService ruby C:\Users\Administrator\app.rb
```

This creates a new service named `MyService`, which will execute `app.rb` on startup (and terminate it on shutdown). Note that we're using absolute paths – relative paths won't work. Of course, you might have to change `C:\Users\Administrator\` to wherever `app.rb` is placed on your machine. Alternatively, rather than hardcoding this command into our service, we can also create a *batch file* for our service to run:

```powershell
echo ruby C:\Users\Administrator\app.rb>C:\Users\Administrator\MyService.bat
nssm install MyService C:\Users\Administrator\MyService.bat
```

Either method will work fine in this case, so pick the one that you prefer. Once installed, start the service using `nssm start MyService`. Now visit http://localhost:4567 and you should see this:

![hello-sinatra](/images/hello-sinatra.png)

If you do, then congratulations, your service works! (If you're seeing something like `Unexpected status SERVICE_PAUSED in response to START control`, then fear not, the next section will come in handy.)

# Logging Service Output
In `app.rb`, notice the call to `logger.info`. When running our server on the command line, we would normally see `'We have a visitor'` whenever someone visits our home page. However, when running `app.rb` as a service, console output is nowhere to be found.

We can fix this by redirecting `stdout` and `stderr` to a log file:

```powershell
nssm set MyService AppStdout C:\Users\Administrator\MyService.log
nssm set MyService AppStderr C:\Users\Administrator\MyService.log
```

Restart the service using `nssm restart MyService`, then navigate to http://localhost:4567 once again. Once the page is loaded, you should see the log file being generated. It is also possible to perform log rotation through *nssm* (see [Usage](https://nssm.cc/usage)), though it's a bit rudimentary. If log rotation is critical, consider utilizing a logging module in your server framework to handle the log files instead.

Even when handling log files on the server side, the ability to redirect `stdout` and `stderr` still comes in handy. One such use case is when your service fails to start. To demonstrate, we'll make a breaking change to `app.rb`:

```ruby
# app.rb
# require 'sinatra' (Notice how this line is commented now)

get '/' do
  logger.info 'We have a visitor'
  '<h1>Hello world!</h1>'
end
```

After making the change, restart the service once again using `nssm restart MyService`. You should see an error message saying something like `MyService: Unexpected status SERVICE_PAUSED in response to START control`. That's okay, because now we can inspect the log file to see what went wrong. Here's what mine looks like:

```
C:/Users/Administrator/app.rb:4:in `<main>': undefined method `get' for main:Object (NoMethodError)
Did you mean?  gets
               gem
```

Going forward, you might want to redirect `stdout` and `stderr` prior to starting a new service. That way you will be able to diagnose these errors sooner.

# Conclusion
Congratulations, you've just installed your own Windows Service which supports file logging right out of the box! This, of course, was a very basic introduction to *nssm*. *nssm* actually has a wide variety of customization options, and even a GUI. Check it out by using `nssm edit MyService` to edit the service, or `nssm install` to create a new one.

Once you're done experimenting with `MyService`, you can easily uninstall it using the following commands:

```powershell
nssm stop MyService
nssm remove MyService confirm
```

Happy servicing.
