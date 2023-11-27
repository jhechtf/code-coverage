import { Range } from './range.ts';

export class FileCoverage {
  lines = new Map<number, number>();
  linesFound = 0;
  linesHit = 0;

  get untouchedLines(): number[] {
    return Array
      .from(this.lines.entries())
      .filter((v) => v[1] === 0)
      .map((v) => v[0]);
  }

  constructor(public readonly name: string) {}

  addLines(lineNumber: number, hitCount: number): typeof this {
    const currentHitCount = this.lines.get(lineNumber) ?? 0;
    this.lines.set(lineNumber, currentHitCount + hitCount);
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
    const ranges: Range[] = [
      new Range(),
    ];

    const orderedLines = Array
      .from(this.lines.entries())
      .sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < orderedLines.length; i++) {
      const recent = ranges.at(-1) as Range;
      if (orderedLines[i][1] === 0 && recent.from === -Infinity) {
        recent.from = recent.to = orderedLines[i][0];
      } else if (orderedLines[i][1] === 0 && orderedLines[i - 1][1] > 0) {
        ranges.push(new Range(orderedLines[i][0], orderedLines[i][0]));
      } else if (orderedLines[i][1] === 0) { // && orderedLines[i-1][1] === 0
        recent.to = orderedLines[i][0];
      } else {
        // orderedLines[i][1] > 0
      }
    }

    return ranges.map((v) => v.toString()).join(',');
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
