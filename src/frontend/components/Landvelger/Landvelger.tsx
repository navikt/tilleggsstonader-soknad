import React, { useEffect, useMemo } from 'react';

import countries from 'i18n-iso-countries';
import codesData from 'i18n-iso-countries/codes.json';
import nbLocale from 'i18n-iso-countries/langs/nb.json';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { fellesTekster } from '../../tekster/felles';
import { SelectFelt } from '../../typer/skjema';
import { TekstElement } from '../../typer/tekst';

countries.registerLocale(nbLocale);

// Webpack fjerner innholdet i codes.json fra i18n-iso-countries når den bygger,
// noe som gjør at alpha2ToAlpha3 returnerer undefined. Her importerer og bygger vi mappingen direkte
// for å sikre at dataene er inkludert i bundlen.
const alpha2ToAlpha3Map: Record<string, string> = {};
codesData.forEach(([alpha2, alpha3]) => {
    alpha2ToAlpha3Map[alpha2] = alpha3;
});

interface Props {
    id?: string;
    label: TekstElement<string>;
    value?: string;
    onChange: (verdi: SelectFelt) => void;
    medNorskeOmråder: boolean;
    error?: string;
    defaultNorge?: boolean;
}

/**
 * NOR = Norge
 * SJM = Svalbard og Jan Mayen
 */
const utenNorskeOmråder = (country: [string, string]): boolean =>
    country[0] !== 'NOR' && country[0] !== 'SJM';

const landkodeTilNavn = Object.entries(countries.getNames('nb', { select: 'official' }))
    .map((country) => [alpha2ToAlpha3Map[country[0]], country[1]] as [string, string])
    .reduce(
        (prev, curr) => {
            prev[curr[0]] = curr[1];
            return prev;
        },
        {} as { [key: string]: string }
    );

const sorterteLand = Object.entries(landkodeTilNavn).sort(
    (a, b) => (a[1] > b[1] ? 1 : -1) // Sorterer alfabetisk på navn i stedet for landkode
);

const NORGE_KODE = 'NOR';

export const Landvelger: React.FC<Props> = ({
    id,
    label,
    value,
    onChange,
    medNorskeOmråder,
    error,
    defaultNorge = false,
}) => {
    const { locale } = useSpråk();

    const landliste = useMemo(() => {
        if (medNorskeOmråder) {
            return sorterteLand;
        } else {
            return sorterteLand.filter(utenNorskeOmråder);
        }
    }, [medNorskeOmråder]);

    const options = useMemo(
        () => landliste.map(([kode, tekst]) => ({ value: kode, label: tekst })),
        [landliste]
    );

    const selectedOptions = useMemo(
        () => (value ? [{ value, label: landkodeTilNavn[value] || '' }] : []),
        [value]
    );

    useEffect(() => {
        if (defaultNorge && !value) {
            onChange({
                label: label[locale],
                verdi: NORGE_KODE,
                svarTekst: landkodeTilNavn[NORGE_KODE],
            });
        }
    }, [defaultNorge, value, label, locale, onChange]);

    const handleToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            onChange({
                label: label[locale],
                verdi: option,
                svarTekst: landkodeTilNavn[option] || '',
            });
        } else {
            onChange({
                label: label[locale],
                verdi: '',
                svarTekst: '',
            });
        }
    };

    return (
        <UNSAFE_Combobox
            id={id}
            label={label[locale]}
            options={options}
            selectedOptions={selectedOptions}
            onToggleSelected={handleToggleSelected}
            error={error}
            placeholder={fellesTekster.velg_land[locale]}
            shouldAutocomplete
        />
    );
};
