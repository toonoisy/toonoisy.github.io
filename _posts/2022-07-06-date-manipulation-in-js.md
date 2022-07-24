---
layout: post
title: Date Manipulation in JS
date: 2022-07-06 23:12
categories: js
---
### Create a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object

```js
new Date()
// with a specific value
new Date(1640010554086)
new Date('7/5/2022, 7:44:47 PM')
new Date('2021-12-20T14:29:14.086Z')
new Date(1970, 0, 1, 0, 0, 0) // refers to 1/1/1970, 00:00:00 AM
```

### Get a timestamp of current moment (in milliseconds)

```js
Date.now()
```

### Get a timestamp of the first moment of current day

```js
new Date().setHours(0, 0, 0, 0)
```

### Get a string of current moment (weekday + date + time + timezone)

```js
Date() 
// or
new Date().toString()
```

### Get strings in different formats out of an Date object

```js
new Date().toString()
new Date().toDateString()
new Date().toTimeString()
new Date().toLocaleString()
new Date().toLocaleDateString()
new Date().toLocaleTimeString()
new Date().toUTCString()
new Date().toISOString() // YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ
new Date().toJSON()
```

### String to timestamp (with ms precision loss to prevent timing attacks and fingerprinting)

```js
Date.parse('7/5/2022, 7:44:47 PM')
// or
new Date('7/5/2022, 7:44:47 PM').getTime()
```

### Customized date formatter

```js
function stamp2String (stamp) {
  function addDigit (num) {
    return num < 10 ? '0' + num : num;
  }
  const date = new Date(stamp);
  const y = date.getFullYear();
  const m = date.getMonth() + 1; // jan to dec 0 - 11
  const d = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  return `${y}-${addDigit(m)}-${addDigit(d)} ${addDigit(hh)}:${addDigit(mm)}:${addDigit(ss)}`;
}
```

### Get week number

```js
function weekOfYear (stamp) {
  const ms = 8.64e7;
  const date = new Date(stamp);
  const yearStart = new Date(date.getFullYear(), 0, 1).getTime();
  const dayOfYear = Math.floor((stamp - yearStart) / ms);

  return Math.ceil((date.getDay() + 1 + dayOfYear) / 7);
}
```

### Get week range

```js
function weekRange (stamp) {
  const day = new Date(stamp).getDay(); // day of the week, sun to sat 0 - 6
  const ms = 8.64e7;

  return {
    startDate: stamp - day * ms,
    endDate: stamp + (6 - day) * ms
  };
}
```

### Get month range

```js
function monthRange (stamp) {
  const date = new Date(stamp);
  const y = date.getFullYear();
  const m = date.getMonth();

  return {
    startDate: new Date(y, m, 1).getTime(),
    endDate: new Date(y, m+1, 0).getTime()
  }
}
```

### Outstanding JS date & time libs

- [Luxon](https://moment.github.io/luxon/#/?id=luxon)
- [Day.js](https://day.js.org/)
- [Moment.js](https://momentjs.com/)