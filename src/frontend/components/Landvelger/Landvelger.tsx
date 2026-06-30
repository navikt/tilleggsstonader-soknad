import React, { useEffect, useMemo } from 'react';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { fellesTekster } from '../../tekster/felles';
import { SelectFelt } from '../../typer/skjema';
import { TekstElement } from '../../typer/tekst';
import { landkodeTilNavn } from '../../utils/adresseUtils';

interface Props {
    id?: string;
    label: TekstElement<string>;
    value?: string;
    onChange: (verdi: SelectFelt) => void;
    medNorskeOmråder: boolean;
    error?: string;
    defaultNorge?: boolean;
}

const utenNorskeOmråder = (country: [string, string]): boolean =>
    country[0] !== 'NOR' && country[0] !== 'SJM';

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
