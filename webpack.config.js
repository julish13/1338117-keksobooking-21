const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/debounce.js",
    "./js/pin.js",
    "./js/move.js",
    "./js/card.js",
    "./js/form.js",
    "./js/validation.js",
    "./js/filter.js",
    "./js/upload.js",
    "./js/map.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },

  devtool: false
}
