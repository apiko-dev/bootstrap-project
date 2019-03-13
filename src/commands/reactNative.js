const { condStr } = require('../utils');

const HELP_MESSAGE = `
Bootstraps react native project with a given name using yarn.

Usage:
  rn <name>
  react-native <name>
  react-native <name> [options]

Options:
  --npm               Use npm as package manager
  --version, -v       Version of react native
`;
// prettier-ignore
const showInitializationMessage = (opts) => `
Initializing react-native project ${opts.name} using ${opts.shouldUseNpm ? 'npm' : 'yarn'}.
${condStr(opts.version, `React Native version: ${opts.version}`)}
Please wait a bit.
`;

module.exports = {
  name: 'react-native',
  alias: ['rn'],
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
    const version = options.version || options.v;
    const targetPath = `./${name}/`;

    // prettier-ignore
    info(showInitializationMessage({ name, shouldUseNpm, version }));

    try {
      await extensions.rn.checkCli();
    } catch (e) {
      error('Please install react-native-cli first');
      return;
    }
    await extensions.rn.init({ name, shouldUseNpm, version });

    info('Adding linter');
    await extensions.linterAirbnb.initReact(targetPath);

    info('Adding prettier');
    await extensions.prettier.init(targetPath);

    info('Adding editor config');
    await extensions.editorconfig.init(targetPath);

    info('Installing additional dependencies');
    await extensions.packageManager.install(targetPath, shouldUseNpm);

    info('Done. Have a nice day!');
  },
};
