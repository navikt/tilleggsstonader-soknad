import React from 'react';

import { Heading } from '@navikt/ds-react';

import UtdanningOppsummering from './Utdanning';
import HovedytelseOppsummering from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import OmDeg from '../../../components/Oppsummering/OmDeg';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import VedleggOppsummering from '../../../components/Oppsummering/Vedlegg';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { RouteTilPath } from '../../routing/routesLæremidler';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const Oppsummering = () => {
    const { hovedytelse, utdanning, dokumentasjonsbehov, dokumentasjon } = useLæremidlerSøknad();
    return (
        <OppsummeringSide>
            <Heading size="medium">
                <LocaleTekst tekst={oppsummeringTekster.tittel} />
            </Heading>
            <OmDeg />
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

export default Oppsummering;
