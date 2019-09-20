const path = require('path');
const { attachExtensions } = require('../utils');

const REACT_RULES = `
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
`;

const REACT_NATIVE_RULES = `
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
`;

const eslintDependencies = {
  'babel-eslint': '^8.2.6',
  'babel-plugin-module-resolver': '^3.2.0',
  '@babel/plugin-proposal-export-namespace-from': '^7.5.2',
  eslint: '^6.2.2',
  'eslint-config-airbnb': '^16.1.0',
  'eslint-config-prettier': '^6.1.0',
  'eslint-formatter-pretty': '^1.3.0',
  'eslint-import-resolver-alias': '^1.1.2',
  'eslint-plugin-import': '^2.18.2',
  'eslint-plugin-jsx-a11y': '^6.0.2',
  'eslint-plugin-prettier': '^3.1.0',
  'eslint-plugin-react': '^7.1.0',
  'eslint-plugin-react-native': '^3.1.0',
  prettier: '^1.18.2',
  'eslint-plugin-babel': '^5.3.0',
};

const craEslint = {
  eslint: '^6.2.2',
  'eslint-config-airbnb': '^16.1.0',
  'eslint-config-prettier': '^6.1.0',
  'eslint-formatter-pretty': '^1.3.0',
  'eslint-plugin-jsx-a11y': '^6.1.2',
  'eslint-plugin-prettier': '^3.0.0',
  'eslint-plugin-testcafe': '^0.2.1',
  prettier: '^1.18.2',
};

module.exports = (toolbox) => {
  const ctx = toolbox.extensions.context.get();

  async function initReact() {
    await toolbox.extensions.packageJson.addDependencies(
      eslintDependencies,
      true,
    );

    const target = path.resolve(ctx.targetPath, '.eslintrc.js');

    await toolbox.template.generate({
      template: 'eslintrc.js.ejs',
      target,
      props: {
        plugins: "['react', 'react-native', 'babel', 'prettier']",
        extensions: "['js', '.android.js', '.ios.js']",
        extends: "['airbnb', 'prettier']",
        reactRules: REACT_NATIVE_RULES,
      },
    });
  }

  async function initCRA() {
    await toolbox.extensions.packageJson.addDependencies(
      craEslint,
      true,
    );

    const target = path.resolve(ctx.targetPath, '.eslintrc.js');

    await toolbox.template.generate({
      template: 'eslintrc.js.ejs',
      target,
      props: {
        plugins: "['react', 'testcafe', 'prettier']",
        extensions: "['js']",
        extends:
          '["airbnb", "plugin:testcafe/recommended", "prettier"]',
        reactRules: REACT_RULES,
      },
    });
  }

  attachExtensions(toolbox, 'linterAirbnb', {
    initReact,
    initCRA,
  });
};
