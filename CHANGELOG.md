# Changelog

## [Unreleased][unreleased]

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

[unreleased]: https://github.com/metarhia/config/compare/v2.1.1...HEAD
[2.1.1]: https://github.com/metarhia/config/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/metarhia/config/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/metarhia/config/compare/v1.x...v2.0.0
[1.x]: https://github.com/metarhia/config/compare/v0.x...v1.x
[0.x]: https://github.com/metarhia/config/releases/tag/v0.x
