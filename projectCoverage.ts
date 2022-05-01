import { FileCoverage } from './fileCoverage.ts';
import { AsciiTable, basename, relative, resolve } from './deps.ts';

export class ProjectCoverage {
  linesFound = 0;
  linesHit = 0;

  fileCoverages = new Set<FileCoverage>();
  #table = new AsciiTable();

  constructor(public name: string = basename(resolve('.'))) {
    this.#table.setHeading('File Path', 'Coverage', 'Lines Without Coverage');
  }

  addFileCoverage(...fcs: FileCoverage[]): typeof this {
    const cwd = Deno.cwd();
    for (const fc of fcs) {
      this.fileCoverages.add(fc);
      this.linesFound += fc.linesFound;
      this.linesHit += fc.linesHit;
      this.#table.addRow(
        relative(cwd, fc.name),
        `${(fc.linesHit / fc.linesFound * 100).toFixed(2)}%`,
        fc.missingCoverage,
      );
      this.fileCoverages.add(fc);
    }
    return this;
  }

  printTable() {
    console.log(this.#table.toString());
  }
}
