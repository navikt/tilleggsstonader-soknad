import React from 'react';

import { Label, List } from '@navikt/ds-react';

import { tekstTilLenkeEllerTekst } from './LocaleInlineLenke';
import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { Stønadstype } from '../../typer/stønadstyper';
import { InlineLenke, TekstElement } from '../../typer/tekst';

const LocalePunktliste: React.FC<{
    tittel?: TekstElement<string>;
    innhold: TekstElement<(string | InlineLenke)[]>;
    tittelSomLabel?: boolean;
}> = ({ tittel, innhold, tittelSomLabel = false }) => {
    const { locale } = useSpråk();
    const { stønadstype } = useSøknad();
    const punkter = innhold[locale];

    return tittelSomLabel ? (
        <React.Fragment>
            <Label>{tittel && tittel[locale]}</Label>
            <List>{lagPunktliste(punkter, stønadstype)}</List>
        </React.Fragment>
    ) : (
        <List title={tittel && tittel[locale]}>{lagPunktliste(punkter, stønadstype)}</List>
    );
};

const lagPunktliste = (punkter: (string | InlineLenke)[], stønadstype: Stønadstype) =>
    punkter.map((punkt, indeks) =>
        typeof punkt === 'string' ? (
            <List.Item key={indeks}>{punkt}</List.Item>
        ) : (
            <List.Item key={indeks}>
                {punkt.map((tekstElement, indeks) => (
                    <React.Fragment key={indeks}>
                        {tekstTilLenkeEllerTekst(tekstElement, stønadstype)}
                    </React.Fragment>
                ))}
            </List.Item>
        )
    );

export default LocalePunktliste;
