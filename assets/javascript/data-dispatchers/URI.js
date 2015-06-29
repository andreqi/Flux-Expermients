/* @flow */

class URI {
  _base: string;
  _params: Object;
  constructor(baseURL: string) {
    this._base = baseURL;
    this._params = {};
  }

  params(params: Object): URI {
    this._params = params;
    return this;
  }

  toString(): string {
    return this._base + '/' + Object.keys(this._params).map(
      key => String(this._params[key])
    ).join('&');
  }
}

module.exports = URI;
