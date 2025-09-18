import React from 'react';

import { List, ListProps } from '@navikt/ds-react';

import { LenkeEllerTekst } from './LocaleInlineLenke';
import { useSpråk } from '../../context/SpråkContext';
import { InlineLenke, TekstElement } from '../../typer/tekst';

interface LocalePuntlisteProps extends Omit<ListProps, 'children'> {
    innhold: TekstElement<(string | InlineLenke)[]>;
}

export const LocalePunktliste: React.FC<LocalePuntlisteProps> = ({ innhold, ...listProps }) => {
    const { locale } = useSpråk();
    const punkter = innhold[locale];

    return <List {...listProps}>{lagPunktliste(punkter)}</List>;
};

const lagPunktliste = (punkter: (string | InlineLenke)[]) =>
    punkter.map((punkt, indeks) =>
        typeof punkt === 'string' ? (
            <List.Item key={indeks}>{punkt}</List.Item>
        ) : (
            <List.Item key={indeks}>
                {punkt.map((tekstElement, indeks) => (
                    <LenkeEllerTekst key={indeks} tekstElement={tekstElement} />
                ))}
            </List.Item>
        )
    );
