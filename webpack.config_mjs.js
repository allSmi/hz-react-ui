const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/mjs'),
    filename: 'hz-react-ui.js',
    library: {
      // name: 'hzReactUi',
      type: 'module'
    },
    environment: {
      module: true,
      dynamicImport: true
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.(js(x)?|ts(x)?)$/i,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
              limit: 8192,
              publicPath: '/',
              esModule: false
            }
          }
        ],
        // webpack5 新增
        type: 'javascript/auto' //https://webpack.docschina.org/guides/asset-modules/#root
      },
    ]
  },
  "externalsType": "import",
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
  // externals: {
  //   'react': {
  //     root: 'React',
  //     commonjs: 'react',
  //     commonjs2: 'react',
  //     amd: 'react'
  //   },
  //   'react-dom': {
  //     root: 'ReactDom',
  //     commonjs: 'react-dom',
  //     commonjs2: 'react-dom',
  //     amd: 'react-dom',
  //   }
  // }
};
