import React from 'react';

import { Heading } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

export const LocaleHeading: React.FC<{
    tekst: TekstElement<string>;
    level: '1' | '2' | '3' | '4' | '5' | '6';
    size: 'small' | 'xlarge' | 'large' | 'medium' | 'xsmall';
}> = ({ tekst, level, size }) => {
    const { locale } = useSpråk();

    return (
        <Heading level={level} size={size}>
            {tekst[locale]}
        </Heading>
    );
};
