import { List } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

const LocalePunktliste: React.FC<{ tekst: TekstElement<string[]> }> = ({ tekst }) => {
    const { locale } = useSpråk();
    const tekstElement = tekst[locale];

    return (
        <>
            {tekstElement.map((tekst, indeks) => (
                <List.Item key={indeks}>{tekst}</List.Item>
            ))}
        </>
    );
};

export default LocalePunktliste;
