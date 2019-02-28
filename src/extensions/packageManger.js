const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  async function install(targetPath, shouldUseNpm) {
    const finishCommand = (cmd) => `cd ${targetPath}; ${cmd}`;

    await toolbox.system.run(
      finishCommand(shouldUseNpm ? 'npm i' : 'yarn'),
    );
  }

  attachExtensions(toolbox, 'packageManager', {
    install,
  });
};
