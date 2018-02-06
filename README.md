# wafs
The course repo for 'Web App From Scratch'

## Advantages and disadvantages of JavaScript libraries/frameworks
This document will give you insight about javascript frameworks.  
What are the pros and cons?

## The advantages of using JS Frameworks.
Frameworks give a stable code structure andhas a robust list of featers.  
Half of te work is already done, for example:  
* Cross-browser compability
* Security flaws
* Core functions
* And more stuff, depends on the framework.

With all of that said, It is helpfull to add a framework to your project if it fits the needs!

### Learning curve
Are frameworks hard to learn? Well.. it depends on the community.
Does the framework you want to use also got a well-established community as well as support documentation?
If the awnser is yes, you'll probably have a **good** time.
If not, you might want to reconsider the choice of the framework.

## The Disadvantages of JS Frameworks
Before you dive deep into the abyss of framworks. 
You really need to reconsider if you **need** a framework!  
Person 1: "Uhh with all that awesome stuff you told me earlier why should I not use a framework?"  
Person 2: Sudo rm  Person 1.

Think about it. With all that powerfull stuff, your projects might not be as lightweighted as it _should_ be.

### Vanilla JS
Vanilla JS compared to frameworks will run quicker, because of the bloatware(veel overbodige functionaliteit).
Frameworks comapred to Vanilla JS also got his own way to do functionality.
Writing code in Vanilla JS also makes you Independant of he updates and actions of the framework.

## My Opinion
Look good at the project, write down the global functionality of the project.  
If your project implements complex functionality that is already written in a Framework.
You'll might reconsider to use a framework to make the project easier and faster.

## Advantages and disadvantages of client-side single page web apps
When you look at web applications vs desktop applications. 
Web applications are more convenient to use, and hey are easy to update,they are not bound to one device.
There are two main design patterns for web apps: 
* **multi-page application(MPA)** 
* **single-page application(SPA)**
And both models have their own pro's and cons.
You need to decide which model works for your project. Think about content-first approach.
Content-first approach is basicly putting your application content before everything else.

## Single-Page Application(SPA)
SPA doesn't require reloading the page. Great examples of this are:
* Gmail
* Google Maps
* Facebook
* Github

They're heavly deppended on **Javascript**

## Pro's of SPA
* SPA is fast,only load the scripts once throughout the application. Only data is transmitted back and forth.
* The development is streamlined. You're not using any filepaths.
* SPA'S are easy to debug with Chrome, you can monitor the network operations.
* Code is reusable for the web application and native mobile application.
* SPA can store local storage effectivly. (It even works offline :o)

## Cons of SPA
* Its slow to download because heavy client frameworks are required to be loaded to the client.
* SPA'S are less secure. Due to Cross-Site Scripting(XSS), it enables attackers to inject clinet-side scripts into web applications by other users.
* Memory Leak in JS can even cause powerfull systems to slow down.

## Multi-Page Application(MPA)
MPA'S are more _traditional_.
Every change display the data or submit data back to server requests rendering a new page from the server in the browser 
MPA's are larger than SPA'S because they need to be.
Due to the amount of content, these applications have many levels of UI. Luckily, it’s not a problem anymore. Thanks to AJAX, we don’t have to worry that big and complex applications have to transfer a lot of data between server and browser. 

## Pro's of MPA
*  It got a basic structre, everyone is used to that. Its not super fancy.
*  Its good for SEO management.

## Cons of MPA
* Frontend and backend are close with eachother.
* Development is complex. The developer needs to use frameworks for ether client and server side.

## SPA or MPA
Always think about if you need a single-page application or a multi-page application for your project.
Do you 1 pages, or multiple ones?
You can also go for a hypbrid app.
(Hybrid app is a bigger version of a single-page application, and smaller than a multi-page application.)

## Best practices
...


##### Sources
* https://www.noupe.com/development/javascript-frameworks-94897.html
* https://www.altexsoft.com/blog/engineering/the-good-and-the-bad-of-javascript-full-stack-development/
* https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58
* https://www.dialogtech.com/blog/technically-speaking/technically-speaking-the-pros-and-cons-of-single-page-applications-spas
