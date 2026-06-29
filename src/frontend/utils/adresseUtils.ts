import countries from 'i18n-iso-countries';
import codesData from 'i18n-iso-countries/codes.json';
import nbLocale from 'i18n-iso-countries/langs/nb.json';

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
