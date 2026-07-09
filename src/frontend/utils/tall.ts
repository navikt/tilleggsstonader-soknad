export const tilHeltall = (verdi: number | string | undefined): number | undefined => {
    if (!verdi) {
        return undefined;
    }

    const verdiNumber = Number(verdi);

    return isNaN(verdiNumber) ? undefined : verdiNumber;
};

export const erGyldigKostnad = (verdi: string | undefined): boolean => {
    const tall = tilHeltall(verdi);

    return tall !== undefined && tall > 0;
};
