const { attachExtensions, buildCommand } = require('../utils');

module.exports = (toolbox) => {
  function checkCli() {
    // eslint-disable-next-line global-require
    const commandExists = require('command-exists');

    return commandExists('expo');
  }

  function init({
    cdIntoPath, template, name, shouldUseNpm,
  }) {
    // prettier-ignore
    const cmd = buildCommand([
      cdIntoPath && `cd ${cdIntoPath} &&`,
      'expo',
      'init',
      '--name',
      name,
      shouldUseNpm && '--npm',
      `--template ${template}`,
      `./${name}`,
    ]);

    return toolbox.system.run(cmd);
  }

  attachExtensions(toolbox, 'expo', {
    checkCli,
    init,
  });
};
