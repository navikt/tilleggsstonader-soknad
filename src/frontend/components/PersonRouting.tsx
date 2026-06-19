import React, { useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';

import { hentPersonData } from '../api/api';
import { PersonProvider } from '../context/PersonContext';
import { initiellPerson } from '../mock/initiellPerson';
import { Person } from '../typer/person';
import { sendSøkerTilPapirsøknad } from './SkjemaRouting/sendSøkerTilFyllUtSøknad';
import { useSjekkBehandlingStatus } from './Søknadside/SjekkBehandlingStatus';
import { Skjematype } from '../typer/skjematyper';
const erFeilOgSkalRouteTilPapirsøknad = (req: AxiosError<{ detail?: string }, unknown>) => {
    return req?.response?.data?.detail === 'ROUTING_GAMMEL_SØKNAD';
};

const skjematyperMedBarn = [Skjematype.SØKNAD_BARNETILSYN];

const skalHenteMedBarn = (skjematype: Skjematype) => skjematyperMedBarn.indexOf(skjematype) > -1;

export const PersonRouting: React.FC<{ skjematype: Skjematype; children: React.ReactNode }> = ({
    skjematype,
    children,
}) => {
    const [person, settPerson] = useState<Person>(initiellPerson);
    const [harLastetPerson, settHarLastetPerson] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const { harBehandling, harLastetBehandlingsstatus } = useSjekkBehandlingStatus(skjematype);

    useEffect(() => {
        hentPersonData(skalHenteMedBarn(skjematype))
            .then((resp) => {
                settPerson(resp);
                settHarLastetPerson(true);
            })
            .catch((req) => {
                if (axios.isAxiosError(req) && erFeilOgSkalRouteTilPapirsøknad(req)) {
                    sendSøkerTilPapirsøknad(skjematype);
                } else {
                    if (axios.isAxiosError(req) && req.response?.status === 503) {
                        settFeilmelding(
                            'Kunne ikke hente personopplysninger. Dette kan skyldes vedlikehold. Prøv å laste inn siden på nytt. Hvis problemet vedvarer, vennligst prøv igjen senere.'
                        );
                    } else {
                        settFeilmelding(
                            'Kunne ikke hente personopplysninger. Prøv å laste inn siden på nytt.'
                        );
                    }
                }
            });
    }, [skjematype]);

    if (feilmelding) {
        return <div>{feilmelding}</div>;
    }
    if (!harLastetPerson) {
        return null;
    }
    if (harLastetPerson && harLastetBehandlingsstatus) {
        return (
            <PersonProvider person={person} harBehandling={harBehandling}>
                {children}
            </PersonProvider>
        );
    }
};
