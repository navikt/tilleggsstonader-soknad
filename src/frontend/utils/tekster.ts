import { VerdiFelt } from '../typer/skjema';
import { Locale, TekstElement } from '../typer/tekst';

export const hentBeskjedMedEttParameter = (argument0: string, tekststreng: string) => {
    return tekststreng.replace('[0]', argument0);
};

export function verdiFelterTilTekstElement<T extends string>(
    liste: VerdiFelt<T>[]
): TekstElement<string[]> {
    return liste.reduce(
        (accumulated, currentValue) => {
            Object.values(Locale).forEach((locale) => accumulated[locale].push(currentValue.label));
            return accumulated;
        },
        { nb: [] } as TekstElement<string[]>
    );
}
