const { condStr } = require('../utils');

const HELP_MESSAGE = `
Bootstraps react project (create-react-app) with a given name using yarn.

Usage:
  cra <name>
  create-react-app <name>
  create-react-app <name> [options]

Options:
  --npm               Use npm as package manager
`;
// prettier-ignore
const showInitializationMessage = (opts) => `
Initializing react project ${opts.name} (create-react-app) using ${opts.shouldUseNpm ? 'npm' : 'yarn'}.
Please wait a bit.
`;

module.exports = {
  name: 'create-react-app',
  alias: ['cra'],
  run: async (toolbox) => {
    const {
      parameters,
      print: { error, info },
      extensions,
    } = toolbox;
    const { first: name, options } = parameters;

    if (options.help || options.h) {
      info(HELP_MESSAGE);
      return;
    }

    const shouldUseNpm = options.npm;
    const targetPath = `./${name}/`;

    // this context will be used by all the extensions
    extensions.context.write('targetPath', targetPath);

    // prettier-ignore
    info(showInitializationMessage({ name, shouldUseNpm }));

    try {
      await extensions.cra.checkCli();
    } catch (e) {
      error('Please install create-react-app first');
      return;
    }
    await extensions.cra.init({ name, shouldUseNpm });

    info('Adding linter');
    await extensions.linterAirbnb.initCRA();

    info('Adding prettier');
    await extensions.prettier.init();

    info('Adding editor config');
    await extensions.editorconfig.init();

    info('Installing additional dependencies');
    await extensions.packageManager.install(shouldUseNpm);

    info('Done. Have a nice day!');
  },
};
