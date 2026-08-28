import { Heading, type HeadingProps } from '@navikt/ds-react';
import type React from 'react';

import { useSpråk } from '../../context/SpråkContext';
import type { TekstElement } from '../../typer/tekst';

interface LocaleHeadingProps extends Omit<HeadingProps, 'children'> {
    tekst: TekstElement<string>;
}

export const LocaleHeading: React.FC<LocaleHeadingProps> = ({ tekst, ...headingProps }) => {
    const { locale } = useSpråk();

    return <Heading {...headingProps}>{tekst[locale]}</Heading>;
};
