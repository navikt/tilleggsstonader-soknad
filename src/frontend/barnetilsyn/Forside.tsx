import { useNavigate } from 'react-router';
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

import { forsideTekster } from './tekster/forside';
import { PellePanel } from '../components/PellePanel/PellePanel';
import LocalePunktliste from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSpråk } from '../context/SpråkContext';

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

const Forside = () => {
    const navigate = useNavigate();
    const { locale } = useSpråk();

    return (
        <Container>
            <PellePanel poster>
                <Label>
                    <LocaleTekst tekst={forsideTekster.veileder_tittel} />
                </Label>
                <LocaleTekstAvsnitt tekst={forsideTekster.veileder_innhold} />
            </PellePanel>
            <Alert variant="info">
                <Heading size="small">
                    <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_tittel} />
                </Heading>
                <BodyShort size="medium">
                    <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_innhold} />
                </BodyShort>
            </Alert>
            <List title={forsideTekster.dine_plikter_tittel[locale]}>
                <LocalePunktliste tekst={forsideTekster.dine_plikter_innhold} />
            </List>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekstAvsnitt tekst={forsideTekster.utgifter_som_dekkes_innhold} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_innhold1} />
                        <List>
                            <LocalePunktliste tekst={forsideTekster.info_som_hentes_innhold2} />
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
                <Checkbox>
                    <LocaleTekst tekst={forsideTekster.vi_stoler_innhold} />
                </Checkbox>
            </div>
            <KnappeContainer>
                <Button onClick={() => navigate('/barnetilsyn/personalia')}>Start søknad</Button>
            </KnappeContainer>
        </Container>
    );
};

export default Forside;
