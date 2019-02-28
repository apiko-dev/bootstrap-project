const { attachExtensions } = require('../utils');

function checkCli() {
  // eslint-disable-next-line global-require
  const commandExists = require('command-exists');

  return commandExists('react-native');
}

module.exports = (toolbox) => {
  attachExtensions(toolbox, 'rn', {
    checkCli,
  });
};
