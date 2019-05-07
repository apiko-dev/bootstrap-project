const { attachExtensions, buildCommand } = require('../utils');

module.exports = (toolbox) => {
  function checkCli() {
    // eslint-disable-next-line global-require
    const commandExists = require('command-exists');

    return commandExists('create-react-app');
  }

  function init({
    cdIntoPath, name, shouldUseNpm,
  }) {
    // prettier-ignore
    const cmd = buildCommand([
      cdIntoPath && `cd ${cdIntoPath} &&`,
      'create-react-app',
      name,
      shouldUseNpm && '--use-npm',
    ]);

    return toolbox.system.run(cmd);
  }

  attachExtensions(toolbox, 'cra', {
    checkCli,
    init,
  });
};
