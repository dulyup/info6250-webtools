# Questions and Answers for Exam 3

## Question:  Why do I say that JS does not actually have 'classes'?  What is the distinction between a language with (real) classes and a language without?

### Answer:
 
* JavaScript classes introduced in ECMAScript 2015 are primarily syntactical sugar over JavaScript's existing prototype-based inheritance. The class syntax is not introducing a new object-oriented inheritance model to JavaScript. JavaScript classes provide a much simpler and clearer syntax to create objects and deal with inheritance.
* Although JavaScript is object-oriented language, it isn't a class-based language—it's a prototype-based language. 
* There are differences between these two approaches, but since it is possible to use JavaScript like a class-based language, many people often simply refer to the constructor functions as "classes".
* In Javascript pretty much everything is an object (objects can inherit from other objects). It does not have classes in the classical sense. Although you can reproduce most of the functionality of traditional class definition / instantiation by function prototyping.
* The differences are:
    * Class-based (Java)
        1. Class and instance are distinct entities.
        2. Define a class with a class definition; instantiate a class with constructor methods.
        3. Create a single object with the new operator.
        4. Construct an object hierarchy by using class definitions to define subclasses of existing classes.
        5. Inherit properties by following the class chain.
        6. Class definition specifies all properties of all instances of a class. Cannot add properties dynamically at run time.
    * Prototype-based (JavaScript)
        1. All objects are instances.
        2. Define and create a set of objects with constructor functions.
 * SameL
    1. Construct an object hierarchy by assigning an object as the prototype associated with a constructor function.
    2. Inherit properties by following the prototype chain.
    3. Constructor function or prototype specifies an initial set of properties. Can add or remove properties dynamically to individual objects or to the entire set of objects.

## Question:  Why is it a bad idea to directly modify the DOM when using React?

### Answer:
 
* React uses the virtual DOM technology and then it takes out the difference between the current and the virtual dom much like string comparison and then only renders the difference and is thus highly efficient.
* React will update DOM it has rendered, even if you move that DOM somewhere else in the document.
* It may be slightly more inefficient to have React re-render too much. If you are already using React, break the components into as small of pieces as possible; this will help the number renders.

## Question:  What is composition, and why is it often favored over inheritance?

### Answer:
 
* Composition: when a Field’s type is a class, the field will hold a reference to another object, thus creating an association relationship between them. Without getting into the nuances of the difference between simple association, aggregation, and composition, let’s intuitively define composition as when the class uses another object to provide some or all of its functionality.
* Inheritance is fundamental to object-oriented programming. A programming language may have objects and messages, but without inheritance it is not object-oriented (merely “object-based”, but still polymorphic). And so is Composition
* Composition is also fundamental to every language. Even if the language does not support composition, humans still think in terms of parts and components. It would be impossible to break down complex problems into modular solutions without composition.
* How to decide?
    1. The representation/implementation of your domain concepts is one dimension
    2. The semantics of your domain concepts and their relationship to one another is a second dimension
    * In general, inheriting within one of these dimensions is fine. The problem becomes when we forget to separate the two dimensions, and start inheriting across inter-dimensional boundaries.
    * If you find that you are using a component to provide the vast majority of your functionality, creating forwarding methods on your class to call the component’s methods, exposing the component’s fields, etc., consider whether inheritance - for some or all of the desired behavior - might be more appropriate.
* In the composition approach, the subclass becomes the "front-end class," and the superclass becomes the "back-end class." With inheritance, a subclass automatically inherits an implemenation of any non-private superclass method that it doesn't override. With composition, by contrast, the front-end class must explicitly invoke a corresponding method in the back-end class from its own implementation of the method. This explicit call is sometimes called "forwarding" or "delegating" the method invocation to the back-end object.
* The composition approach to code reuse provides stronger encapsulation than inheritance, because a change to a back-end class needn't break any code that relies only on the front-end class.

## Question:  Why can code using 'import' not be run directly by NodeJS?  

### Answer:

* Node.js doesn't support ES6 modules
* here is no JavaScript engine yet that natively supports ES6 modules. Babel converts import and export declaration to CommonJS (require/module.exports) by default anyway. So even if you use ES6 module syntax, you will be using CommonJS under the hood if you run the code in Node.
* There are technical difference between CommonJS and ES6 modules, e.g. CommonJS allows you to load modules dynamically. ES6 doesn't allow this.
* Specifically, because ES6 modules are loaded, resolved and evaluated asynchronously, it will not be possible to require() an ES6 module. The reason is because require() is a fully synchronous function. It would be far too disruptive a change to the ecosystem for us to modify the semantics of require() to allow it to do asynchronous loading. We are therefore considering the possibility of implementing a require.import() function that is modeled after the proposed ES6 import()function (see here). This function would return a Promise that completes when the ES6 module is loaded. This is not optimal, but it would allow ES6 modules to be used from within existing CommonJS style Node.js code.

## Question:  Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:
 
* The import and export statements have been standardized in ES2015. Most browsers can not support ES6 modules.
* Although they are not supported in most browsers yet, we can use some tools to support them out of the box, such as webpack.
* Behind the scenes, webpack actually "transpiles" the code so that older browsers can also run it. If you inspect dist/bundle.js, you might be able to see how webpack does this, it's quite ingenious! Besides import and export, webpack supports various other module syntaxes as well, see Module API for more information.
* Note that webpack will not alter any code other than import and export statements. If you are using other ES2015 features, make sure to use a transpiler such as Babel or Bublé via webpack's loader system.

## Question:  What is a 'side-effect'?  Why do we want to minimize them?

### Answer:
 
* side effect is a piece of code whereby a variable is created and available throughout a scope when it doesn't need to be.

* Ways to minimize side-effect:
    * Array.prototype.forEach() instead of for(var x = ...)
        * The side effect of this pattern is at minimum the running index, if not the length as well -- they are available within the entire scope.  
        * No "utility" variables need to be created for the looping, thus avoiding side effects. 
        * Array prototype methods like map, forEach, and every allow the developer to avoid these side effects:
        ```js
        [1, 2, 3].forEach(function(item, index, array) {
        	// No side effects! :)
        });
        ```
    * Private variables
        * you can do loads of processing within the self-executing function (a new scope) without allowing variables leaking out -- the only item returned or leaked is the desired return value.
        

