const path = require('path');
const { attachExtensions } = require('../utils');

module.exports = (toolbox) => {
  function read(targetPath) {
    const packageJsonPath = path.resolve(targetPath, 'package.json');

    return toolbox.filesystem.read(packageJsonPath, 'json');
  }

  function write(targetPath, json) {
    const packageJsonPath = path.resolve(targetPath, 'package.json');

    return toolbox.filesystem.write(packageJsonPath, json);
  }

  async function addDependencies(targetPath, newDependencies, dev) {
    const packageJson = await read(targetPath);

    const target = dev ? 'devDependencies' : 'dependencies';

    packageJson[target] = Object.assign(
      packageJson[target] || {},
      newDependencies,
    );

    await write(targetPath, packageJson);
  }

  attachExtensions(toolbox, 'packageJson', {
    read,
    write,
    addDependencies,
  });
};
