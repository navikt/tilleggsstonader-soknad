import React from 'react';

import { GuidePanel } from '@navikt/ds-react';

import { BarnSomFlytterMed } from './BarnSomFlytterMed';
import {
    errorKeyHarBarnHjemmeUnder4Klasse,
    errorKeyHarSærligeBehovForFlereHjemreiser,
    validerBarnOgHelse,
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
import { barnOgHelseTekster } from '../../tekster/barnOgHelse';
import { BarnOgHelseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const BarnOgHelseSteg = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { barnOgHelse, settBarnOgHelse } = useReiseOppstartAvslutningHjemreiseSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const harBarn = person.barn.length > 0;

    const oppdaterEnumFelt = (
        key: keyof BarnOgHelseReiseOppstartAvslutningHjemreise,
        errorKey: string,
        verdi: EnumFelt<JaNei>
    ) => {
        settBarnOgHelse((prev) => ({ ...prev, [key]: verdi }));
        settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
    };

    const kanFortsette = (): boolean => {
        const feil = validerBarnOgHelse(barnOgHelse, locale, harBarn);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={barnOgHelseTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekstAvsnitt tekst={barnOgHelseTekster.guide_innhold} />
            </GuidePanel>
            {harBarn && (
                <>
                    <BarnSomFlytterMed
                        locale={locale}
                        barn={person.barn}
                        barnOgHelse={barnOgHelse}
                        valideringsfeil={valideringsfeil}
                        settBarnOgHelse={settBarnOgHelse}
                        settValideringsfeil={settValideringsfeil}
                    />
                    <LocaleRadioGroup
                        id={valideringsfeil[errorKeyHarBarnHjemmeUnder4Klasse]?.id}
                        tekst={barnOgHelseTekster.radio_har_barn_hjemme_under_4_klasse}
                        value={barnOgHelse?.harBarnHjemmeUnder4Klasse?.verdi ?? ''}
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
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHarSærligeBehovForFlereHjemreiser]?.id}
                tekst={barnOgHelseTekster.radio_har_særlige_behov_for_flere_hjemreiser}
                value={barnOgHelse?.harSærligeBehovForFlereHjemreiser?.verdi ?? ''}
                onChange={(verdi) =>
                    oppdaterEnumFelt(
                        'harSærligeBehovForFlereHjemreiser',
                        errorKeyHarSærligeBehovForFlereHjemreiser,
                        verdi
                    )
                }
                error={valideringsfeil[errorKeyHarSærligeBehovForFlereHjemreiser]?.melding}
            />
        </Side>
    );
};
