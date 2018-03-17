# ClickOut
Register clickout event in javascript

```ssh
npm install clickout --save
```

## Import

ES6
```js
import ClickOut from 'clickout';
```

Classic
```html
<script src="your/path/clickout.js"></script>
```


## API
```js
export default class ClickOut {
    // Emit a 'clickout' event each time you click outside of a specific HTMLElement
    static bindCustomEvent(element: string | HTMLElement): destroyClickOut;
    
    // Trigger a function only when you click outside of a specific HTMLElement 
    static bind(element: string | HTMLElement, onClickOut: onCLickOut): destroyClickOut;
    
    // Destroy all listeners for emit/trigger clickout event/function
    static destroy(element: string | HTMLElement): void;
}
```

## Examples
### ClickOut.bindCustomEvent(element)
> *CustomEvent is supported in all major [browsers](https://caniuse.com/#search=custom%20event). If you need support for old browsers check [this polyfill](https://github.com/krambuhl/custom-event-polyfill).*
```js
const element = document.querySelector('#myElement');

// Emit 'clickout' event when you click outside of element
ClickOut.bindCustomEvent(element);

// Listen on 'clickout' event emitted from the element
element.addEventListener('clickout', (e) => {
  console.log(`You clicked an element outside of ${e.target}`);
})

// elsewhere on your code
element.addEventListener('clickout', (e) => {
  console.log(`I'm triggered too on clickout ${e.target}!`)
})
```

### ClickOut.bind(element, onClickOut)
```js
const element = document.querySelector('#myElement');

// Trigger a function only when you click outside of a specific HTMLElement
ClickOut.bind(element, (e) => {
  console.log(`You clicked ${e.target} and it's out of ${element}`)
});
```

### ClickOut.destroy(element)
#### Destroy bindCustomEvent
```js
const element = document.querySelector('#myElement');

ClickOut.bindCustomEvent(element);

element.addEventListener('clickout', (e) => {
  console.log(`You clicked an element outside of ${e.target}`);
});

ClickOut.destroy(element);

/**
 *  ------------------------------
 *  Is the same as:
 */

const destroyClickOutElement = ClickOut.bindCustomEvent(element);

element.addEventListener('clickout', (e) => {
  console.log(`You clicked an element outside of ${e.target}`);
});

destroyClickOutElement();
```

#### Destroy bind function
```js
const element = document.querySelector('#myElement');

ClickOut.bind(element, (e) => {
  console.log(`You clicked ${e.target} and it's out of ${element}`)
});

ClickOut.destroy(element);

/**
 *  ------------------------------
 *  Is the same as:
 */

const destroyClickOutElement = ClickOut.bind(element, (e) => {
  console.log(`You clicked ${e.target} and it's out of ${element}`)
});

destroyClickOutElement();
```
