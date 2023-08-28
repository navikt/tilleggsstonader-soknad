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
    List,
} from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import { forsideTekster } from './tekster/forside';
import { LocaleTekst } from '../components/LocaleTekst';
import { PellePanel } from '../components/PellePanel/PellePanel';

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

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Forside = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <PellePanel poster>
                <TextContainer>
                    <Label>
                        <LocaleTekst tekst={forsideTekster.veileder_tittel} />
                    </Label>
                    <BodyShort>
                        <LocaleTekst tekst={forsideTekster.veileder_innhold1} />
                    </BodyShort>
                    <BodyShort>
                        <LocaleTekst tekst={forsideTekster.veileder_innhold2} />
                    </BodyShort>
                </TextContainer>
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
                        <TextContainer>
                            <BodyShort>
                                <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_innhold1} />
                            </BodyShort>
                            <BodyShort>
                                <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_innhold2} />
                            </BodyShort>
                        </TextContainer>
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
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_innhold3} />
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
