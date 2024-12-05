import { Link } from '@navikt/ds-react';

import { logNavigereEvent } from '../../api/amplitude';
import { useSpråk } from '../../context/SpråkContext';
import { Stønadstype } from '../../typer/stønadstyper';
import { InlineLenke, Lenke, StyledTekst, TekstElement } from '../../typer/tekst';

const LocaleInlineLenke: React.FC<{ tekst: TekstElement<InlineLenke> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <>
            {tekst[locale].map((tekstElement, indeks) =>
                tekstTilLenkeEllerTekst(tekstElement, indeks)
            )}
        </>
    );
};

export const tekstTilLenkeEllerTekst = (
    tekstElement: string | StyledTekst | Lenke,
    indeks: number
) => {
    if (typeof tekstElement === 'string') {
        return <span key={indeks}>{tekstElement}</span>;
    }
    if ('url' in tekstElement) {
        return (
            <Link
                inlineText
                href={tekstElement.url}
                key={indeks}
                variant={tekstElement.variant}
                target="_blank"
                onClick={() =>
                    logNavigereEvent(Stønadstype.BARNETILSYN, tekstElement.url, tekstElement.tekst)
                }
            >
                {tekstElement.tekst}
            </Link>
        );
    }
    return (
        <span key={indeks} style={{ fontWeight: tekstElement.style }}>
            {tekstElement.tekst}
        </span>
    );
};

export default LocaleInlineLenke;
