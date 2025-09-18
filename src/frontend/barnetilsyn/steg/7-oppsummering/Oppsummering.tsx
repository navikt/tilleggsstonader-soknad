import React from 'react';

import { ArbeidsrettetAktivitet } from './ArbeidsrettetAktivitet';
import { DineBarn } from './DineBarn';
import { PassAvBarn } from './PassAvBarn';
import HovedytelseOppsummering from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import OmDeg from '../../../components/Oppsummering/OmDeg';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import VedleggOppsummering from '../../../components/Oppsummering/Vedlegg';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
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
            <PellePanel>
                <LocaleTekst tekst={oppsummeringTekster.guide_innhold} />
            </PellePanel>
            <OmDeg />
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
