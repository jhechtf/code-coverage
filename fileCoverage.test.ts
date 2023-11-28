import { FileCoverage } from './fileCoverage.ts';
import { assertEquals } from './deps.ts';

Deno.test('Base Test', async (t) => {
  // Check the base
  const base = new FileCoverage('some/file');

  await t.step('Basic Info Check', () => {
    assertEquals(base.name, 'some/file');
  });

  await t.step('Methods checks', () => {
    assertEquals(base.setLinesFound(10).linesFound, 10);
    assertEquals(base.setLinesHit(5).linesHit, 5);
  });
});

Deno.test('Parse lines check', async (t) => {
  const fc = new FileCoverage('some/file');
  await t.step('Basic', () => {
    fc.parseRawLine('FNF:0');
    // Assert no change from unconcerned entries...
    assertEquals(fc.linesFound, 0);
    assertEquals(fc.linesHit, 0);
    // Change from concerned entries.
    fc.parseRawLine('DA:10,0');
    assertEquals(
      fc.untouchedLines.length,
      1,
    );
    assertEquals(
      fc.lines.size,
      1,
    );
    // Chain response.
    fc
      .parseRawLine('DA:11,0')
      .parseRawLine('DA:12,2');
    assertEquals(
      fc.lines.size,
      3,
    );
    assertEquals(
      fc.untouchedLines.length,
      2,
    );
    assertEquals(
      fc.missingCoverage,
      '10-11',
    );
  });

  await t.step('Manually adding lines', () => {
    fc.addLines(14, 0);
    assertEquals(
      fc.lines.size,
      4,
    );
  });

  await t.step('Adding more untouched ranges', () => {
    fc.addLines(22, 0)
      .addLines(23, 0)
      .addLines(24, 0);
    assertEquals(fc.missingCoverage, '10-11,14,22-24');
  });

  await t.step('Setting Lines Found/Hit', () => {
    fc
      .parseRawLine('LF:30')
      .parseRawLine('LH:30');
    assertEquals(fc.linesFound, 30);
    assertEquals(fc.linesHit, 30);
  });
});
