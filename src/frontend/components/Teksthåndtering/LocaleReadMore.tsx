import { BodyLong, List, ReadMore } from '@navikt/ds-react';

import LocaleInlineLenke from './LocaleInlineLenke';
import { useSpråk } from '../../context/SpråkContext';
import { InlineLenke, LesMer, TekstElement } from '../../typer/tekst';

export const LocaleReadMore: React.FC<{
    tekst: LesMer<string | string[]>;
    somPunktListe?: boolean;
}> = ({ tekst, somPunktListe = false }) => {
    const { locale } = useSpråk();

    const innhold = tekst.innhold[locale];

    return (
        <ReadMore header={tekst.header[locale]}>
            {Array.isArray(innhold) ? (
                somPunktListe ? (
                    <List>
                        {innhold.map((punkt, indeks) => (
                            <List.Item key={indeks}>{punkt}</List.Item>
                        ))}
                    </List>
                ) : (
                    innhold.map((avsnitt, indeks) => (
                        <BodyLong key={indeks} spacing>
                            {avsnitt}
                        </BodyLong>
                    ))
                )
            ) : (
                innhold
            )}
        </ReadMore>
    );
};

export const LocaleReadMoreMedLenke: React.FC<{ tekst: LesMer<InlineLenke> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <ReadMore header={tekst.header[locale]}>
            <LocaleInlineLenke tekst={tekst.innhold} />
        </ReadMore>
    );
};

export const LocaleReadMoreMedChildren: React.FC<{
    header: TekstElement<string>;
    children: React.ReactNode;
}> = ({ header, children }) => {
    const { locale } = useSpråk();

    return <ReadMore header={header[locale]}>{children}</ReadMore>;
};
