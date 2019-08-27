const { attachExtensions } = require('../utils');

const context = {};

module.exports = (toolbox) => {
  function read(key) {
    return context[key];
  }

  function get() {
    return context;
  }

  function write(key, value) {
    context[key] = value;
  }

  function clean(key) {
    context[key] = null;
  }

  function hasBeenSet(key) {
    return typeof context[key] !== 'undefined';
  }

  attachExtensions(toolbox, 'context', {
    read,
    get,
    write,
    clean,
    hasBeenSet,
  });
};
