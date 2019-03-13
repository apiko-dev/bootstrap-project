const mkdir = require('make-dir');
const {
  attachExtensions,
  buildCommand,
  splitStrAtIndex,
} = require('../utils');

module.exports = (toolbox) => {
  async function touch(path) {
    if (path.includes('/')) {
      const [folderPath, file] = splitStrAtIndex(
        path,
        path.lastIndexOf('/'),
        true,
      );

      await mkdir(folderPath);

      const cmd = buildCommand([
        `cd ${folderPath};`,
        `touch ${file}`,
      ]);
      // prettier-ignore
      return toolbox.system.run(cmd);
    }

    return toolbox.system.run(`touch ${path}`);
  }

  attachExtensions(toolbox, 'filesystem', {
    touch,
  });
};
