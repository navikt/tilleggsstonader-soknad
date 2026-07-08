export const tilHeltall = (verdi: number | string | undefined): number | undefined => {
    if (!verdi) {
        return undefined;
    }
    if (typeof verdi === 'string') {
        return isNaN(parseInt(verdi)) ? undefined : parseInt(verdi);
    }
    return verdi;
};

export const erGyldigKostnad = (verdi: string | undefined): boolean => {
    const tall = tilHeltall(verdi);

    return tall !== undefined && tall > 0;
};
