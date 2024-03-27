import styled from 'styled-components';

import { BodyShort, Button, Label, VStack } from '@navikt/ds-react';

import { forsideTekster } from './tekster/forside';
import { Banner } from '../components/Banner';
import { PellePanel } from '../components/PellePanel/PellePanel';
import { Container } from '../components/Side';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../context/PersonContext';
import { fellesTekster } from '../tekster/felles';
import { mellomlagringTekster } from '../tekster/mellomlagring';

// TODO texter

const KnappContainer = styled(VStack)`
    margin: auto;
    width: 15rem;
`;

const TaStillingTilMellomlagring: React.FC<{
    brukMellomlagring: () => void;
    startPåNytt: () => void;
}> = ({ brukMellomlagring, startPåNytt }) => {
    const { person } = usePerson();
    return (
        <>
            <Banner tittel={fellesTekster.banner_bt} />
            <Container>
                <PellePanel poster>
                    <Label>
                        <LocaleTekst
                            tekst={forsideTekster.veileder_tittel}
                            argument0={person.fornavn}
                        />
                    </Label>
                </PellePanel>
                <BodyShort>
                    <LocaleTekst tekst={mellomlagringTekster.informasjon} />
                </BodyShort>
                <KnappContainer gap={'4'}>
                    <Button variant={'primary'} onClick={brukMellomlagring}>
                        <LocaleTekst tekst={mellomlagringTekster.knapp_fortsett} />
                    </Button>
                    <Button variant={'secondary'} onClick={startPåNytt}>
                        <LocaleTekst tekst={mellomlagringTekster.knapp_start_på_nytt} />
                    </Button>
                </KnappContainer>
            </Container>
        </>
    );
};
export default TaStillingTilMellomlagring;
