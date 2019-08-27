const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  async function init() {
    const target = path.resolve(ctx.targetPath, 'babel.config.js');

    await toolbox.template.generate({
      template: 'babel.config.js.ejs',
      target,
    });
  }

  attachExtensions(toolbox, 'babelConfig', {
    init,
  });
};
