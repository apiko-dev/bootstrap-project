// bootstrap-project rn TodoApp
const REACT_RULES = `
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
`;

const eslintDependencies = {
  'babel-eslint': '^8.0.1',
  eslint: '^4.2.0',
  'eslint-config-airbnb': '^16.1.0',
  'eslint-formatter-pretty': '^1.1.0',
  'eslint-plugin-import': '^2.7.0',
  'eslint-plugin-jsx-a11y': '^6.0.2',
  'eslint-plugin-react': '^7.1.0',
  'eslint-plugin-react-native': '^3.1.0',
};

module.exports = {
  name: 'react-native',
  alias: ['rn'],
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { error, info },
      rn,
      system,
      filesystem,
    } = toolbox;

    const { first: name, options } = parameters;

    const shouldUseNpm = options.npm;

    // prettier-ignore
    info(
      `
      Initializing react-native project ${name} using ${shouldUseNpm ? 'npm' : 'yarn'}.
      Please wait a bit.`,
    );

    try {
      await rn.reactNativeInit.checkReactNativeCliInstalled();
    } catch (e) {
      error('Please install react-native-cli first');
      return;
    }

    await system.run(
      `react-native init ${name} ${shouldUseNpm ? '--npm' : ''}`,
    );
    // await system.run(`mkdir ${name}`);
    // await system.run(`cd ${name}; npm init -y`);

    const packageJsonPath = `./${name}/package.json`;
    const packageJson = await filesystem.read(
      packageJsonPath,
      'json',
    );

    info('Adding linter');
    packageJson.devDependencies = Object.assign(
      packageJson.devDependencies || {},
      eslintDependencies,
    );
    await generate({
      template: 'eslintrc.js.ejs',
      target: `${name}/.eslintrc.js`,
      props: {
        plugins: "['react', 'react-native']",
        extensions: "['js', '.android.js', '.ios.js']",
        extends: 'airbnb',
        reactRules: REACT_RULES,
      },
    });

    info('Adding prettier');
    await generate({
      template: 'prettierrc.ejs',
      target: `${name}/.prettierrc`,
    });

    info('Adding editor config');
    await generate({
      template: 'editorconfig.ejs',
      target: `${name}/.editorconfig`,
    });

    // write final package.json
    await filesystem.write(packageJsonPath, packageJson);

    info('Installing additional dependencies');

    const finishCommand = (cmd) => `cd ${name}; ${cmd}`;

    await system.run(finishCommand(shouldUseNpm ? 'npm i' : 'yarn'));

    info('Done. Have a nice day!');
  },
};
