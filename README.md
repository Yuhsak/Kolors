# Kolors

A simple module which could manage colors programmatically.

## Installation

```bash
npm install kolors
```

## Usage

```js
const Kolor = require('kolors');

const kolor = new Kolor('#239cec');

// Update Hue
kolor.warmen(0.1); // 10% warmer
kolor.colden(0.1); // 10% colder

// Update Saturate
kolor.brighten(0.2); // 20% brighter
kolor.dullen(0.2); // 20% duller

// Update Luminance
kolor.lighten(0.3); // 30% lighter
kolor.darken(0.3); // 30% darker

console.log( kolor.rgb ) // 1996de
console.log( kolor.hsl ) // { h: 201.84179104477616, s: 80, l: 48.35490196078431 }

```