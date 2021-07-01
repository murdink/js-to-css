# JS style object -> CSS Sheet

![image](https://user-images.githubusercontent.com/25004351/124195061-ed553c80-dac9-11eb-9949-2b5f03a302de.png)

Live at https://js-style-to-css.netlify.app/

Simple conversion Web App for a better DX.

## Installation
```terminal
$ yarn
```
Run:
```terminal
$ yarn start
```
## Caveats:
- Max 1-level depth for JS objects.
- If the input value is an integer e.g. `borderWidth: 15` you will need to add the `px` bit manually in the CSS.

### Works:
**Input**:
```tsx
{
  foo: {
    border: 'none'
  }
}
```
**Result**:
```css
.foo {
  border: none;
}
```
---
**Input**:
```tsx
{
  border: 'none'
}
```
**Result**:
```css
border: none;
```
### Doesn't work
**Input**:
```tsx
{ 
  foo: {
    bar: {
      border: 'none'
      }
  }
}
```
**Result**:
```css
.foo {
    bar: [object Object];
}
```