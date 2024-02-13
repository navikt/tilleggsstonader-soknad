import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';

import { kvitteringTekster } from './tekster/kvittering';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../context/SøknadContext';
import { formaterDatoTid } from '../utils/formatering';

const Kvittering = () => {
    const { innsentTidspunkt } = useSøknad();

    return (
        <Container>
            <Heading size="medium" as="h2">
                <LocaleTekst tekst={kvitteringTekster.steg_tittel} />
            </Heading>
            <Alert variant="success">
                <Heading size="small" as="h3">
                    <LocaleTekst tekst={kvitteringTekster.søknad_mottatt_alert_tittel} />
                </Heading>
                <BodyLong spacing>
                    <LocaleTekst
                        tekst={kvitteringTekster.søknad_mottatt_alert_innhold1}
                        argument0={formaterDatoTid(innsentTidspunkt)}
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
