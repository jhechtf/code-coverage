import args from './args.ts';
import { resolve } from './deps.ts';
import { processLcovFile } from './mod.ts';

const {
  file: fileName = 'lcov.info',
} = args;

const file = await Deno.open(resolve(fileName));
const lineStream = file.readable.pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

const projectCoverage = await processLcovFile(file);

projectCoverage.printTable();
