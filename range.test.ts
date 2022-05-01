import { Range } from './range.ts';
import { assertEquals } from './deps.ts';

Deno.test('Default Range', () => {
  const baseRange = new Range();
  assertEquals(
    baseRange.from,
    baseRange.to,
  );
  assertEquals(
    baseRange.toString(),
    'n/a',
  );
});

Deno.test('Full Range', () => {
  const range = new Range(10, 15);
  assertEquals(
    range.to,
    15,
  );
  assertEquals(
    range.toString(),
    '10-15',
  );
});
