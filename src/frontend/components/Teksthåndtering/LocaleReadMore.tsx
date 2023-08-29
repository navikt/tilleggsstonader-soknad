import { ReadMore } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { LesMer, TekstElement } from '../../typer/tekst';

const LocaleReadMore: React.FC<{ tekst: TekstElement<LesMer> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return <ReadMore header={tekst[locale].header}>{tekst[locale].innhold}</ReadMore>;
};

export default LocaleReadMore;
