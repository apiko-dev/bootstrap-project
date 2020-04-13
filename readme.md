# bootstrap-project CLI

> A CLI for bootstrapping Apiko projects

# Installation

You should install the CLI globally using `npm` or `yarn`:

```bash
$ npm i -g @apiko/bootstrap-project
```

After that, `bootstrap-project` command will be available for you.

Or use can use it directly running via `npx`:

```bash
 npx @apiko/bootstrap-project --help
```

Make sure to include the scope (`@apiko`) when you're running using npx.

## Available commands

#### React Native

You can use `react-native` (alias `rn`) command to bootstrap React Native project.

```bash
$ bootstrap-project react-native <name>
```

Use `--help` to see all available options:

```bash
$ bootstrap-project react-native --help
```

#### Expo

You can use `expo` command to bootstrap Expo project.

```bash
$ bootstrap-project expo <name>
```

Use `--help` to see all available options:

```bash
$ bootstrap-project expo --help
```

#### create-react-app

You can use `create-react-app` command to bootstrap react (create-react-app) project.

```bash
$ bootstrap-project create-react-app <name>
```

Use `--help` to see all available options:

```bash
$ bootstrap-project create-react-app --help
```

### Library

##### React Native Library

You can use `react-native-lib` (alias `rn-lib`) command to bootstrap React Native Library project with an optional example.

```bash
$ bootstrap-project react-native-lib <name> [options]
```

Use `--help` to see all available options:

```bash
$ bootstrap-project react-native-lib --help
```

# License
MIT - see LICENSE
