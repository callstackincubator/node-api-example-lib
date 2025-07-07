module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['module:react-native-node-api/babel-plugin'],
  };
};