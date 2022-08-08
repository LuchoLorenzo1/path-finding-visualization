let _instance = null

export default class Context {
  static get state() {
    return _instance ? _instance : (_instance = new Context())
  }
  constructor() {
    this._state = {}
    window.Context = this
  }
  get state() {
    return this._state
  }
  set(key, value) {
    this._state[key] = value
  }
  get(key) {
    return this._state[key]
  }
}
