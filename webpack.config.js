module.exports = {
  entry: './kolor.loader.js',
  output: {
    filename: 'kolor.browser.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets: ['env'],
		  plugins: ['transform-runtime']
        }
      }
    ]
  }
}