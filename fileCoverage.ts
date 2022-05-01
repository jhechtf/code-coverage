import { Range } from './range.ts';

export class FileCoverage {
  lines = new Map<number, number>();
  linesFound = 0;
  linesHit = 0;

  untouchedLines: number[] = [];

  constructor(public readonly name: string) {}

  addLines(lineNumber: number, hitCount: number): typeof this {
    let currentHitCount = this.lines.get(lineNumber);
    if (!currentHitCount) currentHitCount = 0;
    this.lines.set(lineNumber, currentHitCount + hitCount);
    if (hitCount === 0) this.untouchedLines.push(lineNumber);
    return this;
  }

  setLinesHit(count: number): typeof this {
    this.linesHit = count;
    return this;
  }

  setLinesFound(count: number): typeof this {
    this.linesFound = count;
    return this;
  }

  get missingCoverage(): string {
    const contig: Range[] = [
      new Range(),
    ];

    for (let i = 0; i < this.untouchedLines.length; i++) {
      const recent = contig.at(-1) as Range;
      if (recent.from === -Infinity) {
        recent.from = recent.to = this.untouchedLines[i];
      } else if (this.untouchedLines[i] === recent.to + 1) {
        recent.to = this.untouchedLines[i];
      } else {
        contig.push(
          new Range(this.untouchedLines[i], this.untouchedLines[i]),
        );
      }
    }

    return contig.map((v) => v.toString()).join(',');
  }

  parseRawLine(line: string): typeof this {
    if (line.startsWith('DA:')) {
      line = line.replace('DA:', '');
      const [lineNum, takeCount] = line.split(',').map((v) => Number(v));
      this.addLines(lineNum, takeCount);
    }

    if (/^L[FH]:/.test(line)) {
      const [type, val] = line.split(':');
      if (type === 'LF') this.setLinesFound(Number(val));
      else this.setLinesHit(Number(val));
    }

    return this;
  }
}
