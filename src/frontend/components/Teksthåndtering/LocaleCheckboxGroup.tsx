import React from 'react';

import {
    CheckboxGroupProps as AkselCheckboxGroupProps,
    CheckboxGroup,
    Checkbox,
} from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { EnumFelt } from '../../typer/skjema';
import { Radiogruppe } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';

interface CheckboxGroupProps<T>
    extends Omit<AkselCheckboxGroupProps, 'onChange' | 'legend' | 'children'> {
    tekst: Radiogruppe<T>;
    onChange: (enumFelt: EnumFelt<T[]>) => void;
    children?: React.ReactNode;
    argument0?: string;
}

function LocaleCheckboxGroup<T>({
    children,
    tekst,
    argument0,
    onChange,
    ...props
}: CheckboxGroupProps<T>) {
    const { locale } = useSpråk();

    const legend = argument0
        ? hentBeskjedMedEttParameter(argument0, tekst.header[locale])
        : tekst.header[locale];

    const oppdaterValgteVerdier = (value: T[]) => {
        const svarTekst = tekst.alternativer.find((alternativ) => alternativ.value === value);
        onChange({
            label: legend,
            verdi: value,
            alternativer: tekst.alternativer.map((alternativ) => alternativ.label[locale]),
            svarTekst: svarTekst?.label[locale] || '',
        });
    };

    return (
        <CheckboxGroup
            legend={legend}
            description={
                tekst.beskrivelse &&
                (argument0
                    ? hentBeskjedMedEttParameter(argument0, tekst.beskrivelse[locale])
                    : tekst.beskrivelse[locale])
            }
            onChange={oppdaterValgteVerdier}
            {...props}
        >
            {children}
            {tekst.alternativer.map((alternativ, indeks) => (
                <Checkbox value={alternativ.value} key={indeks}>
                    {alternativ.label[locale]}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
}

export default LocaleCheckboxGroup;
