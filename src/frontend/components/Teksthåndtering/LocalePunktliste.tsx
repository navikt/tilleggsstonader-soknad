import React from 'react';

import { List } from '@navikt/ds-react';

import { LenkeEllerTekst } from './LocaleInlineLenke';
import { useSpråk } from '../../context/SpråkContext';
import { InlineLenke, TekstElement } from '../../typer/tekst';

export const LocalePunktliste: React.FC<{
    innhold: TekstElement<(string | InlineLenke)[]>;
}> = ({ innhold }) => {
    const { locale } = useSpråk();
    const punkter = innhold[locale];

    return <List>{lagPunktliste(punkter)}</List>;
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
