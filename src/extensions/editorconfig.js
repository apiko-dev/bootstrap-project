const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  async function init(targetPath) {
    const target = path.resolve(targetPath, '.editorconfig');

    await toolbox.template.generate({
      template: 'editorconfig.ejs',
      target,
    });
  }

  attachExtensions(toolbox, 'editorconfig', {
    init,
  });
};
