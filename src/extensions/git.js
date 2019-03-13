const { attachExtensions, buildCommand } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  function init() {
    // prettier-ignore
    const cmd = buildCommand([
      `cd ${ctx.targetPath} &&`,
      'git',
      'init',
    ]);

    return toolbox.system.run(cmd);
  }

  attachExtensions(toolbox, 'git', {
    init,
  });
};
