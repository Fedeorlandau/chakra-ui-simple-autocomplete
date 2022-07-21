# React Package Starter

This is a simple and slightly opinionated starter kit for developing and publishing React packages. It comes with a several pre-configured tools, so you could focus on coding instead of configuring a project for the nth time.

## Getting started

```console
npx degit TimMikeladze/tsup-react-package-starter my-react-package

yarn && yarn dev
```

❗Important note: This project uses [yarn](https://yarnpkg.com/) for managing dependencies.

## What's included?

- ⚡️[tsup](https://github.com/egoist/tsup) - The simplest and fastest way to bundle your TypeScript libraries. Used to bundle package as ESM and CJS modules.
- 📖 [Storybook](https://storybook.js.org/) - Build UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- 🧪 [Jest](https://jestjs.io/) - A testing framework for JavaScript. Preconfigured to work with TypeScript and JSX.
- 🔼 [Release](https://github.com/vercel/release) - Release is a command line tool to automatically generate a new GitHub Release and populates it with the changes (commits) made since the last release.
- 🐙 [Test & Publish via Github Actions](https://docs.github.com/en/actions) - CI/CD workflows for your package. Run tests on every commit plus integrate with Github Releases to automate publishing package to NPM and Storybook to Github Pages.
- 📄 [Commitizen](https://github.com/commitizen/cz-cli) — When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time.
- 🚓 [Commitlint](https://github.com/conventional-changelog/commitlint) — Checks that your commit messages meet the conventional commit format.
- 🐶 [Husky](https://github.com/typicode/husky) — Running scripts before committing.
- 🚫 [lint-staged](https://github.com/okonet/lint-staged) — Run linters on git staged files
- 🖌 [Renovate](https://github.com/renovatebot/renovate) - Universal dependency update tool that fits into your workflows. Configured to periodically check your dependencies for updates and send automated pull requests.
- ☑️ [ESLint](https://eslint.org/) - A linter for JavaScript. Includes a simple configuration for React projects based on the recommended ESLint and AirBnB configs.

## Usage

### Developing

Watch and rebuild code with `tsup` and runs Storybook to preview your UI during development.

```console
yarn dev
```

Run tests with `jest` when changes are detected.

```console
yarn test:watch
```

To run all tests once without watching for changes.

```console
yarn test
```

Build package with `tsup` for production.

```console
yarn build
```

### Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
yarn commit
```

### Publishing

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically build the package and publish it to NPM. Additionally, a Storybook will be published to Github pages.

Learn more about how to use the `release` command [here](https://github.com/vercel/release).

```console
yarn release <optional semver type>
```

❗Important note: in order to publish package to NPM you must add your token as a Github Action secret. Learn more on how to configure your repository and publish packages through Github Actions [here](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages).

