import React from 'react';

import { Label, List } from '@navikt/ds-react';

import { LenkeEllerTekst } from './LocaleInlineLenke';
import { useSpråk } from '../../context/SpråkContext';
import { InlineLenke, TekstElement } from '../../typer/tekst';

const LocalePunktliste: React.FC<{
    tittel?: TekstElement<string>;
    innhold: TekstElement<(string | InlineLenke)[]>;
    tittelSomLabel?: boolean;
}> = ({ tittel, innhold, tittelSomLabel = false }) => {
    const { locale } = useSpråk();
    const punkter = innhold[locale];

    return tittelSomLabel ? (
        <React.Fragment>
            <Label>{tittel && tittel[locale]}</Label>
            <List>{lagPunktliste(punkter)}</List>
        </React.Fragment>
    ) : (
        <List title={tittel && tittel[locale]}>{lagPunktliste(punkter)}</List>
    );
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

export default LocalePunktliste;
