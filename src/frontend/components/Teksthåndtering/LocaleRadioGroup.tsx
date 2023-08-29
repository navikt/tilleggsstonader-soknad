import React from 'react';

import { Radio, RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface RadioGroupProps<T>
    extends Omit<AkselRadioGroupProps, 'legend' | 'description' | 'children'> {
    tekst: TekstElement<Radiogruppe<T>>;
    children?: React.ReactNode;
}
function LocaleRadioGroup<T>({ children, tekst, ...props }: RadioGroupProps<T>) {
    const { locale } = useSpråk();

    const radioGroupInnhold = tekst[locale];

    return (
        <RadioGroup
            legend={radioGroupInnhold.header}
            description={radioGroupInnhold.beskrivelse}
            {...props}
        >
            {children}
            {radioGroupInnhold.alternativer.map((alternativ) => (
                <Radio value={alternativ.value}>{alternativ[locale]}</Radio>
            ))}
        </RadioGroup>
    );
}

export default LocaleRadioGroup;
