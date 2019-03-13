const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  async function init(targetPath, filesToIgnore = []) {
    const target = path.resolve(targetPath, '.npmignore');

    await toolbox.template.generate({
      template: 'npmignore.ejs',
      target,
      props: {
        filesToIgnore: filesToIgnore.filter((item) => !!item),
      },
    });
  }

  attachExtensions(toolbox, 'npmignore', {
    init,
  });
};
