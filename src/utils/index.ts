import { TIMEOUT_ERROR } from "@/constants";

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

export function getImageURL(file: File) {
    return URL.createObjectURL(file);
}

export function isTimeoutError(error: Error) {
    return error.message.includes(TIMEOUT_ERROR);
}