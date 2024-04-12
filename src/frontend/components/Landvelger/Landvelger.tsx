import React, { useMemo } from 'react';

import countries from 'i18n-iso-countries';
import nbLocale from 'i18n-iso-countries/langs/nb.json';

import { Select } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { fellesTekster } from '../../tekster/felles';
import { SelectFelt } from '../../typer/skjema';
import { TekstElement } from '../../typer/tekst';

countries.registerLocale(nbLocale);

interface Props {
    id?: string;
    label: TekstElement<string>;
    value?: string;
    onChange: (verdi: SelectFelt) => void;
    medNorskeOmråder: boolean;
    error?: string;
}

/**
 * NOR = Norge
 * SJM = Svalbard og Jan Mayen
 */
const utenNorskeOmråder = (country: [string, string]): boolean =>
    country[0] !== 'NOR' && country[0] !== 'SJM';

const landkodeTilNavn = Object.entries(countries.getNames('nb', { select: 'official' }))
    .map((country) => [countries.alpha2ToAlpha3(country[0]), country[1]] as [string, string])
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

const Landvelger: React.FC<Props> = ({ id, label, value, onChange, medNorskeOmråder, error }) => {
    const { locale } = useSpråk();

    const landliste = useMemo(() => {
        if (medNorskeOmråder) {
            return sorterteLand;
        } else {
            return sorterteLand.filter(utenNorskeOmråder);
        }
    }, [medNorskeOmråder]);

    const oppdaterLand = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({
            label: label[locale],
            verdi: e.target.value || '',
            svarTekst: landkodeTilNavn[e.target.value] || '',
        });
    };

    return (
        <Select
            id={id}
            label={label[locale]}
            onChange={oppdaterLand}
            value={value || ''}
            error={error}
        >
            <option value="">{fellesTekster.velg_land[locale]}</option>
            {landliste.map(([kode, tekst]) => (
                <option key={kode} value={kode}>
                    {tekst}
                </option>
            ))}
        </Select>
    );
};

export default Landvelger;
