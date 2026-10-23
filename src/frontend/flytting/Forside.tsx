import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { BodyLong, Button, GuidePanel, HStack, Label, VStack } from '@navikt/ds-react';

import { useFlyttingSøknad } from './context/FlyttingSøknadContext';
import { routesFlytting } from './routing/routesFlytting';
import { forsideTekster } from './tekster/forside';
import { loggBesøk, loggSkjemaStartet } from '../api/analytics';
import { BekreftelseCheckbox } from '../components/BekreftelseCheckbox';
import { Container } from '../components/Side';
import { LocaleInlineLenke } from '../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleTekst } from '../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { usePerson } from '../context/PersonContext';
import { fellesTekster } from '../tekster/felles';
import { Skjematype } from '../typer/skjematyper';
import { hentNesteRoute } from '../utils/routeUtils';

export const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useFlyttingSøknad();
    const { person } = usePerson();
    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = routesFlytting[0];
        loggBesøk(Skjematype.SØKNAD_FLYTTING, route.path, route.label);
    }, []);

    const startSøknad = () => {
        if (harBekreftet) {
            loggSkjemaStartet(Skjematype.SØKNAD_FLYTTING);
            const nesteRoute = hentNesteRoute(routesFlytting, location.pathname);
            navigate(nesteRoute.path);
        } else {
            settSkalViseFeilmelding(true);
        }
    };

    return (
        <Container>
            <GuidePanel poster>
                <Label>
                    <LocaleTekst
                        tekst={forsideTekster.veileder_tittel}
                        argument0={person.fornavn}
                    />
                </Label>
                <LocaleTekstAvsnitt tekst={forsideTekster.veileder_innhold} />
            </GuidePanel>
            <VStack>
                <BodyLong>
                    <LocaleInlineLenke tekst={fellesTekster.viktig_med_rett_opplysninger} />
                </BodyLong>
                <BekreftelseCheckbox
                    skalViseFeilmelding={skalViseFeilmelding}
                    harBekreftet={harBekreftet}
                    oppdaterHarBekreftet={(bekreftet) => settHarBekreftet(bekreftet)}
                    fjernFeilmelding={() => settSkalViseFeilmelding(false)}
                />
                <HStack justify="center">
                    <Button onClick={startSøknad} variant="primary">
                        Start søknad
                    </Button>
                </HStack>
            </VStack>
        </Container>
    );
};
