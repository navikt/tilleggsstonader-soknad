import { Link } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { InlineLenke, TekstElement } from '../../typer/tekst';

const LocaleInlineLenke: React.FC<{ tekst: TekstElement<InlineLenke> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <>
            {tekst[locale].map((tekstElement, indeks) =>
                typeof tekstElement === 'string' ? (
                    <span key={indeks}>{tekstElement}</span>
                ) : (
                    <Link inlineText href={tekstElement.url} key={indeks}>
                        {tekstElement.tekst}
                    </Link>
                )
            )}
        </>
    );
};

export default LocaleInlineLenke;
