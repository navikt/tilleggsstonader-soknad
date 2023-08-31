import { BodyLong, ReadMore } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { LesMer, TekstElement } from '../../typer/tekst';

const LocaleReadMore: React.FC<{ tekst: TekstElement<LesMer> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    const innhold = tekst[locale].innhold;

    return (
        <ReadMore header={tekst[locale].header}>
            {Array.isArray(innhold)
                ? innhold.map((avsnitt, indeks) => (
                      <BodyLong key={indeks} spacing>
                          {avsnitt}
                      </BodyLong>
                  ))
                : innhold}
        </ReadMore>
    );
};

export default LocaleReadMore;
