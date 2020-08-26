const path = require('path')
const mode = process.env.NODE_ENV || 'development'

// Плагин для очистки папки с результатами
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Плагин для создания index.html — служит точкой входа в приложение
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Плагин для выноса стилей в отдельный файл в режиме production
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Плагин для переноса статических файлов в дистрибуцию
const CopyPlugin = require('copy-webpack-plugin')

// Модуль для преобразования блоков <style lang="scss"> внутри .svelte-файлов
const { sass } = require('svelte-preprocess-sass')

// Конфиг Вебпака
module.exports = {
  // Режим сборки бандла. В режиме development работает webpack-dev-server с живой перезагрузкой при каждом изменении файлов, папка /dist остается пустой. В режиме production сборка происходит единоразовая сборка с генерацией всего бандла в папке /dist
  mode,

  // В режиме development генерируется source-map для удобного дебага. Не используется в продакшене
  devtool: mode === 'production' ? false : 'source-map',

  // Точка входа, включающая набор глобальных стилей, который не импортируется в js-файлы, но необходим в бандле
  entry: {
    main: ['./src/main.js', './src/scss/global.scss']
  },

  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },

  module: {
    rules: [

      /* .svelte-файлы преобразовываются с помощью svelte-loader, который предварительно обрабатывает в них scss-блоки с помощью svelte-preprocess-sass */
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: {
              style: sass({}, { name: 'scss' })
            }
          }
        }
      },

      // Обрабатывает scss-стили из global.scss и добавляет к ним уже преобразованные в css стили из .svelte-файлов. Должен присутствовать, даже если нет отдельных глобальных .scss-файлов, так как без него не сработает корректная обработка стилей внутри svelte-файлов
      {
        test: /\.s?css$/,
        use: [
          // В development-режиме лучше использовать 'style-loader', так как MiniCssExtractPlugin не поддерживает HMR
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      // file-loader используется для обработки изображений, вставленных в js-код или scss-блоки внутри него
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }

    ]
  },

  plugins: [
    // Очищает папку /dist перед каждой итерацией
    new CleanWebpackPlugin(),

    // Создает в папке /dist файл index.html на основе шаблона src/ и добавляет в него ссылку на js- и css-бандлы
    new HtmlWebpackPlugin({
      title: 'Svelte App',
      template: './src/index.html'
    }),

    // Создает отдельные .css-файлы в режиме продакшена. Используется для глобальных стилей
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    // Переносит статические файлы, не относящиеся к стилям и html-шаблонам
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
        { from: 'src/fonts', to: 'fonts' },
      ]
    })
  ]
}
