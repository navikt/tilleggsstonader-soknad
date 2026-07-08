import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { EnumFelt, EnumFlereValgFelt, VerdiFelt } from '../../typer/skjema';

type OppsummeringSvarProps = {
    felt: EnumFelt<unknown> | EnumFlereValgFelt<unknown> | VerdiFelt<string | number> | undefined;
    valuePostfix?: string;
};

export const OppsummeringSvar: React.FC<OppsummeringSvarProps> = ({ felt, valuePostfix }) => {
    if (!felt) {
        return null;
    }

    const hentVerdi = (): string => {
        if ('svarTekst' in felt) {
            return felt.svarTekst;
        }

        if ('verdier' in felt) {
            return felt.verdier.map((verdi) => verdi.label).join(', ');
        }

        if ('verdi' in felt) {
            return felt.verdi.toString();
        }

        return '';
    };

    return (
        <FormSummary.Answer>
            <FormSummary.Label>{felt.label}</FormSummary.Label>
            <FormSummary.Value>
                {hentVerdi()}
                {valuePostfix && ` ${valuePostfix}`}
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};
