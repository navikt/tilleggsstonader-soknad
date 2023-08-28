import { BodyLong } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

const LocaleTekstAvsnitt: React.FC<{ tekst: TekstElement<string[]> }> = ({ tekst }) => {
    const { locale } = useSpråk();
    const tekstElement = tekst[locale];

    return (
        <>
            {tekstElement.map((tekst, indeks) => (
                <BodyLong key={indeks} spacing={indeks !== tekstElement.length - 1}>
                    {tekst}
                </BodyLong>
            ))}
        </>
    );
};

export default LocaleTekstAvsnitt;
