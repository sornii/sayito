class SayitoLanguage {
  constructor() {
    if (localStorage.language) {
      this.loadFromStorage();
    } else {
      this.loadFromBrowser();
    }

    this.saveToStorage();
  }

  retrieveLanguage() {
    return this._language;
  }

  loadFromBrowser() {
    this._language = window.navigator.userLanguage ||
      window.navigator.language ||
      window.navigator.systemLanguage;
  }

  loadFromStorage() {
    this._language = localStorage.language;
  }

  saveToStorage() {
    localStorage.language = this._language;
  }
}

export default new SayitoLanguage();
