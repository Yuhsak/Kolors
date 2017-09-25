module.exports = {
  entry: './kolors.loader.js',
  output: {
    filename: 'kolors.browser.js'
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