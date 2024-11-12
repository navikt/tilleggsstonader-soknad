import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';

import { BodyShort, Button } from '@navikt/ds-react';

import { RoutesBarnetilsyn } from './routing/routesBarnetilsyn';
import { loggBesøkBarnetilsyn } from '../api/amplitude';
import { Container } from '../components/Side';
import { hentNesteRoute } from '../utils/routes';

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Søknadside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const route = RoutesBarnetilsyn[0];
        loggBesøkBarnetilsyn(route.path, route.label);
    }, []);

    const startSøknad = () => {
        const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
        navigate(nesteRoute.path);
    };

    return (
        <Container>
            <KnappeContainer>
                <Button onClick={startSøknad} variant="primary">
                    Start ny søknad
                </Button>
            </KnappeContainer>
        </Container>
    );
};

export default Søknadside;
