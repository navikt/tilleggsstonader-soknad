import { BodyLong, List, ReadMore } from '@navikt/ds-react';

import LocaleInlineLenke from './LocaleInlineLenke';
import { loggAccordionEvent } from '../../api/amplitude';
import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { InlineLenke, LesMer, TekstElement } from '../../typer/tekst';

export const LocaleReadMore: React.FC<{
    tekst: LesMer<string | string[]>;
    somPunktListe?: boolean;
}> = ({ tekst, somPunktListe = false }) => {
    const { locale } = useSpråk();
    const { stønadstype } = useSøknad();

    const header = tekst.header[locale];
    const innhold = tekst.innhold[locale];

    return (
        <ReadMore
            header={header}
            onOpenChange={(skalÅpnes) => loggAccordionEvent(stønadstype, skalÅpnes, header)}
        >
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
    const { stønadstype } = useSøknad();

    const header = tekst.header[locale];

    return (
        <ReadMore
            header={header}
            onOpenChange={(skalÅpnes) => loggAccordionEvent(stønadstype, skalÅpnes, header)}
        >
            <LocaleInlineLenke tekst={tekst.innhold} />
        </ReadMore>
    );
};

export const LocaleReadMoreMedChildren: React.FC<{
    header: TekstElement<string>;
    children: React.ReactNode;
}> = ({ header, children }) => {
    const { locale } = useSpråk();
    const { stønadstype } = useSøknad();

    const headerTekst = header[locale];

    return (
        <ReadMore
            header={headerTekst}
            onOpenChange={(skalÅpnes) => loggAccordionEvent(stønadstype, skalÅpnes, headerTekst)}
        >
            {children}
        </ReadMore>
    );
};
