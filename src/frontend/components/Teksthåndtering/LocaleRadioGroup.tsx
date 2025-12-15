import React from 'react';

import { Radio, RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { EnumFelt } from '../../typer/skjema';
import { Radiogruppe, TekstElement } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekstUtils';

interface RadioGroupProps<T extends string> extends Omit<
    AkselRadioGroupProps,
    'legend' | 'description' | 'children'
> {
    tekst: Radiogruppe<T>;
    onChange: (enumFelt: EnumFelt<T>) => void;
    children?: React.ReactNode;
    argument0?: string;
}
function LocaleRadioGroup<T extends string>({
    children,
    tekst,
    argument0,
    onChange,
    ...props
}: RadioGroupProps<T>) {
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
            svarTekst: svarTekst[locale] || '',
        });
    };

    return (
        <RadioGroup
            legend={legend}
            description={
                tekst.beskrivelse &&
                (argument0
                    ? hentBeskjedMedEttParameter(argument0, tekst.beskrivelse[locale])
                    : tekst.beskrivelse[locale])
            }
            onChange={onChangeEnumVerdi}
            {...props}
        >
            {children}
            {Object.entries(tekst.alternativer).map(([value, tekst]) => (
                <Radio value={value} key={value}>
                    {(tekst as TekstElement<string>)[locale]}
                </Radio>
            ))}
        </RadioGroup>
    );
}

export default LocaleRadioGroup;
