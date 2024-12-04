import { MultiplyIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import Environment from '../api/Environment';
import { useSpråk } from '../context/SpråkContext';
import { fellesTekster } from '../tekster/felles';

export function AvsluttOgLoggUtKnapp() {
    const loggUt = () => {
        window.location.href = Environment().logoutUrl;
    };
    const { locale } = useSpråk();

    return (
        <Button variant="secondary" onClick={loggUt} icon={<MultiplyIcon />}>
            {fellesTekster.avsluttOgLoggUt[locale]}
        </Button>
    );
}
