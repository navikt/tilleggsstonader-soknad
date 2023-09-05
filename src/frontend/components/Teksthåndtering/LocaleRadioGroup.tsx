import React from 'react';

import { Radio, RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Radiogruppe } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';

interface RadioGroupProps<T>
    extends Omit<AkselRadioGroupProps, 'legend' | 'description' | 'children'> {
    tekst: Radiogruppe<T>;
    children?: React.ReactNode;
    argument0?: string;
}
function LocaleRadioGroup<T>({ children, tekst, argument0, ...props }: RadioGroupProps<T>) {
    const { locale } = useSpråk();

    return (
        <RadioGroup
            legend={
                argument0
                    ? hentBeskjedMedEttParameter(argument0, tekst.header[locale])
                    : tekst.header[locale]
            }
            description={
                tekst.beskrivelse &&
                (argument0
                    ? hentBeskjedMedEttParameter(argument0, tekst.beskrivelse[locale])
                    : tekst.beskrivelse[locale])
            }
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
