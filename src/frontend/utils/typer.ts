export function manglerVerdi<T>(verdi: T | undefined | null) {
    return verdi === undefined || verdi === null;
}

export function valuerOrThrow<T>(
    verdi: T | undefined | null,
    message: string = 'Mangler verdi'
): T {
    if (manglerVerdi<T>(verdi)) {
        throw new TypeError(message);
    }

    return verdi as T;
}
