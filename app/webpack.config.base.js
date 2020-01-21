module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: /src/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [],

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
};
