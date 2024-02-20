import React from 'react';

import { Label, List } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

const LocalePunktliste: React.FC<{
    tittel?: TekstElement<string>;
    innhold: TekstElement<string[]>;
    tittelSomLabel?: boolean;
}> = ({ tittel, innhold, tittelSomLabel = false }) => {
    const { locale } = useSpråk();
    const punkter = innhold[locale];

    return tittelSomLabel ? (
        <React.Fragment>
            <Label>{tittel && tittel[locale]}</Label>
            <List>
                {punkter.map((punkt, indeks) => (
                    <List.Item key={indeks}>{punkt}</List.Item>
                ))}
            </List>
        </React.Fragment>
    ) : (
        <List title={tittel && tittel[locale]}>
            {punkter.map((punkt, indeks) => (
                <List.Item key={indeks}>{punkt}</List.Item>
            ))}
        </List>
    );
};

export default LocalePunktliste;
