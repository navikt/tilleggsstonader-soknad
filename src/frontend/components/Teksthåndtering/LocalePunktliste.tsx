import { List } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

const LocalePunktliste: React.FC<{
    tittel?: TekstElement<string>;
    innhold: TekstElement<string[]>;
}> = ({ tittel, innhold }) => {
    const { locale } = useSpråk();
    const punkter = innhold[locale];

    return (
        <List title={tittel && tittel[locale]}>
            {punkter.map((punkt, indeks) => (
                <List.Item key={indeks}>{punkt}</List.Item>
            ))}
        </List>
    );
};

export default LocalePunktliste;
