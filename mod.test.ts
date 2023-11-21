import { something } from './mod.ts';

import { assertEquals } from './dev_deps.ts';

Deno.test('Hello', () => {
  assertEquals(something('something'), 'Something something');
  assertEquals(something('bob'), 'get fukt bob');
});
