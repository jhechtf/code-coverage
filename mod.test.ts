import { something } from './mod.ts';
import { assertEquals } from './deps.ts';

Deno.test('Hello', () => {
  assertEquals(something('something'), 'Something something');
  assertEquals(something('bob'), 'get fukt bob');
});
