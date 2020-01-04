const { attachExtensions, buildCommand } = require('../utils');

module.exports = (toolbox) => {
  function checkCli() {
    // eslint-disable-next-line global-require
    const commandExists = require('command-exists');

    return commandExists('react-native');
  }

  function init({ cdIntoPath, name, shouldUseNpm, version }) {
    const cmd = buildCommand([
      cdIntoPath && `cd ${cdIntoPath} &&`,
      'npx',
      'react-native',
      'init',
      name,
      shouldUseNpm && '--npm',
      version && `--version ${version}`,
    ]);
    // prettier-ignore
    return toolbox.system.run(cmd);
  }

  attachExtensions(toolbox, 'rn', {
    checkCli,
    init,
  });
};
