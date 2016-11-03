module.exports = {
  entry: './client/js/app.js',
  output: {
    filename: './client/js/bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};