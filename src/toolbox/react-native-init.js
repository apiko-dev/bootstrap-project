function checkReactNativeCliInstalled() {
  // eslint-disable-next-line global-require
  const commandExists = require('command-exists');

  return commandExists('react-native');
}

module.exports = {
  checkReactNativeCliInstalled,
};
