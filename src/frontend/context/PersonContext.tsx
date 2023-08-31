import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { hentPersonData } from '../api/api';
import { initiellPerson } from '../mock/initiellPerson';
import { Person } from '../typer/person';

const [PersonProvider, usePerson] = createUseContext(() => {
    PersonProvider.displayName = 'PERSON_PROVIDER';
    const [person, settPerson] = useState<Person>(initiellPerson);

    const navn = 'Ole Jørgen Nilsen';
    useEffect(() => {
        settPerson({
            fnr: 'fødselsnummer',
            navn: navn,
            adresse: {
                adresse: 'Liaveien 34',
                postnummer: '0152',
                poststed: 'Oslo',
            },
            telefonnr: '950863265',
            epost: 'mail@gmail.com',
            kontonr: '1234.56.78910',
            barn: [
                {
                    id: '010101',
                    alder: 6,
                    fødselsdato: '2017-05-12T00:00:00',
                    fødselsnummer: '12051711222',
                    navn: 'Ronja Røverdatter',
                    skalHaBarnepass: false,
                },
                {
                    id: '020202',
                    alder: 10,
                    fødselsdato: '2013-01-05T00:00:00',
                    fødselsnummer: '05011311222',
                    navn: 'Espen Askeladden',
                    skalHaBarnepass: false,
                },
            ],
        });
    }, []);

    useEffect(() => {
        if (person.navn === navn) {
            // henter navn når man satt "mock"-verdi
            hentPersonData()
                .then((response) =>
                    settPerson((prevState) => ({ ...prevState, navn: response.navn }))
                )
                // feilhåndtering
                .catch(() => {});
        }
    }, [person]);

    const toggleSkalHaBarnepass = (id: string) => {
        settPerson((prevPerson) => ({
            ...prevPerson,

            barn: prevPerson.barn.map((barn) =>
                barn.id === id ? { ...barn, skalHaBarnepass: !barn.skalHaBarnepass } : barn
            ),
        }));
    };

    return { person, settPerson, toggleSkalHaBarnepass };
});

export { PersonProvider, usePerson };
