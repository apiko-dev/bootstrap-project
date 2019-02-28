const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  async function init(targetPath) {
    const target = path.resolve(targetPath, '.prettierrc');

    await toolbox.template.generate({
      template: 'prettierrc.ejs',
      target,
    });
  }

  attachExtensions(toolbox, 'prettier', {
    init,
  });
};
