import { Link } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Lenke, TekstElement } from '../../typer/tekst';

const LocaleInlineLenke: React.FC<{ tekst: TekstElement<(string | Lenke)[]> }> = ({ tekst }) => {
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
