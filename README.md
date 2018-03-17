# clickout

```js
// first
ClickOut.bindCustomEvent(element);

// then
element.addEventListener('clickout', (e) => {
  console.log(`You clicked ${e.target} and it's out of ${element}`)
})

// elsewhere
element.addEventListener('clickout', (e) => {
  console.log(`I'm triggered too on ${element} clickout!`)
})
```
