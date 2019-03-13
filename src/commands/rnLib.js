// bootstrap-project rn TodoApp
const { condStr, buildCommand } = require('../utils');

const HELP_MESSAGE = `
Bootstraps react native library with optional exa.

Usage:
  rn-lib <name>
  react-native-lib <name>
  react-native-lib <name> [options]

Options:
  --npm               Use npm as package manager
  --example [type]    Use expo or vanilla example
`;
// prettier-ignore
const showInitializationMessage = (opts) => `
Initializing react-native library project ${opts.name}${condStr(opts.example, ` with an example using ${opts.shouldUseNpm ? 'npm' : 'yarn'}`)}.
${condStr(opts.version, `React Native version: ${opts.version}`)}
Please wait a bit.
`;

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

    // prettier-ignore
    info(showInitializationMessage({ name, shouldUseNpm, example }));
    await extensions.npmProject.init(name);

    info('Adding linter');
    await extensions.linterAirbnb.initReact(targetPath);

    info('Adding prettier');
    await extensions.prettier.init(targetPath);

    info('Adding editor config');
    await extensions.editorconfig.init(targetPath);

    info('Installing additional dependencies');
    await extensions.packageManager.install(targetPath, shouldUseNpm);

    info('Adding npm ignore');
    await extensions.npmignore.init(targetPath, [
      example && 'example',
    ]);

    info('Adding main to package.json');
    const packageJson = await extensions.packageJson.read(targetPath);
    packageJson.main = 'lib/index.js';
    await extensions.packageJson.write(targetPath, packageJson);

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
