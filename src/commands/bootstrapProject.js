module.exports = {
  name: 'bootstrap-project',
  run: async (toolbox) => {
    const { print } = toolbox;

    print.info(
      'Welcome to bootstrap-project CLI. Please use --help to see all available commands.',
    );
  },
};
