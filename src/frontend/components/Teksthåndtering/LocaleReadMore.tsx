import { BodyLong, ReadMore } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { LesMer } from '../../typer/tekst';

const LocaleReadMore: React.FC<{ tekst: LesMer<string | string[]> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    const innhold = tekst.innhold[locale];

    return (
        <ReadMore header={tekst.header[locale]}>
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
