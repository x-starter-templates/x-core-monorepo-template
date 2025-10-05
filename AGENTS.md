
## Project Description
This project is a monorepo managed by `pnpm` and `turbo`, which contains multiple independent functional modules, referred to as `mono packages`. Each `mono package` can be developed, tested independently, and can also be combined to form a complete application.

### Terminology Explanation

| Terminology  | Explanation                                                                                                                                         | Remark                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| mono package | located under packages/, or apps/ or other directories which can be configed at pnpm-workspace.yaml file, contains an independent functional module | also called subpackage |
| root package | the package in the root directory, containing the overall configuration files and scripts                                                           | abbreviated as root    |
| dep package  | the package name in field `dependencies`,`devDependencies`,or `peerDependencies` of `package.json` file                                             | abbreviated as dep     |

### Design Principles
This project is based on the following design principles:
* Independence：
  * every `mono package` need to declare `dep package` explicitly
  * the version semver of `dep package` should be `exact`，for example `1.0.0`, and should avoid to use range server like `^1.0.0` which may cause unexpected issues
  * every `mono package` should follow the `SRP（single Responsibility Priciple）`, avoiding mixing unrelated functionalities.
* High cohesion:
  * each `mono package` should contain all related functionalities that belonges to it, like module A, the exposed interfaces should include all functionalities of module A, including utility functions, UI components, type definitions, etc.
* High mannerability:
  * each `subpackage` should have clear docs
  * each `subpackage` should be well tested if needed.
  * each `subpackage` should declare its entry point explicitly in `exports field`


### Project Structure
```js
|-- apps  // application-related `subpackage`, such as web application, mobile application, etc.
|-- dev-tools // dev environment related `subpackage`，like eslint config, prettier config, etc.
|-- features // business module relatied `subpackage`，like user module, product module, etc.
|-- packages // common `subpackage`，like UI components, utils, types, etc.
|-- turbo
|  |-- generators // turbo code generators
```

### Stack
* pnpm: package manager
* typescript: main programming language
* turbo: monorepo build tool
* vitest: test framework
* code style and lint tools:
  * eslint + oxc：code style checker
  * prettier + oxc plugin：code style formatter
	* commitlint + husky： commit message checker
	* lint-staged： git staged files checker
	* syncpack： ensure all mono packages use the same version of dep packages


### Scripts
the follow is the scripts defined in `root package`
| script        | exec command             | description                                                                                    | remark |
| ------------- | ------------------------ | ---------------------------------------------------------------------------------------------- | ------ |
| clean         | `pnpm run clean`         | clean root package                                                                             |        |
| clean:all     | `pnpm run clean:all`     | clean all packages,  call each `subpackage's clean command` and `root package's clean command` |        |
| dev           | `pnpm run dev`           | local dev                                                                                      |        |
| build         | `pnpm run build`         | build                                                                                          |        |
| preview       | `pnpm run preview`       | preview build result in local                                                                  |        |
| lint          | `pnpm run lint`          | code style lint                                                                                |        |
| lint:fix      | `pnpm run lint:fix`      | code style lint and fix                                                                        |        |
| format        | `pnpm run format`        | code style format check                                                                        |        |
| format:fix    | `pnpm run format:fix`    | code style format check and fix                                                                |        |
| test          | `pnpm run test`          | test                                                                                           |        |
| test:coverage | `pnpm run test:coverage` | test and generate coverage reporter                                                            |        |
| gen           | `pnpm run gen`           | geneate new function                                                                           |        |


## Code Style Guide


