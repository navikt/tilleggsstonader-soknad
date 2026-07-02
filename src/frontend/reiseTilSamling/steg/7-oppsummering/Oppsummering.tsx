import React from 'react';

import { AktivitetOppsummering } from './AktivitetOppsummering';
import { ReiseavstandOppsummering } from './ReiseavstandOppsummering';
import { ReisemåteOppsummering } from './ReisemåteOppsummering';
import { SamlingerOppsummering } from './SamlingerOppsummering';
import { HovedytelseOppsummering } from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import { OmDegOppsummering } from '../../../components/Oppsummering/OmDegOppsummering';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import { VedleggOppsummering } from '../../../components/Oppsummering/VedleggOppsummering';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const Oppsummering = () => {
    const {
        hovedytelse,
        aktivitet,
        tilleggsopplysninger,
        reiseavstand,
        samlinger,
        reisemåte,
        dokumentasjonsbehov,
        dokumentasjon,
    } = useReiseTilSamlingSøknad();

    return (
        <OppsummeringSide>
            <LocaleHeading tekst={oppsummeringTekster.tittel} size="medium" level="2" />
            <OmDegOppsummering />
            {hovedytelse && (
                <HovedytelseOppsummering
                    hovedytelse={hovedytelse}
                    redigerLenke={RouteTilPath.HOVEDYTELSE}
                />
            )}
            {aktivitet && (
                <AktivitetOppsummering
                    aktivitet={aktivitet}
                    tilleggsopplysninger={tilleggsopplysninger}
                />
            )}
            {reiseavstand && <ReiseavstandOppsummering reiseavstand={reiseavstand} />}
            <SamlingerOppsummering samlinger={samlinger} />
            {reisemåte && <ReisemåteOppsummering reisemåte={reisemåte} />}
            {dokumentasjonsbehov.length > 0 && (
                <VedleggOppsummering
                    dokumentasjon={dokumentasjon}
                    redigerLenke={RouteTilPath.VEDLEGG}
                />
            )}
        </OppsummeringSide>
    );
};
