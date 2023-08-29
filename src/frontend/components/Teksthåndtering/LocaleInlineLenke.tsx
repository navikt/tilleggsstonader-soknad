import { Link } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Lenke, TekstElement } from '../../typer/tekst';

const LocaleInlineLenke: React.FC<{ tekst: TekstElement<(string | Lenke)[]> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <>
            {tekst[locale].map((tekstElement) =>
                typeof tekstElement === 'string' ? (
                    tekstElement
                ) : (
                    <Link inlineText href={tekstElement.url}>
                        {tekstElement.tekst}
                    </Link>
                )
            )}
        </>
    );
};

export default LocaleInlineLenke;
