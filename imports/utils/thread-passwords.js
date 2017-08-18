class ThreadPasswords {

    constructor() {
        if (!localStorage.threads) {
            this._threads = {};
        } else {
            this._threads = JSON.parse(localStorage.threads);
        }
    }

    savePassword(thread, password) {
        this._threads[thread] = password;
        this.saveToStorage();
    }

    retrievePassword(thread) {
        return this._threads[thread];
    }

    deleteThread(thread) {
        delete this._threads[thread];
    }

    saveToStorage() {
        localStorage.threads = JSON.stringify(this._threads);
    }
}

export const threadPasswords = new ThreadPasswords();