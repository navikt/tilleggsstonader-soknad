import { MultiplyIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import Environment from '../api/Environment';

export function AvsluttOgLoggUtKnapp() {
    const loggUt = () => {
        window.location.href = Environment().logoutUrl;
    };
    return (
        <>
            <Button variant="secondary" onClick={loggUt}>
                <MultiplyIcon
                    title="a11y-title"
                    fontSize="1.5rem"
                    style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                />
                Avslutt og logg ut
            </Button>
        </>
    );
}
