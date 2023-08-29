import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { initiellPerson } from '../mock/initiellPerson';
import { Person } from '../typer/person';

const [PersonProvider, usePerson] = createUseContext(() => {
    PersonProvider.displayName = 'PERSON_PROVIDER';
    const [person, settPerson] = useState<Person>(initiellPerson);

    useEffect(() => {
        // TODO: Fetch persondata.
        settPerson({
            fnr: 'fødselsnummer',
            navn: 'Ole Jørgen Nilsen',
            adresse: {
                adresse: 'Liaveien 34',
                postnummer: '0152',
                poststed: 'Oslo',
            },
            telefonnr: '950863265',
            epost: 'mail@gmail.com',
            kontonr: '1234.56.78910',
        });
    }, []);

    return { person, settPerson };
});

export { PersonProvider, usePerson };
