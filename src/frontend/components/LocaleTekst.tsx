import { List } from '@navikt/ds-react';

import { useSpråk } from '../context/SpråkContext';
import { TekstElement } from '../typer/tekst';

export const LocaleTekst: React.FC<{ tekst: TekstElement }> = ({ tekst }) => {
    const { locale } = useSpråk();
    const tekstElement = tekst[locale];

    if (Array.isArray(tekstElement)) {
        return (
            <>
                {tekstElement.map((tekst, indeks) => (
                    <List.Item key={indeks}>{tekst}</List.Item>
                ))}
            </>
        );
    }

    return <>{tekst[locale]}</>;
};
