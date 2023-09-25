const compile = require("string-template/compile");
const extractValues = require("extract-values");

export class FirestorePath<K, T> {
  template: string;
  compiled: (k: K) => string;

  constructor(template: string) {
    this.template = template;
    this.compiled = compile(template);
  }

  /**
   * Takes a key and returns a real path that points to a specific document or collection in firestore
   */
  path = (key: K) => {
    return this.compiled(key);
  };

  extract = (path: string): K => {
    return extractValues(path, this.template) as K;
  };
}
