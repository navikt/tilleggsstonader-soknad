import { Alert, Heading } from '@navikt/ds-react';

import { kvitteringTekster } from './tekster/kvittering';
import { Container } from '../components/Side';
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
        </Container>
    );
};
export default Kvittering;
