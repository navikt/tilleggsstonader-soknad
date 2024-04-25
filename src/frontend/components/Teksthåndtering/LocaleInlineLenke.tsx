import { Link } from '@navikt/ds-react';

import { logNavigereEvent } from '../../api/amplitude';
import { useSpråk } from '../../context/SpråkContext';
import { Stønadstype } from '../../typer/stønadstyper';
import { InlineLenke, TekstElement } from '../../typer/tekst';

const LocaleInlineLenke: React.FC<{ tekst: TekstElement<InlineLenke> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <>
            {tekst[locale].map((tekstElement, indeks) =>
                typeof tekstElement === 'string' ? (
                    <span key={indeks}>{tekstElement}</span>
                ) : (
                    <Link
                        inlineText
                        href={tekstElement.url}
                        key={indeks}
                        variant={tekstElement.variant}
                        target="_blank"
                        onClick={() =>
                            logNavigereEvent(
                                Stønadstype.BARNETILSYN,
                                tekstElement.url,
                                tekstElement.tekst
                            )
                        }
                    >
                        {tekstElement.tekst}
                    </Link>
                )
            )}
        </>
    );
};

export default LocaleInlineLenke;
