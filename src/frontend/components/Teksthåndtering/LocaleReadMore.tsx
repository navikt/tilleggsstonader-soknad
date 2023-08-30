import styled from 'styled-components';

import { ReadMore } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { LesMer, TekstElement } from '../../typer/tekst';

const Flexbox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LocaleReadMore: React.FC<{ tekst: TekstElement<LesMer> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    const innhold = tekst[locale].innhold;

    if (Array.isArray(innhold)) {
        return (
            <ReadMore header={tekst[locale].header}>
                <Flexbox>
                    {innhold.map((avsnitt, indeks) => (
                        <span key={indeks}>{avsnitt}</span>
                    ))}
                </Flexbox>
            </ReadMore>
        );
    }

    return <ReadMore header={tekst[locale].header}>{tekst[locale].innhold}</ReadMore>;
};

export default LocaleReadMore;
