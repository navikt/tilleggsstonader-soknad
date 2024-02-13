import { Locale, TekstElement } from '../typer/tekst';

export const hentBeskjedMedEttParameter = (argument0: string, tekststreng: string) => {
    return tekststreng.replace('[0]', argument0);
};

export function listeTilTekstElement<T extends string>(
    liste: T[],
    tekstMapping: Record<T, TekstElement<string>>
): TekstElement<string[]> {
    return liste.reduce(
        (accumulated, currentValue) => {
            Object.values(Locale).forEach((locale) =>
                accumulated[locale].push(tekstMapping[currentValue][locale])
            );
            return accumulated;
        },
        { nb: [] } as TekstElement<string[]>
    );
}
