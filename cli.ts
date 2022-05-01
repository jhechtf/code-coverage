import { ProjectCoverage } from './projectCoverage.ts';
import { FileCoverage } from './fileCoverage.ts';
import args from './args.ts';
import { readLines, resolve } from './deps.ts';

const {
  file: fileName = 'lcov.info',
} = args;
let currentFile: FileCoverage | null = null;

const recordStart = /^SF:/;

const file = await Deno.open(resolve(fileName));

const projectCoverage = new ProjectCoverage();

/**
 * Iterate over the file -- these could be long and keeping the whole text may not be an option,
 * so instead we go line by line since the lcov format has a fairly line-readable setup.
 */
for await (const line of readLines(file)) {
  if (recordStart.test(line)) {
    currentFile = new FileCoverage(line.replace('SF:', ''));
  }

  if (currentFile && line === 'end_of_record') {
    projectCoverage.addFileCoverage(currentFile);
  }

  currentFile?.parseRawLine(line);
}

projectCoverage.printTable();
