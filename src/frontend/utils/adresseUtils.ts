import countries from 'i18n-iso-countries';
import codesData from 'i18n-iso-countries/codes.json';
import nbLocale from 'i18n-iso-countries/langs/nb.json';

import { Person } from '../typer/person';
import { Adresse } from '../typer/søknad';

countries.registerLocale(nbLocale);

// Webpack fjerner innholdet i codes.json fra i18n-iso-countries når den bygger,
// noe som gjør at alpha2ToAlpha3 returnerer undefined. Her importerer og bygger vi mappingen direkte
// for å sikre at dataene er inkludert i bundlen.
const alpha2ToAlpha3Map: Record<string, string> = {};
codesData.forEach(([alpha2, alpha3]) => {
    alpha2ToAlpha3Map[alpha2] = alpha3;
});

/**
 * NOR = Norge
 * SJM = Svalbard og Jan Mayen
 */
export const landkodeTilNavn = Object.entries(countries.getNames('nb', { select: 'official' }))
    .map((country) => [alpha2ToAlpha3Map[country[0]], country[1]] as [string, string])
    .reduce(
        (prev, curr) => {
            prev[curr[0]] = curr[1];
            return prev;
        },
        {} as { [key: string]: string }
    );

export const formaterAdresse = (adresse: Adresse | undefined) =>
    adressefelterTilVisning({
        gateadresse: adresse?.gateadresse?.verdi,
        postnummer: adresse?.postnummer?.verdi,
        poststed: adresse?.poststed?.verdi,
        land: adresse?.land?.verdi,
    });

export function mapAdresse(person: Person): Adresse | undefined {
    if (!person.strukturertAdresse) {
        return undefined;
    }
    return {
        gateadresse: { verdi: person.strukturertAdresse.gateadresse, label: 'Gateadresse' },
        postnummer: { verdi: person.strukturertAdresse.postnummer, label: 'Postnummer' },
        poststed: { verdi: person.strukturertAdresse.poststed, label: 'Poststed' },
        land: {
            label: 'Land',
            verdi: person.strukturertAdresse.land,
            svarTekst: person.strukturertAdresse.land,
        },
    };
}

export const adressefelterTilVisning = (adresse: {
    gateadresse?: string;
    postnummer?: string;
    poststed?: string;
    land?: string;
}) => {
    return [
        adresse.gateadresse,
        [adresse.postnummer, adresse.poststed].filter(Boolean).join(' '),
        landkodeTilNavn[adresse.land || ''],
    ]
        .filter(Boolean)
        .join(', ');
};
