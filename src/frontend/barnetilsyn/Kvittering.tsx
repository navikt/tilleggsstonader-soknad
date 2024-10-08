import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';

import { barnetilsynPath } from './routing/routesBarnetilsyn';
import { kvitteringTekster } from './tekster/kvittering';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { formaterNullableIsoDatoTid } from '../utils/formatering';

const Kvittering = () => {
    const locationState = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        if (locationState === null) {
            navigate(barnetilsynPath);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationState]);

    if (locationState == null) {
        return null;
    }

    return (
        <Container>
            <Heading size="medium" as="h2">
                <LocaleTekst tekst={kvitteringTekster.tittel} />
            </Heading>
            <Alert variant="success">
                <Heading size="small" as="h3">
                    <LocaleTekst tekst={kvitteringTekster.søknad_mottatt_alert_tittel} />
                </Heading>
                <BodyLong spacing>
                    <LocaleTekst
                        tekst={kvitteringTekster.søknad_mottatt_alert_innhold1}
                        argument0={formaterNullableIsoDatoTid(locationState.innsendtTidspunkt)}
                    />
                </BodyLong>
                <BodyLong>
                    <LocaleTekst tekst={kvitteringTekster.søknad_mottatt_alert_innhold2} />
                </BodyLong>
            </Alert>
            <BodyShort>
                <LocaleTekst tekst={kvitteringTekster.varsel_info} />
            </BodyShort>
            <BodyShort>
                <LocaleInlineLenke tekst={kvitteringTekster.se_søknad} />
            </BodyShort>
            <BodyShort>
                <LocaleInlineLenke tekst={kvitteringTekster.se_saksbehandlingstid} />
            </BodyShort>
        </Container>
    );
};
export default Kvittering;
