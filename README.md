### Introduction to Functional Programming

#### What is Functional Programming?
Wikipedia: 
> In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data


Functional programming is a programming paradigm. Meaning it is a *style* of programming. Consider some other programming paradigms you're likely familiar with: (procedural, object oriented, etc.). These are just rule sets we use to structure the way we as developers write code and think about the problems we're solving.

Many languages have been built to enforce some of the important laws of functional programming and are built entirely around the paradigm. These languages are very fun to use and I'd highly encourage you to try a few of them out. However, the purpose of today is not to learn a *functional* language. Today, we're going to learn what functional programming is and how you can use the concepts of it inside REAL WORLD code. 

We'll be using javascript throughout this talk, but this isn't a talk about functional programming IN javascript. Javascript is being used for the examples because it has pretty minimal syntax and has great support for functional programming.


#### Goals of FP
> Make our programs simple. 

#### How do we get to *SIMPLICITY*?
* Avoid writing duplicate code
* Writing Declarative and Composable Code
* Encouraging Immutability (Avoid Side Effects)

Let's focus on HOW we do these things in our code. One of the more obvious ways you might think to accomplish this is to express all parts of our program as simple functions.

To get a better idea of what that means let's transform some non-functional code into functional code.

Non-Functional (Imperative):

```javascript
const greeting = "Hi, I'm "
const name = "Clayton"
console.log(greeting + ' ' + name)

=> "Hi, I'm Clayton"
```


Functional: 

```javascript
function greet(name) {
	return "Hi, I'm " + name
}

console.log(greet("Clayton"))

=> "Hi, I'm Clayton"
```

Nothing ground-breaking here.
In short, we're expressing a computation in terms of a function.

Let's look at a more complex snippet of code and express it in terms of functions.

```javascript
function checkCarStatus(driver, car) {
	let assembled;
	
	if(car.isTotaled) {
		if(driver.isMechanic) {
			assembled = true;
		}
		else {
			assembled = false;
		}
	}
	else {
		assembled = true;
	}
	
	return assembled && car.hasGas;
}
```

One thing mentioned in the goals of FP is to avoid mutation. We'll go into much more detail on the benefits of immuatability later, but for now let's try to avoid the mutation all together inside this function by extracting our reassignment into functions.

```javascript
function isAssembled(driver, car) {
	return !car.isTotalled || driver.isMechanic
}

function checkCarStatus(driver, car) {
	return isAssembled(driver, car) && car.hasGas
}

```


#### Immutability & Pure Functions 

Another core part of functional programming is avoiding mutation as much as possible. Why? In short, minimizing state mutation simplifies programs. When state change is a rarity testing, debugging, and understanding programs become so much EASIER. Plus, in a broader scope, with a lack of state change comes easy program parallelization.

Now, unfortunately we can't totally eliminate state mutation because without state mutation our programs would be useless! That being said, we can work on minimizing state mutation when possible.

One way we can put this new idea into action is by composing our programs with pure functions.

A pure function is a function that satisfies two properties:

1.) It is deterministic. The same input ALWAYS gives the same output.

2.) No side-effects take place inside the function.

This begs the question: What exactly is a side effect? 

A side effect is anything a function does that effects the "world" outside of the function. This can be anything from printing to the console or mutating a global variable. The goal is to write deterministic (the function output only depends on the function input) functions that don't have any side effects. We call these types of functions Pure Functions. 

- In other words, there is no way to tell that the function was called from anywhere else in the program: no outside state was changed during the execution of the function (i.e variables reassigned, IO streams written to, etc.) 


Example of impure function:

```javascript
let count = 0;

function incrementCountBy(x){
	// side effect because we are mutating state outside the function
	count += x
	
	// writing to IO stream is a side effect
	console.log('Incremeneted by: ', x)
	
	// return value is non-deterministic
	return Math.random()
}
```


Example of a pure function:

```javascript
function double(x) {
	return x * 2 
}
```

#### What benefit does using pure functions provide?

When we write pure functions it's like giving ourselves a free GUARENTEE that no state will change during the call of this function which makes testing and debugging our program super simple.

To reiteate - state mutation is a necessary evil of programming, but should be avoided when possible.

This should help explain the following line from our wikipedia definition
> (referring to functional programming) "treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data"

These mathematical functions the definition refers to are just pure functions. Just like a math function, pure functions take an input and return a deterministic output without mutating anything outside the function.

Mathematics

```f(x) = x * 2```

vs. 


Javascript

```javascript
function f(x) {
	return x * 2
}
```

the only difference is syntax!


#### Higher-Order Functions

> Functions that accept one or more functions as arguments or return a functions as their result.

Higher order functions are another pillar of functional programming. When our language lets us pass functions into other functions and return functions from functions we can create all sorts of super nice abstractions that decrease repetitive code and improve the readability of our programs.


```javascript

// inovke is a higher-order function
function invoke(f) {
	return f()
}

function dummyFunction() {
	return "I'm a dummyFunction"
}

const value = invoke(dummyFunction)

value
=> "I'm a dummyFunction"
```


Slightly more practical example:

```javascript
function greetWith(greeting) {
	return function(name) {
		return greeting + name
	}
}

const morningGreeting = greetWith("Good morning, ")

const students = ["Samantha", "Kunal", "George"]

for(let i = 0; i < students.length; i++) {
	console.log(morningGreeting(students[i]))
}

=> "Good morning, Samanatha"
   "Good morning, Kunal"
   "Good morning, George"
```

#### Avoiding List Iteration

Some of the most common code we'll see in day-to-day programming is iterating over a list of data and doing something to every entry in the list.

There are three very popular higher-order functions that can be used to avoid writing the same code over and over again. These are map, filter, and reduce. I've found that making use of these three functions is a good first step toward adopting a more functional style into your everday development.

*Sidenote: The below code is all written in JS, but map, filter, and reduce are common patterns built into most programming languages.*

### `Map`
____

Map is a function that takes a function we'll call `f`, and an array of data. It creates a new, empty array, runs the function `f` on each item in the original array and inserts each return value into the new array. Lastly, it returns the new array.

Little confused? An example should help.

```javascript
const words = ['dog', 'plant', 'bike']

function makePlural(word) {
	return word + 's'
}

const plurals = words.map(makePlural)

console.log(words) 	 // ['dog', 'plant', 'bike']
console.log(plurals) // ['dogs', 'plants', 'bikes']
```

**Exercise**

Let's write a function whose goal is to take a list of numbers and increment each number in the list by 1.

First Attempt:

```javascript
function incrementEntries(list) {
	let res = [];
	for(let i = 0; i < list.length; i++) {
		res[i] = list[i] + 1
	}
	return res
}
```
Our first attempt works just fine, but let's use our `map` function to remove unecessary code.

```javascript
function inc(x) {
	return x + 1
}

function incrementEntries(list) {
	return list.map(inc)
}
```

This code looks much simpler! And if we want to keep it even more concise we can inline the `inc` function like this...

```javascript
function incrementEntries(list) {
	return list.map(x => x + 1)
}
```

Implementing the map function is also a useful exercise. Remember that none of the functions you see here are magic. They can all be reimplemented using the programming language features you're already familiar with.

Our own map implementation:

```javascript
function map(list, fn) {
	let result = []
	for(let i = 0; i < list.length; i++) {
		result[i] = fn(list[i])
	}
	return result;
}

// Now let's use our function implementation of map!
const nums = [1,2,3]
const doubled_nums = map(nus, x => x * 2)
console.log(doubled_nums) // [2, 4, 6]
```

For more info on `map` in Javascript check the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)


### `Reduce`
___

Reduce (or fold as it is referred to in languages like Scala and Haskell) is another abstraction function for list iteration.

> The reduce function executes a reducer function (that you provide) on each member of the array resulting in a single output value.

Our reduce function takes as its first argument a reducer function.
This function is run on all elements in the list. The reducer function accepts a few arguments, but the most important two are the accumulator and the current value.

```javascript
const nums = [1,2,3,4,5,6,7,8,9,10]

const sum = nums.reduce(function(accumulator, currentValue) {
	return accumulator + currentValue
}, 0)
```

Your reducer function's return value is assigned to the accumulator whose value is remembered across each iteration throughout the array and ultimately becomes the final, single resulting value.



Implementation of reduce

```javascript
function reduce(list, f, startVal) {
	let acc = startVal
	
	for(let i = 0; i < list.length; i++) {
		acc = f(acc, list[i])
	}
	
	return acc
}
```
For more info on `reduce` in Javascript check the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)


### `Filter`
___

Once you understand `map` and `reduce`, `filter` is easy.
The filter function creates a new array with all elements that pass the proposition function passed as an argument to the filter function.

Example:

```javascript
function isEven(num) {
	return num % 2 == 0
}

const nums = [1,2,3,4,5]

const evens = nums.filter(isEven)

console.log(evens) // [2, 4]
```

For more info on `filter` in Javascript check the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Filter)



#### Final exercise: 
#####Rewrite both the map and filter function using reduce.

*(solutions in map\_from\_reduce.js and filter\_from\_reduce.js)*

#### Declarative > Imperative

What are the perks of using abstractions like `Map`, `Filter`, and `Reduce` aside from avoiding the strain of typing more? Are there any?

Using these functions helps us in a few ways.

1.) Minimize bugs in our code
> Writing less code means there is less code to debug. No more making mistakes in simple `for` loops.

2.) Code Readability
> Using abstractions in our code is a good way to inch closer to declarative programming and further from imperative.

Imperative and declarative programming are just two styles of programming that you are likely familiar with.

Imperative - describes every step of the process. 
> "Shows how it is done"

```javascript
const counts = [1,2,3,4,5,6,7,8,9,10]

let double_counts = []
for(let i = 0; i < counts.length; i++) {
  double_counts[i] = counts[i] * 2
}
```

Declarative - Uses abstractions around common procedures to avoid repeated code. Assumes the reader is familiar with said abstractions.
> "Describes what is done."

```javascript
function double(x) {
	return x * 2
}

const counts = [1,2,3,4,5,6,7,8,9,10]

const double_counts = counts.map(double)
```


#### Pros of Declarative:
- You don't have to "be" the computer to figure out what is being computed

- More readable

- Less code to debug

- Simple

#### Pros of Imperative:
- Shows every single step

- Easier to write (No abstract thought process of what's happening)


In many cases you may need to use loops or other procedures that describe all steps, but it's very rare that an abstraction doesn't already exist for the operation you're trying to perform. And if an abstraction already exists, why rewrite it? You're only causing yourself more typing, and creating more code to potentially debug later on.

Let's take a look at more examples of refactoring to functional code by not manually iterating over lists.

##### Refactoring to Functional

Block 1: (Find max element in list)

Imperative

```javascript
const counts = [23, 15, 6, 79, 12]

let max = -Infinity

for(let i = 0; i < counts.length; i++) {
	if(counts[i] > max) {
		max = counts[i]
	}
}

console.log(`The max was ${max}!`)
```

Declarative (Functional)

```javascript
function compare(x, y) {
	if(x > y) {
		return x;
	}
	return y;
}

const counts = [23, 15, 6, 79, 12]

const max = counts.reduce(compare)

console.log(`The max was ${max}!`)
```


Block 2: (create a new list of the incremented even numbers in the original list)

Imperative

```javascript
const old_nums = [1,2,3];
let new_nums = [];

for (let i = 0; i < old_nums.length; i++) {
  if (i % 2 == 0) {
    new_nums.push(old_nums[i] + 1);
  }
}

new_nums
=> [3, 5]
```


Declarative (Functional)

```javascript
function increment(x) { return x + 1 }
function isEven(x) { return x % 2 == 0 }

const old_nums = [1, 2, 3, 4, 5]
const new_nums = old_nums.filter(isEven).map(increment);

new_nums
=> [3, 5]
```


### Summary

Functional programming is a paradigm of programming that can help us simplifiy our code. This is done by expressing our programs in terms of small, composable functions, applying a more declarative pattern to our code, and avoiding data mutation when possible. Although some of the concepts may be a bit difficult to grasp at first, the benefits of code readability, program simplicity, and easy debuggability are well worth the effort. 

*Our goal is not to write functional code - our goal is simplicity and functional programming is the tool we're using to achieve it.*






