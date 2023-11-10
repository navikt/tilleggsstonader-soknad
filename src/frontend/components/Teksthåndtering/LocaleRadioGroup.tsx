import React from 'react';

import { Radio, RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { EnumFelt } from '../../typer/skjema';
import { Radiogruppe } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';

interface RadioGroupProps<T>
    extends Omit<AkselRadioGroupProps, 'legend' | 'description' | 'children'> {
    tekst: Radiogruppe<T>;
    onChange: (enumFelt: EnumFelt<T>) => void;
    children?: React.ReactNode;
    argument0?: string;
}
function LocaleRadioGroup<T>({
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
        const svarTekst = tekst.alternativer.find((alternativ) => alternativ.value === value);
        onChange({
            label: legend,
            verdi: value,
            alternativer: tekst.alternativer.map((alternativ) => alternativ.label[locale]),
            svarTekst: svarTekst?.label[locale] || '',
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
            {tekst.alternativer.map((alternativ, indeks) => (
                <Radio value={alternativ.value} key={indeks}>
                    {alternativ.label[locale]}
                </Radio>
            ))}
        </RadioGroup>
    );
}

export default LocaleRadioGroup;
