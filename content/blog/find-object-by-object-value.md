---
path: find-object-in-array-by-object-property/index
date: 2021-01-19T17:06:45.518Z
title: Find Object by Object Value
description: Find a specific object inside an array based on a property of the object
---
```javascript
const array = [
  { id: 0, name: 'Obj 1' },
  { id: 1, name: 'Obj 2' },
  { id: 2, name: 'Obj 3' },
];

const obj = array.filter(obj => {
  return obj.id === 2
})[0]

// returns { id: 2, name: 'Obj 2' }
```