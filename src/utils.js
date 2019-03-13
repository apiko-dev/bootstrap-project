const isObject = (obj) => typeof obj === 'object' && obj !== null;
const condStr = (condition, str) => (condition ? str : '');

function attachExtensions(toolbox, namespace, extensions) {
  if (!isObject(toolbox.extensions)) {
    toolbox.extensions = {};
  }

  Object.assign(toolbox.extensions, { [namespace]: extensions });
}

function buildCommand(args) {
  return args.filter((item) => !!item).join(' ');
}

function splitStrAtIndex(str, index, removeTarget) {
  return [
    str.substring(0, index),
    str.substring(removeTarget ? index + 1 : index),
  ];
}

module.exports = {
  attachExtensions,
  isObject,
  condStr,
  buildCommand,
  splitStrAtIndex,
};
