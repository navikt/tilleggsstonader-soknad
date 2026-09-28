import React from 'react';

import { SelectProps as AkselSelectProps, Select } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { EnumFelt } from '../../typer/skjema';
import { SelectGruppe, TekstElement } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekstUtils';

interface SelectProps<T extends string> extends Omit<
    AkselSelectProps,
    'label' | 'description' | 'children' | 'onChange'
> {
    tekst: SelectGruppe<T>;
    onChange: (enumFelt: EnumFelt<T>) => void;
    children?: React.ReactNode;
    argument0?: string;
}

export function LocaleSelect<T extends string>({
    children,
    tekst,
    argument0,
    onChange,
    ...props
}: SelectProps<T>) {
    const { locale } = useSpråk();

    const legend = argument0
        ? hentBeskjedMedEttParameter(argument0, tekst.header[locale])
        : tekst.header[locale];

    const onChangeEnumVerdi = (value: T) => {
        const svarTekst = tekst.alternativer[value];

        onChange({
            label: legend,
            verdi: value,
            alternativer: Object.values(tekst.alternativer).map(
                (alternativ) => (alternativ as TekstElement<string>)[locale]
            ),
            svarTekst: svarTekst?.[locale] || '',
        });
    };

    return (
        <Select
            label={legend}
            description={
                tekst.beskrivelse &&
                (argument0
                    ? hentBeskjedMedEttParameter(argument0, tekst.beskrivelse[locale])
                    : tekst.beskrivelse[locale])
            }
            onChange={(event) => onChangeEnumVerdi(event.target.value as T)}
            {...props}
        >
            {children}
            {Object.entries(tekst.alternativer).map(([value, tekst]) => (
                <option value={value} key={value}>
                    {(tekst as TekstElement<string>)[locale]}
                </option>
            ))}
        </Select>
    );
}
