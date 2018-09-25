const config = {
  entry: `${__dirname}/client/src/app.js`,
  output: {
    path: `${__dirname}/client/public/js`,
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
       test: /\.(png|jpg|gif|jpeg)$/,
       use: [
         {
           loader: 'file-loader',
           options: {}
         }
       ]
     }
    ]
  }
};

module.exports = config;
