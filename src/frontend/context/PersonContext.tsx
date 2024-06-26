import { useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
import createUseContext from 'constate';

import { hentPersonData } from '../api/api';
import { sendSøkerTilGammelSøknad } from '../components/SøknadRouting/sendSøkerTilGammelSøknad';
import { initiellPerson } from '../mock/initiellPerson';
import { Person } from '../typer/person';

const erFeilOgSkalRouteTilGammelSøknad = (req: AxiosError<{ detail?: string }, unknown>) => {
    return req?.response?.data?.detail === 'ROUTING_GAMMEL_SØKNAD';
};

const [PersonProvider, usePerson] = createUseContext(() => {
    PersonProvider.displayName = 'PERSON_PROVIDER';
    const [person, settPerson] = useState<Person>(initiellPerson);
    const [harLastetPerson, settHarLastetPerson] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    useEffect(() => {
        hentPersonData()
            .then((resp) => {
                settPerson(resp);
                settHarLastetPerson(true);
            })
            .catch((req) => {
                if (axios.isAxiosError(req) && erFeilOgSkalRouteTilGammelSøknad(req)) {
                    sendSøkerTilGammelSøknad();
                } else {
                    // TODO noe bedre håndtering?
                    settFeilmelding(
                        'Feiltet henting av personopplysninger. Prøv å laste inn siden på nytt'
                    );
                }
            });
    }, []);

    return { harLastetPerson, feilmelding, person, settPerson };
});

export { PersonProvider, usePerson };
