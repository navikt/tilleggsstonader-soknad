import React from 'react';

import { GuidePanel, InlineMessage, VStack } from '@navikt/ds-react';

import { BarnSomFlytterMed } from './BarnSomFlytterMed';
import {
    errorKeyHarBarnHjemmeUnder4Klasse,
    errorKeyHarSærligeBehovForFlereHjemreiser,
    validerBarnOgSærligeBehov,
} from './validering';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekstAvsnitt } from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { useReiseOppstartAvslutningHjemreiseSøknad } from '../../context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { barnOgSærligeBehovTekster } from '../../tekster/barnOgSærligeBehov';
import { BarnOgSærligeBehovReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const BarnOgSærligeBehovSteg = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { barnOgSærligeBehov, settBarnOgSærligeBehov } =
        useReiseOppstartAvslutningHjemreiseSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const harBarn = person.barn.length > 0;

    const oppdaterEnumFelt = (
        key: keyof BarnOgSærligeBehovReiseOppstartAvslutningHjemreise,
        errorKey: string,
        verdi: EnumFelt<JaNei>
    ) => {
        settBarnOgSærligeBehov((prev) => ({ ...prev, [key]: verdi }));
        settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
    };

    const kanFortsette = (): boolean => {
        const feil = validerBarnOgSærligeBehov(barnOgSærligeBehov, locale, harBarn);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={barnOgSærligeBehovTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekstAvsnitt tekst={barnOgSærligeBehovTekster.guide_innhold} />
            </GuidePanel>
            {harBarn && (
                <>
                    <BarnSomFlytterMed
                        locale={locale}
                        barn={person.barn}
                        barnOgSærligeBehov={barnOgSærligeBehov}
                        valideringsfeil={valideringsfeil}
                        settBarnOgSærligeBehov={settBarnOgSærligeBehov}
                        settValideringsfeil={settValideringsfeil}
                    />
                    <LocaleRadioGroup
                        id={valideringsfeil[errorKeyHarBarnHjemmeUnder4Klasse]?.id}
                        tekst={barnOgSærligeBehovTekster.radio_har_barn_hjemme_under_4_klasse}
                        value={barnOgSærligeBehov?.harBarnHjemmeUnder4Klasse?.verdi ?? ''}
                        onChange={(verdi) =>
                            oppdaterEnumFelt(
                                'harBarnHjemmeUnder4Klasse',
                                errorKeyHarBarnHjemmeUnder4Klasse,
                                verdi
                            )
                        }
                        error={valideringsfeil[errorKeyHarBarnHjemmeUnder4Klasse]?.melding}
                    />
                </>
            )}
            <VStack gap="space-16">
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyHarSærligeBehovForFlereHjemreiser]?.id}
                    tekst={barnOgSærligeBehovTekster.radio_har_særlige_behov_for_flere_hjemreiser}
                    value={barnOgSærligeBehov?.harSærligeBehovForFlereHjemreiser?.verdi ?? ''}
                    onChange={(verdi) =>
                        oppdaterEnumFelt(
                            'harSærligeBehovForFlereHjemreiser',
                            errorKeyHarSærligeBehovForFlereHjemreiser,
                            verdi
                        )
                    }
                    error={valideringsfeil[errorKeyHarSærligeBehovForFlereHjemreiser]?.melding}
                />
                {barnOgSærligeBehov?.harSærligeBehovForFlereHjemreiser?.verdi === 'JA' && (
                    <InlineMessage status="info">
                        <LocaleTekstAvsnitt
                            tekst={barnOgSærligeBehovTekster.advarsel_dokumentasjon_særlige_behov}
                        />
                    </InlineMessage>
                )}
            </VStack>
        </Side>
    );
};
