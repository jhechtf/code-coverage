/**
 * @description rough range object class with a small helper method.
 * Note that there is no validation on the to/from values.
 */
export class Range {
  constructor(
    public from = -Infinity,
    public to = -Infinity,
  ) {
  }

  toString() {
    if (this.from === this.to && this.from === -Infinity) return 'n/a';
    if (this.from === this.to) return '' + this.from;
    return `${this.from}-${this.to}`;
  }
}
