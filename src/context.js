let _appState = null

export default class Context {
  static get state() {
    return _appState ? _appState : (_appState = new Context())
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
		return value
  }
  get(key) {
    return this._state[key]
  }
}
