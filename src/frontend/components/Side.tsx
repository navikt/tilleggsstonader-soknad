import React from 'react';

import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import { Banner } from './Banner';
import { LocaleTekst } from './LocaleTekst';
import { fellesTekster } from '../barnetilsyn/tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { hentRoutes } from '../utils/routes';

interface ISide {
    stønadstype: Stønadstype;
    stegtittel: string;
    children?: React.ReactNode;
}

const InnholdContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 40rem;
        margin: auto;
        padding: 2rem 0;
    }
`;

const Steg = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Innhold = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const KnappeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const Side: React.FC<ISide> = ({ stønadstype, stegtittel, children }) => {
    const location = useLocation();

    const routes = hentRoutes(stønadstype);
    const aktivtSteg = routes.findIndex((steg) => steg.path === location.pathname);

    return (
        <>
            <Banner tittel={fellesTekster.banner} />
            <InnholdContainer>
                <Steg>
                    <Heading size="medium" as="h2">
                        {stegtittel}
                    </Heading>
                    <BodyShort size="small">
                        Steg {aktivtSteg} av {routes.length - 1}
                    </BodyShort>
                </Steg>
                <Innhold>{children}</Innhold>
                <KnappeContainer>
                    <Button variant="secondary">
                        <LocaleTekst tekst={fellesTekster.forrige} />
                    </Button>
                    <Button>
                        <LocaleTekst tekst={fellesTekster.neste} />
                    </Button>
                </KnappeContainer>
            </InnholdContainer>
        </>
    );
};

export default Side;
