const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  async function init() {
    const target = path.resolve(ctx.targetPath, '.prettierrc');

    await toolbox.template.generate({
      template: 'prettierrc.ejs',
      target,
    });
  }

  attachExtensions(toolbox, 'prettier', {
    init,
  });
};
