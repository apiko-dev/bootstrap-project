const { attachExtensions, buildCommand } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  async function install(shouldUseNpm) {
    const cmd = buildCommand([
      `cd ${ctx.targetPath} &&`,
      shouldUseNpm ? 'npm i' : 'yarn',
    ]);

    await toolbox.system.run(cmd);
  }

  attachExtensions(toolbox, 'packageManager', {
    install,
  });
};
