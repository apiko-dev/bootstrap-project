const isObject = (obj) => typeof obj === 'object' && obj !== null;
const condStr = (condition, str) => (condition ? str : '');

function attachExtensions(toolbox, namespace, extensions) {
  if (!isObject(toolbox.extensions)) {
    toolbox.extensions = {};
  }

  Object.assign(toolbox.extensions, { [namespace]: extensions });
}

module.exports = {
  attachExtensions,
  isObject,
  condStr,
};
