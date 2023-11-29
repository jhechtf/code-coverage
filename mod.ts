import { ProjectCoverage } from './projectCoverage.ts';
import { FileCoverage } from './fileCoverage.ts';
import { TextLineStream } from './deps.ts';

const recordStart = /^SF:/;

export async function processLcovFile(
  readableStream: ReadableStream<Uint8Array>,
): Promise<ProjectCoverage> {
  let currentFile: FileCoverage | null = null;

  const projectCoverage = new ProjectCoverage();

  const lineStream = readableStream
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  /**
   * Iterate over the file -- these could be long and keeping the whole text may not be an option,
   * so instead we go line by line since the lcov format has a fairly line-readable setup.
   */
  for await (const line of lineStream) {
    if (recordStart.test(line)) {
      currentFile = new FileCoverage(line.replace('SF:', ''));
    }

    if (currentFile && line === 'end_of_record') {
      projectCoverage.addFileCoverage(currentFile);
    }

    currentFile?.parseRawLine(line);
  }
  return projectCoverage;
}
