import React from 'react';

import { GuidePanel } from '@navikt/ds-react';

import { ReiserListe } from './ReiserListe';
import { validerReiser } from './validering';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleTekstAvsnitt } from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { inneholderFeil } from '../../../typer/validering';
import { useReiseOppstartAvslutningHjemreiseSøknad } from '../../context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { reiseinfoTekster } from '../../tekster/reiseinfo';

export const ReiseinfoSteg = () => {
    const { locale } = useSpråk();
    const { reiser, settReiser } = useReiseOppstartAvslutningHjemreiseSøknad();
    const { settValideringsfeil } = useValideringsfeil();

    const kanFortsette = (): boolean => {
        const feil = validerReiser(reiser, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={reiseinfoTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekstAvsnitt tekst={reiseinfoTekster.guide_innhold} />
            </GuidePanel>
            <ReiserListe reiser={reiser} settReiser={settReiser} />
        </Side>
    );
};
