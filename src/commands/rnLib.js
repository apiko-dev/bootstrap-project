// bootstrap-project rn TodoApp
const { condStr, buildCommand } = require('../utils');

/* eslint-disable max-len */
const HELP_MESSAGE = `
Bootstraps react native library with an optional example.

Usage:
rn-lib <name>
react-native-lib <name>
react-native-lib <name> [options]

Options:
--npm               Use npm as package manager
--example [type]    Create an example. Valid types: expo, vanilla. It won't create any of these by default.
`;
// prettier-ignore
const showInitializationMessage = (opts) => `
Initializing react-native library project ${opts.name}${condStr(opts.example, ` with an example using ${opts.shouldUseNpm ? 'npm' : 'yarn'}`)}.
${condStr(opts.version, `React Native version: ${opts.version}`)}
Please wait a bit.
`;
/* eslint-enable max-len */

module.exports = {
  name: 'react-native-lib',
  alias: ['rn-lib'],
  run: async (toolbox) => {
    const {
      parameters,
      print: { info },
      extensions,
      system,
    } = toolbox;
    const { first: name, options } = parameters;

    if (options.help || options.h) {
      info(HELP_MESSAGE);
      return;
    }

    const { npm: shouldUseNpm, example } = options;

    const targetPath = `./${name}/`;

    // this context will be used by all the extensions
    extensions.context.write('targetPath', targetPath);

    // prettier-ignore
    info(showInitializationMessage({ name, shouldUseNpm, example }));
    await extensions.npmProject.init(name);

    info('Adding linter');
    await extensions.linterAirbnb.initReact();

    info('Adding prettier');
    await extensions.prettier.init();

    info('Adding editor config');
    await extensions.editorconfig.init();

    info('Installing additional dependencies');
    await extensions.packageManager.install(shouldUseNpm);

    info('Adding npm ignore');
    await extensions.npmignore.init([example && 'example']);

    info('Adding main to package.json');
    const packageJson = await extensions.packageJson.read();
    packageJson.main = 'lib/index.js';
    await extensions.packageJson.write(packageJson);

    await extensions.filesystem.touch(`${name}/lib/index.js`);

    // create an example
    if (example) {
      info('Adding example project');
      await system.run(
        buildCommand([
          `cd ${name};`,
          'bootstrap-project',
          example === 'expo' ? 'expo' : 'rn',
          'example',
          shouldUseNpm && '--npm',
        ]),
      );
    }

    info('Done. Have a nice day!');
  },
};
