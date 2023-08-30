import React from 'react';

import { Radio, RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Radiogruppe } from '../../typer/tekst';

interface RadioGroupProps<T>
    extends Omit<AkselRadioGroupProps, 'legend' | 'description' | 'children'> {
    tekst: Radiogruppe<T>;
    children?: React.ReactNode;
}
function LocaleRadioGroup<T>({ children, tekst, ...props }: RadioGroupProps<T>) {
    const { locale } = useSpråk();

    return (
        <RadioGroup
            legend={tekst.header[locale]}
            description={tekst.beskrivelse && tekst.beskrivelse[locale]}
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
