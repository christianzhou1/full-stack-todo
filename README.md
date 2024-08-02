# Full Stack ToDo

Going over the basics of full-stack development following this [helpful tutorial](https://dev.to/tracygjg/full-stack-to-do-list-a-step-by-step-tutorial-3oom).

## Basics of data operations on the web

The CRUD operations are the main focus of the tutorial.

Create, Read, Update and Delete are functions implemented to manipulate the todo list.

# 1 - Memory Array

We start with one of the most basic form of data in web: memory array, i.e. storing data/objects in an array.

## The Revealing Module Pattern (RMP)

Four functions corresponding to CRUD are created in the crud-interface.mjs module. The module is wrapped in a default function that reveals desired functions to other files to use in a return statement. The wrapper function is unnamed, meaning we can name the module on import. We can pass in data through the module's parameter, defaulting to toDoList=[].

## The EM6 Standard, ES Modules, MIME, and JSON Loading

### A short history of ESM

ECMA is an industry association for standardizing information and communication systems. In 1997, ECMAScript (ES) was published which standardized JavaScript.

As needs for module system for JS grew, CommonJS was created in 2009, popularized by Node.js. Cjs allows developers to use `require` to import modules and `module.exports` to export them. However Cjs wasn't natively supported by browsers.

ECMA created ECMAScript Modules (ESM) for a standard JS module system. With release of ECMAScript 2015 (ES6), ESM became a standardized way to define and import/export modules in JS natively, supported by all browsers. It uses the `import` and `export` keywords.

Example usage of ES6:

```js
// Exporting a function from a module (myModule.js)
export function greet(name) {
  return `Hello, ${name}!`;
}

// Importing and using the function in another file
import { greet } from "./myModule.js";
console.log(greet("world")); // Output: Hello, world!
```

Node.js also added support for ESM. Since it originally used CommonJS, adjustments are needed, such as using the `.mjs` extension or adding `type: "module"` in the `package.json` file.

The industry is moving towards ESM for its

- standardization,
- interoperability between client-side and server-side across environments,
- performance optimization (static analysis and tree shaking), and
- growing ecosystem of tools and frameworks that support ESM.

Therefore, we will use the ES6 module syntax for our FE/BE interface.

For example, to run Jest in our project, the following command switches Node.js to enable ESM:

`node --experimental-vm-modules node_modules/jest/bin/jest.js`

Our todo list data is stored in db.json. Therefore we need to import JSON as ES module.

### MIME

[MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) (Multipurpose Internet Mail Extensions) types, aka media types, indicate nature and format of a file/assorted bytes.

When we try to import a JSON file as a module, the server must respond with the correct MIME type (`application/json`). However, the import statement expects JavaScript code, not JSON.

Tracy Gilmore (the tutorial author) used the experimental import assertion - the `assert` keyword to import JSON as ES module:

```js
import TestData from "../db.json" assert { type: "json" };
```

which was not compatible with my browser (not sure on how to make it work yet). Instead I used the fetch API and JSON.parse, which is compatible with all browsers, and handles errors more gracefully:

```js
async function loadData() {
  try {
    const response = await fetch("../db.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data loaded:", data);
    return data;
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}
```

## Testing (Jest)

`node --experimental-vm-modules node_modules/jest/bin/jest.js`

We create a `crud-interface.test.js` file to test the corresponding module.

### Jest syntax

```js
describe("test suite name", () => {
  it("test case name", () => {
    expect(something).toBe(something);
  });
  describe("test suite name", () => {
    ...
  })
});
```

We create a test suite for each function exposed in our CRUD interface.

# 2 - Web Storage

## [window: sessionStorage Property](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

Whenever a document is loaded in a particular tab in the browser, a unique page session gets created and assigned to that particular tab. That page session is valid only for that particular tab.

A page session lasts as long as the tab or the browser is open, and survives over page reloads and restores.

Opening a page in a new tab or window creates a new session with the value of the top-level browsing context, which differs from how session cookies work.
Opening multiple tabs/windows with the same URL creates sessionStorage for each tab/window.

Duplicating a tab copies the tab's sessionStorage into the new tab.
Closing a tab/window ends the session and clears objects in sessionStorage.

### Saving text between refreshes

The following example autosaves the contents of a text field, and if the browser is refreshed, restores the text field content so that no writing is lost.

````js
Copy to Clipboard
// Get the text field that we're going to track
let field = document.getElementById("field");

// See if we have an autosave value
// (this will only happen if the page is accidentally refreshed)
if (sessionStorage.getItem("autosave")) {
  // Restore the contents of the text field
  field.value = sessionStorage.getItem("autosave");
}

// Listen for changes in the text field
field.addEventListener("change", () => {
  // And save the results into the session storage object
  sessionStorage.setItem("autosave", field.value);
});```
````
