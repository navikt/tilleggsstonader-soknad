export const harVerdi = (str: string | undefined | null): str is string =>
    !!str && str.trim() !== '';

export function valueOrThrow<T>(verdi: T | undefined | null, message: string = 'Mangler verdi'): T {
    if (verdi === undefined || verdi === null) {
        throw new TypeError(message);
    }

    return verdi as T;
}
