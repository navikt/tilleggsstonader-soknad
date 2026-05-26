import React from 'react';

import { Navigate, Route, Routes } from 'react-router';

import { Forside } from './Forside';
import { ReisemåteReiseTilSamling } from './steg/5-reisemåte/ReisemåteReiseTilSamling';
import { VedleggReiseTilSamling } from './steg/6-vedlegg/VedleggReiseTilSamling';
import Oppsummering from './steg/7-oppsummering/Oppsummering';
import { forsideTekster } from './tekster/forside';
import Kvittering from '../components/Kvittering/Kvittering';
import RedirectTilStart from '../components/RedirectTilStart';
import { SøknadsskjemaHeader } from '../components/SøknadsskjemaHeader';
import { useReiseTilSamlingSøknad } from '../context/ReiseTilSamlingSøknadContext';
import { stønadstypeTilSkjemaId } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';
import { reiseTilSamlingPath, RouteTilPath } from './routing/routesReiseTilSamling';
import { HovedytelseReiseTilSamling } from './steg/1-hovedytelse/HovedytelseReiseTilSamling';
import { AktivitetReiseTilSamling } from './steg/2-aktivitet/AktivitetReiseTilSamling';
import { ReiseavstandReiseTilSamling } from './steg/3-reiseavstand/ReiseavstandReiseTilSamling';
import { SamlingerReiseTilSamling } from './steg/4-samlinger/SamlingerReiseTilSamling';

export const Søknadsdialog: React.FC = () => {
    return (
        <>
            <SøknadsskjemaHeader
                tittel={forsideTekster.banner_tittel}
                skjemaId={stønadstypeTilSkjemaId[Stønadstype.REISE_TIL_SAMLING]}
            />
            <Routes>
                <Route path={'/'} element={<Forside />} />
                <Route
                    path={'/hovedytelse'}
                    element={
                        <SøknadsdialogInnhold>
                            <HovedytelseReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/aktivitet'}
                    element={
                        <SøknadsdialogInnhold>
                            <AktivitetReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/samlinger'}
                    element={
                        <SøknadsdialogInnhold>
                            <SamlingerReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/reiseavstand'}
                    element={
                        <SøknadsdialogInnhold>
                            <ReiseavstandReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/reisemate'}
                    element={
                        <SøknadsdialogInnhold>
                            <ReisemåteReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/vedlegg'}
                    element={
                        <SøknadsdialogInnhold>
                            <VedleggReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/oppsummering'}
                    element={
                        <SøknadsdialogInnhold>
                            <Oppsummering />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/kvittering'}
                    element={<Kvittering pathTilForside={reiseTilSamlingPath} />}
                />
                <Route path={'*'} element={<Navigate to={RouteTilPath.FORSIDE} replace />} />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { harBekreftet } = useReiseTilSamlingSøknad();

    return <RedirectTilStart harBekreftet={harBekreftet}>{children}</RedirectTilStart>;
};
