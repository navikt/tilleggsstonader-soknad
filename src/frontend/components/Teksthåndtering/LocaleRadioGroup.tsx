import React from 'react';

import { Radio, RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

type RadioGroupProps<T> = { tekst: TekstElement<Radiogruppe<T>> } & Omit<
    AkselRadioGroupProps,
    'legend' | 'description'
>;
function LocaleRadioGroup<T>(props: RadioGroupProps<T>) {
    const { children, tekst, ...rest } = props;

    const { locale } = useSpråk();

    const raadioGroup = tekst[locale];

    return (
        <RadioGroup legend={raadioGroup.header} description={raadioGroup.beskrivelse} {...rest}>
            {children}
            {raadioGroup.alternativer.map((alternativ) => (
                <Radio value={alternativ.value}>{alternativ[locale]}</Radio>
            ))}
        </RadioGroup>
    );
}

export default LocaleRadioGroup;
