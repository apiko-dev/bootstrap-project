const { attachExtensions, condStr } = require('../utils');

module.exports = (toolbox) => {
  function checkCli() {
    // eslint-disable-next-line global-require
    const commandExists = require('command-exists');

    return commandExists('expo');
  }

  function init({ template, name, shouldUseNpm }) {
    // prettier-ignore
    return toolbox.system.run(
      `expo init ${name} ${condStr(shouldUseNpm, '--npm')} --template ${template}`,
    );
  }

  attachExtensions(toolbox, 'expo', {
    checkCli,
    init,
  });
};
