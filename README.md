# Kolors

A simple module which could manage colors programmatically.

## Installation

```bash
npm install kolors
```

## Usage

```js
const Kolor = require('kolors');

// You can specify RGB hex color code into constructor
const kolor = new Kolor('#239cec');

// or HSL color values
/*
const kolor = new Kolor({
	 h: 203.88059701492537,
	 s: 84.10041841004184,
	 l: 53.13725490196079
});
*/

console.log( kolor.rgb ) // 239cec
console.log( kolor.hsl ) // { h: 203.88059701492537, s: 84.10041841004184, l: 53.13725490196079 }

// Update Hue
kolor.warmen(0.1); // 10% warmer
kolor.colden(0.2); // 20% colder

// Update Saturate
kolor.brighten(0.3); // 30% brighter
kolor.dullen(0.4); // 40% duller

// Update Luminance
kolor.lighten(0.5); // 50% lighter
kolor.darken(0.6); // 60% darker

console.log( kolor.rgb ) // 214182
console.log( kolor.hsl ) // { h: 220.1910447761194, s: 60, l: 31.882352941176478 }

```