import { useState } from 'react';

import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { styled } from 'styled-components';

import {
    Accordion,
    Alert,
    BodyLong,
    BodyShort,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    Label,
} from '@navikt/ds-react';

import { RoutesBarnetilsyn } from './routing/routesBarnetilsyn';
import { forsideTekster } from './tekster/forside';
import { PellePanel } from '../components/PellePanel/PellePanel';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocalePunktliste from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';
import { fellesTekster } from '../tekster/felles';
import { erSnartNyttSkoleår } from '../utils/dato';
import { hentFornavn } from '../utils/formatering';
import { hentNesteRoute } from '../utils/routes';

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useSøknad();
    const { person } = usePerson();

    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    const startSøknad = () => {
        if (harBekreftet) {
            const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
            navigate(nesteRoute.path);
        } else {
            settSkalViseFeilmelding(true);
        }
    };

    return (
        <Container>
            <PellePanel poster>
                <Label>
                    <LocaleTekst
                        tekst={forsideTekster.veileder_tittel}
                        argument0={hentFornavn(person.navn)}
                    />
                </Label>
                <BodyShort>
                    <LocaleTekst tekst={forsideTekster.veileder_innhold} />
                </BodyShort>
            </PellePanel>
            {erSnartNyttSkoleår() && (
                <Alert variant="info">
                    <Heading size="small">
                        <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_tittel} />
                    </Heading>
                    <BodyShort size="medium">
                        <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_innhold} />
                    </BodyShort>
                </Alert>
            )}
            <LocalePunktliste
                tittel={forsideTekster.dine_plikter_tittel}
                innhold={forsideTekster.dine_plikter_innhold}
            />
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <BodyLong spacing>
                            <LocaleInlineLenke
                                tekst={forsideTekster.utgifter_som_dekkes_innhold_1}
                            />
                        </BodyLong>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_innhold_2} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_innhold1} />
                        <LocalePunktliste innhold={forsideTekster.info_som_hentes_innhold2} />
                        <LocaleInlineLenke tekst={forsideTekster.info_som_hentes_innhold3} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.dokumentasjon_utgifter_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        {forsideTekster.dokumentasjon_utgifter_innhold.map((tekst, indeks) => (
                            <LocalePunktliste
                                key={indeks}
                                tittel={tekst.tittel}
                                innhold={tekst.innhold}
                                tittelSomLabel
                            />
                        ))}
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <CheckboxGroup
                legend={<LocaleTekst tekst={fellesTekster.vi_stoler_tittel} />}
                error={
                    skalViseFeilmelding && (
                        <LocaleTekst tekst={fellesTekster.vi_stoler_feilmelding} />
                    )
                }
            >
                <Checkbox
                    value={harBekreftet}
                    onChange={(e) => {
                        settHarBekreftet(e.target.checked);
                        settSkalViseFeilmelding(false);
                    }}
                >
                    <LocaleTekst tekst={fellesTekster.vi_stoler_innhold} />
                </Checkbox>
            </CheckboxGroup>
            <KnappeContainer>
                <Button onClick={startSøknad} variant="primary">
                    Start søknad
                </Button>
            </KnappeContainer>
        </Container>
    );
};

export default Forside;
