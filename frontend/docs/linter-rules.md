# Linter rules

The linter config file is available [here](../.eslintrc).

## Technical debt

### max-lines:

[Reference](https://eslint.org/docs/rules/max-lines)

Files with too many lines:

- hinder overall understanding of the code due to constant scrolling
- often means the logic should be decoupled in independant components/services

### complexity:

[Reference](https://eslint.org/docs/rules/complexity)

Cyclomatic complexity measures the number of linearly independent paths through a program’s source code.
Functions with a complexity too high:

- are hard to reason about because of the too many possible outcomes
- often means the logic should be decoupled in independant components / services

### max-depth:

[Reference](https://eslint.org/docs/rules/max-depth)

Many developers consider code difficult to read if blocks are nested beyond a certain depth.

### max-params:

[Reference](https://eslint.org/docs/rules/max-params)

Functions that take numerous parameters can be difficult to read and write because it requires the memorization of what each parameter is, its type, and the order they should appear in. The alternative is to pass an object as a single argument.

```
isInRange(min, max, value) {
  ...
}
console.log(isInRange(1, 10, 8))
```

vs

```
isInRange({min, max, value}) {
  ...
}
console.log(isInRange({min: 1, max: 10, value: 8))
```

## Dangerous dependencies

### import/no-extraneous-dependencies

[Reference](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md)

Using dependencies that are not declared in the package.json can lead to bugs or vulnerabilities since you don't control their version
