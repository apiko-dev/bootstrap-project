const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  async function init() {
    const target = path.resolve(ctx.targetPath, '.editorconfig');

    await toolbox.template.generate({
      template: 'editorconfig.ejs',
      target,
    });
  }

  attachExtensions(toolbox, 'editorconfig', {
    init,
  });
};
