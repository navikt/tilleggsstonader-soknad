import { Box, List, type ListProps } from '@navikt/ds-react';
import type React from 'react';
import { useSpråk } from '../../context/SpråkContext';
import type { InlineLenke, TekstElement } from '../../typer/tekst';
import { LenkeEllerTekst } from './LocaleInlineLenke';

interface LocalePuntlisteProps extends Omit<ListProps, 'children'> {
    innhold: TekstElement<(string | InlineLenke)[]>;
}

export const LocalePunktliste: React.FC<LocalePuntlisteProps> = ({ innhold, ...listProps }) => {
    const { locale } = useSpråk();
    const punkter = innhold[locale];

    return (
        <Box marginBlock="space-16" asChild>
            <List {...listProps}>{lagPunktliste(punkter)}</List>
        </Box>
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
