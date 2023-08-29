import { Heading } from '@navikt/ds-react';

import { kvitteringTekster } from './tekster/kvittering';
import { Container } from '../components/Side';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';

const Kvittering = () => {
    return (
        <Container>
            <Heading size="medium" as="h2">
                <LocaleTekst tekst={kvitteringTekster.steg_tittel} />
            </Heading>
        </Container>
    );
};
export default Kvittering;
