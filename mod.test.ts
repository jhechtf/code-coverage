import { assertEquals } from './deps.ts';
import { processLcovFile } from './mod.ts';

Deno.test('process a simple file', async () => {
  const stream = ReadableStream.from([
    'SF:./mod.ts\n',
    'FNF:0\n',
    'FNH:0\n',
    'BRF:0\n',
    'BRH:0\n',
    'DA:1,3\n',
    'LH:1\n',
    'LF:1\n',
    'end_of_record\n',
  ]).pipeThrough(new TextEncoderStream());
  const projectCoverage = await processLcovFile(stream);
  assertEquals(projectCoverage.linesFound, 1);
});
