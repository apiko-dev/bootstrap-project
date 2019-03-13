const { attachExtensions, buildCommand } = require('../utils');

module.exports = (toolbox) => {
  function init(name) {
    // prettier-ignore

    const cmd = buildCommand([
      `mkdir ${name};`,
      `cd ${name};`,
      'npm init -y',
    ]);

    return toolbox.system.run(cmd);
  }

  attachExtensions(toolbox, 'npmProject', {
    init,
  });
};
