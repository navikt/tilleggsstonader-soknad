import React from 'react';

import { Link } from '@navikt/ds-react';

import { logNavigereEvent } from '../../api/amplitude';
import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { InlineLenke, Lenke, StyledTekst, TekstElement } from '../../typer/tekst';

const LocaleInlineLenke: React.FC<{ tekst: TekstElement<InlineLenke> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return tekst[locale].map((tekstElement, indeks) => (
        <LenkeEllerTekst key={indeks} tekstElement={tekstElement} />
    ));
};

export const LenkeEllerTekst: React.FC<{ tekstElement: string | StyledTekst | Lenke }> = ({
    tekstElement,
}) => {
    const { stønadstype } = useSøknad();

    if (typeof tekstElement === 'string') {
        return <span>{tekstElement}</span>;
    }
    if ('url' in tekstElement) {
        return (
            <Link
                inlineText
                href={tekstElement.url}
                variant={tekstElement.variant}
                target="_blank"
                onClick={() => logNavigereEvent(stønadstype, tekstElement.url, tekstElement.tekst)}
            >
                {tekstElement.tekst}
            </Link>
        );
    }
    return <span style={{ fontWeight: tekstElement.style }}>{tekstElement.tekst}</span>;
};

export default LocaleInlineLenke;
