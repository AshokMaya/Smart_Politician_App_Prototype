module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        ast: true,
      },
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
      ignore: ['src/assets/compiled-locale/*'],
    },
  },
};
