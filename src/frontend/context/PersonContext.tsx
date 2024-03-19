import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { hentPersonData } from '../api/api';
import { initiellPerson } from '../mock/initiellPerson';
import { Person } from '../typer/person';

const [PersonProvider, usePerson] = createUseContext(() => {
    PersonProvider.displayName = 'PERSON_PROVIDER';
    const [person, settPerson] = useState<Person>(initiellPerson);
    const [harLastetPerson, settHarLastetPerson] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    useEffect(() => {
        hentPersonData()
            .then((søker) => settPerson(søker))
            .catch(() => settFeilmelding('Feiltet henting av personopplysninger')) // TODO noe bedre håndtering?
            .finally(() => settHarLastetPerson(true));
    }, []);

    return { harLastetPerson, feilmelding, person, settPerson };
});

export { PersonProvider, usePerson };
