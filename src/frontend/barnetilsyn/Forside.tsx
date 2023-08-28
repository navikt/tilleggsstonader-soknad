import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { styled } from 'styled-components';

import {
    Accordion,
    Alert,
    BodyShort,
    Button,
    Checkbox,
    Heading,
    Label,
    Link,
    List,
} from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import { RoutesBarnetilsyn } from './routing/routesBarnetilsyn';
import { forsideTekster } from './tekster/forside';
import { LocaleTekst } from '../components/LocaleTekst';
import { PellePanel } from '../components/PellePanel/PellePanel';
import TekstContainer from '../components/TekstContainer';
import { useSøknad } from '../context/SøknadContext';
import { hentNesteRoute } from '../utils/routes';

const Container = styled.div`
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0;
    }
`;

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useSøknad();

    const startSøknad = () => {
        if (harBekreftet) {
            const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
            navigate(nesteRoute.path);
        }
    };

    return (
        <Container>
            <PellePanel poster>
                <TekstContainer>
                    <Label>
                        <LocaleTekst tekst={forsideTekster.veileder_tittel} />
                    </Label>
                    <BodyShort>
                        <LocaleTekst tekst={forsideTekster.veileder_innhold1} />
                    </BodyShort>
                    <BodyShort>
                        <LocaleTekst tekst={forsideTekster.veileder_innhold2} />
                    </BodyShort>
                </TekstContainer>
            </PellePanel>
            <Alert variant="info">
                <Heading size="small">
                    <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_tittel} />
                </Heading>
                <BodyShort size="medium">
                    <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_innhold} />
                </BodyShort>
            </Alert>
            <List title="Dine plikter">
                <LocaleTekst tekst={forsideTekster.dine_plikter_innhold} />
            </List>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <TekstContainer>
                            <BodyShort>
                                <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_innhold1} />
                            </BodyShort>
                            <BodyShort>
                                <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_innhold2} />
                            </BodyShort>
                        </TekstContainer>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_innhold1} />
                        <List>
                            <LocaleTekst tekst={forsideTekster.info_som_hentes_innhold2} />
                        </List>
                        <Link>
                            <LocaleTekst tekst={forsideTekster.info_som_hentes_innhold3} />
                        </Link>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.dokumentasjon_utgifter_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekst tekst={forsideTekster.dokumentasjon_utgifter_innhold} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <div>
                <Label>
                    <LocaleTekst tekst={forsideTekster.vi_stoler_tittel} />
                </Label>
                <Checkbox
                    checked={harBekreftet}
                    onChange={(e) => settHarBekreftet(e.target.checked)}
                >
                    <LocaleTekst tekst={forsideTekster.vi_stoler_innhold} />
                </Checkbox>
            </div>
            <KnappeContainer>
                <Button onClick={startSøknad} variant={harBekreftet ? 'primary' : 'secondary'}>
                    Start søknad
                </Button>
            </KnappeContainer>
        </Container>
    );
};

export default Forside;
