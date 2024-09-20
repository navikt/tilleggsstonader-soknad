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

const stønadstyperMedBarn = [Stønadstype.BARNETILSYN];

const skalHenteMedBarn = (stønadstype: Stønadstype) =>
    stønadstyperMedBarn.indexOf(stønadstype) > -1;

export const PersonRouting: React.FC<{ stønadstype: Stønadstype; children: React.ReactNode }> = ({
    stønadstype,
    children,
}) => {
    const [person, settPerson] = useState<Person>(initiellPerson);
    const [harLastetPerson, settHarLastetPerson] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    useEffect(() => {
        hentPersonData(skalHenteMedBarn(stønadstype))
            .then((resp) => {
                settPerson(resp);
                settHarLastetPerson(true);
            })
            .catch((req) => {
                if (axios.isAxiosError(req) && erFeilOgSkalRouteTilPapirsøknad(req)) {
                    sendSøkerTilPapirsøknad(stønadstype);
                } else {
                    settFeilmelding(
                        'Feilet henting av personopplysninger. Prøv å laste inn siden på nytt'
                    );
                }
            });
    }, [stønadstype]);

    if (feilmelding) {
        return <div>{feilmelding}</div>;
    }
    if (!harLastetPerson) {
        return null;
    }

    return <PersonProvider person={person}>{children}</PersonProvider>;
};
