// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import { HovedytelseOppsummering } from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import { OmDegOppsummering } from '../../../components/Oppsummering/OmDegOppsummering';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import { VedleggOppsummering } from '../../../components/Oppsummering/VedleggOppsummering';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useLæremidlerSøknad } from '../../context/LæremidlerSøknadContext';
import { RouteTilPath } from '../../routing/routesLæremidler';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { UtdanningOppsummering } from './Utdanning';

export const Oppsummering = () => {
    const { hovedytelse, utdanning, dokumentasjonsbehov, dokumentasjon } = useLæremidlerSøknad();
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
            {utdanning && <UtdanningOppsummering utdanning={utdanning} />}
            {dokumentasjonsbehov.length > 0 && (
                <VedleggOppsummering
                    dokumentasjon={dokumentasjon}
                    redigerLenke={RouteTilPath.VEDLEGG}
                />
            )}
        </OppsummeringSide>
    );
};
