# Code Coverage Generator

How is this not a part of the CLI? Maybe it is, but I sure couldn't find it...

## Description

Deno is really nice in that it allows for users to generate code coverage data
directly from tests. However, this data is not very human readable. _But wait!_
they have a built-in tool (`deno coverage`) that will generate a report.
Unfortunately, I find this report hard to read, so we've made a new one.

## Usage

First, you will need to install the script with

```
deno install -A --no-check -n code-coverage https://deno.land/x/code_coverage/cli.ts
```

From there in any project you should be able to run

```
code-coverage
```

This looks for an `lcov.info` file in the directory the command is being run in.
You can change the file name with

```
code-coverage --file coverage.lcov
```
