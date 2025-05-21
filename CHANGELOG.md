# Changelog

## [Unreleased][unreleased]

## [3.0.2][] - 2025-05-21

- Add node.js 23 and 24 to CI
- Update dependencies

## [3.0.1][] - 2024-08-30

- Update eslint to 9.x and prettier
- Add node.js 22 to CI

## [3.0.0][] - 2023-12-11

- Drop support of options `{ sandbox }` use `{ context }` instead
- Package maintenance

## [2.2.0][] - 2023-10-27

- Drop node 16 and 19, add node 21 support
- Update dependencies and package maintenance

## [2.1.11][] - 2023-04-29

- Drop node.js 14 support, add node.js 20
- Convert package_lock.json to lockfileVersion 2
- Update dependencies

## [2.1.10][] - 2023-03-14

- Add `node:` prefix in require for built-in modules
- Update dependencies and package maintenance

## [2.1.9][] - 2022-11-18

- Update dependencies and package maintenance

## [2.1.8][] - 2022-06-28

- Update dependencies and package maintenance

## [2.1.7][] - 2022-05-19

- Improve security (new metavm)
- Update dependencies and supported nodejs version

## [2.1.6][] - 2022-03-17

- Update dependencies
- Improve security (new metavm)

## [2.1.5][] - 2021-08-17

- Move types to package root
- Update dependencies
- Add node.js v16 to CI and remove v15

## [2.1.4][] - 2021-05-20

- First release `metaconfiguration`, previously `@metarhia/config`

## [2.1.3][] - 2021-05-20

- Latest release `@metarhia/config`, next will be `metaconfiguration`
- Update dependencies, fix vulnerabilities

## [2.1.1][] - 2021-04-12

- Update dependencies, fix vulnerabilities
- Add typing for Config class
- Remove names argument from configuration factory

## [2.1.0][] - 2021-02-11

- Change signature `await new Config(dirPath, { sandbox })` to
  `new Config(dirPath, { context })` for naming consistency with `metavm`
- Internal refactoring: rename variables

## [2.0.0][] - 2020-12-17

- Use `metavm` instead of `vm`
- Return promise with sections from constructor
- Move `names` to `options` argument
- Use Github Actions instead of Travis CI
- Add security plicy, authors list and changelog

## [1.x][] - 2020-09-06

- Remove `options.priority`
- Tests implemented (metatests)
- Load just specified sections (constructor argument `names`)

## [0.x][] - 2019-12-23

- Load configuration in vm sandbox
- Support configuration files order: `options.priority`
- Support mode (log files second ext): `options.mode`
- Support passing custom sandbox: `options.sandbox`

[unreleased]: https://github.com/metarhia/metaconfiguration/compare/v3.0.2...HEAD
[3.0.2]: https://github.com/metarhia/metaconfiguration/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/metarhia/metaconfiguration/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/metarhia/metaconfiguration/compare/v2.2.0...v3.0.0
[2.2.0]: https://github.com/metarhia/metaconfiguration/compare/v2.1.11...v2.2.0
[2.1.11]: https://github.com/metarhia/metaconfiguration/compare/v2.1.10...v2.1.11
[2.1.10]: https://github.com/metarhia/metaconfiguration/compare/v2.1.9...v2.1.10
[2.1.9]: https://github.com/metarhia/metaconfiguration/compare/v2.1.8...v2.1.9
[2.1.8]: https://github.com/metarhia/metaconfiguration/compare/v2.1.7...v2.1.8
[2.1.7]: https://github.com/metarhia/metaconfiguration/compare/v2.1.6...v2.1.7
[2.1.6]: https://github.com/metarhia/metaconfiguration/compare/v2.1.5...v2.1.6
[2.1.5]: https://github.com/metarhia/metaconfiguration/compare/v2.1.4...v2.1.5
[2.1.4]: https://github.com/metarhia/metaconfiguration/compare/v2.1.3...v2.1.4
[2.1.3]: https://github.com/metarhia/metaconfiguration/compare/v2.1.1...v2.1.3
[2.1.1]: https://github.com/metarhia/metaconfiguration/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/metarhia/metaconfiguration/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/metarhia/metaconfiguration/compare/v1.x...v2.0.0
[1.x]: https://github.com/metarhia/metaconfiguration/compare/v0.x...v1.x
[0.x]: https://github.com/metarhia/metaconfiguration/releases/tag/v0.x
