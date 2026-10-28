import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
    Accordion,
    BodyLong,
    BodyShort,
    Button,
    GuidePanel,
    Heading,
    HStack,
    VStack,
} from '@navikt/ds-react';

import { ForsideTekster } from './ForsideTekster';
import { loggBesøk, loggSkjemaStartet } from '../../api/analytics';
import { fellesTekster } from '../../tekster/felles';
import { IRoute } from '../../typer/routes';
import { Skjematype } from '../../typer/skjematyper';
import { hentNesteRoute, Skjemasteg } from '../../utils/routeUtils';
import { BekreftelseCheckbox } from '../BekreftelseCheckbox';
import { EndringEnsligForsørgerExpansionCard } from '../EndringEnsligForsørger/EndringEnsligForsørgerExpansionCard';
import { InfoPunktliste } from '../InfoPunktliste';
import { Container } from '../Side';
import { LocaleInlineLenke } from '../Teksthåndtering/LocaleInlineLenke';
import { LocalePunktliste } from '../Teksthåndtering/LocalePunktliste';
import { LocaleTekstAvsnitt } from '../Teksthåndtering/LocaleTekstAvsnitt';

interface Props {
    skjematype: Skjematype;
    routes: IRoute<Skjemasteg>[];
    tekster: ForsideTekster;
    harBekreftet: boolean;
    settHarBekreftet: (harBekreftet: boolean) => void;
}

export const ForsideSide: React.FC<Props> = ({
    skjematype,
    routes,
    tekster,
    harBekreftet,
    settHarBekreftet,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = routes[0];
        loggBesøk(skjematype, route.path, route.label);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startSøknad = () => {
        if (!harBekreftet) {
            settSkalViseFeilmelding(true);
            return;
        }

        loggSkjemaStartet(skjematype);
        const nesteRoute = hentNesteRoute(routes, location.pathname);
        navigate(nesteRoute.path);
    };

    return (
        <Container>
            <GuidePanel poster>
                <BodyShort spacing>
                    <strong>Hei!</strong>
                </BodyShort>
                <LocaleTekstAvsnitt tekst={tekster.veileder_innhold} />
            </GuidePanel>
            <div>
                <Heading level="2" size="large" spacing>
                    Dette må du vite
                </Heading>
                <LocalePunktliste innhold={tekster.dette_ma_du_vite_innhold} />
            </div>
            <EndringEnsligForsørgerExpansionCard />
            <div>
                <Heading level="2" size="large" spacing>
                    Vær klar over
                </Heading>
                <LocalePunktliste innhold={tekster.var_klar_over_innhold} />
            </div>
            <div>
                <Heading level="2" size="large" spacing>
                    Du kan ikke bruke denne søknaden hvis
                </Heading>
                <LocalePunktliste innhold={tekster.kan_ikke_soke_innhold} />
            </div>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>Informasjon vi henter om deg</Accordion.Header>
                    <Accordion.Content>
                        <InfoPunktliste
                            liste={[
                                {
                                    tittel: {
                                        nb: 'I tillegg til opplysningene du gir i søknaden, henter vi:',
                                    },
                                    innhold: {
                                        nb: [
                                            'person- og adresseopplysninger fra Folkeregisteret',
                                            'opplysninger om utdanning eller tiltak du har avtalt med veilederen din i Nav',
                                            'opplysninger om andre ytelser du får fra Nav',
                                        ],
                                    },
                                },
                            ]}
                        />
                        <LocaleInlineLenke
                            tekst={{
                                nb: [
                                    'Nav har ansvar for å behandle personopplysningene dine. Vi deler ikke opplysningene i søknaden med andre. ',
                                    {
                                        tekst: 'Les personvernerklæringen på nav.no',
                                        url: 'https://www.nav.no/personvernerklaering',
                                    },
                                    ' for å få mer informasjon om hvordan vi behandler personopplysningene dine.',
                                ],
                            }}
                        />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <VStack>
                <BodyLong>
                    <LocaleInlineLenke tekst={fellesTekster.viktig_med_rett_opplysninger} />
                </BodyLong>
                <BekreftelseCheckbox
                    skalViseFeilmelding={skalViseFeilmelding}
                    harBekreftet={harBekreftet}
                    oppdaterHarBekreftet={settHarBekreftet}
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
