/* eslint-disable max-len */
const HELP_MESSAGE = `
Bootstraps expo project with a given name using yarn.

Usage:
e <name>
expo <name>
expo <name> [options]

Options:
--npm                  Use npm as package manager.
-t, --template [name]  Specify which template to use. Valid options are "blank", "tabs" or any npm package that includes an Expo project template. Default is blank.
`;
// prettier-ignore
const showInitializationMessage = (opts) => `
Initializing expo project ${opts.name} using ${opts.shouldUseNpm ? 'npm' : 'yarn'}.
Template is ${opts.template}.
Please wait a bit.
`;
/* eslint-enable max-len */

module.exports = {
  name: 'expo',
  alias: ['e'],
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
    const template = options.template || options.t || 'blank';

    // this context will be used by all the extensions
    extensions.context.write('targetPath', targetPath);

    // prettier-ignore
    info(showInitializationMessage({ name, shouldUseNpm, template }));

    // prettier-ignore
    await extensions.expo.init({ template, name, shouldUseNpm });

    info('Adding linter');
    await extensions.linterAirbnb.initReact();

    info('Adding prettier');
    await extensions.prettier.init();

    info('Updating babel config');
    await extensions.babelConfig.init();

    info('Adding editor config');
    await extensions.editorconfig.init();

    info('Installing additional dependencies');
    await extensions.packageManager.install(shouldUseNpm);

    info('Done. Have a nice day!');
  },
};
