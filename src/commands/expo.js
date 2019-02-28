// bootstrap-project rn TodoApp
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

    // prettier-ignore
    info(showInitializationMessage({ name, shouldUseNpm, template }));

    try {
      await extensions.expo.checkCli();
    } catch (e) {
      error('Please install expo-cli first');
      return;
    }
    // prettier-ignore
    await extensions.expo.init({ template, name, shouldUseNpm });

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
