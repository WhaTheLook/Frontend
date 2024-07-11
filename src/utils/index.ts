export function replaceHistory(state: object, dest: string) {
    history.replaceState(state, "", dest);
}