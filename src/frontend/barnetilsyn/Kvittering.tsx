import { Alert, BodyShort, Heading } from '@navikt/ds-react';

import { kvitteringTekster } from './tekster/kvittering';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';

const Kvittering = () => {
    return (
        <Container>
            <Heading size="medium" as="h2">
                <LocaleTekst tekst={kvitteringTekster.steg_tittel} />
            </Heading>
            <Alert variant="success">
                <Heading size="small" as="h3">
                    <LocaleTekst tekst={kvitteringTekster.søknad_mottatt_alert_tittel} />
                </Heading>
                <LocaleTekstAvsnitt tekst={kvitteringTekster.søknad_mottatt_alert_innhold} />
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
