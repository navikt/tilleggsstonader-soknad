import React from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import { errorKeySkalBrukeFolkeregAdresse, originalAdresseFeilIder } from './validering';
import { AdresseVelger } from '../../../components/AdresseVelger/AdresseVelger';
import {
    FolkeregistrertAdresseInformasjon,
    ManglerFolkeregistrertAdresseInformasjon,
} from '../../../components/FolkeregistrertAdresseInformasjon/FolkeregistrertAdresseInformasjon';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { Person } from '../../../typer/person';
import { EnumFelt } from '../../../typer/skjema';
import { Adresse, JaNei } from '../../../typer/søknad';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { adresserTekster } from '../../tekster/adresser';
import { AdresseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

interface Props {
    person: Person;
    adresser: AdresseReiseOppstartAvslutningHjemreise;
    håndterSkalBrukeFolkeregAdresse: (felt: EnumFelt<JaNei>) => void;
    håndterOriginalAdresseEndring: (felt: Partial<Adresse>, feltNavn: keyof Adresse) => void;
    valideringsfeil: Valideringsfeil;
}

export const AdresseOriginaltBosted: React.FC<Props> = ({
    person,
    adresser,
    håndterSkalBrukeFolkeregAdresse,
    håndterOriginalAdresseEndring,
    valideringsfeil,
}) => {
    const harFolkeregistrertAdresse =
        harVerdi(person.adresse) && person.strukturertAdresse !== undefined;

    return (
        <VStack gap="space-16">
            <Heading level="3" size="small">
                <LocaleTekst tekst={adresserTekster.original_adresse_tittel} />
            </Heading>
            {harFolkeregistrertAdresse ? (
                <>
                    <FolkeregistrertAdresseInformasjon adresse={person.adresse} />
                    <LocaleRadioGroup
                        id={valideringsfeil[errorKeySkalBrukeFolkeregAdresse]?.id}
                        tekst={adresserTekster.radio_samme_som_flyttet_fra}
                        value={adresser?.skalReiseFraFolkeregistrertAdresse?.verdi ?? ''}
                        onChange={håndterSkalBrukeFolkeregAdresse}
                        error={valideringsfeil[errorKeySkalBrukeFolkeregAdresse]?.melding}
                    />
                    {adresser?.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI' && (
                        <ManuellRegistreringAdresse
                            adresse={adresser?.adresseOriginaltBosted}
                            håndterOriginalAdresseEndring={håndterOriginalAdresseEndring}
                            valideringsfeil={valideringsfeil}
                        />
                    )}
                </>
            ) : (
                <>
                    <ManglerFolkeregistrertAdresseInformasjon />
                    <ManuellRegistreringAdresse
                        adresse={adresser?.adresseOriginaltBosted}
                        håndterOriginalAdresseEndring={håndterOriginalAdresseEndring}
                        valideringsfeil={valideringsfeil}
                    />
                </>
            )}
        </VStack>
    );
};

const ManuellRegistreringAdresse: React.FC<{
    adresse?: Adresse | undefined;
    håndterOriginalAdresseEndring: (felt: Partial<Adresse>, feltNavn: keyof Adresse) => void;
    valideringsfeil: Valideringsfeil;
}> = ({ adresse, håndterOriginalAdresseEndring, valideringsfeil }) => {
    return (
        <UnderspørsmålContainer>
            <VStack gap="space-8">
                <Heading level="3" size="small">
                    <LocaleTekst tekst={adresserTekster.adresse_du_flyttet_fra_tittel} />
                </Heading>
                <AdresseVelger
                    adresse={adresse}
                    onChange={håndterOriginalAdresseEndring}
                    tekster={adresserTekster.original_adresse_spørsmål}
                    feil={valideringsfeil}
                    feilIder={originalAdresseFeilIder}
                />
            </VStack>
        </UnderspørsmålContainer>
    );
};
