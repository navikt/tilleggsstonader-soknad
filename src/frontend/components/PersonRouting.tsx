import React, { useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';

import { sendSøkerTilPapirsøknad } from './SøknadRouting/sendSøkerTilGammelSøknad';
import { hentPersonData } from '../api/api';
import { PersonProvider } from '../context/PersonContext';
import { initiellPerson } from '../mock/initiellPerson';
import { Person } from '../typer/person';
import { Stønadstype } from '../typer/stønadstyper';

const erFeilOgSkalRouteTilPapirsøknad = (req: AxiosError<{ detail?: string }, unknown>) => {
    return req?.response?.data?.detail === 'ROUTING_GAMMEL_SØKNAD';
};

export const PersonRouting: React.FC<{ stønadstype: Stønadstype; children: React.ReactNode }> = ({
    //stønadstype,
    children,
}) => {
    const [person, settPerson] = useState<Person>(initiellPerson);
    const [harLastetPerson, settHarLastetPerson] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    useEffect(() => {
        // TODO hent data basert på om brukeren skal ha barn eller ikke, kun barn-kall kan ev sende til papirsøknad
        hentPersonData()
            .then((resp) => {
                settPerson(resp);
                settHarLastetPerson(true);
            })
            .catch((req) => {
                if (axios.isAxiosError(req) && erFeilOgSkalRouteTilPapirsøknad(req)) {
                    sendSøkerTilPapirsøknad();
                } else {
                    settFeilmelding(
                        'Feilet henting av personopplysninger. Prøv å laste inn siden på nytt'
                    );
                }
            });
    }, []);

    if (feilmelding) {
        return <div>{feilmelding}</div>;
    }
    if (!harLastetPerson) {
        return null;
    }

    return <PersonProvider person={person}>{children}</PersonProvider>;
};
