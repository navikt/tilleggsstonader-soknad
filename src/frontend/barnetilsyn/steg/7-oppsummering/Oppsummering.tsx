import React from 'react';

import { Heading } from '@navikt/ds-react';

import { ArbeidsrettetAktivitet } from './ArbeidsrettetAktivitet';
import { DineBarn } from './DineBarn';
import { PassAvBarn } from './PassAvBarn';
import HovedytelseOppsummering from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import OmDeg from '../../../components/Oppsummering/OmDeg';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import VedleggOppsummering from '../../../components/Oppsummering/Vedlegg';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const Oppsummering = () => {
    const { hovedytelse, aktivitet, valgteBarnIdenter, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();
    const { person } = usePerson();

    return (
        <OppsummeringSide>
            <Heading size={'medium'}>
                <LocaleTekst tekst={oppsummeringTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={oppsummeringTekster.guide_innhold} />
            </PellePanel>
            <OmDeg />
            <HovedytelseOppsummering hovedytelse={hovedytelse} />
            <ArbeidsrettetAktivitet aktivitet={aktivitet} />
            <DineBarn person={person} valgteBarnIdenter={valgteBarnIdenter} />
            <PassAvBarn person={person} barnMedBarnepass={barnMedBarnepass} />
            <VedleggOppsummering dokumentasjon={dokumentasjon} />
        </OppsummeringSide>
    );
};

export default Oppsummering;
