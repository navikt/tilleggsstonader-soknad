import React, { ChangeEventHandler } from 'react';

import { TextareaProps as AkselTextareaProps, Textarea } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { VerdiFelt } from '../../typer/skjema';
import { InputFelt } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekstUtils';

interface Props extends Omit<AkselTextareaProps, 'label' | 'description' | 'onChange'> {
    tekst: InputFelt;
    argument0?: string;
    onChange: (felt: VerdiFelt<string>) => void;
}

export const LocaleTextarea: React.FC<Props> = ({ tekst, argument0, onChange, ...props }) => {
    const { locale } = useSpråk();

    const label = argument0
        ? hentBeskjedMedEttParameter(argument0, tekst.label[locale])
        : tekst.label[locale];

    const description =
        tekst.description &&
        (argument0
            ? hentBeskjedMedEttParameter(argument0, tekst.description[locale])
            : tekst.description[locale]);

    const oppdater: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        onChange({ label: label, verdi: event.target.value });
    };

    return <Textarea onChange={oppdater} label={label} description={description} {...props} />;
};
