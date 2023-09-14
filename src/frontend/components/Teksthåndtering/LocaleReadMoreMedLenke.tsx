import { ReadMore } from '@navikt/ds-react';

import LocaleInlineLenke from './LocaleInlineLenke';
import { useSpråk } from '../../context/SpråkContext';
import { InlineLenke, LesMer } from '../../typer/tekst';

const LocaleReadMoreMedLenke: React.FC<{ tekst: LesMer<InlineLenke> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <ReadMore header={tekst.header[locale]}>
            <LocaleInlineLenke tekst={tekst.innhold} />
        </ReadMore>
    );
};

export default LocaleReadMoreMedLenke;
