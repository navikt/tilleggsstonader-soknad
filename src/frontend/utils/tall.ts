export const tilTall = (verdi: number | string | undefined): number | undefined => {
    if (verdi === undefined || verdi === '') {
        return undefined;
    }

    const verdiNumber = Number(verdi);

    return isNaN(verdiNumber) ? undefined : verdiNumber;
};

export const erGyldigKostnad = (verdi: string | undefined): boolean => {
    const tall = tilTall(verdi);

    return tall !== undefined && tall > 0;
};
