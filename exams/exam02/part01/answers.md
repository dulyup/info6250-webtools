# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)?  Include a description on how to fix it (code to help your answer is okay but not required.  A non-code description of how to fix it is required).  Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => { 
  return data;
});

console.log(data.cats);
```
### Answer:
data in console.log() is a promise. 
response.json() is  an object.

There're some ways to modify:
1. change .then(json => {return data}) to .then(json => console.log(json.cats)); 
```js
const data = fetch('example.com/test')
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .catch( e => console.log("Oops, error", e) );

data.then(res => console.log(res.cats));
``` 
2. Or we can remove .then(json => json), and data may be undefined because of asynchronization if we console directly. 
So we can do like this: 
```js
fetch('example.com/test')
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .then(res => console.log(res.cats))
    .catch( e => console.log("Oops, error", e) );
``` 
 

## Question: What is the scope of a variable in JS?  How does it relate to closures? 

### Answer: 
 
* Scope refers to the current context of your code. Scopes can be globally or locally defined.
* Global Scope: A variable that is declared outside a function definition is a global variable, and its value is accessible and modifiable throughout your program. 
* Local Scope: A variable that is declared inside a function definition is local. It is created and destroyed every time the function is executed, and it cannot be accessed by any code outside the function..
A local variable can have the same name as a global variable, but it is entirely separate; changing the value of one variable has no effect on the other. 
Only the local version has meaning inside the function in which it is declared.
* Function Scope: All scopes in JavaScript are created with Function Scope only, they aren’t created by for or while loops or expression statements like if or switch.
* Lexical Scope: Whenever we see a function within another function, the inner function has access to the scope in the outer function, this is called Lexical Scope or Closure - also referred to as Static Scope.
* Closures: In JavaScript, an inner (nested) function stores references to the local variables that are present in the same scope as the function itself, 
even after the function returns. This set of references is called a closure.  
Closures ties in very closely with Lexical Scope. A better example of how the closure side of things works, can be seen when returning a function reference. Inside our scope, 
we can return things so that they’re available in the parent scope.
```js
const sayHi = function (name) {
  const text = 'Hi, ' + name;
  return function () {
    console.log(text);
  };
};
```
Each scope binds a different value of this depending on how the function is invoked. We’ve all used the `this` keyword

## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes? 

### Answer:
* polyfill: 
    * a polyfill is code that implements a feature on web browsers that do not support the feature. Most often, it refers to a JavaScript library that implements an HTML5 web standard, either an established standard (supported by some browsers) on older browsers, or a proposed standard (not supported by any browsers) on existing browsers. 
The prototype infrastructure makes functions available in modern browsers available to older browsers lacking the native support.
    * A polyfill is a browser fallback, made in JavaScript, that allows functionality you expect to work in modern browsers to work in older browsers, e.g., to support canvas (an HTML5 feature) in older browsers.

* prototypes:
    * Prototype provides library functions to support classes and class-based objects, something the JavaScript language lacks. In JavaScript, object creation is prototype-based instead: an object creating function can have a prototype property, and any object assigned to that property will be used as a prototype for the objects created with that function.
    * All objects in JavaScript have an internal property called `Prototype`. You won’t see this internal property. All prototypes are stored in this internal property. 

* Process: We can add new attributes to prototypes. So that every object of the constructor that has defined attributes in its prototype, will embrace all attributes of the prototype. When we create an object, it can call functions of its constructor. Each object extends attributes of Object. 
        
## Question: What is CORS and why is it only in browsers?  How does it relate to Same Origin Policy (SOP) ?

### Answer: 

* Definition of an origin: 
  Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages. You'll see this referred to as the "scheme/host/port tuple" at times (where a "tuple" is a set of three components that together comprise a whole).
* CORS: 
    * Cross-Origin Resource Sharing (CORS) introduces a standard mechanism that be used by all browsers for implementing cross-domain requests. CORS uses additional HTTP headers to let a user agent gain permission to access selected resources from a server on a different origin (domain) than the site currently in use. The spec defines a set of headers that allow the browser and server to communicate about which requests are (and are not) allowed. CORS continues the spirit of the open web by bringing API access to all.
    * In conclusion: Use CORS to allow cross-origin access.
* CORS only in browsers: 
    * The server is responsible for reporting the allowed origins. The web browser is responsible for enforcing that requests are only sent from allowed domains.
    * browser will prevent CORS requests unless the origin of the request (i.e the referrer URL domain) is in a white list on the destination, or the destination approves all requests regardless of origin.In both cases, the required header (Access-Control-Allow-Origin) is added which tells the browser that it's ok to send the request to the destination.This ensures that people with malicious intent cannot send requests to another domain without the the user knowing about it.
* SOP: 
    * SOP(same-origin policy) a policy defined by W3C which at least I all the major browsers implements. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same origin. An origin is defined as a combination of URI scheme, hostname, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page’s Document Object Model. 
    * The SOP restricts how a document or script loaded from one origin can interact with a resource from another origin. It is a critical security mechanism for isolating potentially malicious documents.
* Relations between CORS & SOP:
    * The Same Origin Policy (SOP) is the policy browsers implement to prevent vulnerabilities via Cross Site Scripting (XSS). This is mainly for protecting the server, as there are many occasions when a server can be dealing with authentication, cookies, sessions, etc.
    * The Cross Origin Resource Sharing (CORS) is one of the few techniques for relaxing the SOP. Because SOP is "on" by default, setting CORS at the server-side will allow a request to be sent to the server via an XMLHttpRequest even if the request was sent from a different domain. This becomes useful if your server was intended to serve requests from other domains (e.g. if you are providing an API).

## Question: What is the difference between a bundler and a transpiler?

### Answer:

* transpiler: 
    * Transpilers, or source-to-source compilers, are tools that read source code written in one programming language, and produce the equivalent code in another language. Languages you write that transpile to JavaScript are often called compile-to-JS languages, and are said to target JavaScript.
    * Babel: Transpiling ES modules to CommonJS via Babel. As any language, Javascript also has versions named ECMAScript (short for ES). Currently, most browsers support ES5. ES5 used to be good even thought it was painful to code in it. Remember, this not reading from inside callback functions? The new version of Javascript, ES6, also known as ES2015 (specs of the language were finalized in June 2015) makes Javascript great again. All the great features of ES6 come with one big problem — majority of browsers do not fully support them. That’s when Babel comes to play. Babel is a JS transpiler that converts new JS code into old ones. It is a very flexible tool in terms of transpiling. One can easily add presets such as es2015, es2016, es2017, so that Babel compiles them to ES5.
    * At the moment, the main way to use ES modules on Node.js and browsers is to transpile them to CommonJS modules via Babel.The benefit of this approach is that integration with the CommonJS ecosystem, including npm modules, is seamless.
* bundler: Import path resolution in browsers  
    * When you divide your program into modules, you typically organize those modules into different files and folders. Chances are, you’ll also have a group of modules for the libraries you’re using, like Underscore or React.As a result, each of those files has to be included in your main HTML file in a <script> tag, which is then loaded by the browser when a user visits your home page. Having separate <script> tags for each file means that the browser has to load each file individually: one by one.
    * To get around this problem, we bundle, or “concatenate” all our files into one big file (or a couple files as the case may be) in order to reduce the number of requests. When you hear developers talking about the “build step” or “build process,” this is what they’re talking about.
    * In browsers, the resolution of module specifiers will probably continue to work as they do when you use CommonJS modules via Browserify and webpack.
    * A module bundler will transpile modules. At the very least it will convert Node.js-style specifiers ('baz') to URLs ('./node_modules/baz/index.js'). It may additionally combine multiple ES modules into either a single ES module or a custom format.
    * Webpack: Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.

