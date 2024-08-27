import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';

import {
    Accordion,
    Alert,
    BodyShort,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    Label,
} from '@navikt/ds-react';

import { ERouteLæremidler, routesLæremidler } from './routing/routesLæremidler';
import { forsideTekster } from './tekster/forside';
import { loggAccordionEvent, loggBesøkBarnetilsyn, loggSkjemaStartet } from '../api/amplitude';
import { PellePanel } from '../components/PellePanel/PellePanel';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocalePunktliste from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { usePerson } from '../context/PersonContext';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { erSnartNyttSkoleår } from '../utils/dato';
import { hentNesteRoute } from '../utils/routes';

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useLæremidlerSøknad();
    const { person } = usePerson();

    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = routesLæremidler[0];
        loggBesøkBarnetilsyn(route.path, route.label);
    }, []);

    const startSøknad = () => {
        if (harBekreftet) {
            loggSkjemaStartet(Stønadstype.LÆREMIDLER);
            const nesteRoute = hentNesteRoute(routesLæremidler, location.pathname);
            navigate(nesteRoute.path);
        } else {
            settSkalViseFeilmelding(true);
        }
    };

    const loggAccordionÅpning = (skalÅpne: boolean, tittel: string) => {
        loggAccordionEvent(skalÅpne, tittel, ERouteLæremidler.FORSIDE);
    };

    return (
        <Container>
            <PellePanel poster>
                <Label>
                    <LocaleTekst
                        tekst={forsideTekster.veileder_tittel}
                        argument0={person.fornavn}
                    />
                </Label>
                <LocaleTekstAvsnitt tekst={forsideTekster.veileder_innhold} />
            </PellePanel>
            {erSnartNyttSkoleår() && (
                <Alert variant="info">
                    <Heading size="small" spacing>
                        <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_tittel} />
                    </Heading>
                    <LocaleTekstAvsnitt tekst={forsideTekster.mottatt_faktura_alert_innhold} />
                </Alert>
            )}
            <LocalePunktliste
                tittel={forsideTekster.dine_plikter_tittel}
                innhold={forsideTekster.dine_plikter_innhold}
            />
            <Accordion>
                <Accordion.Item
                    onOpenChange={(skalÅpne) =>
                        loggAccordionÅpning(skalÅpne, 'Hvilke utgifter dekker vi?')
                    }
                >
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekstAvsnitt tekst={forsideTekster.utgifter_som_dekkes_innhold} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                    onOpenChange={(skalÅpne) =>
                        loggAccordionÅpning(skalÅpne, 'Dokumentasjon av utgifter')
                    }
                >
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
                <Accordion.Item
                    onOpenChange={(skalÅpne) =>
                        loggAccordionÅpning(skalÅpne, 'Informasjon vi henter')
                    }
                >
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocalePunktliste
                            tittel={forsideTekster.info_som_hentes_innhold1}
                            innhold={forsideTekster.info_som_hentes_innhold2}
                            tittelSomLabel
                        />
                        <LocalePunktliste
                            tittel={forsideTekster.info_som_hentes_innhold3}
                            innhold={forsideTekster.info_som_hentes_innhold4}
                            tittelSomLabel
                        />
                        <LocaleInlineLenke tekst={forsideTekster.info_som_hentes_innhold5} />
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
                value={[harBekreftet]}
            >
                <Checkbox
                    value={true}
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
