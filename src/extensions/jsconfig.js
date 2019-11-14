const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  async function init() {
    const target = path.resolve(ctx.targetPath, 'jsconfig.json');

    await toolbox.template.generate({
      template: 'jsconfig.json.ejs',
      target,
    });
  }

  attachExtensions(toolbox, 'jsconfig', {
    init,
  });
};
