---
layout: post
title: JS Date and Time Manipulation Examples
date: 2022-07-06 23:12
---
### Create a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object

```js
new Date()
// or with a specific value
new Date(1640010554086)
new Date('7/5/2022, 7:44:47 PM')
new Date('2021-12-20T14:29:14.086Z')
new Date(1970, 0, 1, 0, 0, 0) // refers to 2/1/1970, 12:00:00 AM
```

### Get a timestamp of current moment in milliseconds 

```js
Date.now()
```

### Get a string of current moment

```js
// weekday + date + time + timezone
Date() 
// or
new Date().toString()
```

### Get strings in different formats

```js
Date.prototype.toString()
Date.prototype.toDateString()
Date.prototype.toTimeString()
Date.prototype.toLocaleString()
Date.prototype.toLocaleDateString()
Date.prototype.toLocaleTimeString()
Date.prototype.toUTCString()
Date.prototype.toISOString() // YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ
Date.prototype.toJSON()
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
    startDate: new Date(y, m, 1),
    endDate: new Date(y, m+1, 0)
  }
}
```

### Outstanding js date time libs

- [Luxon](https://moment.github.io/luxon/#/?id=luxon)
- [Day.js](https://day.js.org/)
- [Moment.js](https://momentjs.com/)