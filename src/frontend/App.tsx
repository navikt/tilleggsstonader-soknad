import React from 'react';

import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
const App: React.FC = () => {
    return (
        <GuidePanel poster>
            <Heading size={'large'}>Søknad om tilleggsstønader</Heading>
            <BodyShort>Her kommer søknad om barnetilsyn</BodyShort>
        </GuidePanel>
    );
};

export default App;
