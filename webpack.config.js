const path = require('path');

module.exports = {
  entry: './scripts/index.js',   // Ruta del archivo de entrada principal de tu aplicación
  output: {
    filename: 'bundle.js',   // Nombre del archivo de salida después de la construcción
    path: path.resolve(__dirname, 'dist'),   // Carpeta de salida después de la construcción
  },
  module:{
    rules: [
        {
            test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        },
    ],
  },
};
