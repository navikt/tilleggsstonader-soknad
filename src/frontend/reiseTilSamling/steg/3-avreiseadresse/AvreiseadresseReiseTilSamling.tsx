import React from 'react';

import styled from 'styled-components';

import { BodyShort, InlineMessage, Link, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import {
    avreiseadresseFeilIder,
    errorKeySkalReiseFraFolkeregAdr,
    validerAvreiseadresse,
} from './validering';
import { AdresseVelger } from '../../../components/AdresseVelger/AdresseVelger';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../typer/skjema';
import { Adresse, JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
import { avreiseadresseTekster } from '../../tekster/avreiseadresse';

const AdresseBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

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
        const feil = validerAvreiseadresse(avreiseadresse, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalReiseFraFolkeregAdr = (felt: EnumFelt<JaNei>) => {
        settAvreiseadresse((prev) => ({
            ...prev,
            skalReiseFraFolkeregistrertAdresse: felt,
            adresseDetSkalReisesFra:
                felt.verdi === 'NEI' ? prev.adresseDetSkalReisesFra : undefined,
        }));
        settValideringsfeil((prev) => ({ ...prev, [errorKeySkalReiseFraFolkeregAdr]: undefined }));
    };

    const skalReiseFraFolkeregAdr = avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi;

    const håndterAdresseEndring = (felt: Partial<Adresse>, feltNavn: keyof Adresse) => {
        settAdresseDetSkalReisesFra(felt);
        nullstillFeil(felt[feltNavn]?.verdi, avreiseadresseFeilIder[feltNavn]);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={avreiseadresseTekster.tittel} level="2" size="medium" />
            <VStack gap="space-8">
                <BodyShort spacing>
                    <LocaleTekst
                        tekst={avreiseadresseTekster.folkereg_adresse}
                        argument0={person.adresse}
                    />
                </BodyShort>
                <InlineMessage status="info">
                    <BodyShort spacing>
                        {avreiseadresseTekster.avreiseadresse_fra_folkereg_info[locale]}
                        <Link
                            href={avreiseadresseTekster.avreiseadresse_fra_folkereg_lenke_url}
                            target="_blank"
                            inlineText
                            rel="noopener noreferrer"
                        >
                            {avreiseadresseTekster.avreiseadresse_fra_folkereg_lenke_tekst[locale]}
                        </Link>
                        .
                    </BodyShort>
                </InlineMessage>
            </VStack>
            <LocaleRadioGroup
                id={valideringsfeil[errorKeySkalReiseFraFolkeregAdr]?.id}
                tekst={avreiseadresseTekster.radio_skalReiseFraFolkeregAdr}
                value={avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi ?? ''}
                onChange={oppdaterSkalReiseFraFolkeregAdr}
                error={valideringsfeil[errorKeySkalReiseFraFolkeregAdr]?.melding}
            />
            {skalReiseFraFolkeregAdr === 'NEI' && (
                <VStack gap="space-4" style={{ marginBottom: 'var(--a-spacing-2)' }}>
                    <BodyShort weight="semibold">
                        {avreiseadresseTekster.avreiseadresse_tittel[locale]}
                    </BodyShort>
                    <AdresseBoks>
                        <AdresseVelger
                            adresse={avreiseadresse.adresseDetSkalReisesFra}
                            onChange={håndterAdresseEndring}
                            tekster={avreiseadresseTekster.avreiseadresse_spørsmål}
                            feil={valideringsfeil}
                            feilIder={avreiseadresseFeilIder}
                        />
                    </AdresseBoks>
                </VStack>
            )}
        </Side>
    );
};
