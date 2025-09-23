import React from 'react';

import { GuidePanel } from '@navikt/ds-react';

import { ArbeidsrettetAktivitet } from './ArbeidsrettetAktivitet';
import { DineBarn } from './DineBarn';
import { PassAvBarn } from './PassAvBarn';
import HovedytelseOppsummering from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import { OmDegOppsummering } from '../../../components/Oppsummering/OmDegOppsummering';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import { VedleggOppsummering } from '../../../components/Oppsummering/VedleggOppsummering';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const Oppsummering = () => {
    const { hovedytelse, aktivitet, valgteBarnIdenter, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();
    const { person } = usePerson();

    return (
        <OppsummeringSide>
            <LocaleHeading tekst={oppsummeringTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekst tekst={oppsummeringTekster.guide_innhold} />
            </GuidePanel>
            <OmDegOppsummering />
            {hovedytelse && (
                <HovedytelseOppsummering
                    hovedytelse={hovedytelse}
                    redigerLenke={RouteTilPath.HOVEDYTELSE}
                />
            )}
            <ArbeidsrettetAktivitet aktivitet={aktivitet} />
            <DineBarn person={person} valgteBarnIdenter={valgteBarnIdenter} />
            <PassAvBarn person={person} barnMedBarnepass={barnMedBarnepass} />
            <VedleggOppsummering
                dokumentasjon={dokumentasjon}
                redigerLenke={RouteTilPath.VEDLEGG}
            />
        </OppsummeringSide>
    );
};

export default Oppsummering;
