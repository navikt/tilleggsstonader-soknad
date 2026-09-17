import React from 'react';

import { TextField, TextFieldProps as AkselTextFieldProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { InputFelt } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekstUtils';

interface Props extends Omit<AkselTextFieldProps, 'label' | 'description'> {
    tekst: InputFelt;
    argument0?: string;
}

export const LocaleTextField: React.FC<Props> = ({ tekst, argument0, ...props }) => {
    const { locale } = useSpråk();

    const label = argument0
        ? hentBeskjedMedEttParameter(argument0, tekst.label[locale])
        : tekst.label[locale];

    const description =
        tekst.description &&
        (argument0
            ? hentBeskjedMedEttParameter(argument0, tekst.description[locale])
            : tekst.description[locale]);

    return <TextField label={label} description={description} {...props} />;
};
