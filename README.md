# Code Coverage Generator

**THIS PROJECT IS RETIRED**

As of Deno 1.39.1 there is now a comparable table displayed by default. If you are on a version of Deno below 1.39.1, please consider upgrading.

This project will no longer be getting any updates.

How is this not a part of the CLI? Maybe it is, but I sure couldn't find it...

## Description

Deno is really nice in that it allows for users to generate code coverage data
directly from tests. However, this data is not very human readable. _But wait!_
they have a built-in tool (`deno coverage`) that will generate a report.
Unfortunately, I find this report hard to read, so we've made a new one.

## Example report

```
.-----------------------------------------------------.
|    File Path    | Coverage | Lines Without Coverage |
|-----------------|----------|------------------------|
| dev_deps.ts     | 100.00%  | n/a                    |
| fileCoverage.ts | 100.00%  | n/a                    |
| mod.ts          | 100.00%  | n/a                    |
| range.ts        | 100.00%  | n/a                    |
| Totals:         | 100.00%  |                        |
'-----------------------------------------------------'
```

## Usage

### Preferred Usage

If you are running `deno >=1.20` (and you _should_ be), the best way to do this
is

```jsonc
{
  // deno.json file in project

  // Basic test coverage for your project
  "test": "deno test",
  // Coverage report (mostly useful for CIs)
  "coverage": "deno test --coverage=.coverage && deno coverage --exclude=fixtures --exclude=test --lcov --output=lcov.info .coverage && deno run --allow-read https://deno.land/x/code_coverage@0.2.1/cli.ts"
}
```

### Legacy Usage (not preferred)

First, you will need to install the script with

```
deno install -A --no-check -n code-coverage https://deno.land/x/code_coverage/cli.ts
```

From there in any project you should be able to add in the `code-coverage`
command to output code coverage.

```
deno test  --coverage=coverage && deno coverage --lcov --output=lcov.info coverage
code-coverage
```

This looks for an `lcov.info` file in the directory the command is being run in.
You can change the file name with

```
code-coverage --file coverage.lcov
```
