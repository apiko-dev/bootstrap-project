const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  function read() {
    const packageJsonPath = path.resolve(
      ctx.targetPath,
      'package.json',
    );

    return toolbox.filesystem.read(packageJsonPath, 'json');
  }

  function write(json) {
    const packageJsonPath = path.resolve(
      ctx.targetPath,
      'package.json',
    );

    return toolbox.filesystem.write(packageJsonPath, json);
  }

  async function addDependencies(newDependencies, dev) {
    const packageJson = await read(ctx.targetPath);

    const target = dev ? 'devDependencies' : 'dependencies';

    packageJson[target] = Object.assign(
      packageJson[target] || {},
      newDependencies,
    );

    await write(packageJson);
  }

  attachExtensions(toolbox, 'packageJson', {
    read,
    write,
    addDependencies,
  });
};
