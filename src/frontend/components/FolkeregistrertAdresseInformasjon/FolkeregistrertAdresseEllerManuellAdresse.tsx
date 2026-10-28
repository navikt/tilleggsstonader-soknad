import React from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import { FolkeregistrertAdresseInformasjon } from './FolkeregistrertAdresseInformasjon';
import { FregAdresseEllerManuellAdresseInnhold } from './tekster';
import { usePerson } from '../../context/PersonContext';
import { EnumFelt } from '../../typer/skjema';
import { JaNei, Adresse } from '../../typer/søknad';
import { Valideringsfeil } from '../../typer/validering';
import { harAlleFelterIStrukturertAdresse } from '../../utils/adresseUtils';
import { AdresseVelger } from '../AdresseVelger/AdresseVelger';
import { AdresseFeilIder } from '../AdresseVelger/validering';
import { LocaleRadioGroup } from '../Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../UnderspørsmålContainer';

interface Props {
    tekster: FregAdresseEllerManuellAdresseInnhold;

    brukFolkeregistrertAdresse?: EnumFelt<JaNei>;
    oppdaterBrukFolkeregistrertAdresse: (felt: EnumFelt<JaNei>) => void;

    manuellAdresse?: Adresse;
    oppdaterManuellAdresse: (felt: Partial<Adresse>, feltNavn: keyof Adresse) => void;

    valideringsfeil: Valideringsfeil;
    feilIdBrukFolkeregAdresse: string;
    feilIdAdresser: AdresseFeilIder;
}

export const FolkeregistrertAdresseElerManuellAdresse: React.FC<Props> = ({
    tekster,
    brukFolkeregistrertAdresse,
    oppdaterBrukFolkeregistrertAdresse,
    manuellAdresse,
    oppdaterManuellAdresse,
    valideringsfeil,
    feilIdBrukFolkeregAdresse,
    feilIdAdresser,
}) => {
    const { person } = usePerson();

    const harFolkeregistrertAdresse = harAlleFelterIStrukturertAdresse(person);

    const skalFylleUtAdresseManuelt =
        !harFolkeregistrertAdresse || brukFolkeregistrertAdresse?.verdi === 'NEI';

    return (
        <VStack gap="space-16">
            <FolkeregistrertAdresseInformasjon adresse={person.adresse} />

            {harFolkeregistrertAdresse && (
                <LocaleRadioGroup
                    id={valideringsfeil[feilIdBrukFolkeregAdresse]?.id}
                    tekst={tekster.bruk_folkeregistrert_adresse}
                    value={brukFolkeregistrertAdresse?.verdi ?? ''}
                    onChange={oppdaterBrukFolkeregistrertAdresse}
                    error={valideringsfeil[feilIdBrukFolkeregAdresse]?.melding}
                />
            )}

            {skalFylleUtAdresseManuelt && (
                <UnderspørsmålContainer>
                    <VStack gap="space-8">
                        <Heading level="3" size="small">
                            <LocaleTekst tekst={tekster.manuell_adresse_tittel} />
                        </Heading>
                        <AdresseVelger
                            adresse={manuellAdresse}
                            onChange={oppdaterManuellAdresse}
                            tekster={tekster.manuell_adresse}
                            feil={valideringsfeil}
                            feilIder={feilIdAdresser}
                        />
                    </VStack>
                </UnderspørsmålContainer>
            )}
        </VStack>
    );
};
