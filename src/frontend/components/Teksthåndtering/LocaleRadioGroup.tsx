import React from 'react';

import { RadioGroup, RadioGroupProps as AkselRadioGroupProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

type RadioGroupProps = { tekst: TekstElement<Radiogruppe> } & Omit<
    AkselRadioGroupProps,
    'legend' | 'description'
>;
const LocaleRadioGroup: React.FC<RadioGroupProps> = (props) => {
    const { children, tekst, ...rest } = props;

    const { locale } = useSpråk();

    const raadioGroup = tekst[locale];

    return (
        <RadioGroup legend={raadioGroup.header} description={raadioGroup.beskrivelse} {...rest}>
            {children}
        </RadioGroup>
    );
};

export default LocaleRadioGroup;
