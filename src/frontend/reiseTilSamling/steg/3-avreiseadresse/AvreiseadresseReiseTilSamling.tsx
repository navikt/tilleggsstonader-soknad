import React from 'react';

import {
    avreiseadresseFeilIder,
    errorKeySkalReiseFraFolkeregAdr,
    validerAvreiseadresse,
} from './validering';
import { FolkeregistrertAdresseElerManuellAdresse } from '../../../components/FolkeregistrertAdresseInformasjon/FolkeregistrertAdresseEllerManuellAdresse';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Person } from '../../../typer/person';
import { EnumFelt } from '../../../typer/skjema';
import { Adresse, JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { mapAdresse } from '../../../utils/adresseUtils';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
import { avreiseadresseTekster } from '../../tekster/avreiseadresse';

export const AvreiseadresseReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { avreiseadresse, settAvreiseadresse, settAdresseDetSkalReisesFra } =
        useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (verdi !== undefined && verdi !== '') {
            settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
        }
    };

    const kanFortsette = (): boolean => {
        const feil = validerAvreiseadresse(avreiseadresse, locale, manglerFolkeregistrertAdresse);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalReiseFraFolkeregAdr = (felt: EnumFelt<JaNei>) => {
        settAvreiseadresse((prev) => ({
            ...prev,
            skalReiseFraFolkeregistrertAdresse: felt,
            adresseDetSkalReisesFra: felt.verdi === 'NEI' ? undefined : mapAdresse(person),
        }));
        settValideringsfeil((prev) => ({ ...prev, [errorKeySkalReiseFraFolkeregAdr]: undefined }));
    };

    const manglerFolkeregistrertAdresse = !erStrukturertAdresseDefinert(person);

    function erStrukturertAdresseDefinert(person: Person): boolean {
        if (person.strukturertAdresse === undefined) {
            return false;
        } else if (
            person.strukturertAdresse.land != null ||
            person.strukturertAdresse.gateadresse != null ||
            person.strukturertAdresse.postnummer != null ||
            person.strukturertAdresse.poststed != null
        ) {
            return true;
        }
        return false;
    }

    const håndterAdresseEndring = (felt: Partial<Adresse>, feltNavn: keyof Adresse) => {
        settAdresseDetSkalReisesFra(felt);
        nullstillFeil(felt[feltNavn]?.verdi, avreiseadresseFeilIder[feltNavn]);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={avreiseadresseTekster.tittel} level="2" size="medium" />
            <FolkeregistrertAdresseElerManuellAdresse
                tekster={avreiseadresseTekster}
                brukFolkeregistrertAdresse={avreiseadresse.skalReiseFraFolkeregistrertAdresse}
                oppdaterBrukFolkeregistrertAdresse={oppdaterSkalReiseFraFolkeregAdr}
                manuellAdresse={avreiseadresse.adresseDetSkalReisesFra}
                oppdaterManuellAdresse={håndterAdresseEndring}
                valideringsfeil={valideringsfeil}
                feilIdBrukFolkeregAdresse={errorKeySkalReiseFraFolkeregAdr}
                feilIdAdresser={avreiseadresseFeilIder}
            />
        </Side>
    );
};
