import { useState } from 'react';

import createUseContext from 'constate';

const [SøknadProvider, useSøknad] = createUseContext(() => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    return { harBekreftet, settHarBekreftet };
});

export { SøknadProvider, useSøknad };
