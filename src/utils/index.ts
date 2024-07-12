export function replaceHistory(state: object, dest: string) {
    history.replaceState(state, "", dest);
}

export function getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
}